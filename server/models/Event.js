const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
  eventTitle: {
    type: String,
    required: 'You need to create an event!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  eventDate: {
    type: String,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  eventTime: {
    type: String,
  },
});

const Event = model('Event', eventSchema);

module.exports = Event;
