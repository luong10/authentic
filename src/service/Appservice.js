import axios from "./axios";

const loginUser = (client_id, username, password, grant_type, scope) => {
  return axios.post("/auth/realms/VIMC/protocol/openid-connect/token", {
    client_id,
    username,
    password,
    grant_type,
    scope,
  });
};

export { loginUser };
