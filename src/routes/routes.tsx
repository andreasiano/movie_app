import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Details from '../views/Details';
import SearchPage from '../views/SearchPage';
import LogOut from '../views/LogOut';
import Browse from '../views/Browse';
import Explore from '../views/Explore';
import Watchlist from '../views/WatchList';
import ProtectedRoute from '../routes/protectedRoute'; // Adjust the path as necessary

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
        element: (
          <ProtectedRoute>
            <SearchPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'logout',
        element: <LogOut />
      },
      {
        path: 'watchlist',
        element: (
          <ProtectedRoute>
            <Watchlist />
          </ProtectedRoute>
        )
      },
      {
        path: ":explore",
        element: (
          <ProtectedRoute>
            <Explore />
          </ProtectedRoute>
        )
      },
      {
        path: ":explore/:id",
        element: (
          <ProtectedRoute>
            <Details />
          </ProtectedRoute>
        )
      },
      {
        path: '*',
        element: <Browse />
      }
    ]
  }
]);

