import axios from "axios";

const getCookie = (name) => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
};

const instance = axios.create({
  baseURL: process.env.API_URL_PORT,
  headers: {
    "x-api-key": process.env.API_KEY,
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (config) => {
    const token = getCookie("token");
    if (token) {
      config.headers.Authorization = `bazen ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

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
      const response = await instance.get(`/blockAccount/${phoneNumber}`);

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
