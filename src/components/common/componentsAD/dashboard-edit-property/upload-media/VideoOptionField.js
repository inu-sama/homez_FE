"use client";
import React, { useRef } from "react";

const VideoOptionField = ({ video, setVideo }) => {
  const fileInputRef = useRef(null);

  const handleUpload = (files) => {
    const file = files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setVideo(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleDelete = () => {
    setVideo(null);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    alignItems: "center",
    border: "1px dashed red",
    borderRadius: "20px",
    padding: "10px",
  };

  const videoPreviewStyle = {
    position: "relative",
    flex: 1, // Takes up remaining space
    marginBottom: "10px",
  };

  const videoDeleteBtnStyle = {
    position: "absolute",
    top: "10px",
    right: "10px",
    borderRadius: "50%",
    border: "none",
    background: "transparent",
    backgroundColor: "white",
  };

  const browseVideoBtnStyle = {
    marginRight: "10px",
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "flex-end", // Align the button to the right
    alignItems: "center",
  };

  return (
    <div className="row" style={containerStyle}>
      <div className="col-12 col-md-8" style={videoPreviewStyle}>
        <div className="col-4">
          {video && (
            <div className="profile-img mb20 position-relative">
              <video
                width={212}
                height={194}
                controls
                className="bdrs12"
                src={video}
              />
              <button
                className="tag-del"
                onClick={handleDelete}
                type="button"
                style={videoDeleteBtnStyle}
              >
                <span className="fas fa-trash-can" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Button Section */}
      <div className="col-4" style={buttonContainerStyle}>
        <div className="d-flex align-items-center justify-content-center">
          <button
            type="button"
            className="ud-btn btn-white"
            onClick={() => fileInputRef.current.click()}
            style={browseVideoBtnStyle}
          >
            Browse Video
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={(e) => handleUpload(e.target.files)}
            style={{ display: "none" }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoOptionField;
