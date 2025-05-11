"use client";
import React, { useState } from "react";
import Slider, { Range } from "rc-slider";

const Status = ({ statusSortOption, handleStatusChange }) => {
  return (
    <div>
      <h6 className="list-title">Trạng thái</h6>
      <div className="range-slider-style1">
        {["Mới nhất", "Cũ nhất"].map((option, index) => (
          <label className="custom_checkbox" key={index}>
            {option}
            <input
              type="checkbox"
              checked={statusSortOption === option}
              onChange={() => handleStatusChange(option)}
            />
            <span className="checkmark" />
          </label>
        ))}
      </div>
    </div>
  );
};

export default Status;
