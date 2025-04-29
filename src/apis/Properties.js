import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJSb2xlIjoiQWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDU5MDA4NDcsImV4cCI6MTc0NTk4NzI0N30.7p5u0Cntwvl_lO3dhd7SR6WKF7IvNH_Yd64sT91r_xM`,
  },
});

class Properties {
  async getPropertiesAD() {
    try {
      const res = await instance.get("/listings");
      return res.data.data;
    } catch (error) {
      console.error(
        "Error blocking user:",
        error.response?.data || error.message
      );
      throw new Error("Không thể khoá user bằng số điện thoại");
    }
  }
  async createProperty(data) {
    try {
      const res = await instance.post("/postWithImage", data);
      return res.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể tạo bài đăng");
    }
  }
}

export const apiProperties = new Properties();
