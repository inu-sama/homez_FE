"use client";
import React, { useEffect, useState } from "react";
import { apiAuthen } from "@/apis/authen";
import { useRouter } from "next/navigation";

const PersonalInfo = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editUser, setEditUser] = useState(null);
  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };
  const token = getCookie("token");
  if (!token) {
    // window.location.href = "/";
    router.push("/");
  }
  const decodedToken = async () => {
    const token = getCookie("token");
    const userToken = await apiAuthen.getToken(token);

    const res = await apiAuthen.getUserByPhoneNumber(userToken.PhoneNumber);
    setUser(res.user);
    setEditUser({
      ...res.user,
      PhoneNumber: res.user.PhoneNumber,
      Email: res.user.Email,
      LastName: res.user.LastName,
      FirstName: res.user.FirstName,
    });
  };

  useEffect(() => {
    decodedToken();
  }, []);

  const handleUpdateUser = async () => {
    const token = getCookie("token");
    const res = await apiAuthen.updateUser(editUser);
    if (res.message === "Cập nhật thành công") {
      alert("Cập nhật thông tin thành công");
      const userToken = await apiAuthen.getToken(token);
      const res = await apiAuthen.getUserByPhoneNumber(userToken.PhoneNumber);
      setUser(res.user);
      setEditUser({
        ...res.user,
        PhoneNumber: res.user.PhoneNumber,
        Email: res.user.Email,
        LastName: res.user.LastName,
        FirstName: res.user.FirstName,
      });
    }
  };

  return (
    <form className="form-style1">
      <div className="row">
        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}
        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Phone</label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Họ</label>
            <input
              type="text"
              className="form-control"
              placeholder={user?.FirstName}
              maxLength={20}
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  FirstName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Tên</label>
            <input
              type="text"
              className="form-control"
              placeholder={user?.LastName}
              maxLength={10}
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  LastName: e.target.value,
                });
              }}
            />
          </div>
        </div>
        {/* End .col */}

        <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder={user?.Email}
              maxLength={50}
              onChange={(e) => {
                setEditUser({
                  ...editUser,
                  Email: e.target.value,
                });
              }}
            />
          </div>
        </div>
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Position
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Language
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Company Name
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-sm-6 col-xl-4">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Tax Number
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-xl-12">
          <div className="mb20">
            <label className="heading-color ff-heading fw600 mb10">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              placeholder="Your Name"
              required
            />
          </div>
        </div> */}
        {/* End .col */}

        {/* <div className="col-md-12">
          <div className="mb10">
            <label className="heading-color ff-heading fw600 mb10">
              About me
            </label>
            <textarea
              cols={30}
              rows={4}
              placeholder="There are many variations of passages."
              defaultValue={""}
            />
          </div>
        </div> */}
        {/* End .col */}

        <div className="col-md-12">
          <div className="text-end">
            <button
              type="button"
              className="ud-btn btn-dark"
              onClick={() => {
                handleUpdateUser();
              }}
            >
              Cập nhật thông tin
              <i className="fal fa-arrow-right-long" />
            </button>
          </div>
        </div>
        {/* End .col */}
      </div>
    </form>
  );
};

export default PersonalInfo;
