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
import ThongBaoChung from "./pages/ThongBao/ThongBaoChung";
import ChiTietThongBao from "./pages/ThongBao/ChiTietThongBao";
import DangThongBao from "./pages/ThongBao/DangThongBao";

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
            <div className="notice2">
              <MenuNav />
              <div></div>
            </div>
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
        {
          path: "/chinh-sua/:code",
          element: <TaoMoiLich />,
        },
        {
          path: "/thong-bao-chung",
          element: <ThongBaoChung />,
        },
        {
          path: "/chi-tiet-thong-bao/:id",
          element: <ChiTietThongBao />,
        },
        {
          path: "/dang-thong-bao",
          element: <DangThongBao />,
        },
        {
          path: "/sua-thong-bao/:id",
          element: <DangThongBao />,
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
