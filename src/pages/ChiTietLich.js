import { useEffect } from "react";
import { Breadcrumb, Table, Button, Space, Popconfirm } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useSchedules } from "../store/useStore.js";
import {
  getHours,
  getMinutes,
  format,
  parseISO,
  startOfWeek,
  endOfWeek,
} from "date-fns";

const ChiTietLich = () => {
  const code = useLocation().pathname.slice(10);
  const navigate = useNavigate();

  const { schedulesDetail, getSchedulesDetail, delSchedule } = useSchedules();

  const getTime = (time) => {
    let t = getHours(new Date(time)) + "h" + getMinutes(new Date(time));
    return t;
  };
  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const columns = [
    {
      title: "Thông tin",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Mô tả chi tiết",
      dataIndex: "value",
      key: "value",
    },
  ];
  const dataSource = [
    {
      name: "Ngày thực hiện",
      value: schedulesDetail.start_at
        ? format(new Date(schedulesDetail.start_at.toString()), "dd-MM-yyyy")
        : "",
    },
    {
      name: "Thời gian bắt đầu",
      value: getTime(schedulesDetail.start_at),
    },
    {
      name: "Thời gian kết thúc",
      value: schedulesDetail.end_at
        ? getTime(schedulesDetail.end_at)
        : "không rõ",
    },
    {
      name: "Chủ trì",
      value: schedulesDetail.host,
    },
    {
      name: "Địa điểm",
      value: schedulesDetail.location,
    },
    {
      name: "Chuẩn bị",
      value: schedulesDetail.preparation || "không có chuẩn bị",
    },
    {
      name: "Nội dung sự kiện",
      value: getText(schedulesDetail.event_notice),
    },
    {
      name: "Tài liệu đính kèm",
      value: schedulesDetail.file_ids
        ? schedulesDetail.file_ids.map((p) => {
            return (
              <>
                <a>{p.file_title}</a>
                <br />
              </>
            );
          })
        : "Không có tài liệu đính kèm",
    },
    {
      name: "Thành viên tham gia",
      value: schedulesDetail.attenders || "không có thành viên tham gia",
    },
    {
      name: "Thông báo",
      value: "Không có người nhận thông báo",
    },
    {
      name: "Ngày tạo",
      value: schedulesDetail.assignees
        ? schedulesDetail.assignees.map((post) => {
            return post.name_uppercase;
          }) +
          " - " +
          format(
            new Date(schedulesDetail.created_at.toString()),
            "dd-MM-yyyy"
          ) +
          " " +
          getTime(schedulesDetail.created_at)
        : "",
    },
    {
      name: "Chỉnh sửa lần cuối",
      value: schedulesDetail.last_edit_by
        ? schedulesDetail.last_edit_by.name_uppercase +
          " - " +
          format(
            new Date(schedulesDetail.updated_at.toString()),
            "dd-MM-yyyy"
          ) +
          " " +
          getTime(schedulesDetail.updated_at)
        : "Chưa có thông tin",
    },
  ];
  useEffect(() => {
    getSchedulesDetail(code);
  }, []);

  console.log("check log:", schedulesDetail);

  const confirm = (e) => {
    const t = delSchedule(code);
    if (t) navigate("/lich-co-quan");
  };
  const cancel = (e) => {};

  const handleEdit = () => {
    navigate(`/chinh-sua/${code}`);
  };

  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/lich-co-quan">Lịch cơ quan</Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết sự kiện</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Table
        style={{ marginTop: 20 }}
        dataSource={dataSource}
        pagination={false}
        columns={columns}
      />
      <div
        className="home-head"
        style={{ marginTop: 20, marginBottom: 20, justifyContent: "right" }}
      >
        <Popconfirm
          title="Bạn có muốn xóa không?"
          onConfirm={confirm}
          onCancel={cancel}
          okText="Đồng ý"
          cancelText="Không"
        >
          <Button
            style={{
              backgroundColor: "#FFF2E8",
              marginRight: 20,
              border: "2px solid #FFBB96",
              color: "#D4380D",
            }}
          >
            Xóa
          </Button>
        </Popconfirm>
        <Button type="primary" htmlType="button" onClick={handleEdit}>
          Chỉnh sửa
        </Button>
      </div>
    </div>
  );
};

export default observer(ChiTietLich);
