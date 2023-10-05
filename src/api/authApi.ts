import API from "./api";

const routes = {
  me: "v1/auth/me",
};

class AuthApi {
  async getMe() {
    try {
      const request = await API.get(routes.me);
      debugger;
      return request;
    } catch (error) {
      debugger;
    }
  }
}
export default new AuthApi();
