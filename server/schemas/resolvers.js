const { User, Event } = require('../models');
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
  Query: {
    users: async () => {
      return User.find().populate('events');
    },
    user: async (parent, { username }) => {
      return User.findOne({ username }).populate('events');
    },
    events: async (parent, { username }) => {
      const params = username ? { username } : {};
      return Event.find(params).sort({ createdAt: -1 });
    },
    event: async (parent, { eventId }) => {
      return Event.findOne({ _id: eventId });
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('events');
      }
      throw AuthenticationError;
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw AuthenticationError;
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw AuthenticationError;
      }

      const token = signToken(user);

      return { token, user };
    },
    addEvent: async (parent, { eventTitle, eventDate, eventTime }, context) => {
      // Use the logged in users info
      if (context.user) {
        // Create the event in the event collection
        const event = await Event.create({
          eventTitle,
          eventDate,
          eventTime,
        });
        // Update the user with the newly created event
        await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { events: event._id } }
        );

        return event;
      }
      throw AuthenticationError;
    },



    deleteEvent: async (parent, { eventId }, context) => {
      if (context.user) {
        const event = await Event.findOneAndDelete({
          _id: eventId,
        });

        return event;
      }
      throw AuthenticationError;
    },
    editEvent: async (parent, { eventId, eventTitle, eventDate, eventTime }, context) => {
      if (context.user) {
        // you can find the event id
        const event = await Event.findById(eventId);

        
        if (!event) {
          throw new Error('Event not found');
        }

        
        if (event.userId.toString() !== context.user._id.toString()) {
          throw new AuthenticationError('You are not authorized to edit this event');
        }

        // updates the event with new data
        event.eventTitle = eventTitle;
        event.eventDate = eventDate;
        event.eventTime = eventTime;

        // Save the updated event
        await event.save();

        return event;
      }
      throw new AuthenticationError('You must be logged in to edit an event');
    },
  },
};


  




module.exports = resolvers;
