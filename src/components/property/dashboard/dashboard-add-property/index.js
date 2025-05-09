"use client";
import React, { useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { apiProperties } from "@/apis/Properties";
import { apiCatalog } from "@/apis/Catalog";
import Link from "next/link";

const AddPropertyTabContent = () => {
  const [filled, setFilled] = useState([false, false, false, false, false]);
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  // useEffect(() => {
  //   const role = getCookie(“token”);
  //   if (!token) {
  //     window.location.href = "/";
  //   }
  // }, []);
  const [catalog, setCatalog] = useState({
    Amenities: [],
    Category: [],
    Location: [],
  });
  const [video, setVideo] = useState("");
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [data, setData] = useState({
    Title: null,
    Price: null,
    Description: null,
    Address: null,
    category: "Chung cư",
    State: "Cho thuê",
    Location: "",
    Amenities: selectedAmenities,
    images: [],
    yearBuilt: null,
    bedroom: 1,
    bathroom: 1,
    garage: 0,
    sqft: null,
    interior_condition: "Nội thất đầy đủ",
    deposit_amount: null,
    type_documents: null,
    Balcony_direction: null,
    Type_apartment: null,
    maindoor_direction: null,
  });

  useEffect(() => {
    setData((prevData) => ({
      ...prevData,
      Amenities: selectedAmenities,
    }));
  }, [selectedAmenities]);

  const handleAmenityChange = (amenityName, isChecked) => {
    setSelectedAmenities((prevState) => {
      if (isChecked) {
        return [...prevState, amenityName];
      } else {
        return prevState.filter((name) => name !== amenityName);
      }
    });
  };

  // Truyền cả `data` và `setData`
  // <PropertyDescription
  //   data={data}
  //   setData={setData}
  //   dataCate={catalog.Category}
  // />;

  const fetchCatalog = async () => {
    try {
      const response = await apiCatalog.getAnimaties();
      const responseCategory = await apiCatalog.getCategory();
      const responseLocation = await apiCatalog.getLocation();
      setCatalog({
        Amenities: response,
        Category: responseCategory,
        Location: responseLocation,
      });
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  };

  useEffect(() => {
    fetchCatalog();
  }, []);

  // useEffect(() => {
  //   console.log("Catogories", catalog.Category);
  //   console.log("Data", data);
  // }, [catalog.Category]);

  return (
    <>
      <nav>
        <div className="nav nav-tabs" id="nav-tab2" role="tablist">
          <button
            className="nav-link active fw600 ms-3"
            id="nav-item1-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item1"
            type="button"
            role="tab"
            aria-controls="nav-item1"
            aria-selected="true"
          >
            1. Mô tả
          </button>
          <button
            className={`nav-link fw600 ${filled[0] ? "" : "visually-hidden"}`}
            id="nav-item2-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item2"
            type="button"
            role="tab"
            aria-controls="nav-item2"
            aria-selected="false"
          >
            2. Hình ảnh
          </button>
          <button
            className={`nav-link fw600 ${filled[1] ? "" : "visually-hidden"}`}
            id="nav-item3-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item3"
            type="button"
            role="tab"
            aria-controls="nav-item3"
            aria-selected="false"
          >
            3. Vị trí
          </button>
          <button
            className={`nav-link fw600 ${filled[2] ? "" : "visually-hidden"}`}
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item4"
            type="button"
            role="tab"
            aria-controls="nav-item4"
            aria-selected="false"
          >
            4. Chi tiết
          </button>
          <button
            className={`nav-link fw600 ${
              filled[3] && data.State == "Cho thuê" ? "" : "visually-hidden"
            }`}
            id="nav-item5-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Tiện ích
          </button>
          {filled[3] && (
            <Link
              // href={"/my-properties"}
              className="btn btn-dark fw600 ms-auto px-5"
              style={{ marginBottom: "10px", marginRight: "10px" }}
              type="button"
              role="tab"
              disabled={filled[3] ? false : true}
              aria-controls="nav-item5"
              aria-selected="false"
              onClick={async () => {
                console.log("Data", data);
                const res = await apiProperties.createProperty(data);
                console.log(res);
              }}
            >
              Đăng bài
            </Link>
          )}
        </div>
      </nav>
      {/* End nav tabs */}

      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade show active"
          id="nav-item1"
          role="tabpanel"
          aria-labelledby="nav-item1-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Thông tin căn hộ</h4>
            <PropertyDescription
              setData={setData}
              dataCate={catalog.Category}
              setFilled={setFilled}
              data={data}
            />
          </div>
        </div>
        {/* End tab for Property Description */}

        <div
          className="tab-pane fade"
          id="nav-item2"
          role="tabpanel"
          aria-labelledby="nav-item2-tab"
        >
          <UploadMedia setData={setData} setFilled={setFilled} data={data} />
        </div>
        {/* End tab for Upload photos of your property */}

        <div
          className="tab-pane fade"
          id="nav-item3"
          role="tabpanel"
          aria-labelledby="nav-item3-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Vị trí căn hộ</h4>
            <LocationField
              setData={setData}
              dataLocation={catalog.Location}
              setFilled={setFilled}
              data={data}
            />
          </div>
        </div>
        {/* End tab for Listing Location */}

        <div
          className="tab-pane fade"
          id="nav-item4"
          role="tabpanel"
          aria-labelledby="nav-item4-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Chi tiết căn hộ</h4>
            <DetailsFiled setData={setData} setFilled={setFilled} data={data} />
          </div>
        </div>
        {/* End tab for Listing Details */}

        <div
          className="tab-pane fade"
          id="nav-item5"
          role="tabpanel"
          aria-labelledby="nav-item5-tab"
        >
          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Chọn tiện ích</h4>
            <div className="row">
              <Amenities
                amenitiesData={catalog.Amenities}
                selectedAmenities={selectedAmenities}
                onAmenityChange={handleAmenityChange}
                setFilled={setFilled}
                data={data}
              />
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}
      </div>
    </>
  );
};

export default AddPropertyTabContent;
