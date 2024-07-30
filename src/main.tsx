// src/main.tsx
import ReactDOM from 'react-dom/client';
import './index.css'; // Import the Tailwind CSS file
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import store from '../src/redux/store/store';
import { router } from './routes/routes';
import axios from 'axios'

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common['Authorization'] = `Bearer ${import.meta.env.VITE_APP_ACCESS_TOKEN}`;


ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
.render(
  // It is a good practice to comment out the react.strictmode to avoid the data to be displayed twice when refreshing the page
  //<React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router}/>
      </Provider>
  //</React.StrictMode>,
);
