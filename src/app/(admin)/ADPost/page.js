"use client";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/common/componentsAD/single-v10/PropertyGallery";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";
import OverView from "@/components/property/property-single-style/common/OverView";

export default function ManagementPost() {
  const [data, setData] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getPropertiesAD();
      setData(response);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <div
      style={{ height: "100vh", overflowY: "auto", marginTop: "20px" }}
      className="container-fluid"
    >
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
                  <p className="h3 text-center">Người đăng bài+SĐT</p>
                </div>
                <div className="row mb30">
                  <PropertyGallery images={item.Images} />
                </div>
                <div className="infor-property-AD">
                  <p className="h2">{item.Title}</p>
                  <div className="infor-view-AD">
                    <div className="infor-view-AD-1">
                      <div>
                        <p className="address-mobile">{item.Address}</p>
                        <span className="border-end text ">{item.State}</span>
                        <span className="address-mobile-2 border-start">
                          <span className="fa-solid fa-location-dot"></span>{" "}
                          {item.Address}
                        </span>
                      </div>
                      <div>
                        <span>Rộng: {item.Length}m</span>
                        <span>Dài: {item.Width}m</span>
                        <span>Số phòng: {item.NumberOfRooms}</span>
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
                    <button className="w-100 w-md-25 ud-btn btn-white">
                      Chỉnh sửa
                    </button>
                    <button className="w-100 w-md-25 ud-btn btn-thm">
                      Duyệt bài
                    </button>
                    <button className="w-100 w-md-25 ud-btn btn-white">
                      Xoá Bài
                    </button>
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
