import axios from "axios";
import authApi, { authRoutes } from "./authApi";
import ChromeLocalStorage from "../utils/StorageFunctions/localStorage.function";
import { identifiers } from "../utils/enums/identifier.enum";

// const env: string = "dev";
const env: string = "prod";

export let baseDomain = "";
export let webApp = "";

if (env === "dev") {
  baseDomain = "http://localhost:5000";
  webApp = "http://localhost:5173";
} else if (env === "prod") {
  baseDomain = "https://dinedynamics.uc.r.appspot.com";
  webApp = "https://profit-sea.vercel.app";
}

export const appName = "profit_sea";
export const accessToken = "profit_sea_token";
export const refreshToken = "profit_sea_refresh_token";

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
    const apiToken = await ChromeLocalStorage.getAccessToken();
    if (apiToken)
      config.headers["Authorization"] = "bearer " + apiToken.profit_sea_token;
    // config.headers["Authorization"] = "bearer " + apiToken;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    debugger;
    // If it's a 401 and not the refresh token endpoint and the request hasn't been retried yet
    if (
      error.response.status === 401 &&
      originalRequest.url !== `${baseDomain}/${authRoutes.refreshToken}` &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // Mark the request as retried

      // Fetch stored refresh token
      const data = await new Promise((resolve) => {
        chrome.storage.local.get(`${appName}_refresh_token`, (result) => {
          resolve(result[`${appName}_refresh_token`]);
        });
      });
      if (!data) {
        return Promise.reject(error); // If no refresh token, reject
      }

      try {
        // Request new tokens with the refresh token
        const res = await axios.post(
          `${baseDomain}/${authRoutes.refreshToken}`,
          {
            refreshToken: data,
          }
        );

        if (res.status === 200) {
          let { access, refresh } = res.data;

          // Update tokens in storage
          ChromeLocalStorage.setAuthTokens({
            [identifiers.PROFITSEA_ACCESS_TOKEN]: access.token,
            [identifiers.PROFITSEA_REFRESH_TOKEN]: refresh.token,
          });
          // Update the token in Axios headers
          instance.defaults.headers["Authorization"] = "Bearer " + access.token;

          // Modify original request headers
          originalRequest.headers["Authorization"] = "Bearer " + access.token;
          // Re-send the original request
          return instance(originalRequest);
        } else {
          authApi.logout();
          return Promise.reject(error); // If any other status code, reject
        }
      } catch (err) {
        authApi.logout();
        return Promise.reject(err); // If any error occurred during the token refresh process, reject
      }
    }

    // For all other error responses
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
