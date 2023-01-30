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

class TaskStore {
  currentUser = "";
  token = "";
  constructor() {
    makeObservable(this, {
      currentUser: observable,
      token: observable,
      login2: action.bound,
      logout: action.bound,
    });
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    autorun(() => {
      localStorage.setItem("user", JSON.stringify(this.currentUser));
      // localStorage.setItem("token", JSON.stringify(this.token));
      console.log("run each state change", this.currentUser);
    });
  }

  login2 = async (inputs) => {
    //login
    var options = {
      method: "POST",
      url: "https://stg.sso.fafu.com.vn/auth/realms/VIMC/protocol/openid-connect/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        client_id: "vimc",
        ...inputs,
        grant_type: "password",
        scope: "openid",
      }),
    };
    var responseLogin = await axios.request(options);
    var token = responseLogin.data.access_token;

    //get profile
    const responseGetProfile = await axios({
      method: "GET",
      url: `https://stg.vimc.fafu.com.vn/api/v1/users/current-user/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    this.currentUser = responseGetProfile.data.name_uppercase;

    //ok
    return this.currentUser;
  };

  login = async (inputs) => {
    let result = "";
    var options = {
      method: "POST",
      url: "https://stg.sso.fafu.com.vn/auth/realms/VIMC/protocol/openid-connect/token",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      data: new URLSearchParams({
        client_id: "vimc",
        ...inputs,
        grant_type: "password",
        scope: "openid",
      }),
    };

    await axios
      .request(options)
      .then(function (response) {
        // this.token = response.data.access_token;
        return response.data.access_token;
      })
      .then(async (tokens) => {
        const secondResponse = await axios({
          method: "GET",
          url: `https://stg.vimc.fafu.com.vn/api/v1/users/current-user/`,
          headers: {
            Authorization: `Bearer ${tokens}`,
          },
        });
        console.log("check res", secondResponse.status);
        this.currentUser = secondResponse.data.name_uppercase;
        result = secondResponse.status;
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
  };

  logout = async () => {
    this.currentUser = "";
  };
}

const taskStore = new TaskStore();

export default taskStore;
