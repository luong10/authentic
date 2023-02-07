import { useContext, useEffect, useState, useRef } from "react";
import moment from "moment";
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
import { getHours, getMinutes, format, parseISO, endOfWeek } from "date-fns";
import { useLocation, useNavigate } from "react-router-dom";

const TaoMoiLich = () => {
  const [form] = Form.useForm();
  const formRef = useRef();
  const { SHOW_PARENT } = TreeSelect;
  const {
    department,
    createSchedule,
    schedulesDetail,
    editSchedule,
    upLoad,
    upfile,
  } = useSchedules();
  const treeData = [];
  const [value, setValue] = useState();
  const [fileID, setFileID] = useState([]);
  const getUP = [];
  if (schedulesDetail) {
    schedulesDetail?.file_ids.map((p, index) => {
      getUP.push({
        uid: p.file_id,
        name: p.file_title,
        // type: p.file_type,
        // lastModified: new Date().getTime(),
        // status: "done",
      });
    });
  }
  const [file, setFile] = useState(schedulesDetail ? getUP : []);
  const [ckedit, setCkedit] = useState(
    schedulesDetail ? schedulesDetail.event_notice : ""
  );
  const navigate = useNavigate();

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

  const getTime = (date, time) => {
    let t =
      format(date, "yyyy-MM-dd") + "T" + format(time, "HH:mm:ss") + "+07:00";
    return t;
  };

  console.log("check co change: ", file);
  const upload = () => {
    const x = [];
    file.map((p) => {
      if (p.uid.indexOf("rc-upload") == -1) {
        x.push(p.uid);
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
    // console.log("check fi:", p);
    let fileIDS = p.map((i) => {
      return i.file_id || i;
    });
    const input = {
      attenders: values.attenders,
      end_at: getTime(values.start_at._d, values.time_end._d),
      event_notice: ckedit,
      file_ids: fileIDS,
      host: values.host,
      location: values.location,
      preparation: values.preparation,
      start_at: getTime(values.start_at._d, values.time_start._d),
      title: "",
    };

    console.log("check input:", input);
    if (schedulesDetail) {
      editSchedule(schedulesDetail.schedule_code, input);
      navigate("/lich-co-quan");
    } else {
      createSchedule(input);
      form.resetFields();
      setCkedit("");
      setValue("");
    }
  };
  const onFinishFailed = (errorInfo) => {};

  schedulesDetail &&
    form.setFieldsValue({
      start_at: moment(schedulesDetail.start_at, "YYYY-MM-DD"),
      time_start: moment(
        moment(schedulesDetail.start_at).format("hh:mm"),
        "hh:mm"
      ),
      time_end: moment(moment(schedulesDetail.end_at).format("hh:mm"), "hh:mm"),
      host: schedulesDetail.host,
      location: schedulesDetail.location,
      preparation: schedulesDetail.preparation,
      attenders: schedulesDetail.attenders,
    });
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/lich-co-quan">Lịch cơ quan</Breadcrumb.Item>
          <Breadcrumb.Item>
            {schedulesDetail ? "Cập nhật lịch cơ quan" : "Tạo lịch cơ quan"}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Form
        className="ant-form"
        style={{ marginTop: 20 }}
        form={form}
        ref={formRef}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <div className="home-head">
          <Form.Item
            value
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
              format="YYYY-MM-DD"
              style={{
                width: 300,
              }}
            />
          </Form.Item>

          <Form.Item
            label="Thời gian bắt đầu"
            name="time_start"
            rules={[
              {
                required: true,
                message: "Please input!",
              },
            ]}
          >
            <TimePicker
              format="HH:mm"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
          <Form.Item label="Thời gian kết thúc" name="time_end">
            <TimePicker
              format="HH:mm"
              style={{
                width: 300,
              }}
            />
          </Form.Item>
        </div>
        <Form.Item
          label="Chủ trì"
          name="host"
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
          name="location"
          rules={[
            {
              required: true,
              message: "Please input!",
            },
          ]}
        >
          <Input placeholder="Địa điểm" />
        </Form.Item>
        <Form.Item label="Chuẩn bị" name="preparation">
          <Input placeholder="Chuẩn bị" />
        </Form.Item>
        <Form.Item label="Nội dung sự kiện" name="event_notice">
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
        <Form.Item
          label="Tài liệu đính kèm"
          name="upload"
          // getValueFromEvent={normFile}
        >
          <Upload
            customRequest={dummyRequest}
            onChange={({ file, fileList }) => {
              const t = [];
              console.log("check list:", file);
              fileList.map((p) => {
                t.push(p?.originFileObj || p);
              });
              setFile(t);
            }}
            name="file_ids"
            defaultFileList={getUP}
          >
            <Button icon={<UploadOutlined />}>Chọn tài liệu đính kèm</Button>
          </Upload>
        </Form.Item>
        <Form.Item label="Thành viên tham gia" name="attenders">
          <Input placeholder="--Thành viên tham gia--" />
        </Form.Item>
        <Form.Item label="Thông báo">
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
            htmlType="submit"
          >
            {schedulesDetail ? " Cập nhật sự kiện" : "Tạo mới sự kiện"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default observer(TaoMoiLich);
