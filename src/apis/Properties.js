import instance from "./instance";
import axios from "axios";

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
      // throw new Error("Không thể khoá user bằng số điện thoại");
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
      formData.append("interior_condition", data.interior_condition);
      formData.append("deposit_amount", data.deposit_amount);
      formData.append("type_documents", data.type_documents);
      formData.append("Balcony_direction", data.Balcony_direction);
      formData.append("Type_apartment", data.Type_apartment);
      formData.append("maindoor_direction", data.maindoor_direction);

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
  async updatePropertyAD(data, id) {
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
      formData.append("interior_condition", data.interior_condition);
      formData.append("deposit_amount", data.deposit_amount);
      formData.append("type_documents", data.type_documents);
      formData.append("Balcony_direction", data.Balcony_direction);
      formData.append("Type_apartment", data.Type_apartment);
      formData.append("maindoor_direction", data.maindoor_direction);
      data.Amenities.forEach((amenity) => {
        formData.append("Amenities", amenity);
      });
      data.images.forEach((base64, i) => {
        if (base64.startsWith("http://") || base64.startsWith("https://")) {
          formData.append("Images", base64);
        } else {
          const file = this.base64ToFile(base64, `image${i}.webp`);
          formData.append("images", file);
        }
      });
      const res = await instance.put(`/listings-updateAD/${id}`, formData, {
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
    }
  }
  async updateProperty(data, id) {
    try {
      const res = await instance.put(`/listings-update/${id}`, {
        Title: data.Title,
        Price: data.Price,
        Description: data.Description,
        Address: data.Address,
        bedroom: data.bedroom,
        bathroom: data.bathroom,
        yearBuilt: data.yearBuilt,
        garage: data.garage,
        sqft: data.sqft,
        category: data.category,
        State: data.State,
        Location: data.Location,
        Amenities: data.Amenities,
        interior_condition: data.interior_condition,
        deposit_amount: data.deposit_amount,
        type_documents: data.type_documents,
        Balcony_direction: data.Balcony_direction,
        Type_apartment: data.Type_apartment,
        maindoor_direction: data.maindoor_direction,
        Images: data.images,
      });

      return res.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
    }
  }

  async ApproveProperty(id) {
    try {
      const res = await instance.get(`/listings-state/${id}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      });
      return res;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể duyệt bài đăng");
    }
  }
  async DeleteProperty(id) {
    try {
      const res = await instance.delete(`/listings-delete/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể xoá bài đăng");
    }
  }

  async addHightlight(id) {
    try {
      const res = await instance.put(`/addHighlightTag/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
      throw new Error("Không thể duyệt bài đăng");
    }
  }

  async listingPortUser() {
    try {
      const res = await instance.get(`/listingPortUser`);
      return res.data.data;
    } catch (error) {
      console.error(
        "Error creating property:",
        error.response?.data || error.message
      );
    }
  }
}

export const apiProperties = new Properties();
