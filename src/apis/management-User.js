import axios from "axios";

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY,
    Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJSb2xlIjoiQWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDU3NTA5MzEsImV4cCI6MTc0NTgzNzMzMX0.dXzFfRx5ddxSxU901YytfFzBUof7vJW_gpw3KKCWSHM`,
  },
});

class ApiUser {
  async getUserList() {
    try {
      const res = await instance.get("/listingUser");
      return res.data.user;
    } catch (error) {
      console.error(
        "Error blocking user:",
        error.response?.data || error.message
      );
      throw new Error("Không thể khoá user bằng số điện thoại");
    }
  }

  async resetOTP(phoneNumber) {
    const res = await instance.get(`/resetOTP/${phoneNumber}`);
    return res.status;
  }

  async BlockUser(phoneNumber) {
    try {
      const response = await axios.get(
        `${process.env.API_URL_PORT}/blockAccount/${phoneNumber}`,
        {
          headers: {
            "x-api-key": process.env.API_KEY,
            Authorization: `bazen eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJGaXJzdE5hbWUiOiJhZG1pbiIsIkxhc3ROYW1lIjoiYWRtaW4iLCJSb2xlIjoiQWRtaW4iLCJQaG9uZU51bWJlciI6IjA5MDA5MDA5MDAiLCJpYXQiOjE3NDU3NTA5MzEsImV4cCI6MTc0NTgzNzMzMX0.dXzFfRx5ddxSxU901YytfFzBUof7vJW_gpw3KKCWSHM`,
            Accept: "application/json",
          },
        }
      );
      if (response.status === 201) {
        alert("Block user successfully");
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error blocking user:",
        error.response?.data || error.message
      );
      throw new Error("Không thể khoá user bằng số điện thoại");
    }
  }

  async UpdateRole(phoneNumber, Password) {
    try {
      const res = await instance.put(`/updateRole`, {
        PhoneNumber: phoneNumber,
        Password,
      });
      if (res.status === 201) {
        alert("Cập nhật quyền thành công");
        window.location.reload();
      }
    } catch (error) {
      console.error(
        "Error updating role:",
        error.response?.data || error.message
      );
    }
  }
}
export const apiUser = new ApiUser();
