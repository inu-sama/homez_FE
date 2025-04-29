import instance from "./instance";

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
