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

const EditPropertyTabContent = ({ params }) => {
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const [property, setProperty] = useState(null);

  const fetchProperty = async () => {
    const response = await apiProperties.getPropertiesDetail(params.id);
    console.log("Response", response);
    setProperty(response[0]);
    setSelectedAmenities(response[0]?.Amenities);
    setData({
      Title: response[0].Title,
      Price: response[0].Price,
      Description: response[0].Description,
      Address: response[0].Address,
      category: response[0].Type.category,
      State: response[0].State,
      Location: response[0].Location,
      Amenities: response[0].Amenities,
      images: response[0].Images,
      yearBuilt: response[0].Type.yearBuilt,
      bedroom: response[0].Type.bedroom,
      bathroom: response[0].Type.bathroom,
      garage: response[0].Type.garage,
      sqft: response[0].Type.sqft,
      interior_condition: response[0].interior_condition,
      deposit_amount: response[0].deposit_amount,
      type_documents: response[0].type_documents,
      Balcony_direction: response[0].Balcony_direction,
      Type_apartment: response[0].Type_apartment,
      maindoor_direction: response[0].maindoor_direction,
    });
  };

  useEffect(() => {
    fetchProperty();
  }, []);

  const [catalog, setCatalog] = useState({
    Amenities: [],
    Category: [],
    Location: [],
  });
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
          <Link
            href={"/my-properties"}
            className="btn btn-dark fw600 ms-auto px-5"
            style={{ marginBottom: "10px", marginRight: "10px" }}
            type="button"
            role="tab"
            aria-controls="nav-item5"
            aria-selected="false"
            onClick={async () => {
              console.log("Data", data);
              const res = await apiProperties.updateProperty(data, params.id);
              console.log(res);
            }}
          >
            Chỉnh sửa
          </Link>
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
              catalog={catalog}
              data={data}
              property={property}
            />
          </div>

          <UploadMedia setData={setData} data={data} property={property} />

          {/* <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Vị trí căn hộ</h4>
            <LocationField
              setData={setData}
              dataLocation={catalog.Location}
              data={data}
              property={property}
            />
          </div> */}

          <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
            <h4 className="title fz17 mb30">Chi tiết căn hộ</h4>
            <DetailsFiled setData={setData} data={data} property={property} />
          </div>

          {data.State == "Cho thuê" && (
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
          )}
        </div>
      </div>
    </>
  );
};

export default EditPropertyTabContent;
