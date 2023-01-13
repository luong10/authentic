import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
const { Header, Content, Sider } = Layout;

function TrangChu() {
  //   const [collapsed, setCollapsed] = useState(false);
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Header
        className="header"
        style={{
          height: "80px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="logo" style={{ width: "10%", marginTop: "5px" }}>
          <img src="https://stg.vimc.fafu.com.vn/assets/photos/portal_logo_white.png" />
        </div>
        <div>
          <p style={{ color: "white", margin: "0 auto" }}>Username</p>
        </div>
      </Header>
      <Layout>
        <Sider width={200} style={{ backgroundColor: "white" }}>
          <Menu
            defaultSelectedKeys={["1"]}
            mode="inline"
            style={{ backgroundColor: "transparent" }}
          >
            <Menu.Item key="1">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Trang chủ
              </NavLink>
            </Menu.Item>
            <Menu.Item key="2">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Lịch cơ quan
              </NavLink>
            </Menu.Item>
            <Menu.Item key="3">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Thông báo chung
              </NavLink>
            </Menu.Item>
            <Menu.Item key="4">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Danh bạ
              </NavLink>
            </Menu.Item>
            <Menu.Item key="5">
              <NavLink
                className="text-black nav-link focus:font-bold"
                to="/home"
              >
                Tài Khoản
              </NavLink>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default TrangChu;
