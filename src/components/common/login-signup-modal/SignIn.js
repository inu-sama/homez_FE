"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { apiAuthen } from "@/apis/authen";

const SignIn = () => {
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState("");
  const [role, setRole] = useState("");

  const fullPhone = `+84${phone}`;
  auth.languageCode = "vi";

  useEffect(() => {
    console.log("Checking for reCAPTCHA setup");

    if (!auth) {
      console.error("Firebase auth is not properly initialized.");
      return;
    }

    if (!window.recaptchaVerifier) {
      console.log("Setting up reCAPTCHA", auth);

      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            console.log("reCAPTCHA verified", response);
          },
        }
      );

      window.recaptchaVerifier
        .render()
        .then(function () {
          console.log("reCAPTCHA đã được render.");
        })
        .catch((err) => {
          console.error("Lỗi khi render reCAPTCHA:", err);
        });
    }
  }, []);

  const validatePhoneNumber = (phone) => {
    const regex = /^\+84\d{9}$/;
    return regex.test(phone);
  };

  const sendOTP = async (e) => {
    e.preventDefault();
    try {
      if (!validatePhoneNumber(phone)) {
        setMessage("Số điện thoại không hợp lệ. Định dạng: +84xxxxxxxxx");
        return;
      }

      setLoading(true);
      setMessage("");
      const checkPhone = await apiAuthen.login(phone);

      if (checkPhone.status === 400) {
        setMessage("Số điện thoại chưa được đăng ký.");
        return;
      }

      if (checkPhone.status === 401) {
        setMessage("Số điện thoại đã bị khóa.");
        return;
      }

      if (checkPhone.status === 202) {
        setRole(checkPhone.data?.Role || "");
        document.cookie = `role=${checkPhone.data?.Role}; path=/; max-age=86400; Secure; SameSite=Strict`;
      }

      const receivedToken = checkPhone.data?.token;
      if (receivedToken) {
        setToken(receivedToken);
        document.cookie = `token=${receivedToken}; path=/; max-age=86400; Secure; SameSite=Strict`;
      }
      const appVerifier = window.recaptchaVerifier;
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phone,
        appVerifier
      );
      setConfirmation(confirmationResult);
      setMessage("Mã OTP đã được gửi.");
    } catch (err) {
      console.error(err);
      // setMessage("Lỗi gửi OTP: " + err.message);
      setMessage(
        "Lỗi gửi OTP: Cache cho trình duyệt của bạn đã hết hạn. Vui lòng thử lại."
      );
    }
    setLoading(false);
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage("Vui lòng nhập mã OTP.");
      return;
    }

    setLoading(true);
    try {
      await confirmation.confirm(otp);
      setMessage("Xác thực thành công!");
      setInfo(true);
    } catch (err) {
      console.error(err);
      setMessage("Sai mã OTP hoặc OTP đã hết hạn.");
    }
    setLoading(false);
  };

  const handleSubmitInfo = async (e) => {
    e.preventDefault();
    if (!email || !FirstName || !LastName) {
      setMessage("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    try {
      const response = await apiAuthen.register(
        phone,
        email,
        FirstName,
        LastName
      );
      console.log(response);
      if (response.status === 201) {
        setMessage("Đăng ký thành công!");
        if (role === "Admin" || role === "Staff") {
          setTimeout(() => {
            window.location.href = "/AD";
          }, 2000);
        } else {
          setTimeout(() => {
            window.location.href = "/";
          }, 2000);
        }
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return (
    <form
      className="form-style1"
      onSubmit={info ? handleSubmitInfo : undefined}
    >
      <div id="recaptcha-container"></div>

      {message && <div className="alert alert-info text-center">{message}</div>}

      {!info && (
        <div>
          <div className="mb25">
            <label className="form-label fw600 dark-color">Số điện thoại</label>
            <input
              type="tel"
              className="form-control"
              placeholder="+84"
              required
              value={phone}
              onChange={(e) => {
                const newValue = e.target.value;
                if (newValue.startsWith("+84")) {
                  setPhone(newValue);
                } else if (/^\d+$/.test(newValue.replace("+84", ""))) {
                  setPhone(`+84${newValue.replace(/^\+?84/, "")}`);
                }
              }}
              disabled={!!confirmation}
            />
          </div>

          {confirmation && (
            <div className="mb25">
              <label className="form-label fw600 dark-color">Mã OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập mã xác nhận"
                required
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
          )}
        </div>
      )}

      <div className="d-grid mb20">
        {!confirmation ? (
          <button
            onClick={sendOTP}
            className="ud-btn btn-thm"
            type="button"
            disabled={loading}
          >
            {loading ? "Đang gửi OTP..." : "Gửi OTP"}
            <i className="fal fa-comment-sms" />
          </button>
        ) : !info ? (
          <button
            onClick={verifyOTP}
            className="ud-btn btn-thm"
            type="button"
            disabled={loading}
          >
            {loading ? "Đang xác thực..." : "Xác nhận OTP"}{" "}
            <i className="fal fa-paintbrush" />
          </button>
        ) : (
          <button className="ud-btn btn-thm" type="submit" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Success"}{" "}
            <i className="fal fa-arrow-right-long" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SignIn;
