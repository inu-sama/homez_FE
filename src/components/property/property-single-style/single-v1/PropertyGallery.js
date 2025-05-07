"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { apiProperties } from "@/apis/Properties";
import { useEffect, useState } from "react";

const PropertyGallery = ({ images }) => {
  const [pickedImage, setPickedImage] = useState(images[0]);

  return (
    <>
    <Gallery>
      <div className="col-sm-6">
        <div className="sp-img-content mb15-md">
          <div className="popup-img preview-img-1 sp-img">
            <Item
              original={pickedImage}
              thumbnail={pickedImage}
              width={0}
              height={0}
            >
              {({ ref, open }) => (
                <Image
                  src={pickedImage}
                  width={1920}
                  height={1080}
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

      <div className="col-sm-6">
        <div className="row h-100">
          {images.map((image, index) =>
            index < 4 ? (
              <div className="col-6 p0 h-50" key={index}>
                <div className="sp-img-content h-100 p-1">
                  <div
                    className={`popup-img preview-img-${
                      index + 2
                    } sp-img mb10 h-100`}
                  >
                    <Item
                      original={image}
                      thumbnail={image}
                      width={0}
                      height={0}
                    >
                      {({ ref }) => (
                        <Image
                          width={1920}
                          height={1080}
                          className="w-100 h-100 cover"
                          ref={ref}
                          onClick={() => setPickedImage(image)}
                          role="button"
                          src={image}
                          alt={image.alt}
                        />
                      )}
                    </Item>
                  </div>
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>
    </Gallery>
    </>
  );
};

export default PropertyGallery;
