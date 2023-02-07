import React, { useState, useEffect, useContext, useRef } from "react";
import { Button, Menu, Space, Popover, Form, Upload, Input } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { Breadcrumb, Card, Col, Row } from "antd";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  HomeOutlined,
  AlignCenterOutlined,
  EyeOutlined,
  EditOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useNotice } from "../../store/useStore.js";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useSchedules } from "../../store/useStore.js";
import { observer } from "mobx-react";
import { getHours, getMinutes, format, startOfWeek, endOfWeek } from "date-fns";
import moment from "moment";

function DangThongBao() {
  const [form] = Form.useForm();
  const formRef = useRef();
  const { noticeDetail, getNoticeDetail, editNotice } = useNotice();
  const { upLoad } = useSchedules();
  const navigate = useNavigate();
  const getUP = [];
  if (noticeDetail) {
    noticeDetail.attachments &&
      noticeDetail.attachments.map((p, index) => {
        getUP.push({
          uid: p.file_id,
          name: p.file_name,
          // type: p.file_type,
          // lastModified: new Date().getTime(),
          // status: "done",
        });
      });
  }
  const [file, setFile] = useState(noticeDetail ? getUP : []);
  const { id } = useParams();
  console.log("check t:", noticeDetail);
  const [ckedit, setCkedit] = useState(
    noticeDetail ? noticeDetail.content : ""
  );

  const upload = () => {
    const x = [];
    file.map((p) => {
      if (p.uid.indexOf("rc-upload") == -1) {
        x.push({ file_id: p.uid, file_name: p.name });
      } else {
        const formData = new FormData();
        formData.append("file", p);
        const y = upLoad(formData);
        x.push(y);
      }
    });
    return x;
  };

  const onFinish = async (values) => {
    const p = await Promise.all(upload());
    console.log("check fi:", p);
    const input = {
      subject: values.subject,
      content: ckedit,
      attachments: p,
    };
    console.log("check input:", input);
    if (noticeDetail) {
      editNotice(id, input);
      navigate("/thong-bao-chung");
    } else {
      // createSchedule(input);
      // form.resetFields();
      // setCkedit("");
      // setValue("");
    }
  };

  useEffect(() => {
    getNoticeDetail(id);
  }, []);

  // noticeDetail && setCkedit(noticeDetail.content);

  noticeDetail &&
    form.setFieldsValue({
      subject: noticeDetail.subject,
    });
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  console.log("check co change: ", file);
  console.log("check NT:", noticeDetail);
  const onFinishFailed = (errorInfo) => {};
  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">Thông báo chung</Breadcrumb.Item>
          <Breadcrumb.Item>
            {noticeDetail ? "Sửa thông báo" : "Đăng thông báo"}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div
        style={{
          width: "70%",
          marginTop: 20,
          marginLeft: "10%",
        }}
      >
        <Form
          className="ant-form"
          style={{ marginTop: 20 }}
          form={form}
          ref={formRef}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item
            label="Tiêu đề"
            name="subject"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <Input placeholder="Nhập tiêu đề" />
          </Form.Item>
          <Form.Item label="Nội dung" name="content">
            <CKEditor
              data={ckedit}
              editor={ClassicEditor}
              onChange={(event, editor) => {
                setCkedit(editor.getData());
                // console.log("check dataCK:", editor.getData());
                // setCkedit(data);
              }}
            />
          </Form.Item>
          <Form.Item label="Tài liệu đính kèm" name="upload">
            <Upload
              customRequest={dummyRequest}
              name="attachments"
              defaultFileList={getUP}
              onChange={({ file, fileList }) => {
                const t = [];
                console.log("check list:", file);
                fileList.map((p) => {
                  t.push(p?.originFileObj || p);
                });
                setFile(t);
              }}
            >
              <Button icon={<UploadOutlined />}>Chọn tài liệu đính kèm</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button
              style={{
                float: "right",
              }}
              type="primary"
              htmlType="submit"
            >
              {noticeDetail ? "Sửa thông báo" : "Đăng thông báo"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default observer(DangThongBao);
