import React from "react";

const PropertyDetails = ({ property }) => {
  const columns = [
    [
      {
        label: "Mã căn hộ",
        value: property._id.slice(0, 5) + "...",
      },
      {
        label: "Giá",
        value: `${new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(property.Price)}${
          property.State == "Cho thuê" ? "/tháng" : ""
        }`,
      },
      {
        label: "Diện tích",
        value: property.Type.sqft + " m²",
      },
      {
        label: property.State = "Cho thuê" ? "Cọc trước" : "Giấy tờ pháp lý",
        value: property.State = "Cho thuê" ? property.deposit_amount : property.type_documents,
      },
      {
        label: "Tình trạng nội thất",
        value: property.interior_condition,
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
      {
        label:
          property.Type.category === "Chung cư"
            ? "Hướng cửa chính "
            : "Hướng nhà",
        value: property.maindoor_direction,
      },
    ],
  ];

  return (
    <div className="row">
      {columns.map((column, columnIndex) => (
        <div
          key={columnIndex}
          className={`col-md-6 border-start border-end`}
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
