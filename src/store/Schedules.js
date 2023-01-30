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
  constructor() {
    makeObservable(this, {
      schedules: observable,
      getSchedules: action.bound,
    });

    autorun(() => {
      console.log("run each state change", this.schedules);
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
}

const schedules = new Schedules();

export default schedules;
