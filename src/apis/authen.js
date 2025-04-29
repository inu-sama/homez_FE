import axios from "axios";

class ApiAuthen {
  async register(PhoneNumber, Email, FirstName, LastName) {
    try {
      const res = await axios.post(
        `${process.env.API_URL_PORT}/register`,
        {
          PhoneNumber,
          Email,
          FirstName,
          LastName,
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
  async login(PhoneNumber) {
    try {
      const res = await axios.post(`${process.env.API_URL_PORT}/login`, {
        PhoneNumber,
      });
      return res;
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
      throw new Error("Login failed");
    }
  }
}

export const apiAuthen = new ApiAuthen();
