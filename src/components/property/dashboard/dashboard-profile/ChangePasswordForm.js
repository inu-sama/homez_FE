"use client";
import React, { useEffect, useState } from "react";
import { apiAuthen } from "@/apis/authen";

const ChangePasswordForm = () => {
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState({
    Password: "",
    NewPassword: "",
    ConfirmPassword: "",
  });

  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("token");
      if (!token) return (window.location.href = "/");

      try {
        const userToken = await apiAuthen.getToken(token);
        const user = await apiAuthen.getUserByPhoneNumber(
          userToken.PhoneNumber
        );
        setUser(user.user);
        setEditUser((prev) => ({
          ...prev,
          PhoneNumber: user.user.PhoneNumber,
          Email: user.user.Email,
          LastName: user.user.LastName,
          FirstName: user.user.FirstName,
        }));
      } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    if (editUser.NewPassword !== editUser.ConfirmPassword) {
      alert("Mật khẩu xác nhận không trùng khớp");
      return;
    }

    try {
      const res = await apiAuthen.updateUser(editUser);
      alert("Đổi mật khẩu thành công");
      window.location.reload();
    } catch (err) {
      alert("Đổi mật khẩu thất bại: " + err.message);
    }
  };

  const handleChange = (field, value) => {
    setEditUser((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <form className="form-style1" onSubmit={handleUpdateUser}>
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Mật khẩu cũ
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu cũ"
              required
              value={editUser.Password}
              onChange={(e) => handleChange("Password", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Mật khẩu mới
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập mật khẩu mới"
              required
              value={editUser.NewPassword}
              onChange={(e) => handleChange("NewPassword", e.target.value)}
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              className="form-control"
              placeholder="Nhập lại mật khẩu mới"
              required
              value={editUser.ConfirmPassword}
              onChange={(e) => handleChange("ConfirmPassword", e.target.value)}
            />
          </div>
        </div>

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Cập nhật mật khẩu
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
