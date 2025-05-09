"use client";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";
import OverView from "@/components/property/property-single-style/common/OverView";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { apiAuthen } from "@/apis/authen";

export default function ManagementPost() {
  const [data, setData] = useState([]);
  const router = useRouter();
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const checkRole = async () => {
    try {
      const token = getCookie("token");

      if (!token) {
        console.warn("Không tìm thấy token trong cookie.");
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
    checkRole();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getPropertiesAD();
      setData(response);
    } catch (error) {
      window.location.href = "/";
      console.error("Error fetching properties:", error);
    }
  };

  const fetchListing = async () => {
    try {
      const response = await apiProperties.getProperties();
      setData(response);
    } catch (error) {
      window.location.href = "/";
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    if (open == false) {
      fetchProperties();
    } else {
      fetchListing();
    }
  }, []);

  const handleApprove = async (id) => {
    const response = await apiProperties.ApproveProperty(id);
    if (response.status === 201) {
      window.location.reload();
    }
  };
  const handleDelete = async (id) => {
    const response = await apiProperties.DeleteProperty(id);
    if (response.status === 201) {
      window.location.reload();
    }
  };
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
        <p className="fw-bolder h1">Quản lý bài đăng</p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div
            className="row"
            style={{
              width: "300px",
              border: "1px solid gray",
              padding: "1px",
              borderRadius: "10px",
            }}
          >
            <span
              className="col"
              style={{
                textAlign: "center",
                padding: "5px 30px",
                marginRight: "1px",
                borderTopLeftRadius: "9px",
                borderBottomLeftRadius: "9px",
                borderRight: "1px solid gray",
                backgroundColor: open ? "" : "#EB6753",
                cursor: "pointer",
                transition: "background-color 0.5s ease",
              }}
              onClick={() => {
                fetchProperties();
                setOpen(false);
              }}
            >
              Duyệt bài
            </span>
            <span
              className="col"
              style={{
                textAlign: "center",
                padding: "5px 30px",
                borderTopRightRadius: "9px",
                borderLeft: "1px solid black",
                borderBottomRightRadius: "9px",
                backgroundColor: open ? "#EB6753" : "",
                cursor: "pointer",
                transition: "background-color 0.5s ease",
              }}
              onClick={() => {
                fetchListing();
                setOpen(true);
              }}
            >
              Tất cả
            </span>
          </div>
        </div>
      </div>

      <div className="slide-managemant-Post">
        <Swiper
          className="slide-managemant-Post-swiper"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
        >
          {data.map((item) => (
            <SwiperSlide key={item._id}>
              <form className="form-style-AD" key={item._id}>
                <div>
                  <p className="h3 text-center">
                    {item.Account[0]?.FirstName}
                    {item.Account[0]?.PhoneNumber}
                  </p>
                </div>
                <div className="row mb30 mt30">
                  <PropertyGallery images={item.Images} />
                </div>
                <div className="infor-property-AD">
                  <p className="h2">{item.Title}</p>
                  <div className="infor-view-AD">
                    <div className="infor-view-AD-1">
                      <div>
                        <span className="border-end text ">{item.State}</span>
                        <span className="address-mobile-2 border-start">
                          {item.Address}
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="h1">{formatVND(item.Price)}</span>
                    </div>
                  </div>

                  <div>
                    <p
                      className="h3"
                      style={{ marginLeft: "5px", marginTop: "10px" }}
                    >
                      Thành phần cơ bản
                    </p>
                    <div className="row" style={{ marginLeft: "20px" }}>
                      <OverView type={item.Type} />
                    </div>
                  </div>
                  <div>
                    <p
                      className="h3"
                      style={{ marginLeft: "5px", marginTop: "10px" }}
                    >
                      Tiện ích
                    </p>
                    <div className="row g-3" style={{ marginLeft: "30px" }}>
                      {item.Amenities.map((amenity, index) => (
                        <div key={index} className="col-sm-4 col-6">
                          <span style={{ fontSize: "17px" }}>• {amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p
                      className="h3"
                      style={{ marginLeft: "5px", marginTop: "10px" }}
                    >
                      Mô tả
                    </p>
                    <p style={{ marginLeft: "20px" }}>{item.Description}</p>
                  </div>

                  <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-3">
                    {role === "Admin" && (
                      <Link
                        className="w-100 w-md-25 ud-btn btn-white"
                        href={`/ADPostEdit/${item._id}`}
                      >
                        Chỉnh sửa
                      </Link>
                    )}
                    {!open && (
                      <button
                        type="button"
                        className="w-100 w-md-25 ud-btn btn-thm"
                        onClick={() => handleApprove(item._id)}
                      >
                        Duyệt bài
                      </button>
                    )}
                    {role === "Admin" && (
                      <button
                        className="w-100 w-md-25 ud-btn btn-white"
                        onClick={() => handleDelete(item._id)}
                      >
                        Xoá Bài
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
