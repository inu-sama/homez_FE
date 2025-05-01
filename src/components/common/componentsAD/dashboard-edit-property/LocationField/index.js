"use client";
import React, { useState, useEffect, use } from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";

const LocationField = ({ setData, dataLocation, dataLocat }) => {
  return (
    <form className="form-style1" style={{ height: "350px" }}>
      <div className="row mb30">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              {location == "Other" ? "Địa chỉ" : "Địa chỉ chi tiết căn hộ"}
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={dataLocat.Address}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  Address: e.target.value,
                }));
              }}
            />
          </div>
        </div>
        {/* End col-12 */}

        <SelectMulitField
          setData={setData}
          DataLocation={dataLocation}
          Datalocat={dataLocat}
        />

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
