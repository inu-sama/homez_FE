"use client";
import Select from "react-select";
import Slider, { Range } from "rc-slider";
import { useState, useEffect } from "react";
import { apiCatalog } from "@/apis/Catalog";

const FilterItems = ({ setCategory, setLocation }) => {
  const [optionsPrice, setOptionPrice] = useState(null);
  const [location, setLocationa] = useState([]);
  const [category, setCategoryb] = useState([]);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await apiCatalog.getLocation();
        setLocationa(response);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };
    const fetchCategory = async () => {
      try {
        const response = await apiCatalog.getCategory();
        setCategoryb(response);
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };
    fetchCategory();

    fetchLocation();
  }, []);
  const locationOptions = location.map((item) => ({
    value: item._id,
    label: item.Name,
  }));
  const categoriesOptions = category.map((item) => ({
    value: item._id,
    label: item.Name,
  }));

  const customStyles = {
    option: (styles, { isFocused, isSelected, isHovered }) => {
      return {
        ...styles,
        backgroundColor: isSelected
          ? "#eb6753"
          : isHovered
          ? "#eb675312"
          : isFocused
          ? "#eb675312"
          : undefined,
      };
    },
  };

  return (
    <>
      <div className="col-md-12">
        <div className="bootselect-multiselect mb15">
          <Select
            defaultValue={{ label: "Địa chỉ", value: "" }}
            name="colors"
            options={cities}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            required
            isSearchable={false}
            onChange={(e) => setLocation(e.label)}
          />
        </div>
      </div>
      <div className="col-md-12">
        <div className="bootselect-multiselect mb15">
          <Select
            defaultValue={{ label: "Loại", value: "" }}
            name="colors"
            options={categoriesOptions}
            styles={customStyles}
            className="text-start with_border"
            classNamePrefix="select"
            required
            isSearchable={false}
            onChange={(e) => setCategory(e.label)}
          />
        </div>
      </div>
    </>
  );
};

export default FilterItems;
