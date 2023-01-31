import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { useContext } from "react";
import useStore from "./store/useStore.js";
import { observer } from "mobx-react";
import Nav from "./component/Nav";
import MenuNav from "./component/MenuNav";
import LichCoQuan from "./pages/LichCoQuan";
import TaoMoiLich from "./pages/TaoMoiLich";
import ChiTietLich from "./pages/ChiTietLich";

import {
  Route,
  Routes,
  BrowserRouter as Router,
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
// import { AuthContext } from "./context/userContext.js";
function App() {
  const { currentUser } = useStore();
  console.log("check app", currentUser);
  // return <RouterProvider router={router} />;
  const Layout = () => {
    return (
      <>
        <div className="home-ttotal">
          <Nav />
          <div className="home-head">
            <MenuNav />
            <Outlet />
          </div>
        </div>
      </>
    );
  };
  const router = createBrowserRouter([
    {
      path: "/",
      element: currentUser ? <Layout /> : <Login />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/lich-co-quan",
          element: <LichCoQuan />,
        },
        {
          path: "/tao-moi",
          element: <TaoMoiLich />,
        },
        {
          path: "/chi-tiet/:code",
          element: <ChiTietLich />,
        },
      ],
    },
    {
      path: "/",
      element: <Login />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default observer(App);
