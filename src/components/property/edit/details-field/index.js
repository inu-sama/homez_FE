import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({ setData, data, property }) => {
  return (
    <form className="form-style1">
      {property && (
        <div className="row">
          <div className="col-sm-6 col-xl-4">
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Diện tích (m²)
              </label>
              <input
                type="number"
                className="form-control"
                defaultValue={property.Type.sqft}
                placeholder="m²"
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    sqft: e.target.value,
                  }));
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
                defaultValue={property.Type.bedroom || 1}
                placeholder="Số phòng ngủ"
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    bedroom: Number(e.target.value),
                  }));
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
                defaultValue={property.Type.bathroom || 1}
                placeholder="Số phòng tắm"
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    bathroom: Number(e.target.value),
                  }));
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
                defaultValue={property.Type.garage || 0}
                placeholder="Số garage"
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    garage: Number(e.target.value),
                  }));
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
                defaultValue={property.Type.yearBuilt}
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    yearBuilt: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          {/* End .col-4 */}
        </div>
      )}
      {/* End .row */}
    </form>
  );
};

export default DetailsFiled;
