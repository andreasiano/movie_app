import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Details from '../views/Details';
import Movies from '../views/Movies';
import TvShows from '../views/TvShows';
import SearchPage from '../views/SearchPage';
import Settings from '../views/Settings';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';

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
        path: 'movie',
        element: <Movies />
      },
      {
        path: 'tv',
        element: <TvShows />
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
        path: 'movie/:id',
        element: <Details />
      },
      {
        path: 'tv/:id',
        element: <Details />
      },
      {
        path: '*',
        element: <Browse />
      }
    ]
  }
]);
