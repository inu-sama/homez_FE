"use client";
import React, { useState } from "react";
import ModalVideo from "react-modal-video";

const PropertyVideo = ({video}) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      {/* <ModalVideo
        channel="youtube"
        isOpen={isOpen}
        videoId="oqNZOOWF8qM"
        onClose={() => setOpen(false)}
      />

      <div className="col-md-12">
        <div className="property_video bdrs12 w-100">
          <button
            className="video_popup_btn mx-auto popup-img"
            onClick={() => setOpen(true)}
            style={{ border: "none", background: "transparent" }}
          >
            <span className="flaticon-play" />
          </button>
        </div>
      </div> */}
      <video width="320" height="240" controls>
        <source src={video.data} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </>
  );
};

export default PropertyVideo;
