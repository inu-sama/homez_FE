"use client";
import listings from "@/data/listings";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { apiProperties } from "@/apis/Properties";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useEffect, useState } from "react";

const NearbySimilarProperty = ({ prop }) => {
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
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".featured-next__active",
          prevEl: ".featured-prev__active",
        }}
        pagination={{
          el: ".featured-pagination__active",
          clickable: true,
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
          .filter((p) => p._id != prop._id)
          .filter((p) => p.State == prop.State)
          .map((listing) => (
            <SwiperSlide key={listing._id}>
              <Link href={`/property-detail/${listing._id}`} className="item">
                <div className="listing-style1">
                  <div className="list-thumb">
                    <Image
                      width={1920}
                      height={1080}
                      className="w-100 h-100 cover"
                      src={listing.Images[0]}
                      alt="listings"
                    />
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
                        m²
                      </a>
                    </div>
                    <hr className="mt-2 mb-2" />
                    <div className="list-meta2 d-flex justify-content-between align-items-center">
                      <span className="for-what">{listing.State}</span>
                      <div className="icons d-flex align-items-center">
                        <a>
                          <span className="flaticon-fullscreen" />
                        </a>
                        <a>
                          <span className="flaticon-new-tab" />
                        </a>
                        <a>
                          <span className="flaticon-like" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))
          .slice(0, 5)}
      </Swiper>
    </>
  );
};

export default NearbySimilarProperty;
