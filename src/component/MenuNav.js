import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import useStore from "../store/useStore.js";

function MenuNav() {
  const [key, setKey] = useState(
    // "home"
    JSON.parse(localStorage.getItem("navKey")) || "home"
  );
  const handleClick = (e) => {
    localStorage.setItem("navKey", JSON.stringify(e.key));
    setKey(e.key);
  };
  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={key}
        style={{
          width: 175,
          // borderRight: "0.5px solid rgb(224, 223, 223)",
          background: "rgb(248, 250, 250)",
          boxShadow: "-1px 2px 2px rgba(0,0,0,0.4)",
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="lich">
          <Link to="/lich-co-quan">Lịch cơ quan</Link>
        </Menu.Item>
        <Menu.Item key="thongbao">
          <Link to="/thong-bao-chung">Thông báo chung</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="">Nhóm người dùng</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="">Văn bản nội bộ</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="">Công việc</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="">Nhiệm vụ</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

export default MenuNav;
