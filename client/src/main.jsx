import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './index.css'

import App from './App.jsx'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleEvent from './pages/SingleEvent';
import Profile from './pages/Profile';
import Error from './pages/Error';
import MyCalendar from './pages/calender.jsx';
import AboutUs from './pages/AboutUs.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <Error />,
    children: [
      {
        index: true,
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/profiles/:profileId',
        element: <Profile />
      }, {
        path: '/events/:eventtId',
        element: <SingleEvent />
      },{
        path: '/calendar',
        element: <MyCalendar />
      },{
        path: '/aboutus',
        element: <AboutUs />
      }

    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
