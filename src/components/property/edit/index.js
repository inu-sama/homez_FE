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
  // useEffect(() => {
  //   const role = getCookie(“token”);
  //   if (!token) {
  //     window.location.href = "/";
  //   }
  // }, []);

  const [property, setProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getProperties();
      response.forEach((elm) => {
        if (elm._id == params.id) {
          console.log("elm", elm);
          setProperty(elm);
          setData({
            Title: elm.Title,
            Price: elm.Price,
            Description: elm.Description,
            Address: elm.Address,
            category: elm.Type.category,
            State: elm.State,
            Location: elm.Location,
            Amenities: elm.Amenities,
            images: elm.Images,
            yearBuilt: elm.Type.yearBuilt,
            bedroom: elm.Type.bedroom,
            bathroom: elm.Type.bathroom,
            garage: elm.Type.garage,
            sqft: elm.Type.sqft,
            interior_condition: elm.interior_condition,
            deposit_amount: elm.deposit_amount,
            type_documents: elm.type_documents,
            Balcony_direction: elm.Balcony_direction,
            Type_apartment: elm.Type_apartment,
            maindoor_direction: elm.maindoor_direction,
          });
        }
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
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
          <Link href={"/my-properties"}
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

          <UploadMedia
            setData={setData}
            data={data}
            property={property}
          />

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

          {data.category == "Chung cư" && (
            <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
              <h4 className="title fz17 mb30">Chọn tiện ích</h4>
              <div className="row">
                <Amenities
                  amenitiesData={catalog.Amenities}
                  selectedAmenities={selectedAmenities}
                  onAmenityChange={handleAmenityChange}
                  data={data}
                  property={property}
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
