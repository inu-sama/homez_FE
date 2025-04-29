import React from "react";

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

const Amenities = ({data}) => {
  return (
    <div className="row">
      {Object.keys(amenitiesData).map((columnKey, index) => (
        <div key={index} className="col-sm-6 col-lg-3 col-xxl-2">
          <div className="checkbox-style1">
            {amenitiesData[columnKey].map((amenity, amenityIndex) => (
              <label key={amenityIndex} className="custom_checkbox">
                {amenity.label}
                <input
                  type="checkbox"
                  defaultChecked={amenity.defaultChecked}
                  value={amenity.label}
                  onChange={(e) => {
                    if (e.target.checked) {
                      data.Amenities.push(e.target.value);
                    } else {
                      const index = data.Amenities.indexOf(e.target.value);
                      const update = [...data.Amenities.slice(0, index), ...data.Amenities.slice(index + 1)];
                      data.Amenities = update;
                    }
                  }}
                />
                <span className="checkmark" />
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Amenities;
