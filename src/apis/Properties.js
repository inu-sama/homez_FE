import instance from "./instance";

class Properties {
  async getProperties() {
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
  async getPropertiesAD() {
    try {
      const res = await instance.get("/getPropertyAD");
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

  base64ToFile(base64String, filename) {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  async createProperty(data) {
    try {
      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("Price", data.Price);
      formData.append("Description", data.Description);
      formData.append("Address", data.Address);
      formData.append("bedroom", data.bedroom);
      formData.append("bathroom", data.bathroom);
      formData.append("yearBuilt", data.yearBuilt);
      formData.append("garage", data.garage);
      formData.append("sqft", data.sqft);
      formData.append("category", data.category);
      formData.append("State", data.State);
      formData.append("Location", data.Location);
      formData.append("NumberOfRooms", data.bedroom + data.bathroom);

      if (data.video && data.video !== "null") {
        formData.append("video", data.video);
      }

      data.Amenities.forEach((amenity) => {
        formData.append("Amenities", amenity);
      });

      data.images.forEach((base64, i) => {
        const file = this.base64ToFile(base64, `image${i}.webp`);
        formData.append("images", file);
      });

      const res = await instance.post("/postWithImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể tạo bài đăng");
    }
  }
  async updateProperty(data, id) {
    try {
      const formData = new FormData();
      formData.append("Title", data.Title);
      formData.append("Price", data.Price);
      formData.append("Description", data.Description);
      formData.append("Address", data.Address);
      formData.append("bedroom", data.bedroom);
      formData.append("bathroom", data.bathroom);
      formData.append("yearBuilt", data.yearBuilt);
      formData.append("garage", data.garage);
      formData.append("sqft", data.sqft);
      formData.append("category", data.category);
      formData.append("State", data.State);
      formData.append("Location", data.Location);
      formData.append("NumberOfRooms", data.bedroom + data.bathroom);
      formData.append("Amenities", JSON.stringify(data.Amenities));

      data.images.forEach((base64, i) => {
        const file = this.base64ToFile(base64, `image${i}.webp`);
        formData.append("images", file);
      });

      const res = await instance.put(`/listings-update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return res.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể cập nhập bài đăng");
    }
  }
}

export const apiProperties = new Properties();
