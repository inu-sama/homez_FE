"use client";

import React from "react";

const ListingStatus = ({ filterFunctions }) => {
  const options = [
    { id: "flexRadioDefault1", label: "Thuê nhà", value: "for-rent" },
    { id: "flexRadioDefault2", label: "Mua nhà", value: "for-sale" },
  ];

  return (
    <>
      {options.map((option) => (
        <label className="custom_checkbox" key={option.id}>
          {option.label}
          <input
            type="checkbox"
            checked={filterFunctions.Type == option.value}
            onChange={() => {filterFunctions.setType(option.value)}}
          />
          <span className="checkmark" />
        </label>
        // <div
        //   className="form-check d-flex align-items-center mb10"
        //   key={option.id}
        // >
        //   <input
        //     className="form-check-input"
        //     type="radio"
        //     checked={filterFunctions.Type == option.label}
        //     onChange={() => filterFunctions.setType(option.label)}
        //   />
        //   <label className="form-check-label" htmlFor={option.id}>
        //     {option.label}
        //   </label>
        // </div>
      ))}
    </>
  );
};

export default ListingStatus;
