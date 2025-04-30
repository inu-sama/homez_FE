"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/common/componentsAD/single-v10/PropertyGallery";
import OverView from "@/components/property/property-single-style/common/OverView";

import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";

export default function ADPostEdit() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const params = useParams();
  const id = params?.id;

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

  useEffect(() => {
    console.log("Data fetched:", data);
  }, [data]);

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

      <div className="ms-3 ms-md-5 ps-md-5 text-black text-center mt-4">
        <p className="fw-bolder h1">Sửa bài đăng</p>
      </div>

      <div className="slide-managemant-Post">
        <form className="form-style-AD" key={data._id}>
          <div>
            <p className="h3 text-center">Người đăng bài + SĐT</p>
          </div>

          <div className="row mb30">
            <PropertyGallery images={data?.Images || []} />
          </div>

          <div className="infor-property-AD">
            <p className="h2">{data.Title}</p>

            <div className="infor-view-AD">
              <div className="infor-view-AD-1">
                <div>
                  <span className="border-end text">{data.State}</span>
                  <span className="address-mobile-2 border-start">
                    {data.Address}
                  </span>
                </div>
              </div>
              <div>
                <span className="h1">{formatVND(data.Price)}</span>
              </div>
            </div>

            <div>
              <p className="h3 mt-3 mb-2">Thành phần cơ bản</p>
              <div className="row ms-3">
                <OverView type={data.Type} />
              </div>
            </div>

            <div>
              <p className="h3 mt-4 mb-2">Tiện ích</p>
              <div className="row g-3 ms-4">
                {Array.isArray(data.Amenities) && data.Amenities.length > 0 ? (
                  data.Amenities.map((amenity, index) => (
                    <div key={index} className="col-sm-4 col-6">
                      <span style={{ fontSize: "17px" }}>• {amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="ms-2">Không có tiện ích được liệt kê.</p>
                )}
              </div>
            </div>

            <div>
              <p className="h3 mt-4 mb-2">Mô tả</p>
              <p className="ms-3">{data.Description || "Không có mô tả."}</p>
            </div>

            <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-4">
              <button
                type="button"
                className="w-100 w-md-25 ud-btn btn-white"
                onClick={() => {
                  window.location.href = `/ADPostEdit/${data._id}`;
                }}
              >
                Chỉnh sửa
              </button>
              <button type="button" className="w-100 w-md-25 ud-btn btn-thm">
                Duyệt bài
              </button>
              <button type="button" className="w-100 w-md-25 ud-btn btn-white">
                Xoá Bài
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  ) : (
    <div>aaa</div>
  );
}
