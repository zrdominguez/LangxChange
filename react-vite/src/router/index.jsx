import { createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import UserCollection from '../components/UserCollections/UserCollections';
import BookList from '../components/BookList';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path:"/users/:userId/:username/collections",
        element: <UserCollection />
      },
      {
        path:"/books/:lang",
        element: <BookList />
      },
    ],
  },
]);
