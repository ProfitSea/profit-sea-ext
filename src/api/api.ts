import axios from "axios";
let baseDomain = "http://localhost:5000";

export const appName = "profit_sea";
const apiToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NTFjMmQxZTRjOTg5NjVmMzNlMzNkYjciLCJpYXQiOjE2OTY0ODkyNTEsImV4cCI6MTc1MDQ4OTI1MSwidHlwZSI6ImFjY2VzcyJ9.sxEkQWQev14azfM32iQVVbW63W9B5CzvFJyburuiBFU";

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
    // const apiToken = chrome.storage.sync.get(`${appName}_accessToken`);
    // if (apiToken) config.headers["Authorization"] = "bearer " + apiToken;
    config.headers["Authorization"] = "bearer " + apiToken;
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
    return Promise.reject(error);
  }
);

export function toQueryString(obj: any) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
}

export default instance;
