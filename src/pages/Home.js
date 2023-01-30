import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import useStore from "../store/useStore.js";
import MenuNav from "../component/MenuNav";

function Home() {
  return (
    <div
      style={{
        width: "80%",
        height: 500,
      }}
    >
      <p
        style={{
          color: "grey",
          paddingLeft: 20,
        }}
      >
        Chào mừng quay trở lại!
      </p>
    </div>
  );
}

export default Home;
