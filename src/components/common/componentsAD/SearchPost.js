"use client";
import React, { useState } from "react";

export default function Search({ data, result }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      const filtered = data.filter((item) =>
        item.Title.toLowerCase().includes(value.toLowerCase())
      );
      result(filtered);
    } else {
      result(data);
    }
  };

  return (
    <div
      style={{ marginBottom: "12px", marginLeft: "1%" }}
      className="row w-100"
    >
      <div
        className="col-md-6 position-relative "
        style={{
          border: "1px solid #eb6753",
          borderRadius: "5px",
          height: "55px",
          width: "100%",
        }}
      >
        <div className="position-relative ">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            style={{
              paddingLeft: "55px",
              outline: "none",
              border: "none",
              height: "50px",
            }}
            className="form-control search-input-components-AD"
            placeholder="Search tiêu đề bài đăng."
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
}
