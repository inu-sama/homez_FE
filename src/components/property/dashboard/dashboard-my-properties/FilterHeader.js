import React from "react";

const FilterHeader = ({ page }) => {
  return (
    <div className="dashboard_search_meta d-md-flex align-items-center justify-content-xxl-end">
      <div className="item1 mb15-sm">
        <div className="search_area">
          <input
            type="text"
            className="form-control bdrs12"
            placeholder="Search"
            required
            onChange={(e) => {
              page.setSearchContent(e.target.value);
            }}
          />
          <label>
            <span className="flaticon-search" />
          </label>
        </div>
      </div>
      {/* End item1 */}

      <div className="page_control_shorting bdr1 bdrs12 py-2 ps-3 pe-2 mx-1 mx-xxl-3 bgc-white mb15-sm maxw160">
        <div className="pcs_dropdown d-flex align-items-center">
          <span style={{ minWidth: "50px" }} className="title-color">
            Lọc:
          </span>
          <select
            className="form-select show-tick"
            onChange={(e) => {
              page.setSorting(e.target.value);
              console.log(e.target.value);
            }}
          >
            <option value={""}>Tất cả</option>
            <option value={"true"}>Đã duyệt</option>
            <option value={"false"}>Chờ duyệt</option>
          </select>
        </div>
      </div>
      <a href="/add-property" className="ud-btn btn-thm">
        Thêm mới
        <i className="fal fa-arrow-right-long" />
      </a>
    </div>
  );
};

export default FilterHeader;
