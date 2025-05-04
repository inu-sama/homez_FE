import axios from "axios";

class ApiAuthen {
  async getToken(token) {
    try {
      // console.log("tokenAPI", token);
      const res = await axios.post(
        `${process.env.API_URL_PORT}/checktokenAPI`,
        { token },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log("res", res.data.decoded);
      return res.data.decoded;
    } catch (error) {
      console.error(
        "Error getting token:",
        error.response?.data || error.message
      );
      throw new Error("Get token failed");
    }
  }

  async register(PhoneNumber, Email, FirstName, LastName, Password) {    try {
      const res = await axios.post(
        `${process.env.API_URL_PORT}/register`,
        {
          PhoneNumber,
          Email,
          FirstName,
          LastName,
          Password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  }
  async login(PhoneNumber, Password) {
    try {
      const res = await axios.post(
        `${process.env.API_URL_PORT}/login`,
        {
          PhoneNumber,
          Password,
        },
        { withCredentials: true }
      );
      return res;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  }

  async me() {
    const res = await axios.get(`${process.env.API_URL_PORT}/me`, {
      withCredentials: true,
    });
    return res;
  }

  async logout() {
    try {
      const res = await axios.get(`${process.env.API_URL_PORT}/logout`, {
        withCredentials: true,
      });
      return res;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  }
}

export const apiAuthen = new ApiAuthen();
