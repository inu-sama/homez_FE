import axios from "axios";
import instanceToken from "./instance";

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "x-api-key": process.env.API_KEY,
    "Content-Type": "application/json",
  },
});

class ApiAuthen {
  async getToken(token) {
    try {
      const res = await instance.post("/checkTokenAPI", { token });
      return res.data.decoded;
    } catch (error) {
      console.error(
        "Error getting token:",
        error.response?.data || error.message
      );
      throw new Error("Get token failed");
    }
  }
  async getToken2(token) {
    try {
      const res = await instance.post("/checkTokenAPI2", { token });
      return res;
    } catch (error) {
      console.error(
        "Error getting token:",
        error.response?.data || error.message
      );
      throw new Error("Get token failed");
    }
  }

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
      if (error.response && error.response.data) {
        // Trả lỗi có message từ server
        return {
          status: error.response.status,
          data: error.response.data,
        };
      } else {
        // Lỗi không xác định (mạng hoặc lỗi khác)
        return {
          status: 500,
          data: { message: "Lỗi không xác định. Vui lòng thử lại sau." },
        };
      }
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

  async updateUser(FirstName, LastName, PhoneNumber, Email) {
    try {
      const res = await instanceToken.put("/updateUser", {
        FirstName,
        LastName,
        PhoneNumber,
        Email,
      });
      return res;
    } catch (error) {
      console.error(
        "Error updating user:",
        error.response?.data || error.message
      );
      throw new Error("Update user failed");
    }
  }
}

export const apiAuthen = new ApiAuthen();
