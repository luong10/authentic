import {
  makeObservable,
  observable,
  action,
  computed,
  when,
  reaction,
  autorun,
} from "mobx";
import axios from "axios";
import { getHours, getMinutes, format, startOfWeek, endOfWeek } from "date-fns";

class Notice {
  notice = [];
  noticeDetail = {};
  constructor() {
    makeObservable(this, {
      notice: observable,
      noticeDetail: observable,
      getNotice: action.bound,
      getText: action.bound,
      getNoticeDetail: action.bound,
      resetDetail: action.bound,
      delNotice: action.bound,
      editNotice: action.bound,
    });

    autorun(() => {
      console.log("run each state change", this.notice);
    });
  }

  resetDetail = () => {
    this.noticeDetail = "";
  };

  getNotice = async (page, size) => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      const res = await axios({
        method: "GET",
        url: `https://stg.vimc.fafu.com.vn/api/v1/news?page=${page}&size=${size}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.notice = res.data.data;
    } catch (error) {
      console.error(error);
    }
  };
  getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  getNoticeDetail = async (id) => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      const resGetDetail = await axios({
        method: "GET",
        url: `https://stg.vimc.fafu.com.vn/api/v1/news/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      this.noticeDetail = resGetDetail.data;
      // console.log("check log:", this.noticeDetail);
    } catch (error) {
      console.error(error);
    }
  };

  editNotice = async (id, inputs) => {
    let token = JSON.parse(localStorage.getItem("token"));
    var options = {
      method: "PATCH",
      url: `https://stg.vimc.fafu.com.vn/api/v1/news`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        id: id,
        ...inputs,
      },
    };
    var response = await axios.request(options);
    console.log("check UP", response);
  };

  delNotice = async (id) => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      const resDel = await axios({
        method: "DELETE",
        url: `https://stg.vimc.fafu.com.vn/api/v1/news/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return resDel.statusText;
      // console.log("check DEL", resDel);
    } catch (error) {
      console.error(error);
    }
  };
}

const notices = new Notice();

export default notices;
