"use client";
import React, { useState } from "react";

export default function Search({ data, result }) {
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    if (value.length > 0) {
      const filtered = data.filter((item) => item.Title.includes(value));
      result(filtered);
    } else {
      result(data);
    }
  };

  return (
    <div
      style={{ marginBottom: "10px", marginTop: "10px" }}
      className="row justify-content-center"
    >
      <div className="col-md-6 position-relative">
        <div className="position-relative">
          <input
            type="text"
            value={searchValue}
            onChange={handleSearch}
            style={{ paddingLeft: "55px" }}
            className="form-control search-input-components-AD"
            placeholder="Search tiêu đề bài đăng."
          />
          <i className="fas fa-search"></i>
        </div>
      </div>
    </div>
  );
}
