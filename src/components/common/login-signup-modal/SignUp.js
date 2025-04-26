"use client";
import Link from "next/link";
import { React, useState } from "react";

const SignUp = () => {
  const [otp, setOtp] = useState(false);
  const [info, setInfo] = useState(false);
  return (
    <form className="form-style1">
      {!info ? (
        <div>
          <div className="mb25">
            <label className="form-label fw600 dark-color">Số điện thoại</label>
            <input
              type="number"
              className="form-control"
              placeholder="Nhập số điện thoại"
              required
              {...(otp ? { disabled: true } : null)}
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
        </div>
      ) : (
        <div>
          <div className="row mb25">
            <div className="w-50">
              <label className="form-label fw600 dark-color">Họ</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập họ"
                required
              />
            </div>
            <div className="w-50">
              <label className="form-label fw600 dark-color">Tên</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập tên"
                required
              />
            </div>
          </div>
          <div className="mb25">
            <label className="form-label fw600 dark-color">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Nhập email"
              required
            />
          </div>
        </div>
      )}

      <div className="d-grid mb20">
        {!otp ? (
          <button
            onClick={() => setOtp(true)}
            className="ud-btn btn-thm"
            type="button"
          >
            Xác nhận <i className="fal fa-comment-sms" />
          </button>
        ) : !info ? (
          <button
            onClick={() => setInfo(true)}
            className="ud-btn btn-thm"
            type="button"
          >
            Điền thông tin <i className="fal fa-paintbrush" />
          </button>
        ) : (
          <button className="ud-btn btn-thm" type="button">
            Đăng ký <i className="fal fa-arrow-right-long" />
          </button>
        )}
      </div>
    </form>
  );
};

export default SignUp;
