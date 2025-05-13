import React, { useState, useEffect } from "react";
import { apiAuthen } from "@/apis/authen";
import { apiContact } from "@/apis/contact";

const ScheduleTour = ({ property }) => {
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

  useEffect(() => {
    decodedToken();
  }, []);

  const handleSendContact = async () => {
    if (sendContact.phone.length !== 10) {
      alert("Số điện thoại phải đủ 10 số");
      return;
    }

    try {
      const res = await apiContact.sendContact(sendContact);
      if (res.status === 200) {
        alert("Gửi yêu cầu thành công");
      } else {
        alert("Gửi yêu cầu thất bại");
      }
    } catch (error) {
      console.error("Lỗi khi gửi yêu cầu:", error);
      alert("Đã xảy ra lỗi khi gửi yêu cầu");
    }
  };

  return (
    <div className="ps-navtab">
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
                    <span>{sendContact.phone}</span>
                  </div>
                ) : (
                  <input
                    type="text"
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
                    <span>{sendContact.email}</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    required
                    value={sendContact.email}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (
                        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
                          value
                        )
                      ) {
                        setSendContact((prev) => ({
                          ...prev,
                          email: value,
                        }));
                      }
                    }}
                  />
                )}
              </div>

              {/* NAME */}
              <div className="col-lg-12 mb20">
                {data ? (
                  <div className="readonly-box">
                    <span>{sendContact.name}</span>
                  </div>
                ) : (
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Họ và tên"
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
              <div className="col-md-12 mb10">
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
              </div>

              {/* BUTTON */}
              <div className="col-md-12">
                <div className="d-grid">
                  <button
                    type="button"
                    className="ud-btn btn-thm"
                    onClick={handleSendContact}
                  >
                    Gửi yêu cầu
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
