import { Button, Checkbox, Form, Input } from "antd";
import React, { useState, useContext } from "react";
// import { AuthContext } from "../context/userContext.js";
import { Link, useNavigate } from "react-router-dom";
import { CloseSquareOutlined } from "@ant-design/icons";
import { observer } from "mobx-react";
import useStore from "../store/useStore.js";
const Login = () => {
  const { login2, currentUser } = useStore();
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const onFinish = async (values) => {
    const t = await login2(values);
    // console.log("Failed:", t);

    if (t) navigate("/");
    else setError(true);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   // console.log(e.target);

  //   setChange({
  //     ...changeValue,
  //     [name]: value,
  //   });
  //   console.log(changeValue);
  // };

  return (
    <div className="login-body">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        {/* <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          {error && (
            <p
              style={{
                color: "red",
                marginTop: 0,
              }}
            >
              <CloseSquareOutlined />
              &nbsp;Something is wrong!!
            </p>
          )}
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Login;
