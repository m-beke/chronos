
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <header className="bg-primary text-light mb-4 py-3 flex-row align-center">
      <div className="header-login">
        <div className="header-logo">
          <Link to="/">
            <h1 className="m-0">Chronos</h1>
          </Link>
        </div>
        <div className='nav-btn'>
          {Auth.loggedIn() ? (
            <>
              <h2 className="user-link">
                {/* Run the getProfile() method to get access to the unencrypted token value in order to retrieve the user's username  */}
                Hello, {Auth.getProfile().authenticatedPerson.username}!
              </h2>
              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <div className='login-signup'>
                <Link className="login-btn" to="/login">
                  Login
                </Link>
                <Link className="signup-btn" to="/signup">
                  Signup
                </Link>
              </div>

            </>
          )}
          <div className='about-btn'>
            <Link to="aboutus" className="nav-link">
              About Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
