"use client";
import React, { useState, useEffect } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionField from "./VideoOptionField";

const UploadMedia = ({ setData, data, property }) => {
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Tải lên hình ảnh</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery setData={setData} data={data} property={property} />
          </div>
        </div>
        {/* End col-12 */}
        {/* End .row */}
      </form>
    </div>
  );
};

export default UploadMedia;
