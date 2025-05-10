"use client";
import Select from "react-select";

const Location = ({ filterFunctions }) => {
  const locationOptions = [
    { value: "All Cities", label: "All Cities" },
    { value: "California", label: "California" },
    { value: "Los Angeles", label: "Los Angeles" },
    { value: "New Jersey", label: "New Jersey" },
    { value: "New York", label: "New York" },
    { value: "San Diego", label: "San Diego" },
    { value: "San Francisco", label: "San Francisco" },
    { value: "Texas", label: "Texas" },
  ];
  const cities = [
    { value: "An Giang", label: "An Giang" },
    { value: "Bắc Ninh", label: "Bắc Ninh" },
    { value: "Cà Mau", label: "Cà Mau" },
    { value: "Cần Thơ", label: "Cần Thơ" },
    { value: "Cao Bằng", label: "Cao Bằng" },
    { value: "Đà Nẵng", label: "Đà Nẵng" },
    { value: "Đắk Lắk", label: "Đắk Lắk" },
    { value: "Điện Biên", label: "Điện Biên" },
    { value: "Đồng Nai", label: "Đồng Nai" },
    { value: "Đồng Tháp", label: "Đồng Tháp" },
    { value: "Gia Lai", label: "Gia Lai" },
    { value: "Hà Nội", label: "Hà Nội" },
    { value: "Hà Tĩnh", label: "Hà Tĩnh" },
    { value: "Hải Phòng", label: "Hải Phòng" },
    { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
    { value: "Huế", label: "Huế" },
    { value: "Hưng Yên", label: "Hưng Yên" },
    { value: "Khánh Hòa", label: "Khánh Hòa" },
    { value: "Lai Châu", label: "Lai Châu" },
    { value: "Lâm Đồng", label: "Lâm Đồng" },
    { value: "Lạng Sơn", label: "Lạng Sơn" },
    { value: "Lào Cai", label: "Lào Cai" },
    { value: "Nghệ An", label: "Nghệ An" },
    { value: "Ninh Bình", label: "Ninh Bình" },
    { value: "Phú Thọ", label: "Phú Thọ" },
    { value: "Quảng Ngãi", label: "Quảng Ngãi" },
    { value: "Quảng Ninh", label: "Quảng Ninh" },
    { value: "Quảng Trị", label: "Quảng Trị" },
    { value: "Sơn La", label: "Sơn La" },
    { value: "Tây Ninh", label: "Tây Ninh" },
    { value: "Thái Nguyên", label: "Thái Nguyên" },
    { value: "Thanh Hóa", label: "Thanh Hóa" },
    { value: "Tuyên Quang", label: "Tuyên Quang" },
    { value: "Vĩnh Long", label: "Vĩnh Long" },
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
    <Select
      defaultValue={[cities[14]]}
      name="colors"
      styles={customStyles}
      options={cities}
      value={{
        value: filterFunctions.location,
        label: filterFunctions.location,
      }}
      className="select-custom filterSelect"
      classNamePrefix="select"
      onChange={(e) => filterFunctions.setLocation(e.value)}
      required
    />
  );
};

export default Location;
