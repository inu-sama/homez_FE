"use client";
import { Tooltip as ReactTooltip } from "react-tooltip";
import React, { useState, useRef } from "react";
import Image from "next/image";

const UploadPhotoGallery = ({ setData, data, setFilled }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const fileInputRef = useRef(null);

  const handleUpload = (files) => {
    const readers = [];
    const newImages = [];

    for (const file of files) {
      const reader = new FileReader();
      readers.push(
        new Promise((resolve) => {
          reader.onload = (e) => {
            newImages.push(e.target.result);
            resolve();
          };
        })
      );
      reader.readAsDataURL(file);
    }

    Promise.all(readers).then(() => {
      const updatedImages = [...uploadedImages, ...newImages];
      setUploadedImages(updatedImages);
      setData((prev) => ({
        ...prev,
        images: updatedImages,
      }));

      if (updatedImages.length >= 4) {
        setFilled([true, true, false, false, false]);
      }
    });
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
    fileInputRef.current.click();
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    newImages.splice(index, 1);
    setUploadedImages(newImages);
    setData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleDragStart = (e, index) => {
    e.dataTransfer.setData("dragIndex", index);
  };

  const handleDropToCover = (e) => {
    e.preventDefault();
    const draggedIndex = parseInt(e.dataTransfer.getData("dragIndex"), 10);
    if (!isNaN(draggedIndex) && draggedIndex !== 0) {
      const newImages = [...uploadedImages];
      const [draggedImg] = newImages.splice(draggedIndex, 1);
      newImages.unshift(draggedImg);
      setUploadedImages(newImages);
      setData((prev) => ({
        ...prev,
        images: newImages,
      }));
    }
  };

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
              onDrop={handleDropToCover}
              onDragOver={handleDragOver}
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
                data-tooltip-id={`delete-0`}
              >
                <span className="fas fa-trash-can" />
              </button>
              <ReactTooltip
                id={`delete-0`}
                place="right"
                content="Delete Image"
              />
            </div>
          )}

          {/* Ảnh phụ */}
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
                  onDragStart={(e) => handleDragStart(e, index)}
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
              accept="image/png, image/jpeg"
              className="ud-btn btn-white"
              onChange={(e) => handleUpload(e.target.files)}
              style={{ display: "none", outline: "none" }}
            />
          </label>
        </div>
      </div>
    </>
  );
};

export default UploadPhotoGallery;
