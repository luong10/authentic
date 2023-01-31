import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import useStore from "../store/useStore.js";
import { observer } from "mobx-react";

function Nav() {
  const { currentUser, logout } = useStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div className="home-head">
        <h1
          style={{
            color: "grey",
            paddingLeft: 20,
          }}
        >
          VIMC
        </h1>
        <div className="home-head2">
          <Space align="center">
            <p
              style={{
                paddingRight: 20,
                paddingTop: 20,
              }}
            >
              {currentUser ? currentUser : ""}
            </p>
            <Button onClick={handleLogout}>Log out</Button>
          </Space>
        </div>
      </div>
    </>
  );
}

export default observer(Nav);
