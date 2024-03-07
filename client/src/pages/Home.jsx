import { useQuery } from '@apollo/client';

import EventList from '../components/EventList';
import EventForm from '../components/EventForm';

import { QUERY_EVENTS } from '../utils/queries';

const Home = () => {
  const { loading, data } = useQuery(QUERY_EVENTS);
  const events = data?.events || [];

  return (
    <main>
      {/* <div className="flex-row justify-center">
        <div
          className="col-12 col-md-10 mb-3 p-3"
          style={{ border: '1px dotted #1a1a1a' }}
        >
          <EventForm />
        </div>
        <div className="col-12 col-md-8 mb-3">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EventList
              events={events}
              title="Some Feed for Event(s)..."
            />
          )}
        </div>
      </div> */}
    </main>
  );
};

export default Home;
