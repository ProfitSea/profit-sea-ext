import API, { toQueryString } from "./api";

const routes = {
  me: "v1/auth/me",
  verifyApiKey: "v1/auth/verify-api-key",
};

class AuthApi {
  async getMe() {
    try {
      const request = await API.get(routes.me);
      return request;
    } catch (error) {}
  }

  async verifyApiKey(payload: { apiKey: string; email: string }) {
    try {
      const queryString = toQueryString(payload);
      const request = await API.get(`${routes.verifyApiKey}?${queryString}`);
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new AuthApi();
