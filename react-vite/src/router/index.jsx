import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import UserCollection from '../components/UserCollections/UserCollections';

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
        path: "signup",
        element: <SignupFormPage />,
      },
    ],
  },
]);
