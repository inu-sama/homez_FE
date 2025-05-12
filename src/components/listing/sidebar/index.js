"use client";

import React, { useState } from "react";
import SearchBox from "./SearchBox";
import ListingStatus from "./ListingStatus";
import PropertyType from "./PropertyType";
import PriceSlider from "./PriceRange";
import Bedroom from "./Bedroom";
import Bathroom from "./Bathroom";
import Location from "./Location";
import SquareFeet from "./SquareFeet";
import YearBuilt from "./YearBuilt";
import OtherFeatures from "./OtherFeatures";
import PriceRange from "./PriceRange";
import Status from "./Status";

const ListingSidebar = ({ filterFunctions }) => {
  const options = [{ label: "Đắt dần" }, { label: "Rẻ dần" }];
  const [priceSortOption, setPriceSortOption] = useState("");
  const [statusSortOption, setStatusSortOption] = useState("Mới nhất");

  const updateSortFunction = (statusOption) => {
    if (statusOption === "Đắt dần") {
      filterFunctions.setSortFunction(() => (a, b) => a?.Price - b?.Price);
    } else if (statusOption === "Rẻ dần") {
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
    updateSortFunction(label);
  };
  return (
    <div className="list-sidebar-style1">
      {/* <div className="widget-wrapper">
        <h6 className="list-title">Tìm</h6>
        <SearchBox filterFunctions={filterFunctions} />
      </div> */}
      {/* End .widget-wrapper */}

      {/* <div className="widget-wrapper">
        <h6 className="list-title">Listing Status</h6>
        <div className="radio-element">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div> */}
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title" style={{ fontFamily: "inherit" }}>
          Hình thức
        </h6>
        <div className="checkbox-style1">
          <ListingStatus filterFunctions={filterFunctions} />
        </div>
      </div>

      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title" style={{ fontFamily: "inherit" }}>
          Loại căn hộ
        </h6>
        <div className="checkbox-style1">
          <PropertyType filterFunctions={filterFunctions} />
        </div>
      </div>

      {/* End .widget-wrapper */}

      {/* <div className="checkbox-style1">
        <PriceRange
          priceSortOption={priceSortOption}
          handlePriceChange={handlePriceChange}
        />
      </div> */}
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Phòng ngủ</h6>
        <div className="d-flex">
          <Bedroom filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      <div className="widget-wrapper">
        <h6 className="list-title">Phòng tắm</h6>
        <div className="d-flex">
          <Bathroom filterFunctions={filterFunctions} />
        </div>
      </div>
      {/* End .widget-wrapper */}

      {/* End .widget-wrapper */}
      <div className="widget-wrapper">
        <div className="d-flex">
          <Status
            statusSortOption={statusSortOption}
            handleStatusChange={handleStatusChange}
            filterFunctions={filterFunctions}
          />
        </div>
      </div>
      {/* End .widget-wrapper */}

      {/* End .widget-wrapper */}
      {/* End .widget-wrapper */}
    </div>
  );
};

export default ListingSidebar;
