import { createBrowserRouter } from "react-router-dom";
import ErrorComp from "./components/ErrorComponent";
import Root from "./Root";
import Home from "./Screen/Home";
import NotFound from "./Screen/NotFound";
import Chart from "./Screen/routes/Chart";
import Coin from "./Screen/routes/Coin";
import Coins from "./Screen/routes/Coins";
import Price from "./Screen/routes/Price";
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
        path: "coins",
        element: <Coins />,
      },
      {
        path: "coins/:coinId",
        element: <Coin />,
        children: [
          {
            path: "chart",
            element: <Chart />,
          },
          {
            path: "price",
            element: <Price />,
          },
        ],
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
