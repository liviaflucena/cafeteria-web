import './App.css'

import { createBrowserRouter } from "react-router-dom";

import Layout from './templates/Layout';
import Home from './views/Home';
import NoPage from './views/NoPage';
import Login from './views/Login';
import CardapioYupFormik from './views/CardapioYupFormik';

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NoPage />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "cardapio",
        element: <CardapioYupFormik />,
      },
      {
        path: "login",
        element: <Login />,
      }
    ]
  }
]);
export default Router;