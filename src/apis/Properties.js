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

  async getPropertiesDetail(id) {
    try {
      const res = await instance.get(`/listings/${id}`);
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
