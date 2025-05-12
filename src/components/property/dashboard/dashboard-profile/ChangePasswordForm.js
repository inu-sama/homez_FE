import React from "react";

const ChangePasswordForm = () => {
  return (
    <form className="form-style1">
      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Mật khẩu cũ
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mật khẩu cũ"
              required
            />
          </div>
        </div>
      </div>
      {/* End .col */}

      <div className="row">
        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Mật khẩu mới
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập mật khẩu mới"
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Xác nhận mật khẩu
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Nhập lại mật khẩu mới"
              required
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button type="submit" className="ud-btn btn-dark">
              Cập nhật mật khẩu
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChangePasswordForm;
