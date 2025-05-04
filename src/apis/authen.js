import axios from "axios";

class ApiAuthen {
  async register(PhoneNumber, Email, FirstName, LastName, Password) {
    try {
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
    try {
      const res = await axios.get(`${process.env.API_URL_PORT}/me`, {
        withCredentials: true,
      });
      return res.data.Role;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  }
}

export const apiAuthen = new ApiAuthen();
