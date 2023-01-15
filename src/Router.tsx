import { createBrowserRouter } from "react-router-dom";
import ErrorComp from "./components/ErrorComponent";
import Root from "./Root";
import About from "./Screen/About";
import Home from "./Screen/Home";
import NotFound from "./Screen/NotFound";
import Coin from "./Screen/routes/Coin";
import Coins from "./Screen/routes/Coins";
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
        path: "coins",
        element: <Coins />,
      },
      {
        path: "coins/:coinId",
        element: <Coin />,
      },
      {
        path: "users/:userId",
        element: <User />,
        children: [
          {
            path: "btc",
            element: <Followers />,
          },
        ],
      },
    ],
    errorElement: <NotFound />,
  },
]);

export default router;
