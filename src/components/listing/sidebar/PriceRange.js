"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const PriceRange = ({ filterFunctions }) => {
  const [price, setPrice] = useState([0, 100000000]);

  // price range handler

  // price range handler
  const handleOnChange = (value) => {
    setPrice(value);

    filterFunctions?.setPriceRange([value[0] || 0, value[1]]);
  };

  return (
    <>
      <div className="range-wrapper">
        <Slider
          range
          formatLabel={() => ``}
          max={100000000}
          min={0}
          defaultValue={[0, 100000000]}
          onChange={(value) => {
            handleOnChange(value);
          }}
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
    </>
  );
};

export default PriceRange;
