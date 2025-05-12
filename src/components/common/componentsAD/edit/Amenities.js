"use client";
import React, { useEffect, useState } from "react";

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
