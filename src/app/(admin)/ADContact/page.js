"use client";
import React, { useState, useEffect } from "react";
import { apiContact } from "@/apis/contact";
import { apiAuthen } from "@/apis/authen";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";

export default function Contact() {
  const [data, setData] = useState([]);
  const [role, setRole] = useState("");

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const fetchContact = async () => {
    try {
      const response = await apiContact.getContact();
      if (response.status !== 200) {
        throw new Error("Failed to fetch contact data");
      }
      console.log("Contact data:", response.data);
      setData(response.data.contact);
    } catch (error) {
      console.error("Error fetching contact data:", error);
      window.location.href = "/";
    }
  };

  const checkRole = async () => {
    try {
      const token = getCookie("token");

      if (!token) {
        window.location.href = "/";
        return;
      }

      const res = await apiAuthen.getToken2(token);
      if (res.status === 200) {
        if (res.data.role !== "Admin") {
          window.location.href = "/";
        } else {
          setRole(res.data.role);
        }
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Không lấy được role:", err);
      window.location.href = "/";
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  useEffect(() => {
    if (role === "Admin") {
      fetchContact();
    }
  }, [role]);

  return (
    <div style={{ marginTop: "20px" }} className="container-fluid">
      <HeaderAD />
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
        <p className="fw-bolder h1" style={{ fontFamily: "inherit" }}>
          Danh sách liên hệ
        </p>
        <div>
          <table className="table table-hover">
            <thead className="table-light ">
              <tr className="align-middle">
                <th scope="col">Tên</th>
                <th scope="col">Email</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Nội dung</th>
                <th scope="col">Bài đăng</th>
                <th scope="col">Loại bài đăng</th>
                <th scope="col">Trạng thái</th>
                <th scope="col">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {Array.isArray(data) && data.length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="align-middle">
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>{item.message}</td>
                    <td>{item.post}</td>
                    <td>{item.typeofPost}</td>
                    <td>{item.status}</td>
                    {item.status === "Chưa liên hệ" ? (
                      <td>
                        <button
                          className="ud-btn btn-white"
                          onClick={async () => {
                            const response = await apiContact.deleteContact(
                              item._id
                            );
                            if (response.status === 201) {
                              window.location.reload();
                            }
                          }}
                        >
                          Đã liên hệ
                        </button>
                      </td>
                    ) : (
                      <td></td>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    Đang load dữ liệu...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
