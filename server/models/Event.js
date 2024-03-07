const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
  title: {
    type: String,
    required: 'You need to create an event!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  date: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
});

const Event = model('Event', eventSchema);

module.exports = Event;
