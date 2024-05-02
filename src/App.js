import {
  Route,
  BrowserRouter as Router,
  RouterProvider,
  Routes,
  createBrowserRouter,
} from "react-router-dom";
import "./App.css";
import { Dashboad } from "./page/Dashboad";
import { Layout } from "./layout/Layout";
import ShowData from "./components/Dashboard/ShowData";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Dashboad />,
      },
      {
        path: "/view",
        element: <ShowData />,
      },
      {
        path: "/settings",
        element: null,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
