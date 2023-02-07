// TaskStore.js
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

class Schedules {
  schedules = [];
  department = [];
  schedulesDetail = {};
  upfile = [];
  constructor() {
    makeObservable(this, {
      schedules: observable,
      department: observable,
      schedulesDetail: observable,
      upfile: observable,
      getSchedules: action.bound,
      getDepartmentsUsers: action.bound,
      getSchedulesDetail: action.bound,
      createSchedule: action.bound,
      delSchedule: action.bound,
      resetDetail: action.bound,
      upLoad: action.bound,
      getFileID: action.bound,
    });

    autorun(() => {
      console.log("run each state change", this.schedules);
      this.getDepartmentsUsers();
    });
  }
  resetDetail = () => {
    this.schedulesDetail = "";
    this.upfile = [];
  };
  getFileID = () => {
    const ids = [];
    this.upfile.map((p) => {
      ids.push(p);
    });
    return ids;
  };
  getSchedules = async (start, end) => {
    try {
      this.schedules = [];
      const secondResponse = await axios({
        method: "GET",
        url: `https://stg.vimc.fafu.com.vn/api/v1/work-schedules?from_date=${start}&to_date=${end}`,
      });

      secondResponse.data.map((post) => {
        this.schedules.push({
          ...post,
        });
      });
    } catch (error) {
      console.error(error);
    }
  };

  getSchedulesDetail = async (code) => {
    try {
      const resGetDetail = await axios({
        method: "GET",
        url: `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${code}`,
      });
      this.schedulesDetail = resGetDetail.data;
      // console.log("check log:", secondResponse);
    } catch (error) {
      console.error(error);
    }
  };

  getDepartmentsUsers = async () => {
    let token = JSON.parse(localStorage.getItem("token"));
    const resGetDepart = await axios({
      method: "GET",
      url: `https://stg.vimc.fafu.com.vn/api/v1/departments/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.department = resGetDepart.data;
    // console.log("check DE", resGetDepart.data);
  };

  createSchedule = async (inputs) => {
    let token = JSON.parse(localStorage.getItem("token"));
    var options = {
      method: "POST",
      url: "https://stg.vimc.fafu.com.vn/api/v1/work-schedules",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...inputs,
        assign_person_update: { new_items: [], remove_items: [] },
      },
    };
    var responseLogin = await axios.request(options);
    console.log("check CRE", responseLogin);
  };

  delSchedule = async (code) => {
    try {
      let token = JSON.parse(localStorage.getItem("token"));
      const resDel = await axios({
        method: "DELETE",
        url: `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${code}`,
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

  editSchedule = async (code, inputs) => {
    let token = JSON.parse(localStorage.getItem("token"));
    var options = {
      method: "PUT",
      url: `https://stg.vimc.fafu.com.vn/api/v1/work-schedules/${code}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: {
        ...inputs,
        assign_person_update: { new_items: [], remove_items: [] },
      },
    };
    var response = await axios.request(options);
    console.log("check UP", response);
  };

  upLoad = async (formData) => {
    let token = JSON.parse(localStorage.getItem("token"));
    const resUp = await axios({
      method: "POST",
      url: `https://stg.vimc.fafu.com.vn/api/v1/upload`,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formData,
    });
    // console.log("check UpLoad:", resUp.data);
    this.upfile.push(resUp.data.file_id);
    return resUp.data;
  };
}

const schedules = new Schedules();

export default schedules;
