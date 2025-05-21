"use client";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { apiProperties } from "@/apis/Properties";
import React, { useState, useEffect } from "react";

const FeaturedListings = () => {
  const [properties, setProperties] = useState([]);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getProperties();
      setProperties(response);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };
  useEffect(() => {
    fetchProperties();
  }, []);
  return (
    <>
      {properties.length > 0 && (
        <div>
          <Swiper
            className="overflow-hidden"
            spaceBetween={30}
            modules={[Navigation]}
            navigation={{
              nextEl: ".featured-next__active",
              prevEl: ".featured-prev__active",
            }}
            slidesPerView={1}
            breakpoints={{
              300: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            }}
          >
            {properties
              .filter((p) => p.highlight)
              .map((listing) => (
                <SwiperSlide key={listing._id}>
                  <Link
                    href={`/property-detail/${listing._id}`}
                    className="item"
                  >
                    <div className="listing-style9">
                      <div className="list-thumb">
                        <div
                          style={{
                            width: "382px",
                            height: "465px",
                            position: "relative",
                          }}
                        >
                          <Image
                            fill
                            style={{ objectFit: "cover" }}
                            src={listing.Images[0]}
                            alt="listings"
                          />
                        </div>
                        <div className="sale-sticker-wrap">
                          <div className="list-tag2 fz12">
                            {listing.State}
                          </div>
                        </div>

                        <div className="list-meta">
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

                      <div className="list-content">
                        <div className="list-price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(listing.Price)}
                          /<span>tháng</span>
                        </div>
                        <h6 className="list-title my-1">
                          <div>{listing.Title}</div>
                        </h6>
                        <div className="list-meta2 d-flex align-items-center">
                          <a href="#" className="mr10">
                            <span className="flaticon-bed mr5" />{" "}
                            {listing.Type.bedroom} bed
                          </a>
                          <a href="#" className="mr10">
                            <span className="flaticon-shower mr5" />{" "}
                            {listing.Type.bathroom} bath
                          </a>
                          <a href="#">
                            <span className="flaticon-expand mr5" />{" "}
                            {listing.Type.sqft} sqft
                          </a>
                        </div>
                      </div>
                    </div>
                  </Link>
                </SwiperSlide>
              ))}
          </Swiper>

          <div className="row align-items-center justify-content-between arrowY-center-position">
            <div className="col-auto">
              <button className="featured-prev__active swiper_button">
                <i className="far fa-arrow-left-long" />
              </button>
            </div>
            {/* End prev */}

            <div className="col-auto">
              <button className="featured-next__active swiper_button">
                <i className="far fa-arrow-right-long" />
              </button>
            </div>
            {/* End Next */}
          </div>
        </div>
      )}
    </>
  );
};

export default FeaturedListings;
