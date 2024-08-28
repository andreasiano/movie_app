import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Details from '../views/Details';
import SearchPage from '../views/SearchPage';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';
import Explore from '../views/Explore';
import Watchlist from '../views/WatchList';
import Profile from '../views/Profile';

export const router = createBrowserRouter([
  {
    path: '*',
    element: <App />,
    children: [
      {
        path: 'browse',
        element: <Browse />
      },
      {
        path: 'profile', // Add the profile route
        element: <Profile />
      },
      {
        path: 'searchpage',
        element: <SearchPage />
      },
      {
        path: 'watchlist',
        element: <Watchlist />
      },
      {
        path: 'logout',
        element: <LogOut />
      },
      {
        path : ":explore",
        element : <Explore/>
    },
    {
        path : ":explore/:id",
        element : <Details/>
    },
      {
        path: '*',
        element: <Browse />
      }
    ]
  }
]);
