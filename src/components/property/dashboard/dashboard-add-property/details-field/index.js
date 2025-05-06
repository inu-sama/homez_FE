import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";

const DetailsFiled = ({ setData, data, setFilled }) => {
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
                setData((prev) => ({
                  ...prev,
                  sqft: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
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
              defaultValue={1}
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
              defaultValue={0}
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
              Tình trạng nội thất
            </label>
            <input
              type="number"
              max={new Date().getFullYear()}
              className="form-control"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
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
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Giấy tờ pháp lý
            </label>
            <input
              type="number"
              max={new Date().getFullYear()}
              className="form-control"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số tầng
            </label>
            <input
              type="number"
              max={new Date().getFullYear()}
              className="form-control"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Hướng ban công
            </label>
            <input
              type="text"
              className="form-control"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
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
