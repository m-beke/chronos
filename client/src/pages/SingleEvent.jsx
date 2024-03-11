// Import the `useParams()` hook
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

import { QUERY_SINGLE_EVENT} from '../utils/queries';

const SingleEvent = () => {
  // Use `useParams()` to retrieve value of the route parameter `:profileId`
  const { eventId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_EVENT, {
    // pass URL parameter
    variables: { eventId: eventId },
  });

  const event = data?.event || {};

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="my-3">
      <h3 className="card-header bg-dark text-light p-2 m-0">
        {event.eventAuthor} <br />
        <span style={{ fontSize: '1rem' }}>
          had this thought on {event.createdAt}
        </span>
      </h3>
      <div className="bg-light py-4">
        <blockquote
          className="p-4"
          style={{
            fontSize: '1.5rem',
            fontStyle: 'italic',
            border: '2px dotted #1a1a1a',
            lineHeight: '1.5',
          }}
        >
          {event.eventText}
        </blockquote>
      </div>

      <div className="my-5">
        <EventList comments={event.comments} />
      </div>
      <div className="m-3 p-4" style={{ border: '1px dotted #1a1a1a' }}>
        <EventForm eventId={event._id} />
      </div>
    </div>
  );
};

export default SingleEvent;
