"use client";
import React, { useEffect, useState } from "react";
import PropertyDescription from "./property-description";
import UploadMedia from "./upload-media";
import LocationField from "./LocationField";
import DetailsFiled from "./details-field";
import Amenities from "./Amenities";
import { apiProperties } from "@/apis/Properties";
import { apiCatalog } from "@/apis/Catalog";

const EditPropertyTabContent = ({ edit_data, _id }) => {
  const [catalog, setCatalog] = useState({
    Amenities: [],
    Category: [],
    Location: [],
  });
  const [video, setVideo] = useState(null);
  const [selectedAmenities, setSelectedAmenities] = useState(
    edit_data?.Amenities || []
  );

  const [data, setData] = useState({
    Title: edit_data?.Title || "",
    Price: edit_data?.Price || "",
    Description: edit_data?.Description || "",
    Address: edit_data?.Address || "",
    Category: edit_data?.Type.Category || "",
    State: edit_data?.State || "",
    Location: edit_data?.Location || "",
    Amenities: selectedAmenities || [],
    images: edit_data?.Images || [],
    yearBuilt: edit_data?.Type.yearBuilt || null,
    bedroom: edit_data?.Type.bedroom || 1,
    bathroom: edit_data?.Type.bathroom || 1,
    garage: edit_data?.Type.garage || 0,
    sqft: edit_data?.Type.sqft || null,
  });

  useEffect(() => {
    console.log("Data property", edit_data);
  }, []);

  // useEffect(() => {
  //   setData((prevData) => ({
  //     ...prevData,
  //     Amenities: selectedAmenities,
  //   }));
  // }, [selectedAmenities]);

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
  <PropertyDescription
    data={data}
    setData={setData}
    dataCate={catalog.Category}
  />;

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

  useEffect(() => {
    console.log("Catogories", catalog.Category);
    console.log("Data", data);
  }, [catalog.Category]);

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
            className="nav-link fw600"
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
            className="nav-link fw600"
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
            className="nav-link fw600"
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
            className="nav-link fw600"
            id="nav-item4-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-item5"
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
          >
            5. Tiện ích
          </button>
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
              data={edit_data}
              dataCate={catalog.Category}
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
          <UploadMedia dataImage={edit_data} setData={setData} />
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
              dataLocat={edit_data}
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
            <DetailsFiled setData={setData} />
          </div>
        </div>
        {/* End tab for Listing Details */}

        <div
          className="w-100 tab-pane fade"
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
              />
            </div>
          </div>
          <div
            className="w-100 d-flex justify-content-end align-items-center"
            style={{ marginTop: "10px" }}
          >
            <div>
              <button
                className="ud-btn btn-dark ms-auto px-5"
                style={{ marginBottom: "10px", marginRight: "10px" }}
                type="button"
                role="tab"
                aria-controls="nav-item5"
                aria-selected="false"
                onClick={async () => {
                  console.log("Data", data);
                  const res = await apiProperties.updatePropertyAD(data, _id);
                  console.log(res);
                }}
              >
                Sửa bài
              </button>
              <button
                className="ud-btn btn-white px-5"
                style={{ marginBottom: "10px", marginRight: "10px" }}
                type="button"
                role="tab"
                aria-controls="nav-item5"
                aria-selected="false"
                onClick={
                  () => {
                    window.location.href = "/ADPost";
                  } // Chuyển hướng về trang dashboard
                }
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        {/* End tab for Select Amenities */}
      </div>
    </>
  );
};

export default EditPropertyTabContent;
