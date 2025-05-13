"use client";
import Select from "react-select";
import React, { useEffect, useState } from "react";

const PropertyDescription = ({ setData, catalog, property, data }) => {
  const [floor, setFloor] = useState("");
  const [block, setBlock] = useState(null);
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
  const months = [
    { value: "1 tháng", label: "1 tháng" },
    { value: "2 tháng", label: "2 tháng" },
    { value: "3 tháng", label: "3 tháng" },
    { value: "4 tháng", label: "4 tháng" },
    { value: "5 tháng", label: "5 tháng" },
    { value: "6 tháng", label: "6 tháng" },
  ];

  const selectOptions = catalog.Category.map((item) => ({
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

  const address = `Tầng ${floor}${block ? ", tòa " + block : ""}`;

  const selectLocation = catalog.Location.map((item) => ({
    label: item.Name,
    value: item._id,
  }));

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
            <div className="mb20">
              <label className="heading-color ff-heading fw600 mb10">
                Khu vực
              </label>
              <div className="location-area">
                <Select
                  name="colors"
                  defaultValue={{ label: property.Location }}
                  placeholder="Chọn khu vực..."
                  options={selectLocation}
                  styles={customStyles}
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

          {data?.category == "Chung cư" ? (
            <>
              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Tầng
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    defaultValue={property.Address.split(", ")[0].replace("Tầng ", "")}
                    placeholder="Nhập số tầng"
                    onChange={(e) => {
                      setFloor(e.target.value);
                      setData((prev) => ({
                        ...prev,
                        Address: address,
                      }));
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
                    defaultValue={property.Address.split(", ")[1]}
                    placeholder="Nhập mã tòa nhà (nếu có)"
                    onChange={(e) => {
                      setBlock(e.target.value);
                      setData((prev) => ({
                        ...prev,
                        Address: address,
                      }));
                    }}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-sm-6 col-xl-4">
                <div className="mb30">
                  <label className="heading-color ff-heading fw600 mb10">
                    Tên đường
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={property.Address}
                    placeholder="Nhập tên đường"
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        Address: e.target.value,
                      }));
                    }}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4"></div>
            </>
          )}
          <div className="col-sm-6 col-xl-4"></div>

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
                defaultValue={property.Price}
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

          {data.State === "Cho thuê" ? (
            <div className="col-sm-6 col-xl-4">
              <div className="mb30">
                <label className="heading-color ff-heading fw600 mb10">
                  Đặt cọc
                </label>
                <Select
                  placeholder="Chọn số tháng..."
                  defaultValue={{label: property.deposit_amount} || months[1]}
                  name="colors"
                  options={months}
                  styles={customStyles}
                  className="select-custom pl-0"
                  classNamePrefix="select"
                  maxMenuHeight={180}
                  required
                  onChange={(e) => {
                    setData((prev) => ({
                      ...prev,
                      deposit_amount: e.value,
                    }));
                  }}
                />
              </div>
            </div>
          ) : (
            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Giấy tờ pháp lý
                </label>
                <div className="location-area">
                  <Select
                    placeholder="Chọn loại giấy tờ..."
                    defaultValue={{ label: property.type_documents }}
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
            </div>
          )}

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
