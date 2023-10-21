import API, { toQueryString } from "./api";

export const authRoutes = {
  me: "v1/auth/me",
  logout: "v1/auth/logout",
  verifyApiKey: "v1/auth/verify-api-key",
  refreshToken: "v1/auth/refresh-tokens",
};

class AuthApi {
  async getMe() {
    try {
      const request = await API.get(authRoutes.me);
      return request;
    } catch (error) {}
  }

  async verifyApiKey(payload: { apiKey: string; email: string }) {
    try {
      const queryString = toQueryString(payload);
      const request = await API.get(
        `${authRoutes.verifyApiKey}?${queryString}`
      );
      return request.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
export default new AuthApi();
