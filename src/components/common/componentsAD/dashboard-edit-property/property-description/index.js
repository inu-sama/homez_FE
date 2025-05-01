"use client";
import Select from "react-select";
import React, { useState, useEffect } from "react";
import formatVND from "@/components/common/formattingVND";

const PropertyDescription = ({ setData, data, dataCate }) => {
  // const categoryOptions = [
  //   { value: "Nhà ở", label: "Nhà ở" },
  //   { value: "Chung cư", label: "Chung cư" },
  //   { value: "Văn phòng", label: "Văn phòng" },
  //   { value: "Vila", label: "Vila" },
  // ];

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

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
      <div className="row">
        <div className="col-sm-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Tiêu đề
            </label>
            <input
              type="text"
              className="form-control"
              placeholder={data.Title}
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
              {!show ? (
                <p
                  style={{
                    border: "1px solid #DDDDDD",
                    borderRadius: "5px",
                    padding: "12px",
                    marginTop: "1px",
                  }}
                  onClick={() => setShow(true)}
                >
                  {data.Type.category}
                </p>
              ) : (
                <Select
                  defaultValue={data.Category}
                  name="colors"
                  options={selectOptions}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      Category: e.label,
                    }));
                  }}
                />
              )}
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
                defaultValue={listedIn.find(
                  (item) => item.value === data.State
                )}
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
              className="form-control"
              placeholder={formatVND(data.Price)}
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
            <label className="heading-color ff-heading fw600 mb10">Mô tả</label>
            <textarea
              cols={30}
              rows={5}
              placeholder={data.Description}
              defaultValue={""}
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
    </form>
  );
};

export default PropertyDescription;
