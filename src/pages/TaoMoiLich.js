import { useContext } from "react";
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

export const TaoMoiLich = () => {
  const [form] = Form.useForm();
  const { SHOW_PARENT } = TreeSelect;
  const tProps = {
    // treeData,
    // value,
    // onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "Please select",
    style: {
      width: "100%",
    },
  };
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
            name="start_at"
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
          name="start_at"
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
          name="start_at"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input placeholder="Địa điểm" />
        </Form.Item>
        <Form.Item label="Chuẩn bị" name="start_at">
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
        <Form.Item label="Thành viên tham gia" name="start_at">
          <Input placeholder="--Thành viên tham gia--" />
        </Form.Item>
        <Form.Item label="Thông báo" name="start_at">
          <TreeSelect {...tProps} />
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
