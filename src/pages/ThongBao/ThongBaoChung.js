import React, { useState, useEffect, useContext } from "react";
import { Button, Menu, Space, Popover } from "antd";
import { useNavigate, Link } from "react-router-dom";
import "antd/dist/antd.css";
import { Breadcrumb, Card, Col, Modal } from "antd";
import {
  HomeOutlined,
  AlignCenterOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { useNotice } from "../../store/useStore.js";
import { observer } from "mobx-react";
import { getHours, getMinutes, format, startOfWeek, endOfWeek } from "date-fns";
import moment from "moment";

function ThongBaoChung() {
  const { confirm } = Modal;
  const [id, setID] = useState();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const {
    notice,
    getNotice,
    getText,
    resetDetail,
    getNoticeDetail,
    delNotice,
  } = useNotice();

  const showDeleteConfirm = () => {
    setOpen(false);
    confirm({
      title: "Bạn có muốn xóa không?",
      icon: <ExclamationCircleOutlined />,
      okText: "Có",
      okType: "danger",
      cancelText: "Không",
      onOk() {
        try {
          const t = delNotice(id);
          if (t) navigate("/thong-bao-chung");
        } catch (error) {
          console.log(error);
        }
      },
      onCancel() {},
    });
  };
  const content = (
    <Space direction="vertical">
      <Link style={{ color: "#3068AD" }} to={`/chi-tiet-thong-bao/${id}`}>
        <EyeOutlined />
        &nbsp;&nbsp;Xem chi tiết
      </Link>
      <Link style={{ color: "#3068AD" }} to={`/sua-thong-bao/${id}`}>
        <EditOutlined />
        &nbsp;&nbsp;Sửa thông tin
      </Link>
      <Button
        type="text"
        style={{ color: "#FF4444", padding: 0, margin: 0 }}
        onClick={showDeleteConfirm}
      >
        <DeleteOutlined />
        Xóa
      </Button>
    </Space>
  );
  useEffect(() => {
    function handleScrollEvent() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        console.log("you're at the bottom of the page");
        // here add more items in the 'filteredData' state from the 'allData' state source.
        getNotice(0, 19);
      }
    }
    window.addEventListener("scroll", handleScrollEvent);

    return () => {
      window.removeEventListener("scroll", handleScrollEvent);
    };
  }, []);
  // console.log("check ID:", id);
  const handleAdd = () => {
    resetDetail();
    navigate("/dang-thong-bao");
  };

  return (
    <div className="home-head3">
      <div className="out-let">
        <Breadcrumb>
          <Breadcrumb.Item href="">
            <HomeOutlined />
          </Breadcrumb.Item>
          <Breadcrumb.Item href="">Thông báo chung</Breadcrumb.Item>
        </Breadcrumb>
        <div>
          <Space>
            <Button onClick={handleAdd} type="primary">
              Đăng thông báo
            </Button>
          </Space>
        </div>
      </div>
      <Card bordered={false} style={{ marginTop: 10, width: "100%" }}>
        {notice &&
          notice.map((post) => (
            <Card.Grid
              style={{
                width: "48%",
                boxShadow: "-1px 2px 2px rgba(0,0,0,0.3)",
                margin: 5,
              }}
              bordered="true"
            >
              <div className="out-let">
                <h1 style={{ fontSize: 18 }}>{post.subject}</h1>
                <Popover
                  placement="bottomLeft"
                  trigger="click"
                  content={content}
                >
                  <Button
                    type="text"
                    shape="circle"
                    onClick={() => {
                      setID(post.id);
                      getNoticeDetail(post.id);
                      // console.log("check e:", e);
                    }}
                    icon={<AlignCenterOutlined />}
                  />
                </Popover>
              </div>
              <p>{getText(post.content)}</p>
              <div className="notice">
                <p style={{ color: "grey", fontWeight: 500 }}>
                  Tài liệu đính kèm:&nbsp;&nbsp;
                </p>
                <div className="notice2">
                  {post.attachments
                    ? post.attachments.map((p) => (
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
            </Card.Grid>
          ))}
      </Card>
    </div>
  );
}

export default observer(ThongBaoChung);
