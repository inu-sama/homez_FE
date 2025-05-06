import React from "react";
import MultiSelectField from "./MultiSelectField";
import StructureType from "./StructureType";
import Select from "react-select";

const DetailsFiled = ({ setData, data, setFilled }) => {
  const direction = [
    { value: "Đông", label: "Đông" },
    { value: "Tây", label: "Tây" },
    { value: "Nam", label: "Nam" },
    { value: "Bắc", label: "Bắc" },
  ];
  const typeApartment = [
    { value: "Cao cấp", label: "Cao cấp" },
    { value: "Bình dân", label: "Bình dân" },
    { value: "Kho", label: "Kho" },
  ];
  const interiorCondition = [
    { value: "Nội thất cao cấp", label: "Nội thất cao cấp" },
    { value: "Nội thất đầy đủ", label: "Nội thất đầy đủ" },
    { value: "Hoàn thiện cơ bản", label: "Hoàn thiện cơ bản" },
    { value: "Bàn giao thô", label: "Bàn giao thô" },
  ];
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
    <form className="form-style1">
      <div className="row mb100">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Diện tích (m²)
            </label>
            <input
              type="number"
              className="form-control"
              placeholder="m²"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  sqft: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số phòng ngủ
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={1}
              placeholder="Số phòng ngủ"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  bedroom: Number(e.target.value),
                }));
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số phòng tắm
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={1}
              placeholder="Số phòng tắm"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  bathroom: Number(e.target.value),
                }));
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Số garage
            </label>
            <input
              type="number"
              className="form-control"
              defaultValue={0}
              placeholder="Số garage"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  garage: Number(e.target.value),
                }));
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Tình trạng nội thất
            </label>
            <div className="location-area">
              <Select
                placeholder="Chọn tình trạng..."
                defaultValue={interiorCondition[1]}
                name="colors"
                options={interiorCondition}
                styles={customStyles}
                className="select-custom pl-0"
                classNamePrefix="select"
                required
                onChange={(e) => {
                  setData((prev) => ({
                    ...prev,
                    interior_condition: e.label,
                  }));
                  if (data.sqft && data.yearBuilt) {
                    setFilled([true, true, true, true, false]);
                  }
                }}
              />
            </div>
          </div>
        </div>
        {/* End .col-4 */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Năm xây dựng
            </label>
            <input
              type="number"
              max={new Date().getFullYear()}
              className="form-control"
              required
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  yearBuilt: e.target.value,
                }));
                if (data.sqft && data.yearBuilt) {
                  setFilled([true, true, true, true, false]);
                }
              }}
            />
          </div>
        </div>
        {/* End .col-4 */}

        {data.category === "Chung cư" && (
          <>
            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Loại hình căn hộ
                </label>
                <div className="location-area">
                  <Select
                    placeholder="Chọn loại..."
                    name="colors"
                    options={typeApartment}
                    styles={customStyles}
                    className="select-custom pl-0"
                    classNamePrefix="select"
                    required
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        Type_apartment: e.label,
                      }));
                      if (data.sqft && data.yearBuilt) {
                        setFilled([true, true, true, true, false]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {/* End .col-4 */}

            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Hướng cửa chính
                </label>
                <div className="location-area">
                  <Select
                    placeholder="Chọn hướng cửa chính..."
                    name="colors"
                    options={direction}
                    styles={customStyles}
                    maxMenuHeight={120}
                    className="select-custom pl-0"
                    classNamePrefix="select"
                    required
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        maindoor_direction: e.label,
                      }));
                      if (data.sqft && data.yearBuilt) {
                        setFilled([true, true, true, true, false]);
                      }
                    }}
                  />
                </div>
              </div>
            </div>
            {/* End .col-4 */}

            <div className="col-sm-6 col-xl-4">
              <div className="mb20">
                <label className="heading-color ff-heading fw600 mb10">
                  Hướng cửa ban công
                </label>
                <div className="location-area">
                  <Select
                    placeholder="Chọn hướng ban công..."
                    name="colors"
                    options={direction}
                    styles={customStyles}
                    maxMenuHeight={120}
                    className="select-custom pl-0"
                    classNamePrefix="select"
                    required
                    onChange={(e) => {
                      setData((prev) => ({
                        ...prev,
                        Balcony_direction: e.label,
                      }));
                      if (data.sqft && data.yearBuilt) {
                        setFilled([true, true, true, true, false]);
                      }
                      console.log(data);
                    }}
                  />
                </div>
              </div>
            </div>
            {/* End .col-4 */}
          </>
        )}
      </div>
      {/* End .row */}
    </form>
  );
};

export default DetailsFiled;
