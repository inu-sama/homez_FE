"use client";
import SidebarStickyBar from "@/components/home/home-v8/SidebarStickyBar";
import SidebarPanel from "@/components/common/sidebar-panel";
import HeaderAD from "@/components/common/componentsAD/HeaderAD";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiProperties } from "@/apis/Properties";
import formatVND from "@/components/common/formattingVND";
import OverView from "@/components/property/property-single-style/common/OverView";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Search from "@/components/common/componentsAD/SearchPost";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import { apiAuthen } from "@/apis/authen";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import ListProperty from "@/components/common/componentsAD/ListProperty";

export default function ManagementPost() {
  const [data, setData] = useState([]);
  const [result, setResult] = useState([]);
  const router = useRouter();
  const [role, setRole] = useState("");
  const [open, setOpen] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);
  const [counter, setCounter] = useState(0);
  const [localHighlight, setLocalHighlight] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateIn(true);
    }, 200);

    return () => clearTimeout(timer);
  }, []);

  const handleHighlight = async (item) => {
    const isCurrentlyHighlighted = item.highlight === true;

    const highlightCount = data.filter((x) => x.highlight).length;

    const updatedData = data.map((p) =>
      p._id === item._id ? { ...p, highlight: !p.highlight } : p
    );

    let count = 0;
    const withIndex = updatedData.map((x) =>
      x.highlight
        ? { ...x, highlightIndex: ++count }
        : { ...x, highlightIndex: null }
    );

    setData(withIndex);
    setResult(withIndex);

    try {
      if (isCurrentlyHighlighted) {
        setCounter(counter - 1);
        await apiProperties.addHightlight(item._id);
      } else {
        setCounter(counter + 1);
        await apiProperties.addHightlight(item._id);
      }
    } catch (err) {
      console.error("Lỗi khi thay đổi trạng thái highlight", err);
    }
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  const checkRole = async () => {
    try {
      const token = getCookie("token");

      if (!token) {
        console.warn("Không tìm thấy token trong cookie.");
        setRole("");
        return;
      }

      const res = await apiAuthen.getToken2(token);

      if (res.status === 200) {
        setRole(res.data.role);
      } else {
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

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getPropertiesAD();
      setData(response);
      setResult(response);
    } catch (error) {
      setData([]);
      setResult([]);
    }
  };

  const fetchListing = async () => {
    try {
      const response = await apiProperties.getProperties();
      let highlightCount = 0;
      const processed = response.map((item) => {
        if (item.highlight) {
          highlightCount++;
          return { ...item, highlightIndex: highlightCount };
        }
        return { ...item };
      });
      setData(processed);
      setResult(processed);
      setCounter(highlightCount);
    } catch (error) {
      setData([]);
      setResult([]);
    }
  };

  useEffect(() => {
    if (open == false) {
      fetchProperties();
    } else {
      fetchListing();
    }
  }, []);

  const handleApprove = async (id) => {
    const response = await apiProperties.ApproveProperty(id);
    if (response.status === 201) {
      window.location.reload();
    }
  };
  const handleDelete = async (id) => {
    const response = await apiProperties.DeleteProperty(id);
    if (response.status === 201) {
      window.location.reload();
    }
  };
  return (
    <div style={{ marginTop: "20px", width: "100%" }}>
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
        className="ms-3 ms-md-5 ps-md-5 text-black text-center "
        style={{ marginTop: "20px", width: "100%" }}
      >
        <p className="fw-bolder h1" style={{ fontFamily: "inherit" }}>
          Quản lý bài đăng
        </p>
        <div
          className="row"
          style={{
            justifyContent: "center",
            width: "90%",
            paddingLeft: "10px",
          }}
        >
          <div
            className="col row"
            style={{
              marginLeft: "5%",
              padding: "5px",
              width: "10%",
              borderRadius: "20px",
              backgroundColor: "#F3F3F2",
            }}
          >
            <span
              className="col"
              style={{
                textAlign: "center",
                alignContent: "center",
                padding: "5px 20px",
                marginRight: "1px",
                borderRadius: "20px",
                backgroundColor: open ? "" : "#EB6753",
                cursor: "pointer",
                color: open ? "" : "white",
                fontWeight: "bolder",
                transition: "background-color 0.5s ease",
              }}
              onClick={() => {
                fetchProperties();
                setOpen(false);
              }}
            >
              Duyệt
            </span>
            <span
              className="col"
              style={{
                textAlign: "center",
                alignContent: "center",
                padding: "5px 20px",
                borderRadius: "20px",
                backgroundColor: open ? "#EB6753" : "",
                cursor: "pointer",
                color: open ? "white" : "",
                fontWeight: "bold",
                transition: "background-color 0.5s ease",
              }}
              onClick={() => {
                fetchListing();
                setOpen(true);
              }}
            >
              Tất cả
            </span>
          </div>
          <div className="col-10">
            <Search data={data} result={setResult} />
          </div>
        </div>
      </div>

      {open ? (
        <div
          style={{
            width: "100%",
            marginLeft: "4%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ width: "90%" }}>
            <table
              className="table table-striped"
              style={{ tableLayout: "fixed", width: "100%" }}
            >
              <thead>
                <tr className="align-middle">
                  <th scope="col" style={{ width: "50px" }}>
                    STT
                  </th>
                  <th scope="col">Tên</th>
                  <th
                    scope="col"
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Bài đăng
                  </th>
                  <th
                    scope="col"
                    style={{ width: "130px", textAlign: "center" }}
                  >
                    Loại căn hộ
                  </th>
                  <th
                    scope="col"
                    style={{ width: "130px", textAlign: "center" }}
                  >
                    Trạng thái
                  </th>
                  <th
                    scope="col"
                    style={{ width: "90px", textAlign: "center" }}
                  >
                    Nổi bật
                  </th>
                  <th
                    scope="col"
                    style={{ width: "280px", textAlign: "center" }}
                  >
                    Thao tác
                  </th>
                </tr>
              </thead>
            </table>

            <div
              style={{
                maxHeight: "80vh",
                overflowY: "auto",
              }}
            >
              <table
                className="table table-striped"
                style={{ tableLayout: "fixed", width: "100%" }}
              >
                <tbody>
                  {(result.length > 0 ? result : data).map((item, index) => (
                    <tr key={index} className="align-middle">
                      <td style={{ width: "50px", textAlign: "center" }}>
                        {index + 1}
                      </td>
                      <td>{item.Title}</td>
                      <td style={{ width: "90px", textAlign: "center" }}>
                        <a
                          href={`https://nekohome.vn/property-detail/${item._id}`}
                        >
                          Link
                        </a>
                      </td>
                      <td style={{ width: "130px", textAlign: "center" }}>
                        {item.Type.category}
                      </td>
                      <td style={{ width: "130px", textAlign: "center" }}>
                        {item.State}
                      </td>
                      <td style={{ width: "90px", textAlign: "center" }}>
                        <i
                          className={
                            item.highlight
                              ? "fa-solid fa-star"
                              : "fa-regular fa-star"
                          }
                          style={{
                            color: "#FFD43B",
                            fontSize: "25px",
                            cursor: "pointer",
                            position: "relative",
                            display: "flex",
                            justifyContent: "center",
                          }}
                          onClick={() => handleHighlight(item)}
                        >
                          {item.highlight && (
                            <span
                              style={{
                                position: "absolute",
                                fontSize: "10px",
                                top: "0",
                                color: "#fff",
                                zIndex: "100",
                                fontWeight: "bold",
                              }}
                            >
                              {item.highlightIndex}
                            </span>
                          )}
                        </i>
                      </td>
                      <td style={{ width: "280px" }}>
                        {role === "Admin" && (
                          <div className="d-flex gap-2">
                            <Link
                              className="ud-btn btn-thm"
                              href={`/ADPostEdit/${item._id}`}
                            >
                              Chỉnh sửa
                            </Link>
                            <button
                              className="ud-btn btn-white"
                              onClick={() => handleDelete(item._id)}
                            >
                              Xoá Bài
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="slide-managemant-Post">
          <Swiper
            className="slide-managemant-Post-swiper"
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            modules={[EffectCoverflow, Pagination]}
          >
            {(result.length > 0 ? result : data).map((item) => (
              <SwiperSlide
                key={item._id}
                className={animateIn ? "fade-in-slide" : ""}
              >
                <form className="form-style-AD" key={item._id}>
                  <div>
                    <p className="h3 text-center">
                      {item.Account[0]?.FirstName}
                      {item.Account[0]?.PhoneNumber}
                    </p>
                  </div>
                  <div className="row mb30 mt30">
                    <PropertyGallery images={item.Images} />
                  </div>
                  <div className="infor-property-AD">
                    <PropertyHeader property={item} />
                    <div>
                      <p
                        className="h3"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        Thành phần cơ bản
                      </p>
                      <div className="row" style={{ marginLeft: "20px" }}>
                        <OverView type={item.Type} />
                      </div>
                    </div>
                    {Array.isArray(item.Amenities) &&
                      item.Amenities.length > 0 && (
                        <div>
                          <p
                            className="h3"
                            style={{ marginLeft: "5px", marginTop: "10px" }}
                          >
                            Tiện ích
                          </p>
                          <div
                            className="row g-3"
                            style={{ marginLeft: "30px" }}
                          >
                            {item.Amenities.map((amenity, index) => (
                              <div key={index} className="col-sm-4 col-6">
                                <span style={{ fontSize: "17px" }}>
                                  • {amenity}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    <div>
                      <p
                        className="h3"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        Mô tả
                      </p>
                      <p style={{ marginLeft: "40px" }}>- {item.Description}</p>
                      <p
                        className="h3"
                        style={{ marginLeft: "5px", marginTop: "10px" }}
                      >
                        Chi tiết căn hộ
                      </p>
                      <div style={{ marginLeft: "40px" }}>
                        <PropertyDetails property={item} />
                      </div>
                    </div>

                    <div className="d-flex flex-column flex-md-row justify-content-between gap-2 mt-3">
                      {role === "Admin" && (
                        <Link
                          className="w-100 w-md-25 ud-btn btn-white"
                          href={`/ADPostEdit/${item._id}`}
                        >
                          Chỉnh sửa
                        </Link>
                      )}
                      {!open && (
                        <button
                          type="button"
                          className="w-100 w-md-25 ud-btn btn-thm"
                          onClick={() => handleApprove(item._id)}
                        >
                          Duyệt bài
                        </button>
                      )}
                      {role === "Admin" && (
                        <button
                          className="w-100 w-md-25 ud-btn btn-white"
                          onClick={() => handleDelete(item._id)}
                        >
                          Xoá Bài
                        </button>
                      )}
                    </div>
                  </div>
                </form>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}
