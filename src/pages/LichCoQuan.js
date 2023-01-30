import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Breadcrumb, DatePicker, Table } from "antd";
import { HomeOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { useSchedules } from "../store/useStore.js";
import { observer } from "mobx-react";
import { getHours, getMinutes, format, startOfWeek, endOfWeek } from "date-fns";

function LichCoQuan() {
  const { schedules, getSchedules } = useSchedules();
  const navigate = useNavigate();

  let sameKey;
  const columns = [
    {
      title: "Ngày tháng",
      dataIndex: "start_at",
      key: "start_at",
      render: (value, row, index) => {
        const obj = {
          children: <b>{value}</b>,
          props: {},
        };
        if (!(sameKey !== value)) {
          obj.props.rowSpan = 0;
          return obj;
        }
        const count = data.filter((item) => item.start_at === value).length;
        sameKey = value;
        obj.props.rowSpan = count;
        return obj;
      },
    },
    {
      title: "Nội dung công việc",
      dataIndex: "event_notice",
      key: "event_notice",
      render: (_, record) => (
        <>
          <p>
            {record.end_at ? (
              <b>
                {record.hour} đến {record.end_at}
              </b>
            ) : (
              <b>{record.hour}</b>
            )}
            <br />
            {getText(record.event_notice)}
          </p>
        </>
      ),
    },
    {
      title: "Tài liệu",
      dataIndex: "preparation",
      key: "preparation",
      render: (_, record) => (
        <>
          {record.preparation ? (
            <p>{record.preparation}</p>
          ) : (
            <i style={{ opacity: 0.5 }}>không có chuẩn bị</i>
          )}
        </>
      ),
    },
    {
      title: "Thành viên tham gia",
      dataIndex: "attenders",
      key: "attenders",
      render: (_, record) => (
        <>
          {record.attenders ? (
            <p>{record.attenders}</p>
          ) : (
            <i style={{ opacity: 0.5 }}>không có thành viên tham gia</i>
          )}
        </>
      ),
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Chủ trì",
      dataIndex: "host",
      key: "host",
    },
  ];

  const onChange = (date, dateString) => {
    const s = startOfWeek(new Date(date._d), { weekStartsOn: 1 });
    const e = endOfWeek(new Date(date._d), { weekStartsOn: 1 });
    const start = format(new Date(s), "yyyy-MM-dd");
    const end = format(new Date(e), "yyyy-MM-dd");

    getSchedules(start, end);
    // console.log("check time", start, end);
  };
  let data = [];

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };
  const getTime = (time) => {
    let t = getHours(new Date(time)) + "h" + getMinutes(new Date(time));
    return t;
  };

  schedules.map((post) => {
    data.push({
      key: post.schedule_code,
      start_at: format(new Date(post.start_at), "dd/MM"),
      hour: getTime(post.start_at),
      end_at: post.end_at ? getTime(post.end_at) : "",
      event_notice: post.event_notice,
      preparation: post.preparation,
      attenders: post.attenders,
      location: post.location,
      host: post.host,
    });
  });
  // console.log("check data", data);

  const handleAdd = () => {
    navigate("/tao-moi");
  };

  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="/lich-co-quan">Lịch cơ quan</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Space size={12}>
            <DatePicker onChange={onChange} picker="week" />
            <Button
              onClick={handleAdd}
              type="primary"
              icon={<PlusCircleOutlined />}
            >
              Tạo mới
            </Button>
          </Space>
        </div>
      </div>
      <Table dataSource={data} bordered pagination={false} columns={columns} />
    </div>
  );
}

export default observer(LichCoQuan);
