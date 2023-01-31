import { useEffect } from "react";
import { Breadcrumb, Table } from "antd";
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
  const { schedulesDetail, getSchedulesDetail } = useSchedules();

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
      value: format(parseISO(schedulesDetail.start_at), "dd-MM-yyyy"),
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
      value: "Không có tài liệu đính kèm",
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
      value: schedulesDetail.event_notice,
    },
    {
      name: "Chỉnh sửa lần cuối",
      value: schedulesDetail.event_notice,
    },
  ];
  useEffect(() => {
    getSchedulesDetail(code);
  }, []);

  console.log("check log:", schedulesDetail);
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
        // size="small"
        columns={columns}
      />
    </div>
  );
};

export default observer(ChiTietLich);
