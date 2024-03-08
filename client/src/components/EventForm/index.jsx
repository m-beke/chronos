import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { ADD_EVENT } from '../../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../../utils/queries';

import Auth from '../../utils/auth';

const EventForm = () => {
  const [eventText, setEventText] = useState('');

  const [characterCount, setCharacterCount] = useState(0);

  const [addEvent, { error }] = useMutation
  (ADD_EVENT, {
    refetchQueries: [
      QUERY_EVENTS,
      'getEvents',
      QUERY_ME,
      'me'
    ]
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addEvent({
        variables: {
          eventText,
          // Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username 
          eventAuthor: Auth.getProfile().authenticatedPerson.username
        },
      });

      setEventText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'eventText' && value.length <= 280) {
      setEventText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div>
      <h3>What's do you need to plan?</h3>

      {Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <textarea
                name="eventTitle"
                placeholder="Put your idea ..."
                value={eventTitle}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add Event
              </button>
            </div>
            {error && (
              <div className="col-12 my-3 bg-danger text-white p-3">
                {error.message}
              </div>
            )}
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to see your Events. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
  );
};

export default EventForm;
