import React from "react";
import SelectMulitField from "./SelectMulitField";
import Map from "./Map";

const LocationField = () => {
  return (
    <form className="form-style1">
      <div className="row mb30">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Địa chỉ
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập địa chỉ"
            />
          </div>
        </div>
        {/* End col-12 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Phường
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên phường"
            />
          </div>
        </div>

        <SelectMulitField />

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Thuộc (không bắt buộc)
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập tên chung cư (nếu có)"
            />
          </div>
        </div>

        <div className="col-sm-6 col-xl-4">
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
        </div>
        {/* End col-4 */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default LocationField;
