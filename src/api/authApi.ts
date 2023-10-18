import API from "./api";

const routes = {
  me: "v1/auth/me",
};

class AuthApi {
  async getMe() {
    try {
      const request = await API.get(routes.me);
      return request;
    } catch (error) {
    }
  }
}
export default new AuthApi();
