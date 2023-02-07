import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space, Popover } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import "antd/dist/antd.css";
import { Breadcrumb, Card, Col, Row } from "antd";
import {
  HomeOutlined,
  AlignCenterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useNotice } from "../../store/useStore.js";
import { observer } from "mobx-react";
import { getHours, getMinutes, format, startOfWeek, endOfWeek } from "date-fns";
import moment from "moment";

function ChiTietThongBao() {
  const { getNoticeDetail, noticeDetail, getText } = useNotice();
  const { id } = useParams();
  // console.log("check IF:", noticeDetail);
  useEffect(() => {
    getNoticeDetail(id);
  }, []);
  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">Thông báo chung</Breadcrumb.Item>
          <Breadcrumb.Item>Chi tiết thông báo</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <Card
        style={{
          boxShadow: "-1px 2px 2px rgba(0,0,0,0.3)",
          marginTop: 20,
        }}
        bordered="true"
        title={noticeDetail.subject}
      >
        <p>{getText(noticeDetail.content)}</p>
        <div className="notice">
          <p style={{ color: "grey", fontWeight: 500 }}>
            Tài liệu đính kèm:&nbsp;&nbsp;
          </p>
          <div className="notice2">
            {noticeDetail.attachments
              ? noticeDetail.attachments.map((p) => (
                  <span style={{ marginLeft: 10 }}>
                    <p>
                      <a style={{ color: "#3068AD" }}>{p.file_name}</a>
                      &nbsp;&nbsp;
                      <EyeOutlined style={{ color: "green" }} />
                    </p>
                  </span>
                ))
              : "không có tài liệu đính kèm"}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default observer(ChiTietThongBao);
