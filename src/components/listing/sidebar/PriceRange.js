"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const PriceRange = ({ priceSortOption, handlePriceChange }) => {
  return (
    <>
      <h6 className="list-title">Mức giá</h6>
      <div className="range-slider-style1">
        {["Đắt dần", "Rẻ dần"].map((option, index) => (
          <label className="custom_checkbox" key={index}>
            {option}
            <input
              type="checkbox"
              checked={priceSortOption === option}
              onChange={() => handlePriceChange(option)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </>
  );
};

export default PriceRange;
