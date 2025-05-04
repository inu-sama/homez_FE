"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import OverView from "@/components/property/property-single-style/common/OverView";
import EditPropertyTabContent from "@/components/common/componentsAD/dashboard-edit-property";
import { apiAuthen } from "@/apis/authen";
import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";

export default function ADPostEdit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  const params = useParams();
  const id = params?.id;

  const checkRole = async () => {
    try {
      const role = await apiAuthen.me();
      if (role.status === 201) {
        setRole(role.data.Role);
      }
      if (role.status === 202) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Không lấy được role:", err);
      setRole("");
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await apiProperties.getPropertiesAD();
        const filteredData = response.filter((item) => item._id === id);
        setData(filteredData[0]);
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError("Không thể tải dữ liệu bài đăng.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperties();
    }
  }, [id]);

  if (loading)
    return <div className="text-center mt-5">Đang tải dữ liệu...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;
  if (!data)
    return <div className="text-center mt-5">Không có dữ liệu hiển thị.</div>;

  return data ? (
    <div className="container-fluid" style={{ marginTop: "20px" }}>
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

      <div className="dashboard__main_AD">
        <div className="dashboard__content property-page bgc-f7">
          <div className="row align-items-center pb40">
            <div className="col-lg-12">
              <div className="dashboard_title_area">
                <h2>Sửa bài đăng</h2>
                <p className="text">Nhập đầy đủ thông tin căn hộ của bạn!</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                <div className="navtab-style1">
                  <EditPropertyTabContent edit_data={data} _id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div></div>
  );
}
