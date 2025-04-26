"use client";
import Link from "next/link";
import { React, useState } from "react";

const SignIn = () => {
  const [otp, setOtp] = useState(false);
  return (
    <form className="form-style1">
      <div className="mb25">
        <label className="form-label fw600 dark-color">Số điện thoại</label>
        <input
          type="number"
          {...(otp ? { disabled: true } : null)}
          className="form-control"
          placeholder="Nhập số điện thoại"
          required
        />
      </div>

      {otp ? (
        <div className="mb15">
          <label className="form-label fw600 dark-color">OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Nhập mã xác nhận"
            required
          />
        </div>
      ) : null}

      <div className="checkbox-style1 d-block d-sm-flex align-items-center justify-content-between mb10">
        <label className="custom_checkbox fz14 ff-heading">
          Remember me
          <input type="checkbox" defaultChecked="checked" />
          <span className="checkmark" />
        </label>
        <a className="fz14 ff-heading" href="#">
          Lost your password?
        </a>
      </div>
      {/* End  Lost your password? */}

      <div className="d-grid mb20">
        {!otp ? (
          <button
            onClick={() => setOtp(true)}
            className="ud-btn btn-thm"
            type="button"
          >
            Xác nhận <i className="fal fa-comment-sms" />
          </button>
        ) : (
          <Link href="./contact" className="ud-btn btn-thm" type="submit">
            Đăng nhập <i className="fal fa-arrow-right-long" />
          </Link>
        )}
      </div>
      {/* End submit */}
    </form>
  );
};

export default SignIn;
