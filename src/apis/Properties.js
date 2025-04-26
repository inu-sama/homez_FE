import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "Content-Type": "application/json",
    Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJSb2xlIjoiQWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDU2NTc0OTgsImV4cCI6MTc0NTc0Mzg5OH0.wJBFFbbsFJelULYPqxe2NS-PCChKtvZGPvGaLRAiqZM`,
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
}

export const apiProperties = new Properties();
