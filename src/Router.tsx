import { createBrowserRouter } from "react-router-dom";
import ErrorComp from "./components/ErrorComponent";
import Root from "./Root";
import About from "./Screen/About";
import Home from "./Screen/Home";
import NotFound from "./Screen/NotFound";
import Followers from "./Screen/users/Followers";
import User from "./Screen/users/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
        errorElement: <ErrorComp />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "follow",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
