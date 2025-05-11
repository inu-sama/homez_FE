"use client";

import listings from "@/data/listings";
import React, { useState, useEffect } from "react";
import ListingSidebar from "../../sidebar";
import AdvanceFilterModal from "@/components/common/advance-filter-two";
import TopFilterBar from "./TopFilterBar";
import FeaturedListings from "./FeatuerdListings";
import Pagination from "../../Pagination";
import { apiProperties } from "@/apis/Properties";
import PaginationTwo from "../../PaginationTwo";
import { sort } from "@/data/mobileMenuItems";
import { useSearchParams } from "next/navigation";

export default function PropertyFiltering({ type }) {
  const searchParams = useSearchParams();
  const cate = searchParams.get("category");
  const [properties, setProperties] = useState([]);
  const method = type == "for-rent" ? "Cho thuê" : "Đăng bán";

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getProperties();
      setProperties(response);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);

  const [filteredData, setFilteredData] = useState([]);
  const [currentSortingOption, setCurrentSortingOption] = useState("Newest");
  const [sortedFilteredData, setSortedFilteredData] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [colstyle, setColstyle] = useState(false);
  const [pageItems, setPageItems] = useState([]);
  const [pageContentTrac, setPageContentTrac] = useState([]);
  const [sortFunction, setSortFunction] = useState(() => (a, b) => {
    return b.Type.yearBuilt - a.Type.yearBuilt;
  });

  useEffect(() => {
    setPageItems(
      sortedFilteredData.slice((pageNumber - 1) * 9, pageNumber * 9)
    );
    setPageContentTrac([
      (pageNumber - 1) * 9 + 1,
      pageNumber * 9,
      sortedFilteredData.length,
    ]);
  }, [pageNumber, sortedFilteredData]);

  const [listingStatus, setListingStatus] = useState("All");
  const [propertyTypes, setPropertyTypes] = useState(cate ? cate : "");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [location, setLocation] = useState("Hồ Chí Minh");
  const [squirefeet, setSquirefeet] = useState([]);
  const [yearBuild, setyearBuild] = useState([]);
  const [categories, setCategories] = useState(cate || []);
  const [amenities, setAmenities] = useState([]);

  const resetFilter = () => {
    setListingStatus("All");
    setPropertyTypes([]);
    setPriceRange([0, 100000000]);
    setBedrooms(0);
    setBathrooms(0);
    setLocation("All Cities");
    setSquirefeet([]);
    setyearBuild([0, new Date().getFullYear()]);
    setCategories([]);
    setCurrentSortingOption("Newest");
    document.querySelectorAll(".filterInput").forEach(function (element) {
      element.value = null;
    });

    document.querySelectorAll(".filterSelect").forEach(function (element) {
      element.value = "All Cities";
    });
  };

  const handlelistingStatus = (elm) => {
    setListingStatus((pre) => (pre == elm ? "All" : elm));
  };

  const handlepropertyTypes = (elm) => {
    if (elm == "All") {
      setPropertyTypes([]);
    } else {
      setPropertyTypes((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const handlepriceRange = (elm) => {
    setPriceRange(elm);
  };
  const handlebedrooms = (elm) => {
    setBedrooms(elm);
  };
  const handlebathroms = (elm) => {
    setBathrooms(elm);
  };
  const handlelocation = (elm) => {
    console.log(elm);
    setLocation(elm);
  };
  const handlesquirefeet = (elm) => {
    setSquirefeet(elm);
  };
  const handleyearBuild = (elm) => {
    setyearBuild(elm);
  };
  const handlecategories = (elm) => {
    if (elm == "All") {
      setCategories([]);
    } else {
      setCategories((pre) =>
        pre.includes(elm) ? [...pre.filter((el) => el != elm)] : [...pre, elm]
      );
    }
  };
  const filterFunctions = {
    setPriceRange,
    setPropertyTypes,
    setBedrooms,
    setBathrooms,
    setAmenities,
    setSortFunction,
    setLocation,
    priceRange,
    propertyTypes,
    bedrooms,
    bathrooms,
    amenities,
    sortFunction,
    location,
  };

  useEffect(() => {
    setPageNumber(1);
    if (currentSortingOption == "Newest") {
      const sorted = [...filteredData].sort(
        (a, b) => a.yearBuilt - b.yearBuilt
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price Low") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          a.price.split("$")[1].split(",").join("") -
          b.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else if (currentSortingOption.trim() == "Price High") {
      const sorted = [...filteredData].sort(
        (a, b) =>
          b.price.split("$")[1].split(",").join("") -
          a.price.split("$")[1].split(",").join("")
      );
      setSortedFilteredData(sorted);
    } else {
      setSortedFilteredData(filteredData);
    }
  }, [filteredData, currentSortingOption]);

  return (
    <section className="pt0 pb90 bgc-f7">
      {/* {console.log("properties: ", properties)} */}
      <div className="container">
        {/* start mobile filter sidebar */}
        <div
          className="offcanvas offcanvas-start p-0"
          tabIndex="-1"
          id="listingSidebarFilter"
          aria-labelledby="listingSidebarFilterLabel"
        >
          <div className="offcanvas-header">
            <h5
              className="offcanvas-title"
              id="listingSidebarFilterLabel"
              style={{ fontFamily: "inherit" }}
            >
              Danh sách lọc
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <ListingSidebar filterFunctions={filterFunctions} />
          </div>
        </div>
        {/* End mobile filter sidebar */}

        <div className="row">
          <TopFilterBar
            pageContentTrac={pageContentTrac}
            colstyle={colstyle}
            setColstyle={setColstyle}
            filterFunctions={filterFunctions}
            setCurrentSortingOption={setCurrentSortingOption}
          />
        </div>
        {/* End TopFilterBar */}

        <div className="row">
          <FeaturedListings
            filterFunctions={filterFunctions}
            colstyle={colstyle}
            data={properties}
            state={method}
          />
        </div>
        {/* End .row */}

        <div className="row">
          <PaginationTwo
            pageCapacity={9}
            data={sortedFilteredData}
            pageNumber={pageNumber}
            setPageNumber={setPageNumber}
          />
        </div>
        {/* End .row */}
      </div>
      {/* End .container */}
    </section>
  );
}
