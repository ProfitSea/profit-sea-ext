import axios from "axios";
let baseDomain = "http://localhost:5000";

export const appName = "profit_sea";

export const customHeaders = {
  Accept: "application/json",
  "content-type": "application/json",
};

const instance = axios.create({
  baseURL: baseDomain,
  headers: customHeaders,
});

instance.defaults.timeout = 5000;

instance.interceptors.request.use(
  (config) => {
    if (!navigator.onLine) {
      debugger;
    }
    const apiToken = chrome.storage.sync.get(`${appName}_accessToken`);
    if (apiToken) config.headers["Authorization"] = "bearer " + apiToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const originalRequest = error?.config;
    debugger;
    return Promise.reject(error);
  }
);

export default instance;
