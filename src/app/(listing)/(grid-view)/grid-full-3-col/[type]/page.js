import DefaultHeader from "@/components/common/DefaultHeader";

import Footer from "@/components/common/default-footer";
import MobileMenu from "@/components/common/mobile-menu";

import PropertyFiltering from "@/components/listing/grid-view/grid-full-3-col/PropertyFiltering";

import React from "react";

export const metadata = {
  title: "Gird Full 3 Column || Homez - Real Estate NextJS Template",
};

const GridFull3Col = ({ params }) => {
  return (
    <>
      {/* Main Header Nav */}
      <DefaultHeader />
      {/* End Main Header Nav */}

      {/* Mobile Nav  */}
      <MobileMenu />
      {/* End Mobile Nav  */}

      {/* Breadcumb Sections */}
      <section className="breadcumb-section bgc-f7">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcumb-style1">
                {params.type == "Rent" ? <h2 className="title">Danh sách căn hộ cho thuê</h2> : <h2 className="title">Danh sách căn hộ đăng bán</h2>}
                <div className="breadcumb-list">
                  <a href="#">Home</a>
                  {params.type == "Rent" ? <a href="#">Cho thuê</a> : <a href="#">Đăng bán</a>}
                </div>
                <a
                  className="filter-btn-left mobile-filter-btn d-block d-lg-none"
                  data-bs-toggle="offcanvas"
                  href="#listingSidebarFilter"
                  role="button"
                  aria-controls="listingSidebarFilter"
                >
                  <span className="flaticon-settings" /> Filter
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Breadcumb Sections */}

      {/* Property Filtering */}
      <PropertyFiltering type={params.type} />
      {/* Property Filtering */}

      {/* Start Our Footer */}
      <section className="footer-style1 pt60 pb-0">
        <Footer />
      </section>
      {/* End Our Footer */}
    </>
  );
};

export default GridFull3Col;
