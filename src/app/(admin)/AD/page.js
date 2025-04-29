"use client";
import React, { useState, useEffect } from "react";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import Search from "@/components/common/componentsAD/Search";
import { apiUser } from "@/apis/management-User";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";

const Management = () => {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  // useEffect(() => {
  //   const role = getCookie("role");
  //   // console.log(role);
  //   if (role !== "Admin" || role !== "Staff") {
  //     window.location.href = "/";
  //   }
  // }, []);
  const fetchUserList = async () => {
    try {
      const response = await apiUser.getUserList();
      setData(response);
      setResult(response);
    } catch (error) {
      console.error("Error fetching user list:", error);
    }
  };

  useEffect(() => {
    fetchUserList();
  }, []);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = result.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(result.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlResetOTP = async (phoneNumber) => {
    try {
      const response = await apiUser.resetOTP(phoneNumber);
      if (response === 200) {
        alert("Reset OTP successfully");
      }
    } catch (error) {
      console.error("Error resetting OTP:", error);
    }
  };

  const handleBlockUser = async (phoneNumber) => {
    try {
      const response = await apiUser.BlockUser(phoneNumber);
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  const handleUpdateRole = async (phoneNumber) => {
    try {
      const response = await apiUser.UpdateRole(phoneNumber, password);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <div
      style={{ height: "100vh", overflowY: "auto", marginTop: "20px" }}
      className="container-fluid"
    >
      <HeaderAD />
      {show ? (
        <div className="form-input-password" onClick={() => setShow(false)}>
          <div className="col-9 col-xl-4" onClick={(e) => e.stopPropagation()}>
            <form className="form-style1">
              <div className="mb25">
                <div
                  className="d-flex justify-content-between"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                >
                  <label className="form-label h5 text-white fw600 ">
                    Password
                  </label>
                  <label
                    className="form-label h5 text-white fw600 "
                    style={{ cursor: "pointer" }}
                    onClick={() => setShow(false)}
                  >
                    Huỷ
                  </label>
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-control"
                  placeholder="Nhập password"
                  required
                />
              </div>

              <div className="d-grid mb20">
                <button
                  onClick={() => handleUpdateRole(PhoneNumber)}
                  className="ud-btn btn-thm"
                  type="button"
                >
                  Xác nhận <i className="fal fa-comment-sms" />
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <SidebarStickyBar />
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>
      <div
        className="ms-3 ms-md-5 ps-md-5 text-black text-center"
        style={{ marginTop: "20px" }}
      >
        <p className="fw-bolder h1">Quản lý người dùng</p>

        <div className="z-50">
          <Search data={data} result={setResult} />
        </div>

        <div className="row g-3">
          {currentUsers.map((item, index) => (
            <div className="col-12 col-md-6" key={index}>
              <div className="p-3 border list-user bg-light rounded-4 shadow-sm">
                <div className="row g-3">
                  <div className="col-12 col-sm-6 border-end">
                    <div className="d-flex justify-content-between">
                      <strong className="h5 style-word">SĐT:</strong>
                      <span className="h5 style-word-span">
                        {item.PhoneNumber}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 border-start">
                    <div
                      style={{ textAlign: "left" }}
                      className="d-flex justify-content-between"
                    >
                      <strong className="h5 style-word">Họ và Tên:</strong>
                      <span className="h5 style-word-span">
                        {item.FirstName}-{item.LastName}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 border-end">
                    <div className="d-flex justify-content-between">
                      <strong className="h5 style-word">Role:</strong>
                      <span
                        style={{
                          fontWeight: "bold",
                          color: item.Role === "Staff" ? "#DCB816" : "#1a1a1a",
                        }}
                        className="h5 style-word-span"
                      >
                        {item.Role}
                      </span>
                    </div>
                  </div>
                  <div className="col-12 col-sm-6 border-start">
                    <div className="d-flex justify-content-between">
                      <strong className="h5 style-word">State:</strong>
                      <span
                        className={`h5 style-word-span ${
                          item.Status === "Active"
                            ? "text-success"
                            : "text-danger"
                        }`}
                        style={{ fontWeight: "bold" }}
                      >
                        {item.Status}
                      </span>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-3">
                      <button
                        className="w-100 w-md-25 ud-btn btn-white"
                        onClick={() => handlResetOTP(item.PhoneNumber)}
                      >
                        Đặt lại OTP
                      </button>
                      <button
                        className="w-100 w-md-25 ud-btn btn-thm"
                        onClick={() => (
                          setShow(!show), setPhoneNumber(item.PhoneNumber)
                        )}
                      >
                        Cấp quyền
                      </button>
                      <button
                        className="w-100 w-md-25 ud-btn btn-white"
                        onClick={() => handleBlockUser(item.PhoneNumber)}
                      >
                        {item.Status === "Active"
                          ? "Khóa tài khoản"
                          : "Mở tài khoản"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {currentPage > 6 && (
          <div className="d-flex justify-content-center mt-4">
            <nav>
              <ul className="pagination">
                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>

                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    className={`page-item ${
                      currentPage === index + 1 ? "active" : ""
                    }`}
                    key={index}
                  >
                    <button
                      className="page-link"
                      onClick={() => paginate(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}

                <li className="page-item">
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
};

export default Management;
