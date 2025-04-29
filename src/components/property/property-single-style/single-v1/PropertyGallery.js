"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { apiProperties } from "@/apis/Properties";
import { useEffect, useState } from "react";

// const images = [
//   {
//     src: "/images/listings/listing-single-2.jpg",
//     alt: "2.jpg",
//   },
//   {
//     src: "/images/listings/listing-single-3.jpg",
//     alt: "3.jpg",
//   },
//   {
//     src: "/images/listings/listing-single-4.jpg",
//     alt: "4.jpg",
//   },
//   {
//     src: "/images/listings/listing-single-5.jpg",
//     alt: "5.jpg",
//   },
// ];

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
              width={610}
              height={510}
            >
              {({ ref, open }) => (
                <Image
                  src={pickedImage}
                  width={591}
                  height={558}
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
        <div className="row">
          {images.map((image, index) =>
            index < 4 ? (
              <div className="col-6 ps-sm-0" key={index}>
                <div className="sp-img-content">
                  <div
                    className={`popup-img preview-img-${
                      index + 2
                    } sp-img mb10`}
                  >
                    <Item
                      original={image}
                      thumbnail={image}
                      width={270}
                      height={250}
                    >
                      {({ ref, open }) => (
                        <Image
                          width={270}
                          height={250}
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
