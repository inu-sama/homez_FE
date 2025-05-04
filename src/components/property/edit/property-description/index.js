"use client";
import Select from "react-select";
import React, { useEffect } from "react";

const PropertyDescription = ({ setData, dataCate, property, data }) => {
  // const categoryOptions = [
  //   { value: "Nhà ở", label: "Nhà ở" },
  //   { value: "Chung cư", label: "Chung cư" },
  //   { value: "Văn phòng", label: "Văn phòng" },
  //   { value: "Vila", label: "Vila" },
  // ];

  const listedIn = [
    { value: "Cho thuê", label: "Cho thuê" },
    { value: "Đăng bán", label: "Đăng bán" },
  ];

  const selectOptions = dataCate?.map((item) => ({
    label: item.Name,
    value: item._id,
  }));
  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <form className="form-style1">
      {property && (
        <div className="row">
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Tiêu đề
              </label>
              <input
                type="text"
                defaultValue={property?.Title}
                className="form-control"
                placeholder="Nhập tiêu đề"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    Title: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          {/* End .col-12 */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Loại căn hộ
              </label>
              <div className="location-area">
                <Select
                  defaultValue={
                    { label: property.Type.category } || {
                      value: "680e0ec211994cc12cb9e5e6",
                      label: "Chung cư",
                    }
                  }
                  name="colors"
                  options={selectOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      category: e.label,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Hình thức
              </label>
              <div className="location-area">
                <Select
                  defaultValue={{ label: property.State } || listedIn[0]}
                  name="colors"
                  options={listedIn}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      State: e.value,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb30">
              <label className="heading-color ff-heading fw600 mb10">
                Giá tiền
              </label>
              <input
                type="number"
                defaultValue={property?.Price}
                className="form-control"
                placeholder="VND"
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    Price: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          {/* End .col-6 */}

          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Mô tả
              </label>
              <textarea
                cols={30}
                rows={5}
                placeholder="Nhập mô tả chi tiết căn hộ."
                defaultValue={property?.Description}
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    Description: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          {/* End .col-6 */}
        </div>
      )}
    </form>
  );
};

export default PropertyDescription;
