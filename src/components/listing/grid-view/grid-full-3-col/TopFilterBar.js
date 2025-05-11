"use client";

import React, { useState } from "react";
import ListingStatus from "../../sidebar/ListingStatus";
import PropertyType from "../../sidebar/PropertyType";
import PriceRange from "../../sidebar/PriceRange";
import Bedroom from "../../sidebar/Bedroom";
import Bathroom from "../../sidebar/Bathroom";
import Status from "../../sidebar/Status";
import Location from "../../sidebar/Location";

const TopFilterBar = ({
  filterFunctions,
  setCurrentSortingOption,
  colstyle,
  setColstyle,
}) => {
  const options = [{ label: "Đắt dần" }, { label: "Rẻ dần" }];
  const [priceSortOption, setPriceSortOption] = useState("");
  const [statusSortOption, setStatusSortOption] = useState("");

  const updateSortFunction = (priceOption, statusOption) => {
    if (priceOption === "Đắt dần") {
      filterFunctions.setSortFunction(() => (a, b) => a?.Price - b?.Price);
    } else if (priceOption === "Rẻ dần") {
      filterFunctions.setSortFunction(() => (a, b) => b?.Price - a?.Price);
    } else if (statusOption === "Mới nhất") {
      filterFunctions.setSortFunction(
        () => (a, b) => b?.Type.yearBuilt - a?.Type.yearBuilt
      );
    } else if (statusOption === "Cũ nhất") {
      filterFunctions.setSortFunction(
        () => (a, b) => a?.Type.yearBuilt - b?.Type.yearBuilt
      );
    } else {
      filterFunctions.setSortFunction(null);
    }
  };

  const handlePriceChange = (label) => {
    setPriceSortOption(label);
    updateSortFunction(label, "");
  };

  const handleStatusChange = (label) => {
    setStatusSortOption(label);
    updateSortFunction("", label);
  };

  return (
    <>
      <div className="col-xl-9 d-none d-lg-block">
        <div className="dropdown-lists">
          <ul className="p-0 text-center text-xl-start">
            {/* Status */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Hình thức <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Hình thức</h6>
                  <div className="checkbox-style1">
                    <ListingStatus filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Hoàn tất
                  </button>
                </div>
              </div>
            </li>

            {/* Property Type */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Loại căn hộ <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20">
                  <h6 className="list-title">Loại căn hộ</h6>
                  <div className="checkbox-style1">
                    <PropertyType filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm dropdown-toggle"
                  >
                    Hoàn tất
                  </button>
                </div>
              </div>
            </li>

            {/* Price */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Mức giá <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <PriceRange
                    priceSortOption={priceSortOption}
                    handlePriceChange={handlePriceChange}
                  />
                </div>
              </div>
            </li>

            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Trạng thái <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd3">
                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <Status
                    statusSortOption={statusSortOption}
                    handleStatusChange={handleStatusChange}
                  />
                </div>
              </div>
            </li>

            {/* Beds / Baths */}
            <li className="list-inline-item position-relative">
              <button
                type="button"
                className="open-btn mb15 dropdown-toggle"
                data-bs-toggle="dropdown"
                data-bs-auto-close="outside"
              >
                Phòng tắm / Phòng ngủ <i className="fa fa-angle-down ms-2" />
              </button>
              <div className="dropdown-menu dd4 pb20">
                <div className="widget-wrapper pl20 pr20">
                  <h6 className="list-title">Phòng ngủ</h6>
                  <div className="d-flex">
                    <Bedroom filterFunctions={filterFunctions} />
                  </div>
                </div>

                <div className="widget-wrapper bdrb1 pb25 mb0 pl20 pr20">
                  <h6 className="list-title"> Phòng tắm</h6>
                  <div className="d-flex">
                    <Bathroom filterFunctions={filterFunctions} />
                  </div>
                </div>
                <div className="text-end mt10 pr10">
                  <button
                    type="button"
                    className="done-btn ud-btn btn-thm drop_btn4"
                  >
                    Done
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default TopFilterBar;
