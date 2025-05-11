import axios from "axios";
import instance from "./instance";

class ApiContact {
  async sendContact(contactData) {
    try {
      const res = await axios.post(
        `${process.env.API_URL_PORT}/sendContact`,
        {
          name: contactData.name,
          email: contactData.email,
          phone: contactData.phone,
          message: contactData.message,
          post: contactData.post,
          typeofPost: contactData.typeofPost,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res;
    } catch (error) {
      console.error(
        "Error sending contact:",
        error.response?.data || error.message
      );
      throw new Error("Contact form submission failed");
    }
  }
  async getContact() {
    try {
      const res = await instance.get("/getContact");
      return res;
    } catch (error) {
      console.error(
        "Error fetching contact:",
        error.response?.data || error.message
      );
      throw new Error("Failed to fetch contact");
    }
  }

  async updateContact(id) {
    try {
      const res = await instance.put(`/updateContact/${id}`);
      return res;
    } catch (error) {
      console.error(
        "Error updating contact:",
        error.response?.data || error.message
      );
      throw new Error("Failed to update contact");
    }
  }
}

export const apiContact = new ApiContact();
