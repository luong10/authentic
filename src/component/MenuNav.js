import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import useStore from "../store/useStore.js";

function MenuNav() {
  const [key, setKey] = useState("home");
  const handleClick = (e) => {
    setKey(e.key);
  };
  return (
    <>
      <Menu
        onClick={handleClick}
        selectedKeys={key}
        style={{
          width: 200,
          background: "rgb(248, 250, 250)",
        }}
      >
        <Menu.Item key="home">
          <Link to="/">Trang chủ</Link>
        </Menu.Item>
        <Menu.Item key="lich">
          <Link to="/lich-co-quan">Lịch cơ quan</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="">Thông báo chung</Link>
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
