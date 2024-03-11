import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import Auth from "../utils/auth";
import { QUERY_EVENTS } from "../utils/queries";
import "../styles/home.css";

const Home = () => {
  const { loading: eventLoading, data: eventData } = useQuery(QUERY_EVENTS);
  const events = eventData?.events || [];

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <div>
      <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
        <div className="home-card">
          <div className="home-logo">
            <Link to="/">
              <h1 className="m-0">Chronos</h1>
            </Link>
          </div>
          <div className="home-sub">
            <h2>A Simple Calendar App</h2>
          </div>
          <div>
            {Auth.loggedIn() ? (
              <>
                <Link className="calendar-btn" to="/Calendar">
                  View Calendar
                </Link>
              </>
            ) : (
              <>
                <div className="home-login-signup">
                  <Link className="home-login-btn" to="/login">
                    Login
                  </Link>
                  <Link className="home-signup-btn" to="/signup">
                    Signup
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      {/* <main>
        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          >
            <EventForm />
            <EventList events={events} />
          </div>
        </div>
        <div className="flex-row justify-center">
          <div
            className="col-12 col-md-10 mb-3 p-3"
            style={{ border: "1px dotted #1a1a1a" }}
          ></div>
        </div>
      </main> */}
    </div>
  );
};

export default Home;
