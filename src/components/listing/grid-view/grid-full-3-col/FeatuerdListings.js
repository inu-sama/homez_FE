"use client";

import Image from "next/image";
import Link from "next/link";

const FeaturedListings = ({ data, colstyle, state }) => {
  return (
    <>
      {data.map((listing) => {
        if (listing.State == state) {
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
                    {listing.State == "Cho thuê" && (<span>/mo</span>)}
                  </div>
                </div>
                <div className="list-content">
                  <h6 className="list-title">{listing.Title}</h6>
                  <p className="list-text">{listing.Address}</p>
                  <div className="list-meta d-flex align-items-center">
                    <a href="#">
                      <span className="flaticon-bed" /> {listing.bed} bed
                    </a>
                    <a href="#">
                      <span className="flaticon-shower" /> {listing.bath} bath
                    </a>
                    <a href="#">
                      <span className="flaticon-expand" /> {listing.sqft} sqft
                    </a>
                  </div>
                  <hr className="mt-2 mb-2" />
                  <div className="list-meta2 d-flex justify-content-between align-items-center">
                    <span className="for-what">For Rent</span>
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
