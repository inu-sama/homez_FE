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

const PropertyDataTable = () => {
  const [prop, setProperty] = useState(null);
  const [user, setUser] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getProperties();
      const filterUser = response.filter(
        (item) => item.Account[0]?.PhoneNumber == user.PhoneNumber
      );
      setProperty(filterUser);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, [user]);

  useEffect(() => {
    decodedToken();
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

  return (
    <>
      {prop && (
        <table className="table-style3 table at-savesearch">
          <thead className="t-head">
            <tr>
              <th scope="col">Listing title</th>
              <th scope="col">Date Published</th>
              <th scope="col">Status</th>
              <th scope="col">View</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody className="t-body">
            {prop.map((property) => (
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
                        <a href="#">{property.Price}</a>
                      </div>
                    </div>
                  </div>
                </th>
                <td className="vam">today</td>
                <td className="vam">
                  <span className={getStatusStyle(property.State)}>
                    {property.State}
                  </span>
                </td>
                <td className="vam">12</td>
                <td className="vam">
                  <div className="d-flex">
                    <button
                      className="icon"
                      style={{ border: "none" }}
                      data-tooltip-id={`edit-${property._id}`}>
                      <span className="fas fa-pen fa" />
                    </button>
                    <button
                      className="icon"
                      style={{ border: "none" }}
                      data-tooltip-id={`delete-${property._id}`}>
                      <span className="flaticon-bin" />
                    </button>

                    <ReactTooltip
                      id={`edit-${property._id}`}
                      place="top"
                      content="Edi"
                    />
                    <ReactTooltip
                      id={`delete-${property._id}`}
                      place="top"
                      content="Delete"
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
