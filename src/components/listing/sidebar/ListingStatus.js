"use client";

import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const ListingStatus = ({ filterFunctions }) => {
  const router = useRouter();
  
  const options = [
    { id: "flexRadioDefault1", label: "Cho thuê", link: "/property-list/for-rent" },
    { id: "flexRadioDefault2", label: "Đăng bán", link: "/property-list/for-sale" },
  ];

  return (
    <>
      {options.map((option, index) => (
        // <p className="px-2 m0" key={option.id}>
        //   <Link href={option.link}>{option.label}</Link>
        // </p>
        <label className="custom_checkbox" key={index}>
          {option.label}
          <input
            type="checkbox"
            checked={option.label == (filterFunctions.type == "for-rent" ? "Cho thuê" : "Đăng bán")}
            onChange={() => {
              filterFunctions.setListingStatus(option.label);
              router.push(option.link);
              console.log("option.link", filterFunctions?.listingStatus);
            }}
          />
          <span className="checkmark" />
        </label>
      ))}
      {/* {options.map((option) => (
        <label className="custom_checkbox" key={option.id}>
          {option.label}
          <input
            type="checkbox"
            checked={filterFunctions.Type == option.value}
            onChange={() => {filterFunctions.setType(option.value)}}
          />
          <span className="checkmark" />
        </label>
        <div
          className="form-check d-flex align-items-center mb10"
          key={option.id}
        >
          <input
            className="form-check-input"
            type="radio"
            checked={filterFunctions.Type == option.label}
            onChange={() => filterFunctions.setType(option.label)}
          />
          <label className="form-check-label" htmlFor={option.id}>
            {option.label}
          </label>
        </div>
      ))} */}
    </>
  );
};

export default ListingStatus;
