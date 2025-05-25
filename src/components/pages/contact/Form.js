"use client";
import React, { useState, useEffect } from "react";
import { apiContact } from "@/apis/contact";
import { useCooldown } from "@/hooks/useCooldown";

const Form = () => {
  const { cooldown, isCoolingDown, startCooldown } = useCooldown(
    "contact",
    60 * 5000
  );
  const [data, setData] = useState(null);
  const [sendContact, setSendContact] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const decodedToken = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;

      const res = await apiAuthen.getToken(token);
      setData(res);
      setSendContact((prev) => ({
        ...prev,
        phone: res.PhoneNumber,
        email: res.Email,
        name: `${res.FirstName} ${res.LastName}`,
      }));
    } catch (err) {
      console.error("Không lấy được thông tin token:", err);
    }
  };

  useEffect(() => {
    decodedToken();
  }, []);

  const handleSendContact = async () => {
    if (sendContact.phone.length !== 10) {
      alert("Số điện thoại phải đủ 10 số");
      return;
    }
    if (isCoolingDown) {
      return;
    }

    try {
      startCooldown(true);
      const res = await apiContact.sendContact(sendContact);
      if (res.status === 200) {
        alert("Gửi yêu cầu thành công");
      } else {
        alert("Gửi yêu cầu thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);

      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data ||
        error.message ||
        "Đã xảy ra lỗi khi gửi yêu cầu";

      if (statusCode === 402) {
        alert("Bạn đã gửi liên hệ trước đó");
      } else if (errorMessage === "Contact form submission failed") {
        alert("Đã gửi liên hệ trước đó, vui lòng đợi");
      } else {
        alert(errorMessage);
      }
    }
  };
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Họ & Tên
            </label>
            {data ? (
              <div className="readonly-box">
                <span>{sendContact.name}</span>
              </div>
            ) : (
              <input
                type="text"
                className="form-control"
                placeholder="Nhập họ tên của bạn"
                maxLength={30}
                required
                value={sendContact.name}
                onChange={(e) =>
                  setSendContact({ ...sendContact, name: e.target.value })
                }
              />
            )}
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-lg-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số điện thoại
            </label>
            {data ? (
              <div className="readonly-box">
                <span>{sendContact.phone}</span>
              </div>
            ) : (
              <input
                type="number"
                className="form-control"
                placeholder="Nhập sđt của bạn"
                required
                value={sendContact.phone}
                onChange={(e) =>
                  setSendContact({ ...sendContact, phone: e.target.value })
                }
              />
            )}
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            {data ? (
              <div className="readonly-box">
                <span>{sendContact.email}</span>
              </div>
            ) : (
              <input
                type="email"
                className="form-control"
                placeholder="Nhập email của bạn"
                required
                value={sendContact.email}
                onChange={(e) => {
                  let value = e.target.value;

                  if (value.includes("@") && !value.includes("@gmail.com")) {
                    const [name, domain] = value.split("@");

                    if (!domain || domain === "") {
                      value = `${name}@gmail.com`;
                    }
                  }

                  setSendContact({ ...sendContact, email: value });
                }}
              />
            )}
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              Nội dung
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder="Bạn cần chúng tôi hỗ trợ gì?"
              maxLength={500}
              required
              value={sendContact.message}
              onChange={(e) => {
                const input = e.target.value;
                if (input.length <= 200) {
                  setSendContact({ ...sendContact, message: input });
                }
              }}
            />
          </div>
        </div>
        {/* End .col-lg-12 */}

        <div className="col-md-12">
          <div className="d-grid">
            <button
              type="button"
              className="ud-btn btn-thm"
              onClick={handleSendContact}
            >
              {isCoolingDown
                ? `Đã gửi yêu cầu, vui lòng đợi ${Math.floor(
                    cooldown / 60 / 1000
                  )} phút ${(cooldown % 60) % 1000} giây nữa`
                : "Gửi yêu cầu"}
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default Form;
