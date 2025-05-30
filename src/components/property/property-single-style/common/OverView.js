import listings from "@/data/listings";
import React from "react";

const OverView = ({ type }) => {
  const overviewData = [
    {
      icon: "flaticon-bed",
      label: "Phòng ngủ",
      value: type.bedroom,
    },
    {
      icon: "flaticon-shower",
      label: "Phòng tắm",
      value: type.bathroom,
    },
    {
      icon: "flaticon-event",
      label: "Năm xây dựng",
      value: type.yearBuilt,
    },
    {
      icon: "flaticon-garage",
      label: "Garage",
      value: type.garage,
      xs: true,
    },
    {
      icon: "flaticon-expand",
      label: "Diện tích",
      value: type.sqft,
      xs: true,
    },
    {
      icon: "flaticon-home-1",
      label: "Loại hình",
      value: type.category,
    },
  ];

  return (
    <>
      {overviewData.map((item, index) => (
        <div
          key={item.label}
          className={`col-sm-6 col-lg-4 ${item.xs ? "mb25-xs" : "mb25"}`}
        >
          <div className="overview-element d-flex align-items-center">
            <span className={`icon ${item.icon}`} />
            <div className="ml15">
              <h6 className="mb-0">{item.label}</h6>
              <p className="text mb-0 fz15">{item.value}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default OverView;
