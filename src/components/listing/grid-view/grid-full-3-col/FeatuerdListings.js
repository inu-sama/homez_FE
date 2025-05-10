"use client";

import { sort } from "@/data/mobileMenuItems";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const FeaturedListings = ({ data, colstyle, state, filterFunctions }) => {
  return (
    <>
      {data
        .sort(filterFunctions.sortFunction)
        .filter((p) =>
          filterFunctions.propertyTypes != ""
            ? p.Type.category == filterFunctions.propertyTypes
            : p
        )
        // .filter((p) => Number(p.Price) >= filterFunctions.priceRange[0] && Number(p.Price) <= filterFunctions.priceRange[1])
        .filter((p) =>
          filterFunctions.bedrooms != 0
            ? p.Type.bedroom >= filterFunctions.bedrooms
            : p
        )
        .filter((p) =>
          filterFunctions.bathrooms != 0
            ? p.Type.bathroom >= filterFunctions.bathrooms
            : p
        )
        .map((listing) => {
          if (listing.State == state) {
            console.log("Year" + listing.Type.yearBuilt);
            return (
              <Link
                href={"/property-detail/" + listing._id}
                className={` ${
                  colstyle ? "col-sm-12 col-lg-6" : "col-sm-6 col-lg-4"
                }  `}
                key={listing._id}
              >
                <div
                  className={
                    colstyle
                      ? "listing-style1 listCustom listing-type"
                      : "listing-style1"
                  }
                >
                  <div className="list-thumb">
                    <Image
                      width={382}
                      height={248}
                      className="w-100  cover"
                      style={{ height: "230px" }}
                      src={listing.Images[0]}
                      alt="listings"
                    />
                    <div className="sale-sticker-wrap">
                      {!listing.forRent && (
                        <div className="list-tag fz12">
                          <span className="flaticon-electricity me-2" />
                          FEATURED
                        </div>
                      )}
                    </div>

                    <div className="list-price">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(listing.Price)}
                      {listing.State == "Cho thuê" && <span>/mo</span>}
                    </div>
                  </div>
                  <div className="list-content">
                    <h6 className="list-title">{listing.Title}</h6>
                    <p className="list-text">{listing.Address}</p>
                    <div className="list-meta d-flex align-items-center">
                      <a href="#">
                        <span className="flaticon-bed" /> {listing.Type.bedroom}{" "}
                        bed
                      </a>
                      <a href="#">
                        <span className="flaticon-shower" />{" "}
                        {listing.Type.bathroom} bath
                      </a>
                      <a href="#">
                        <span className="flaticon-expand" /> {listing.Type.sqft}{" "}
                        sqft
                      </a>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="list-meta2 d-flex justify-content-between align-items-center">
                      <span className="for-what">{listing.State}</span>
                      <div className="icons d-flex align-items-center">
                        <a href="#">
                          <span className="flaticon-fullscreen" />
                        </a>
                        <a href="#">
                          <span className="flaticon-new-tab" />
                        </a>
                        <a href="#">
                          <span className="flaticon-like" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          }
        })}
    </>
  );
};

export default FeaturedListings;
