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
  async (config) => {
    const apiToken = await chrome.storage.local.get(`${appName}_token`);
    if (apiToken)
      config.headers["Authorization"] = "bearer " + apiToken.profit_sea_token;
    // config.headers["Authorization"] = "bearer " + apiToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export function toQueryString(obj: any) {
  return Object.keys(obj)
    .filter((key) => obj[key] !== null && obj[key] !== undefined)
    .map((key) => encodeURIComponent(key) + "=" + encodeURIComponent(obj[key]))
    .join("&");
}

export default instance;
