import React from "react";

const PropertyFeaturesAminites = ({ amenities }) => {
  const featuresAmenitiesData = [
    ["Air Conditioning", "Barbeque", "Dryer", "Gym"],
    ["Lawn", "Microwave", "Outdoor Shower", "Refrigerator"],
    ["Swimming Pool", "TV Cable", "Washer", "WiFi6"],
  ];

  return (
    <>
      <div className="row">
        {amenities.map((item, index) => (
          <p key={index} className="text mb10 col-4">
            <i className="fas fa-circle fz6 align-middle pe-2" />
            {item}
          </p>
        ))}
      </div>
    </>
  );
};

export default PropertyFeaturesAminites;
