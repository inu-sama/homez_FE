import instance from "./instance";

class Catalog {
  // Lấy danh sách catalog
  async getAnimaties() {
    try {
      const res = await instance.get("/listing-amenities");
      return res.data.amenities;
    } catch (error) {
      console.error(
        "Error fetching catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể lấy danh sách catalog");
    }
  }

  async getCategory() {
    try {
      const res = await instance.get("/listing-category");
      return res.data.categories;
    } catch (error) {
      console.error(
        "Error fetching catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể lấy danh sách catalog");
    }
  }

  async getLocation() {
    try {
      const res = await instance.get("/listing-location");
      return res.data.locations;
    } catch (error) {
      console.error(
        "Error fetching catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể lấy danh sách catalog");
    }
  }

  //--------------- add catalgo
  async addAnimaties(Name) {
    try {
      const res = await instance.post("/add-amenities", { Name });
      return res;
    } catch (error) {
      console.error(
        "Error adding catalog:",
        error.response?.data || error.message
      );
    }
  }

  async addCategory(Name) {
    try {
      const res = await instance.post("/add-category", { Name });
      return res;
    } catch (error) {
      console.error(
        "Error adding catalog:",
        error.response?.data || error.message
      );
    }
  }

  async addLocation(Name) {
    try {
      const res = await instance.post("/add-location", { Name });
      return res;
    } catch (error) {
      console.error(
        "Error adding catalog:",
        error.response?.data || error.message
      );
    }
  }

  //--------------- update catalog
  async updateAnimaties(id, Name) {
    try {
      const res = await instance.put(`/update-amenities/${id}`, { Name });
      return res;
    } catch (error) {
      console.error(
        "Error updating catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể cập nhật catalog");
    }
  }

  async updateCategory(id, Name) {
    try {
      const res = await instance.put(`/update-category/${id}`, { Name });
      return res;
    } catch (error) {
      console.error(
        "Error updating catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể cập nhật catalog");
    }
  }

  async updateLocation(id, Name) {
    try {
      const res = await instance.put(`/update-location/${id}`, { Name });
      return res;
    } catch (error) {
      console.error(
        "Error updating catalog:",
        error.response?.data || error.message
      );
      throw new Error("Không thể cập nhật catalog");
    }
  }

  //--------------- delete catalog
  async deleteAnimaties(id) {
    try {
      const res = await instance.delete(`/delete-amenities/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error deleting catalog:",
        error.response?.data || error.message
      );
    }
  }

  async deleteCategory(id) {
    try {
      const res = await instance.delete(`/delete-category/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error deleting catalog:",
        error.response?.data || error.message
      );
    }
  }

  async deleteLocation(id) {
    try {
      const res = await instance.delete(`/delete-location/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error deleting catalog:",
        error.response?.data || error.message
      );
    }
  }
}
export const apiCatalog = new Catalog();
