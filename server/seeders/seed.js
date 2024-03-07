const db = require('../config/connection');
const { User, Event } = require('../models');
const userSeeds = require('./userSeeds.json');
const eventSeeds = require('./eventSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    await cleanDB('Event', 'events');
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    for (let i = 0; i < eventSeeds.length; i++) {
      const { _id, eventAuthor } = await Event.create(eventSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: eventAuthor },
        {
          $addToSet: {
            events: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});



