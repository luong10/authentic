import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContexProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState();

  const login = async (inputs) => {
    let result = [];
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
        setToken(response.data.access_token);
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
        setCurrentUser(secondResponse.data.name_uppercase);
        return result.push(secondResponse.data.name_uppercase);
      })
      .catch(function (error) {
        console.error(error);
      });
    return result;
  };

  const logout = async () => {
    setCurrentUser("");
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJRc3dtZVR0S0Z1V
// 1dDU1c2VlpmTWRUWDYzTUowMU9Ic1ItcHlZc2VKeE1BIn0.eyJleHAiOjE2
// NzI3NTcyMDUsImlhdCI6MTY3MjcyODQwNSwianRpIjoiNjg2MDA2ZDctMjMy
// MC00NzliLTg4MmUtZTBlN2JjZWMxMjI2IiwiaXNzIjoiaHR0cHM6Ly9zdGcu
// c3NvLmZhZnUuY29tLnZuL2F1dGgvcmVhbG1zL1ZJTUMiLCJhdWQiOiJhY2NvdW
// 50Iiwic3ViIjoiZjozMWQ0Nzc2Yy1jMzkzLTQ2NzMtOTUyMC0yYjMyNDkzOGVm
// Y2Y6MjkwIiwidHlwIjoiQmVhcmVyIiwiYXpwIjoidmltYyIsInNlc3Npb25fc3
// RhdGUiOiI3MTcxZDQyMi1mMzc0LTQ4ZjItOWMzNS00Y2U3ZTE5NzBmYWUiLCJh
// Y3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIiIsImh0dHA6Ly8xOTIuMTY4Lj
// AuMTEwOjMwMDAiLCJodHRwczovL3N0Zy52aW1jLmZhZnUuY29tLnZuIiwiKiIs
// Imh0dHA6Ly9sb2NhbGhvc3Q6MzkxMiIsImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC
// JdLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsib2ZmbGluZV9hY2Nlc3MiLCJ1b
// WFfYXV0aG9yaXphdGlvbiJdfSwicmVzb3VyY2VfYWNjZXNzIjp7ImFjY291bnQi
// Onsicm9sZXMiOlsibWFuYWdlLWFjY291bnQiLCJtYW5hZ2UtYWNjb3VudC1saW5
// rcyIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoib3BlbmlkIGNvbXBhbnlfY2
// 9kZSBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJwcmVmZX
// JyZWRfdXNlcm5hbWUiOiJraG9haGEifQ.V9mtyTDpimKErt6wd1GdaVRMLMmNznY
// 58-sGWQzScYP4QmugW8JuHNIZHdYn4WfKVwtJctlFWtt5NjS6ey1YDpX0pss_r6r9
// a1aW8CZ7KkjozC_Ph_6gQLSqGfbLaeXMxB3i2DWi8cyQEymU_cG-0yW4ckltVZEx
// uQqxNHUdM52CxNDCXbVXMp-c9j2Rc31c_EJp-zda5OjaDdINr9mG142ZTj3exu_Vf
// s0IvAuN9x13nG2c2_2ejkB3nVQatLe95Hf_1qF9KBCEz3cEJ1LPx--Art1vE2RJe5h
// 9zfj_6jyxIzyF7XsNByIUtsBkpK3UmgsQZ8rTHJeV1jaiieYtR2A
