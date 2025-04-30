"use client";
import React, { useState, useEffect } from "react";
import UploadPhotoGallery from "./UploadPhotoGallery";
import VideoOptionField from "./VideoOptionField";

const UploadMedia = ({ video, setVideo, setData }) => {
  return (
    <div className="ps-widget bgc-white bdrs12 p30 overflow-hidden position-relative">
      <h4 className="title fz17 mb30">Tải lên hình ảnh và video</h4>
      <form className="form-style1">
        <div className="row">
          <div className="col-lg-12">
            <UploadPhotoGallery setData={setData} />
          </div>
        </div>
        {/* End col-12 */}

        <div className="row">
          <h4 className="title fz17 mb30">Video</h4>
          <VideoOptionField video={video} setVideo={setVideo} />
        </div>
        {/* End .row */}
      </form>
    </div>
  );
};

export default UploadMedia;
