"use client";
import React, { useState, useEffect, use } from "react";
import SelectMulitField from "./SelectMulitField";
import Select from "react-select";

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

const LocationField = ({ setData, data, dataLocation, property }) => {
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [city, setCity] = useState("Hồ Chí Minh");
  const addressFull = `${address}, ${ward}, ${city}`;
  const selectLocation = dataLocation?.map((item) => ({
    label: item.Name,
    value: item._id,
  }));
  return (
    <form className="form-style1">
      {property && (
        <div className="row mb100">
          <div className="col-sm-12">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Địa chỉ
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập địa chỉ"
                defaultValue={property.Address.split(", ")[0]}
                onChange={(e) => {
                  setAddress(e.target.value);
                  setData((prev) => ({
                    ...prev,
                    Address: addressFull,
                  }));
                }}
              />
            </div>
          </div>
          {/* End col-12 */}

          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Chung cư (nếu có)
              </label>
              <div className="location-area">
                <Select
                  name="colors"
                  options={selectLocation}
                  styles={customStyles}
                  maxMenuHeight={150}
                  className="select-custom pl-0"
                  defaultValue={{label: property.Location}}
                  classNamePrefix="select"
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      Location: e.label,
                    }));
                  }}
                />
              </div>
            </div>
          </div>
          <div className="col-8"></div>

          <SelectMulitField
            setData={setData}
            addressFull={addressFull}
            ward={setWard}
            city={setCity}
            property={property}
          />
        </div>
      )}
      {/* End .row */}
    </form>
  );
};

export default LocationField;
