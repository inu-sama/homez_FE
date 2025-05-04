"use client";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiCatalog } from "@/apis/Catalog";
import { apiAuthen } from "@/apis/authen";

export default function Catalog() {
  const [role, setRole] = useState("");
  const [data, setData] = useState({
    Amenities: [],
    Category: [],
    Location: [],
  });
  const [editingIndex, setEditingIndex] = useState({
    slideKey: null,
    itemIndex: null,
  });

  const checkRole = async () => {
    try {
      const role = await apiAuthen.me();
      if (role.status === 201) {
        setRole(role.data.Role);
      }
      if (role.status === 202) {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Không lấy được role:", err);
      setRole("");
    }
  };

  useEffect(() => {
    checkRole();
  }, []);

  const [show, setShow] = useState({ slideKey: null, visible: false });
  const [editting, setEditting] = useState("");
  const [newItem, setNewItem] = useState("");

  const fetchCatalog = async () => {
    try {
      const response = await apiCatalog.getAnimaties();
      const responseCategory = await apiCatalog.getCategory();
      const responseLocation = await apiCatalog.getLocation();
      setData({
        Amenities: response,
        Category: responseCategory,
        Location: responseLocation,
      });
    } catch (error) {
      console.error("Error fetching catalog:", error);
    }
  };
  useEffect(() => {
    fetchCatalog();
  }, []);

  //--------------- add catalgo
  const handleAddAmenity = async () => {
    const response = await apiCatalog.addAnimaties(newItem);
    if (response.status === 201) {
      setShow({ slideKey: null, visible: false });
      setNewItem("");
      alert("Thêm thành công");
      window.location.reload();
    } else {
      alert("Không thể thêm");
    }
  };

  const handleAddCategory = async () => {
    const response = await apiCatalog.addCategory(newItem);
    if (response.status === 201) {
      setShow({ slideKey: null, visible: false });
      setNewItem("");
      alert("Thêm thành công");
      window.location.reload();
    } else {
      alert("Không thể thêm");
    }
  };

  const handleAddLocation = async () => {
    const response = await apiCatalog.addLocation(newItem);
    console.log(response);
    if (response.status === 201) {
      setShow({ slideKey: null, visible: false });
      setNewItem("");
      alert("Thêm thành công");
      window.location.reload();
    } else {
      alert("Không thể thêm");
    }
  };

  //--------------- update catalog
  const handleEditAmenity = async (_id) => {
    const response = await apiCatalog.updateAnimaties(_id, editting);
    if (response.status === 201) {
      setEditingIndex({ slideKey: null, itemIndex: null });
      alert("Cập nhật thành công");
      window.location.reload();
    } else {
      alert("Không thể cập nhật");
    }
  };

  const handleEditCategory = async (_id) => {
    const response = await apiCatalog.updateCategory(_id, editting);
    if (response.status === 201) {
      setEditingIndex({ slideKey: null, itemIndex: null });
      alert("Cập nhật thành công");
    } else {
      alert("Không thể cập nhật");
    }
  };

  const handleEditLocation = async (_id) => {
    const response = await apiCatalog.updateLocation(_id, editting);
    if (response.status === 201) {
      setEditingIndex({ slideKey: null, itemIndex: null });
      alert("Cập nhật thành công");
      window.location.reload();
    } else {
      alert("Không thể cập nhật");
    }
  };

  //--------------- delete catalog
  const handleDeleteAmenity = async (_id) => {
    const response = await apiCatalog.deleteAnimaties(_id);
    if (response.status === 201) {
      alert("Xoá thành công");
      window.location.reload();
    } else {
      alert("Không thể xoá");
    }
  };

  const handleDeleteCategory = async (_id) => {
    const response = await apiCatalog.deleteCategory(_id);
    if (response.status === 201) {
      alert("Xoá thành công");
      window.location.reload();
    } else {
      alert("Không thể xoá");
    }
  };

  const handleDeleteLocation = async (_id) => {
    const response = await apiCatalog.deleteLocation(_id);
    if (response.status === 201) {
      alert("Xoá thành công");
      window.location.reload();
    } else {
      alert("Không thể xoá");
    }
  };

  return (
    <div
      style={{
        overflowY: "auto",
        marginTop: "20px",
      }}
      className="container-fluid w-100"
    >
      {show.visible ? (
        <div className="form-input-password" onClick={() => setShow(false)}>
          <div className="col-9 col-xl-4" onClick={(e) => e.stopPropagation()}>
            <form className="form-style1">
              <div className="mb25">
                <div
                  className="d-flex justify-content-between"
                  style={{ marginLeft: "5px", marginRight: "5px" }}
                >
                  <label className="form-label h5 text-white fw600 ">
                    {show.slideKey === "Amenities"
                      ? "Tiện ích"
                      : show.slideKey === "Category"
                      ? "Loại bất động sản"
                      : "Vị trí"}
                  </label>
                  <label
                    className="form-label h5 text-white fw600 "
                    style={{ cursor: "pointer" }}
                    onClick={() => setShow(false)}
                  >
                    Huỷ
                  </label>
                </div>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`Nhập tên ${
                    show.slideKey === "Amenities"
                      ? "tiện ích"
                      : show.slideKey === "Category"
                      ? "loại bất động sản"
                      : "vị trí"
                  }`}
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  required
                />
              </div>

              <div className="d-grid mb20">
                {show.slideKey === "Amenities" ? (
                  <button
                    className="ud-btn btn-thm"
                    type="submit"
                    onClick={() => handleAddAmenity()}
                  >
                    Xác nhận <i className="fal fa-comment-sms" />
                  </button>
                ) : show.slideKey === "Category" ? (
                  <button
                    className="ud-btn btn-thm"
                    type="submit"
                    onClick={() => handleAddCategory()}
                  >
                    Xác nhận <i className="fal fa-comment-sms" />
                  </button>
                ) : (
                  <button
                    className="ud-btn btn-thm"
                    type="button"
                    onClick={() => handleAddLocation()}
                  >
                    Xác nhận <i className="fal fa-comment-sms" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      ) : null}
      <HeaderAD />
      <SidebarStickyBar />
      <div
        className="offcanvas offcanvas-start"
        tabIndex="-1"
        id="SidebarPanel"
        aria-labelledby="SidebarPanelLabel"
      >
        <SidebarPanel />
      </div>

      <div
        className="ms-3 ms-md-5 ps-md-5 text-black text-center"
        style={{ marginTop: "20px" }}
      >
        <p className="fw-bolder h1">Quản lý danh mục</p>
      </div>

      <div className="slide-managemant-Post">
        <Swiper
          className="swiper-Cata"
          effect={"slide"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
        >
          {Object.keys(data).map((key, index) => (
            <SwiperSlide
              key={index}
              className="w-full sm:w-[90%] md:w-[80%] mx-auto p-2"
            >
              <form className="form-catalog-AD">
                <div
                  className="form-catalog-AD-content"
                  style={{
                    overflowY: "auto",
                    scrollbarWidth: "none",
                    height: "70vh",
                  }}
                >
                  <div className="d-flex justify-content-between">
                    <span className="h3 text-center">
                      {key === "Amenities"
                        ? "Tiện ích"
                        : key === "Category"
                        ? "Loại bất động sản"
                        : "Vị trí"}
                    </span>
                    <button
                      type="button"
                      className="w-fit ud-btn btn-thm"
                      onClick={() => setShow({ slideKey: key, visible: true })}
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="row g-3 ">
                    {data[key] &&
                      data[key].map((item, itemIndex) => (
                        <div
                          className="col-12 col-md-4 border-end border-start text-center"
                          key={itemIndex}
                        >
                          <span
                            className="text-center"
                            style={{ fontSize: "17px" }}
                          >
                            • {item.Name}
                          </span>

                          {editingIndex.slideKey === key &&
                            editingIndex.itemIndex === itemIndex && (
                              <div className="row g-3 p-2">
                                <div className="col-9">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={item.Name}
                                    value={editting}
                                    onChange={(e) =>
                                      setEditting(e.target.value)
                                    }
                                  />
                                </div>
                                <div className="col-3 d-flex align-items-center">
                                  {key === "Amenities" ? (
                                    <button
                                      className="ud-btn btn-thm w-100"
                                      onClick={() => {
                                        handleEditAmenity(item._id, item.Name);
                                      }}
                                    >
                                      <span className="fa-solid fa-check text-center"></span>
                                    </button>
                                  ) : key === "Category" ? (
                                    <button
                                      type="button"
                                      className="ud-btn btn-thm w-100"
                                      onClick={() => {
                                        handleEditCategory(item._id, item.Name);
                                      }}
                                    >
                                      <span className="fa-solid fa-check text-center"></span>
                                    </button>
                                  ) : (
                                    <button
                                      className="ud-btn btn-thm w-100"
                                      onClick={() => {
                                        handleEditLocation(item._id, item.Name);
                                      }}
                                    >
                                      <span className="fa-solid fa-check text-center"></span>
                                    </button>
                                  )}
                                </div>
                              </div>
                            )}
                          <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-3">
                            {editingIndex.slideKey === key &&
                            editingIndex.itemIndex === itemIndex ? (
                              <button
                                type="button"
                                className="w-100 w-md-25 ud-btn btn-thm"
                                onClick={() =>
                                  setEditingIndex({
                                    slideKey: null,
                                    itemIndex: null,
                                  })
                                }
                              >
                                Huỷ
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="w-100 w-md-25 ud-btn btn-thm"
                                onClick={() =>
                                  setEditingIndex({ slideKey: key, itemIndex })
                                }
                              >
                                Sửa
                              </button>
                            )}
                            {key === "Amenities" ? (
                              <button
                                type="button"
                                className="w-100 w-md-25 ud-btn btn-White"
                                onClick={() => handleDeleteAmenity(item._id)}
                              >
                                Xoá
                              </button>
                            ) : key === "Category" ? (
                              <button
                                type="button"
                                className="w-100 w-md-25 ud-btn btn-White"
                                onClick={() => handleDeleteCategory(item._id)}
                              >
                                Xoá
                              </button>
                            ) : (
                              <button
                                type="button"
                                className="w-100 w-md-25 ud-btn btn-White"
                                onClick={() => handleDeleteLocation(item._id)}
                              >
                                Xoá
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </form>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
