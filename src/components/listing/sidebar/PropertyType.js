"use client";

import React from "react";

const PropertyType = ({ filterFunctions }) => {
  const options = [{ label: "Nhà ở" }, { label: "Chung cư" }];

  return (
    <>
      <label className="custom_checkbox">
        Tất cả
        <input
          type="checkbox"
          checked={filterFunctions?.propertyTypes == ""}
          onChange={() => {
            filterFunctions?.setPropertyTypes([]);
          }}
        />
        <span className="checkmark" />
      </label>
      {options.map((option, index) => (
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={filterFunctions?.propertyTypes == option.label}
            onChange={() => {
              filterFunctions.setPropertyTypes(option.label);
            }}
          />
          <span className="checkmark" />
        </label>
      ))}
    </>
  );
};

export default PropertyType;
