"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useImageSize } from "../../../useImageSize";

const PropertyGallery = ({ images }) => {
  const mainImageSize = useImageSize(images[0]);
  return (
    <>
      <Gallery>
        <div className="col-sm-9">
          <div className="sp-img-content mb15-md ">
            <div className="popup-img preview-img-1 sp-img ">
              <Item
                original={images[0]}
                thumbnail={images[0]}
                width={mainImageSize.width}
                height={mainImageSize.height}
              >
                {({ ref, open }) => (
                  <Image
                    src={images[0]}
                    width={890}
                    height={680}
                    ref={ref}
                    onClick={open}
                    alt="image"
                    role="button"
                    className="w-100 h-100 cover"
                  />
                )}
              </Item>
            </div>
          </div>
        </div>
        {/* End .col-6 */}

        <div className="col-sm-3">
          <div className="row">
            {images.slice(1, 3).map((image, index) => {
              const { width, height } = useImageSize(image);
              return (
                <div className="col-sm-12 ps-lg-0" key={image}>
                  <div className="sp-img-content at-sp-v10">
                    <div
                      className={`popup-img preview-img-2 sp-img${
                        index < 2 ? " mb10" : ""
                      }`}
                    >
                      <Item
                        original={image}
                        thumbnail={image}
                        width={width}
                        height={height}
                      >
                        {({ ref, open }) => (
                          <Image
                            width={270}
                            height={250}
                            className="w-100 h-100 cover"
                            ref={ref}
                            onClick={open}
                            role="button"
                            src={image}
                            alt={`Image ${index + 1}`}
                          />
                        )}
                      </Item>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="d-none">
          {images.slice(3).map((image, index) => {
            const { width, height } = useImageSize(image);
            return (
              <Item
                key={`hidden-${image}`}
                original={image}
                thumbnail={image}
                width={width}
                height={height}
              >
                {({ ref, open }) => (
                  <Image
                    width={270}
                    height={250}
                    className="w-100 h-100 cover"
                    ref={ref}
                    onClick={open}
                    role="button"
                    src={image}
                    alt={`Image ${index + 1}`}
                  />
                )}
              </Item>
            );
          })}
        </div>
      </Gallery>
    </>
  );
};

export default PropertyGallery;
