import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({ data }) => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Diện tích (m²)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="m²"
              required
              onChange={(e) => {
                data.sqft = e.target.value;
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số phòng ngủ
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={1}
              placeholder="Số phòng ngủ"
              required
              onChange={(e) => {
                data.bedroom = e.target.value;
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số phòng tắm
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={1}
              placeholder="Số phòng tắm"
              required
              onChange={(e) => {
                data.bathroom = e.target.value;
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số garage
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={0}
              placeholder="Số garage"
              required
              onChange={(e) => {
                data.garage = e.target.value;
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Năm xây dựng
            </label>
            <input
              type="number"
              max={new Date().getFullYear()}
              className="form-control"
              required
              onChange={(e) => {
                data.yearBuilt = e.target.value;
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}
      </div>
      {/* End .row */}
    </form>
  );
};

export default DetailsFiled;
