import axios from "axios";
import * as AUTH from "constants/AuthConstants";
import { camelCase } from "utils/TextUtils";
import userService from "services/userService";

var jwt = "";
var auth = JSON.parse(localStorage.getItem("authObject"));

if (auth && auth.token) {
  setJwt(auth.token);
}

function setJwt(jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

function setGov(govId) {
  if (govId) {
    axios.defaults.headers.common["x-govid"] = govId;
  } else {
    delete axios.defaults.headers.common["x-govid"];
  }
}

function createErrorResponse(err) {
  if (err.response.data.errors) {
    //has errors, format for form
    var errorArray = [];
    Object.keys(err.response.data.errors).forEach(function eachKey(key) {
      errorArray.push({
        field: camelCase(key),
        message: err.response.data.errors[key][0],
      });
    });
    return { errorFields: errorArray };
  }
  return { message: err.response.data };
}

axios.defaults.baseURL = process.env.REACT_APP_DEFAULT_API;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Authorization"] = jwt;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;

    if (err.response) {
      // Access Token was expired
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        try {
          var auth = JSON.parse(localStorage.getItem(AUTH.STORAGE_AUTH));

          const res = await userService.refreshToken(auth);

          if (!("data" in res)) {
            throw new Error("Unexpected Error");
          }

          if (!res.data.success) {
            throw new Error(res.data.message);
          }
          var authObject = res.data;

          localStorage.setItem(AUTH.STORAGE_AUTH, JSON.stringify(authObject));

          setJwt(authObject.token);
          originalConfig.headers["Authorization"] =
            "Bearer " + authObject.token;
          return axios(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }

          return Promise.reject(_error);
        }
      }

      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }

      //normalize response
      return Promise.reject(createErrorResponse(err));
    }

    return Promise.reject(err);
  }
);

const exportProps = {
  get: axios.get,
  all: axios.all,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
  setGov,
};

export default exportProps;
