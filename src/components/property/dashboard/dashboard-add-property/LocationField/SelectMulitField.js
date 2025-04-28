"use client";
import React from "react";
import Select from "react-select";

const countries = [{ value: "Việt Nam", label: "Việt Nam" }];
const cities = [
  { value: "An Giang", label: "An Giang" },
  { value: "Bắc Ninh", label: "Bắc Ninh" },
  { value: "Cà Mau", label: "Cà Mau" },
  { value: "Cần Thơ", label: "Cần Thơ" },
  { value: "Cao Bằng", label: "Cao Bằng" },
  { value: "Đà Nẵng", label: "Đà Nẵng" },
  { value: "Đắk Lắk", label: "Đắk Lắk" },
  { value: "Điện Biên", label: "Điện Biên" },
  { value: "Đồng Nai", label: "Đồng Nai" },
  { value: "Đồng Tháp", label: "Đồng Tháp" },
  { value: "Gia Lai", label: "Gia Lai" },
  { value: "Hà Nội", label: "Hà Nội" },
  { value: "Hà Tĩnh", label: "Hà Tĩnh" },
  { value: "Hải Phòng", label: "Hải Phòng" },
  { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
  { value: "Huế", label: "Huế" },
  { value: "Hưng Yên", label: "Hưng Yên" },
  { value: "Khánh Hòa", label: "Khánh Hòa" },
  { value: "Lai Châu", label: "Lai Châu" },
  { value: "Lâm Đồng", label: "Lâm Đồng" },
  { value: "Lạng Sơn", label: "Lạng Sơn" },
  { value: "Lào Cai", label: "Lào Cai" },
  { value: "Nghệ An", label: "Nghệ An" },
  { value: "Ninh Bình", label: "Ninh Bình" },
  { value: "Phú Thọ", label: "Phú Thọ" },
  { value: "Quảng Ngãi", label: "Quảng Ngãi" },
  { value: "Quảng Ninh", label: "Quảng Ninh" },
  { value: "Quảng Trị", label: "Quảng Trị" },
  { value: "Sơn La", label: "Sơn La" },
  { value: "Tây Ninh", label: "Tây Ninh" },
  { value: "Thái Nguyên", label: "Thái Nguyên" },
  { value: "Thanh Hóa", label: "Thanh Hóa" },
  { value: "Tuyên Quang", label: "Tuyên Quang" },
  { value: "Vĩnh Long", label: "Vĩnh Long" },
];

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

const SelectMultiField = () => {
  return (
    <>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Tỉnh/Thành phố
          </label>
          <div className="location-area">
            <Select
              name="colors"
              options={cities}
              styles={customStyles}
              maxMenuHeight={150}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>
      </div>
      <div className="col-sm-6 col-xl-4">
        <div className="mb20">
          <label className="heading-color ff-heading fw600 mb10">
            Quốc gia
          </label>
          <div className="location-area">
            <Select
              defaultValue={[countries[0]]}
              name="colors"
              options={countries}
              styles={customStyles}
              className="select-custom pl-0"
              classNamePrefix="select"
              required
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectMultiField;
