"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import OverView from "@/components/property/property-single-style/common/OverView";
import EditPropertyTabContent from "@/components/common/componentsAD/edit/index";
import { apiAuthen } from "@/apis/authen";
import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";

export default function ADPostEdit() {
  const [error, setError] = useState(null);
  const [role, setRole] = useState("");

  const params = useParams();
  const id = params?.id;

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const checkRole = async (token) => {
    try {
      if (!token) {
        setRole("");
        return;
      }

      const res = await apiAuthen.getToken2(token);

      if (res.status === 200) {
        setRole(res.data.role);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Không lấy được role:", err);
      setRole("");
    }
  };

  useEffect(() => {
    const token = getCookie("token");
    checkRole(token);
  }, []);

  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
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
                <h2 style={{ fontFamily: "inherit" }}>Sửa bài đăng</h2>
                <p className="text" style={{ fontFamily: "inherit" }}>
                  Nhập đầy đủ thông tin căn hộ của bạn!
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-xl-12">
              <div className="ps-widget bgc-white bdrs12 default-box-shadow2 pt30 mb30 overflow-hidden position-relative">
                <div className="navtab-style1">
                  <EditPropertyTabContent params={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
