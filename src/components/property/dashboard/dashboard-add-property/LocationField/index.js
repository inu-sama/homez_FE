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

const LocationField = ({ setData, data, dataLocation, setFilled }) => {
  const [address, setAddress] = useState("");
  const [ward, setWard] = useState("");
  const [city, setCity] = useState("Hồ Chí Minh");
  const [room, setRoom] = useState("");
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState(null);
  const addressFull = `Phường ${ward}, ${city}`;
  const location = `Căn ${room}, tầng ${floor}${block && ", tòa " + block}`;
  const selectLocation = dataLocation?.map((item) => ({
    label: item.Name,
    value: item._id,
  }));
  return (
    <form className="form-style1">
      <div className="row mb100">
        {/* <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ"
              onChange={(e) => {
                setAddress(e.target.value);
                setData((prev) => ({
                  ...prev,
                  Address: addressFull,
                }));
                if (data.Address && data.Price && data.Description) {
                  setFilled([true, true, true, false, false]);
                }
              }}
            />
          </div>
        </div> */}

        <SelectMulitField
          setData={setData}
          addressFull={addressFull}
          ward={setWard}
          city={setCity}
          data={data}
        />

        {data?.category == "Chung cư" && (
          <>
            <div className="col-sm-6 col-xl-4">
              <div className="mb30">
                <label className="heading-color ff-heading fw600 mb10">
                  Tầng
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập số tầng"
                  onChange={(e) => {
                    setFloor(e.target.value);
                    setData((prev) => ({
                      ...prev,
                      Location: location,
                    }));
                    if (data.Address && data.Price && data.Description) {
                      setFilled([true, true, true, false, false]);
                    }
                  }}
                />
              </div>
            </div>
            <div className="col-sm-6 col-xl-4">
              <div className="mb30">
                <label className="heading-color ff-heading fw600 mb10">
                  Tòa/Block
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Nhập mã tòa nhà (nếu có)"
                  onChange={(e) => {
                    setBlock(e.target.value);
                    setData((prev) => ({
                      ...prev,
                      Location: location,
                    }));
                    if (data.Address && data.Price && data.Description) {
                      setFilled([true, true, true, false, false]);
                    }
                  }}
                />
              </div>
            </div>
          </>
        )}
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

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Thuộc (không bắt buộc)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên chung cư (nếu có)"
              onChange={(e) => {
                data.Location = e.target.value;
                console.log(data);
              }}
            />
          </div>
        </div> */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Zip (không bắt buộc)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập mã zip"
            />
          </div>
        </div> */}
        {/* End col-4 */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default LocationField;
