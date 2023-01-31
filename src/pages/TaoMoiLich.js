import { useContext, useEffect, useState } from "react";
import {
  Breadcrumb,
  DatePicker,
  TimePicker,
  Button,
  Form,
  Input,
  Upload,
  TreeSelect,
} from "antd";
import {
  HomeOutlined,
  PlusCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useSchedules } from "../store/useStore.js";
import { observer } from "mobx-react";

const TaoMoiLich = () => {
  const [form] = Form.useForm();
  const { SHOW_PARENT } = TreeSelect;
  const { department, getDepartmentsUsers } = useSchedules();
  const treeData = [];
  const [value, setValue] = useState();

  const handleDepart = (newValue) => {
    setValue(newValue);
  };
  department.map((post) => {
    const treeDataUser = [];
    post.users.map((postUser) => {
      treeDataUser.push({
        title: postUser.name_uppercase,
        value: postUser.user_code,
        key: postUser.user_code,
      });
    });
    treeData.push({
      title: post.name,
      value: post.code,
      key: post.code,
      children: treeDataUser,
    });
  });

  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/lich-co-quan">Lịch cơ quan</Breadcrumb.Item>
          <Breadcrumb.Item>Tạo lịch cơ quan</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        className="ant-form"
        style={{ marginTop: 20 }}
        form={form}
        layout="vertical"
      >
        <div className="home-head">
          <Form.Item
            label="Ngày thực hiện"
            name="start_at"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <DatePicker
              style={{
                width: 300,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian bắt đầu"
            name="start_at1"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TimePicker
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Thời gian kết thúc">
            <TimePicker
              style={{
                width: 300,
              }}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Chủ trì"
          name="start_at2"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input placeholder="Chủ trì" />
        </Form.Item>
        <Form.Item
          label="Địa điểm"
          name="start_at3"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input placeholder="Địa điểm" />
        </Form.Item>
        <Form.Item label="Chuẩn bị" name="start_at4">
          <Input placeholder="Chuẩn bị" />
        </Form.Item>
        <Form.Item label="Nội dung sự kiện">
          <CKEditor
            editor={ClassicEditor}
            onChange={(event, editor) => {
              const data = editor.getData();
              console.log({ event, editor, data });
            }}
          />
        </Form.Item>
        <Form.Item label="Tài liệu đính kèm">
          <Upload name="logo" action="">
            <Button icon={<UploadOutlined />}>Chọn tài liệu đính kèm</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Thành viên tham gia" name="start_at5">
          <Input placeholder="--Thành viên tham gia--" />
        </Form.Item>
        <Form.Item label="Thông báo" name="start_at6">
          <TreeSelect
            treeData={treeData}
            value={value}
            onChange={handleDepart}
            treeCheckable={true}
            showCheckedStrategy={SHOW_PARENT}
            placeholder="Please select"
            style={{
              width: "100%",
            }}
          />
        </Form.Item>
        <Form.Item>
          <Button
            style={{
              float: "right",
            }}
            type="primary"
          >
            Tạo mới sự kiện
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default observer(TaoMoiLich);
