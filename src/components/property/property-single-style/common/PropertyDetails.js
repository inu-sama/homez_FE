import React from "react";

const PropertyDetails = ({property}) => {
  console.log("property", property);
  const columns = [
    [
      {
        label: "Mã căn hộ",
        value: property._id.slice(0, 5) + "...",
      },
      {
        label: "Giá",
        value: new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(property.Price),
      },
      {
        label: "Diện tích",
        value: property.Type.sqft + " m²",
      },
      {
        label: "Loại căn hộ",
        value: property.Type.category,
      },
    ],
    [
      {
        label: "Năm xây dựng",
        value: property.Type.yearBuilt,
      },
      {
        label: "Phòng tắm",
        value: property.Type.bathroom,
      },
      {
        label: "Phòng ngủ",
        value: property.Type.bedroom,
      },
      {
        label: "Garage",
        value: property.Type.garage,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 col-xl-4${
            columnIndex === 1 ? " offset-xl-2" : ""
          }`}
        >
          {column.map((detail, index) => (
            <div key={index} className="d-flex justify-content-between">
              <div className="pd-list">
                <p className="fw600 mb10 ff-heading dark-color">
                  {detail.label}
                </p>
              </div>
              <div className="pd-list">
                <p className="text mb10">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PropertyDetails;
