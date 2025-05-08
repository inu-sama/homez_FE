"use client";

import { useState } from "react";
import { apiAuthen } from "@/apis/authen";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      setMessage("Vui lòng nhập đầy đủ số điện thoại và mật khẩu.");
      return;
    }

    try {
      setLoading(true);

      const res = await apiAuthen.login(phone, password);

      // Handle known response codes
      if (res.status === 404) {
        setMessage("Tài khoản không tồn tại.");
        return;
      }

      if (res.status === 201 && res.data.token) {
        document.cookie = `token=${res.data.token}; path=/; max-age=86400; Secure; SameSite=Strict`;

        const resb = await apiAuthen.getToken2(res.data.token);
        setMessage("Đăng nhập thành công!");

        if (resb.status === 200) {
          window.location.href = "/AD";
        } else {
          window.location.href = "/";
        }
      } else {
        setMessage("Sai thông tin đăng nhập.");
      }
    } catch (err) {
      console.error(err);

      if (err.response?.status === 401) {
        setMessage("Token không hợp lệ hoặc đã hết hạn.");
      } else if (err.response?.status === 500) {
        setMessage("Lỗi máy chủ. Vui lòng thử lại sau.");
      } else {
        setMessage("Đã xảy ra lỗi. Vui lòng thử lại.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="form-style1" onSubmit={handleLogin}>
      {message && <div className="alert alert-info text-center">{message}</div>}

      <div className="mb25">
        <label className="form-label fw600 dark-color">Số điện thoại</label>
        <input
          type="tel"
          className="form-control"
          placeholder="0912345678"
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>

      <div className="mb25">
        <label className="form-label fw600 dark-color">Mật khẩu</label>
        <input
          type="password"
          className="form-control"
          placeholder="Nhập mật khẩu"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="d-grid mb20">
        <button className="ud-btn btn-thm" type="submit" disabled={loading}>
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          <i className="fal fa-arrow-right-long" />
        </button>
      </div>
    </form>
  );
};

export default SignIn;
