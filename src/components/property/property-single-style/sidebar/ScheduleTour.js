import React, { useState, useEffect } from "react";
import { apiAuthen } from "@/apis/authen";
import { apiContact } from "@/apis/contact";
import { useCooldown } from "@/hooks/useCooldown";

const ScheduleTour = ({ property }) => {
  const { cooldown, isCoolingDown, startCooldown } = useCooldown(
    "send-contact",
    60 * 5000
  );
  const [role, setRole] = useState(null);
  const [data, setData] = useState(null);
  const [sendContact, setSendContact] = useState({
    name: "",
    phone: "",
    email: "",
    post: property._id,
    typeofPost: property.State,
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
  const getRole = async () => {
    try {
      const token = getCookie("token");
      if (!token) return;
      const res = await apiAuthen.getToken2(token);
      setRole(res.data.role);
    } catch (err) {
      console.error("Không lấy được thông tin token:", err);
    }
  };

  useEffect(() => {
    decodedToken();
    getRole();
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
    <div className="ps-navtab">
      <h4 className="form-title mb5">
        {role == "Admin" || role == "Staff"
          ? "Người đăng bài"
          : "Xem bất động sản trực tiếp"}
      </h4>
      <p className="text">
        {role == "Admin" || role == "Staff"
          ? ""
          : "Chúng tôi sẽ liên hệ lại ngay khi nhận yêu cầu từ bạn"}
      </p>
      {/* <ul className="nav nav-pills mb-3" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className="nav-link active mr15 mb5-lg"
            type="button"
            role="tab"
          >
            Tham quan trực tiếp
          </button>
        </li>
      </ul> */}

      <div className="tab-content">
        <div className="tab-pane fade show active" role="tabpanel">
          <form className="form-style1">
            <div className="row">
              {/* PHONE */}
              <div className="col-md-12 mb20">
                {data ? (
                  <div className="readonly-box">
                    <span>
                      {role === "Admin" || role === "Staff"
                        ? property.Account[0].PhoneNumber
                        : sendContact.phone}
                    </span>
                  </div>
                ) : (
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Số điện thoại"
                    required
                    value={sendContact.phone}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d{0,10}$/.test(value)) {
                        setSendContact((prev) => ({
                          ...prev,
                          phone: value,
                        }));
                      }
                    }}
                  />
                )}
              </div>

              {/* EMAIL */}
              <div className="col-lg-12 mb20">
                {data ? (
                  <div className="readonly-box">
                    <span>
                      {role === "Admin" || role === "Staff"
                        ? property.Account[0].Email
                        : sendContact.email}
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={sendContact.email}
                    onChange={(e) => {
                      let value = e.target.value;

                      if (value.endsWith("@")) {
                        value += "gmail.com";
                      }

                      setSendContact((prev) => ({
                        ...prev,
                        email: value,
                      }));
                    }}
                  />
                )}
              </div>

              {/* NAME */}
              <div className="col-lg-12 mb20">
                {data ? (
                  <div className="readonly-box">
                    <span>
                      {" "}
                      {role === "Admin" || role === "Staff"
                        ? property.Account[0].FirstName +
                          " " +
                          property.Account[0].LastName
                        : sendContact.name}
                    </span>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
                    maxLength={30}
                    required
                    value={sendContact.name}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[a-zA-Z\sÀ-ỹ]*$/.test(value)) {
                        setSendContact((prev) => ({
                          ...prev,
                          name: value,
                        }));
                      }
                    }}
                  />
                )}
              </div>

              {/* MESSAGE */}
              {/* <div className="col-md-12 mb10">
                <textarea
                  cols={30}
                  rows={4}
                  placeholder="Nhập nội dung"
                  value={sendContact.message}
                  onChange={(e) =>
                    setSendContact((prev) => ({
                      ...prev,
                      message: e.target.value,
                    }))
                  }
                />
              </div> */}

              {/* BUTTON */}
              <div
                className={`col-md-12${
                  role == "Admin" || role == "Staff" ? " visually-hidden" : ""
                }`}
              >
                <div className="d-grid">
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={handleSendContact}
                  >
                    {cooldown
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
        </div>
      </div>

      <style jsx>{`
        .readonly-box {
          border: 1px solid #ccc;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          background-color: #f9f9f9;
        }
      `}</style>
    </div>
  );
};

export default ScheduleTour;
