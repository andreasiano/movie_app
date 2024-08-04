import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Details from '../views/Details';
import SearchPage from '../views/SearchPage';
import Settings from '../views/Settings';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';
import Explore from '../views/Explore';

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
        path: 'searchpage',
        element: <SearchPage />
      },
      {
        path: 'settings',
        element: <Settings />
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
