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

class Schedules {
  schedules = [];
  department = [];
  schedulesDetail = {};
  constructor() {
    makeObservable(this, {
      schedules: observable,
      department: observable,
      schedulesDetail: observable,
      getSchedules: action.bound,
      getDepartmentsUsers: action.bound,
      getSchedulesDetail: action.bound,
    });

    autorun(() => {
      console.log("run each state change", this.schedules);
      this.getDepartmentsUsers();
    });
  }
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
}

const schedules = new Schedules();

export default schedules;
