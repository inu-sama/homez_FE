"use client";
import Select from "react-select";
import React, { useEffect } from "react";

const PropertyDescription = ({ setData, dataCate, setFilled, data }) => {
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

  const docs = [
    { value: "Hợp đồng đặt cọc", label: "Hợp đồng đặt cọc" },
    { value: "Hợp đồng mua bán", label: "Hợp đồng mua bán" },
    { value: "Sổ hồng riêng", label: "Sổ hồng riêng" },
    { value: "Đang chờ sổ", label: "Đang chờ sổ" },
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
              placeholder="Nhập tiêu đề"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  Title: e.target.value,
                }));
                if (data.Title && data.Price && data.Description) {
                  setFilled([true, false, false, false, false]);
                }
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
                defaultValue={{
                  value: "680e0ec211994cc12cb9e5e6",
                  label: "Chung cư",
                }}
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
                defaultValue={listedIn[0]}
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
          {data.State === "Đăng bán" && (
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Giấy tờ pháp lý
              </label>
              <div className="location-area">
                <Select
                  placeholder="Chọn loại giấy tờ..."
                  name="colors"
                  options={docs}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      type_documents: e.value,
                    }));
                  }}
                />
              </div>
            </div>
          )}
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              {data.State === "Cho thuê"
                ? "Giá thuê (VND/tháng)"
                : "Giá bán (VND)"}
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập số tiền"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  Price: e.target.value,
                }));
                if (data.Title && data.Price && data.Description) {
                  setFilled([true, false, false, false, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb30">
            <label className="heading-color ff-heading fw600 mb10">
              Đặt cọc (VND)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập số tiền"
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  deposit_amount: e.target.value,
                }));
                if (data.Title && data.Price && data.Description) {
                  setFilled([true, false, false, false, false]);
                }
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
              placeholder="Nhập mô tả chi tiết căn hộ."
              defaultValue={""}
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  Description: e.target.value,
                }));
                if (data.Title && data.Price && data.Description) {
                  setFilled([true, false, false, false, false]);
                }
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
