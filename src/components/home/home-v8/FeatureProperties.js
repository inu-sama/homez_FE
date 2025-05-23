"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { apiProperties } from "@/apis/Properties";
import React, { useState, useEffect } from "react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeatureProperties = () => {
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
          nextEl: ".featurePro_next__active",
          prevEl: ".featurePro_prev__active",
        }}
        pagination={{
          el: ".featurePro_pagination__active",
          clickable: true,
        }}
        slidesPerView={1}
      >
        {properties
          .filter((p) => p.highlight)
          .map((property) => (
            // <SwiperSlide key={property._id}>
            //   <div className="listing-style14 pt0-xs pr0-xs">
            //     <div className="list-content">
            //       <div className="d-flex mb30">
            //         <div className="list-tag fz12 mr20">
            //           <span className="flaticon-electricity me-2" />
            //           Nổi bật
            //         </div>
            //         <div className="list-tag2 fz12">{property.State}</div>
            //       </div>
            //       <h4 className="list-title">
            //         <Link href={`/property-detail/${property._id}`}>
            //           {property.Title}
            //         </Link>
            //       </h4>
            //       <p className="list-text fz15">{property.Location}</p>
            //       <div className="list-meta d-block d-sm-flex align-items-center mt30 mb40">
            //         <a className="d-flex mb-2 mb-sm-0 align-items-center">
            //           <span className="flaticon-bed" />
            //           {property.Type.bedroom}
            //         </a>
            //         <a className="d-flex mb-2 mb-sm-0 align-items-center">
            //           <span className="flaticon-shower" />
            //           {property.Type.bathroom}
            //         </a>
            //         <a className="d-flex align-items-center">
            //           <span className="flaticon-expand" />
            //           {property.Type.sqft} m²
            //         </a>
            //       </div>
            //       {/* End list-meta */}

            //       {/* <div className="row mb20">
            //         <div className="col-auto">
            //           <div className="contact-info">
            //             <p className="info-title ff-heading mb-2">
            //               Total Free Customer Care
            //             </p>
            //             <h6 className="info-phone">
            //               <a href="tel:+012305094502">+(0) 123 050 945 02</a>
            //             </h6>
            //           </div>
            //         </div>

            //         <div className="col-auto">
            //           <div className="contact-info">
            //             <p className="info-title ff-heading mb-2">
            //               Need Live Support?
            //             </p>
            //             <h6 className="info-mail">
            //               <a href="mailto:hi@homez.com">hi@homez.com</a>
            //             </h6>
            //           </div>
            //         </div>
            //       </div> */}
            //       {/* End .row */}

            //       <div className="row align-items-center justify-content-between">
            //         <div className="col-auto">
            //           <div className="list-meta2 mb15-xs">
            //             <h4 className="list-price mb-0">
            //               {new Intl.NumberFormat("vi-VN", {
            //                 style: "currency",
            //                 currency: "VND",
            //               }).format(property.Price)}
            //               {property.State === "Cho thuê" && <span>/tháng</span>}
            //             </h4>
            //           </div>
            //         </div>
            //         {/* End .row */}

            //         <div className="col-auto">
            //           <div className="list-meta2">
            //             <div className="icons d-flex align-items-center">
            //               <a href="#">
            //                 <span className="flaticon-fullscreen" />
            //               </a>
            //               <a href="#">
            //                 <span className="flaticon-new-tab" />
            //               </a>
            //               <a href="#">
            //                 <span className="flaticon-like" />
            //               </a>
            //             </div>
            //           </div>
            //         </div>
            //         {/* End .col-auto */}
            //       </div>
            //       {/* End .row */}

            //       <div className="list-meta2 d-flex justify-content-between align-items-center"></div>
            //     </div>
            //     {/* End list-content */}
            //   </div>
            // </SwiperSlide>
            <SwiperSlide key={property._id}>
              <a
                href={`https://nekohome.vn/property-detail/${property._id}`}
                className="item"
              >
                <div className="listing-style11">
                  <div className="col-lg-12">
                    <div className="list-thumb col-lg-6 col-xl-6 offset-xl-1 p-xl-0">
                      <Image
                        width={560}
                        height={610}
                        className="img-1 cover w-100 h-00"
                        src={property.Images[0]}
                        alt="property image"
                      />
                    </div>
                    <div
                      className="row align-items-center"
                      style={{ display: "flex", justifyContent: "right" }}
                    >
                      <div
                        className="list-content mb30-md col-md-8 col-lg-6 col-xl-5 p-xl-0"
                        style={{ textAlign: "left" }}
                      >
                        <div className="d-flex mb30">
                          <div className="list-tag2 fz12">{property.State}</div>
                        </div>
                        <h4 className="list-title">
                          <Link href={`/property-detail/${property._id}`}>
                            {property.Title}
                          </Link>
                        </h4>
                        <p className="list-text fz15">{property.Location}</p>
                        <div className="list-meta d-block d-sm-flex align-items-center mt30 mb40">
                          <a
                            className="d-flex mb-2 mb-sm-0 align-items-center"
                            href="#"
                          >
                            <span className="flaticon-bed" />
                            {property.Type.bedroom}
                          </a>
                          <a
                            className="d-flex mb-2 mb-sm-0 align-items-center"
                            href="#"
                          >
                            <span className="flaticon-shower" />
                            {property.Type.bathroom}
                          </a>
                          <a className="d-flex align-items-center" href="#">
                            <span className="flaticon-expand" />
                            {property.Type.sqft} m²
                          </a>
                        </div>
                        {/* End list-meta */}

                        <div className="row mb20">
                          <div className="col-auto">
                            <div className="contact-info">
                              <p className="info-title ff-heading mb-2">
                                Hotline miễn phí
                              </p>
                              <h6 className="info-phone">
                                <a href="tel:+84766934574">+(84) 766 934 574</a>
                              </h6>
                            </div>
                          </div>

                          <div className="col-auto">
                            <div className="contact-info">
                              <p className="info-title ff-heading mb-2">
                                Bạn cần hỗ trợ thêm?
                              </p>
                              <h6 className="info-mail">
                                <a href="mailto:contact.nekohome@gmail.com">
                                  contact.nekohome@gmail.com
                                </a>
                              </h6>
                            </div>
                          </div>
                        </div>
                        {/* End .row */}

                        <div className="row align-items-center justify-content-between">
                          <div className="col-auto">
                            <div className="list-meta2">
                              <h4 className="list-price mb-0">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(property.Price)}
                                {property.State === "Cho thuê" && (
                                  <span>/tháng</span>
                                )}
                              </h4>
                            </div>
                          </div>
                          {/* End .row */}

                          <div className="col-auto">
                            <div className="list-meta2">
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
                          {/* End .col-auto */}
                        </div>
                        {/* End .row */}

                        <div className="list-meta2 d-flex justify-content-between align-items-center"></div>
                      </div>
                      {/* End list-content */}
                      {/* End list-thumb */}
                    </div>
                    {/* End .row */}
                  </div>
                </div>
              </a>
            </SwiperSlide>
          ))}
      </Swiper>

      <div className="row align-items-center justify-content-start">
        <div className="col-auto">
          <button className="featurePro_prev__active swiper_button">
            <i className="far fa-arrow-left-long" />
          </button>
        </div>
        {/* End prev */}

        <div className="col-auto">
          <div className="pagination swiper--pagination featurePro_pagination__active" />
        </div>
        {/* End pagination */}

        <div className="col-auto">
          <button className="featurePro_next__active swiper_button">
            <i className="far fa-arrow-right-long" />
          </button>
        </div>
        {/* End Next */}
      </div>

      {/* End .col for navigation and pagination */}
    </>
  );
};

export default FeatureProperties;
