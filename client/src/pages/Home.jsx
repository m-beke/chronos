import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import ThoughtList from '../components/ThoughtList';
import ThoughtForm from '../components/ThoughtForm';
import Auth from '../utils/auth';
import { QUERY_THOUGHTS } from '../utils/queries';
import '../styles/home.css'

const Home = () => {
  // const { loading, data } = useQuery(QUERY_THOUGHTS);
  // const thoughts = data?.thoughts || [];
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="home-login">
        <div className="home-logo">
          <Link to="/">
            <h1 className="m-0">Chronos</h1>
          </Link>
        </div>
        <div className='home-sub'>
          <h2>A Simple Calendar App</h2>
        </div>
        <div>
          {Auth.loggedIn() ? (
            <>
              <Link className="btn btn-lg btn-info m-2" to="/me">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                {Auth.getProfile().authenticatedPerson.username}'s profile
              </Link>
              <button className="btn btn-lg btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
            <div className='home-login-signup'>
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
  );
};

export default Home;
