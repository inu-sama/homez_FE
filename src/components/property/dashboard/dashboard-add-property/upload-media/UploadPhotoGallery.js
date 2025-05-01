"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";

const UploadPhotoGallery = ({ data }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);
  data.images = uploadedImages;

  const handleUpload = (files) => {
    const newImages = [...uploadedImages];

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = (e) => {
        newImages.push(e.target.result);
        setUploadedImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    handleUpload(files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleButtonClick = () => {
    // Programmatically trigger the hidden file input
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
  };

  // useEffect(() => {
  //   setData((prev) => ({
  //     ...prev,
  //     images: uploadedImages,
  //   }));
  // }, [uploadedImages]);

  return (
    <>
      <div
        className="upload-img position-relative overflow-hidden bdrs12 text-center mb30 px-2 row"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <div className="profile-box position-relative d-md-flex align-items-center">
          {uploadedImages[0] && (
            <div
              className="col-sm-4 col-12 flex-shrink-0"
              onDrop={(e) => {
                e.preventDefault();

                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                  handleUpload(e.dataTransfer.files, true);
                  return;
                }

                const draggedIndex = parseInt(
                  e.dataTransfer.getData("dragIndex")
                );
                if (!isNaN(draggedIndex) && draggedIndex !== 0) {
                  const newImages = [...uploadedImages];
                  const [draggedImage] = newImages.splice(draggedIndex, 1);
                  newImages.unshift(draggedImage);
                  setUploadedImages(newImages);
                  setData((prev) => ({
                    ...prev,
                    images: newImages,
                  }));
                }
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="profile-img mb20 position-relative">
                <Image
                  width={212}
                  height={194}
                  style={{ padding: "0 2px" }}
                  className="w-100 bdrs12 cover"
                  src={uploadedImages[0]}
                  alt="Main Image"
                />
                <span className="position-absolute top-0 end-0 badge bg-success m-2">
                  Ảnh bìa
                </span>
              </div>
              <button
                style={{ border: "none", marginLeft: "10px" }}
                className="tag-del"
                title="Delete Image"
                onClick={() => handleDelete(0)}
                type="button"
                data-tooltip-id={`delete-${0}`}
              >
                <span className="fas fa-trash-can" />
              </button>
            </div>
          )}

          {/* Ảnh phụ (Scroll ngang) */}
          <div
            className="d-flex overflow-auto gap-2 ms-3 col-sm-8 col-12"
            style={{ maxWidth: "100%" }}
          >
            {uploadedImages.slice(1).map((imageData, i) => {
              const index = i + 1;
              return (
                <div
                  className="flex-shrink-0"
                  key={index}
                  draggable
                  onDragStart={(e) => {
                    e.dataTransfer.setData("dragIndex", index);
                  }}
                >
                  <div className="profile-img mb20 position-relative">
                    <Image
                      width={170}
                      height={194}
                      className=" bdrs12 cover"
                      src={imageData}
                      alt={`Uploaded Image ${index}`}
                    />
                    <button
                      style={{ border: "none" }}
                      className="tag-del"
                      title="Delete Image"
                      onClick={() => handleDelete(index)}
                      type="button"
                      data-tooltip-id={`delete-${index}`}
                    >
                      <span className="fas fa-trash-can" />
                    </button>
                    <ReactTooltip
                      id={`delete-${index}`}
                      place="right"
                      content="Delete Image"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-sm-12">
          <h4 className="title fz17 mb10">Tải ảnh lên</h4>
          <p className="text mb25">Định dạng ảnh phải là JPEG hoặc PNG</p>
          <label className="ud-btn btn-white">
            Browse Files
            <input
              ref={fileInputRef}
              id="fileInput"
              type="file"
              multiple
              className="ud-btn btn-white"
              onChange={(e) => handleUpload(e.target.files)}
              style={{ display: "none", outline: "none" }}
            />
          </label>
        </div>
      </div>

      {/* Display uploaded images */}
    </>
  );
};

export default UploadPhotoGallery;
