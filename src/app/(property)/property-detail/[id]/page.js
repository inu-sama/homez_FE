"use client";
import DefaultHeader from "@/components/common/DefaultHeader";
import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";
import EnergyClass from "@/components/property/property-single-style/common/EnergyClass";
import FloorPlans from "@/components/property/property-single-style/common/FloorPlans";
import HomeValueChart from "@/components/property/property-single-style/common/HomeValueChart";
import InfoWithForm from "@/components/property/property-single-style/common/more-info";
import NearbySimilarProperty from "@/components/property/property-single-style/common/NearbySimilarProperty";
import OverView from "@/components/property/property-single-style/common/OverView";
import PropertyAddress from "@/components/property/property-single-style/common/PropertyAddress";
import PropertyDetails from "@/components/property/property-single-style/common/PropertyDetails";
import PropertyFeaturesAminites from "@/components/property/property-single-style/common/PropertyFeaturesAminites";
import PropertyHeader from "@/components/property/property-single-style/common/PropertyHeader";
import PropertyNearby from "@/components/property/property-single-style/common/PropertyNearby";
import PropertyVideo from "@/components/property/property-single-style/common/PropertyVideo";
import PropertyViews from "@/components/property/property-single-style/common/property-view";
import PropertyDescriptions from "@/components/property/property-single-style/common/PropertyDescriptions";
import ReviewBoxForm from "@/components/property/property-single-style/common/ReviewBoxForm";
import VirtualTour360 from "@/components/property/property-single-style/common/VirtualTour360";
import AllReviews from "@/components/property/property-single-style/common/reviews";
import ContactWithAgent from "@/components/property/property-single-style/sidebar/ContactWithAgent";
import ScheduleTour from "@/components/property/property-single-style/sidebar/ScheduleTour";
import PropertyGallery from "@/components/property/property-single-style/single-v1/PropertyGallery";
import React, { useEffect, useState } from "react";
import MortgageCalculator from "@/components/property/property-single-style/common/MortgageCalculator";
import WalkScore from "@/components/property/property-single-style/common/WalkScore";
import { apiProperties } from "@/apis/Properties";

// export const metadata = {
//   title: "Property Single V1 || Homez - Real Estate NextJS Template",
// };

const SingleV1 = ({ params }) => {
  const [property, setProperty] = useState(null);

  const fetchProperties = async () => {
    try {
      const response = await apiProperties.getProperties();
      response.forEach((elm) => {
        if (elm._id == params.id) {
          setProperty(elm);
        }
      });
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Property All Single V1 */}
      {property ? (
        <section className="pt60 pb90 bgc-f7">
          <div className="container">
            <div className="row">
              <PropertyHeader property={property} />
            </div>
            {/* End .row */}

            <div className="row mb30 mt30">
              <PropertyGallery images={property.Images} />
            </div>
            {/* End .row */}

            <div className="row wrap">
              <div className="col-lg-8">
                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Tổng quan</h4>
                  <div className="row">
                    <OverView type={property.Type} />
                  </div>
                </div>
                {/* End .ps-widget */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Mô tả</h4>
                  <PropertyDescriptions data={property.Description} />
                  {/* End property description */}

                  <h4 className="title fz17 mb30 mt50">Chi tiết căn hộ</h4>
                  <div className="row">
                    <PropertyDetails property={property} />
                  </div>
                </div>
                {/* End .ps-widget */}

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30 mt30">Địa chỉ</h4>
                  <div className="row">
                    <PropertyAddress
                      address={property.Address}
                      location={property.Location}
                    />
                  </div>
                </div>
                {/* End .ps-widget */}

                {property.State == "Cho thuê" ? (
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                    <h4 className="title fz17 mb30">Tiện ích và dịch vụ</h4>
                    <div className="row">
                      <PropertyFeaturesAminites
                        amenities={property.Amenities}
                      />
                    </div>
                  </div>
                ) : null}
                {/* End .ps-widget */}

                {/* {property.Video ? (
                  <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 ">
                    <h4 className="title fz17 mb30">Video</h4>
                    <div className="row">
                      <PropertyVideo video={property.Video} />
                    </div>
                  </div>
                ) : null} */}
                {/* End .ps-widget */}

                {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">What&apos;s Nearby?</h4>
                  <div className="row">
                    <PropertyNearby />
                  </div>
                </div> */}
                {/* End .ps-widget */}

                {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Get More Information</h4>
                  <InfoWithForm />
                </div> */}
                {/* End .ps-widget */}

                {/* <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <div className="row">
                    <AllReviews />
                  </div>
                </div>

                <div className="ps-widget bgc-white bdrs12 default-box-shadow2 p30 mb30 overflow-hidden position-relative">
                  <h4 className="title fz17 mb30">Leave A Review</h4>
                  <div className="row">
                    <ReviewBoxForm />
                  </div>
                </div> */}
                {/* End .ps-widget */}
              </div>
              {/* End .col-8 */}

              <div className="col-lg-4">
                <div className="column">
                  <div className="default-box-shadow1 bdrs12 bdr1 p30 mb30-md bgc-white position-relative">
                    <h4 className="form-title mb5">Đặt lịch tham quan</h4>
                    <p className="text">Chọn thời gian mong muốn của bạn</p>
                    <ScheduleTour property={property} />
                  </div>

                  {/* <div className="agen-personal-info position-relative bgc-white default-box-shadow1 bdrs12 p30 mt30">
                    <div className="widget-wrapper mb-0">
                      <h6 className="title fz17 mb30">Get More Information</h6>
                      <ContactWithAgent />
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
            {/* End .row */}

            <div className="row mt30 align-items-center justify-content-between">
              <div className="col-auto">
                <div className="main-title">
                  <h2 className="title">Khám phá bất động sản liên quan</h2>
                  <p className="paragraph">
                    Danh sách bất động sản {property.State == "Cho thuê" ? "cho thuê" : "đăng bán"} tương tự
                  </p>
                </div>
              </div>
              {/* End header */}

              <div className="col-auto mb30">
                <div className="row align-items-center justify-content-center">
                  <div className="col-auto">
                    <button className="featured-prev__active swiper_button">
                      <i className="far fa-arrow-left-long" />
                    </button>
                  </div>
                  {/* End prev */}

                  <div className="col-auto">
                    <div className="pagination swiper--pagination featured-pagination__active" />
                  </div>
                  {/* End pagination */}

                  <div className="col-auto">
                    <button className="featured-next__active swiper_button">
                      <i className="far fa-arrow-right-long" />
                    </button>
                  </div>
                  {/* End Next */}
                </div>
                {/* End .col for navigation and pagination */}
              </div>
              {/* End .col for navigation and pagination */}
            </div>
            {/* End .row */}

            <div className="row">
              <div className="col-lg-12">
                <div className="property-city-slider">
                  <NearbySimilarProperty prop={property} />
                </div>
              </div>
            </div>
            {/* End .row */}
          </div>
          {/* End .container */}
        </section>
      ) : (
        <h2>Vui lòng chờ trong giây lát...</h2>
      )}
      {/* End Property All Single V1  */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default SingleV1;
