"use client";
import React, { useEffect, useState } from "react";
const amenitiesData = {
  column1: [
    { label: "Gác mái", defaultChecked: false },
    { label: "Điều hòa", defaultChecked: false },
    { label: "Vườn", defaultChecked: false },
    { label: "Hồ bơi", defaultChecked: false },
    { label: "Lò nướng", defaultChecked: false },
  ],
  column2: [
    { label: "Truyền hình", defaultChecked: false },
    { label: "Máy sấy", defaultChecked: false },
    { label: "Phòng tập", defaultChecked: false },
    { label: "View biển", defaultChecked: false },
    { label: "Không gian riêng", defaultChecked: false },
  ],
  column3: [
    { label: "Tủ rượu", defaultChecked: false },
    { label: "Sân trước", defaultChecked: false },
    { label: "Tủ lạnh", defaultChecked: false },
    { label: "Wifi", defaultChecked: false },
    { label: "Máy giặt", defaultChecked: false },
  ],
};

const Amenities = ({ amenitiesData, selectedAmenities, onAmenityChange }) => {
  return (
    <div className="row">
      {amenitiesData.map((amenity, index) => (
        <div key={index} className="col-sm-6 col-lg-3">
          <div className="checkbox-style1">
            <label className="custom_checkbox">
              {amenity.Name}
              <input
                type="checkbox"
                checked={selectedAmenities.includes(amenity.Name)}
                value={amenity.Name}
                onChange={(e) => {
                  onAmenityChange(amenity.Name, e.target.checked);
                }}
              />
              <span className="checkmark" />
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
