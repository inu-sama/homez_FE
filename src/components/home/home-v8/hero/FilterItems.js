"use client";
import Select from "react-select";
import Slider, { Range } from "rc-slider";
import { useState } from "react";

const FilterItems = () => {
  const [price, setPrice] = useState([0, 200000000]);

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);
  };

  // const catOptions = [
  //   { value: "Apartments", label: "Apartments" },
  //   { value: "Bungalow", label: "Bungalow" },
  //   { value: "Houses", label: "Houses" },
  //   { value: "Loft", label: "Loft" },
  //   { value: "Office", label: "Office" },
  //   { value: "Townhome", label: "Townhome" },
  //   { value: "Villa", label: "Villa" },
  // ];
  const locationOptions = [
    { value: "California", label: "California" },
    { value: "Chicago", label: "Chicago" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "Manhattan", label: "Manhattan" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];
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

  return (
    <>
      <div className="col-md-12">
        <div className="bootselect-multiselect mb15">
          <Select
            defaultValue={[cities[14]]}
            name="colors"
            options={cities}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            required
            isSearchable={false}
          />
        </div>
      </div>

      <div className="col-md-12">
        <div className="dropdown-lists at-home8 mb20">
          <div
            className="btn open-btn drop_btn3 text-start dropdown-toggle"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
          >
            Price <i className="fas fa-caret-down float-end fz11" />
          </div>
          <div className="dropdown-menu">
            <div className="widget-wrapper pb20 mb0 pl20 pr20">
              {/* Range Slider Mobile Version */}
              <div className="range-slider-style2">
                <div className="range-wrapper at-home10">
                  <Slider
                    range
                    max={100000000}
                    min={0}
                    defaultValue={[0, 100000000]}
                    onChange={(value) => handleOnChange(value)}
                    id="slider"
                  />

                  <div className="d-flex align-items-center">
                    <span id="slider-range-value1">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(price[0])}
                    </span>
                    <i className="fa-sharp fa-solid fa-minus mx-2 dark-color icon" />
                    <span id="slider-range-value2">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(price[1])}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterItems;
