import React, { useState } from "react";

const PropertyDescriptions = ({ data }) => {
  const [style, setStyle] = useState({
    display: "block",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    overflow: "hidden",
    maxHeight: "3rem",
    lineHeight: "1rem",
  });
  const toggle = () => {
    setStyle({
      ...style,
      maxHeight: style.maxHeight == "3rem" ? "none" : "3rem",
    });
    document.getElementById("toggle").innerHTML =
      style.maxHeight == "3rem" ? "Rút gọn ^" : "Xem thêm v";
  };
  return (
    <>
      <p className="text mb10" style={style} id="text">
        {data}
      </p>
      <a className="fw-bold p0 btn" onClick={toggle} id="toggle">
        Xem thêm v
      </a>
    </>
  );
};

export default PropertyDescriptions;
