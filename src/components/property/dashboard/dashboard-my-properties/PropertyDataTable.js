"use client";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { apiProperties } from "@/apis/Properties";
import { apiUser } from "@/apis/management-User";
import { apiAuthen } from "@/apis/authen";

const getStatusStyle = (status) => {
  switch (status) {
    case "Pending":
      return "pending-style style1";
    case "Published":
      return "pending-style style2";
    case "Processing":
      return "pending-style style3";
    default:
      return "";
  }
};

const PropertyDataTable = ({ page }) => {
  const [prop, setProperty] = useState(null);
  const [user, setUser] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.listingPortUser();
      const filterUser = response.filter(
        (item) => item.Account[0]?.PhoneNumber == user.PhoneNumber
      );
      setProperty(filterUser);
      page.setTotalPage(Math.ceil(filterUser.length / 5));
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, [user]);

  const getCookie = (name) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
    return null;
  };

  const decodedToken = async () => {
    const token = getCookie("token");
    const userToken = await apiAuthen.getToken(token);
    setUser(userToken);
  };

  useEffect(() => {
    decodedToken();
  }, []);

  return (
    <>
      {prop && (
        <table className="table-style3 table at-savesearch">
          <thead className="t-head">
            <tr>
              <th scope="col">Bài đăng</th>
              <th scope="col">Kiểm duyệt</th>
              <th scope="col">Trạng thái</th>
              <th scope="col">Loại</th>
              <th scope="col">Tương tác</th>
            </tr>
          </thead>
          <tbody className="t-body">
            {prop
              .filter((p) => p.Title.includes(page.searchContent))
              .filter((p) => {
                switch (page.sorting) {
                  case "true":
                    return p.Approved;
                  case "false":
                    return !p.Approved;
                  default:
                    return p;
                }
              })
              .slice(page.min, page.max)
              .map((property) => (
                <tr key={property._id}>
                  <th scope="row">
                    <div className="listing-style1 dashboard-style d-xxl-flex align-items-center mb-0">
                      <div className="list-thumb">
                        <Image
                          width={110}
                          height={94}
                          className="w-100"
                          src={property.Images[0]}
                          alt="property"
                        />
                      </div>
                      <div className="list-content py-0 p-0 mt-2 mt-xxl-0 ps-xxl-4">
                        <div className="h6 list-title">
                          <Link href={`/property-edit/${property._id}`}>
                            {property.Title}
                          </Link>
                        </div>
                        <p className="list-text mb-0">{property.Location}</p>
                        <div className="list-price">
                          <a href="#">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(property.Price)}
                            {property.State == "Cho thuê" && (
                              <span>/tháng</span>
                            )}
                          </a>
                        </div>
                      </div>
                    </div>
                  </th>
                  <td className="vam">
                    {property.Approved ? "Đã duyệt" : "Chờ duyệt"}
                  </td>
                  <td className="vam">
                    <span className={getStatusStyle(property.State)}>
                      {property.State}
                    </span>
                  </td>
                  <td className="vam">{property.Type.category}</td>
                  <td className="vam">
                    <div className="d-flex">
                      <Link href={`property-edit/${property._id}`}>
                        <button
                          className="icon"
                          style={{ border: "none" }}
                          data-tooltip-id={`edit-${property._id}`}
                        >
                          <span className="fas fa-pen fa" />
                        </button>
                      </Link>

                      <button
                        className="icon"
                        style={{ border: "none" }}
                        data-tooltip-id={`delete-${property._id}`}
                      >
                        <span className="flaticon-bin" />
                      </button>

                      <ReactTooltip
                        id={`edit-${property._id}`}
                        place="top"
                        content="Chỉnh sửa"
                      />
                      <ReactTooltip
                        id={`delete-${property._id}`}
                        place="top"
                        content="Xóa"
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default PropertyDataTable;
