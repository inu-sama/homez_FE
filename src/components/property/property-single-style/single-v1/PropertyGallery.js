"use client";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";
import Image from "next/image";
import { apiProperties } from "@/apis/Properties";
import { useEffect, useState } from "react";

const PropertyGallery = ({ images }) => {
  const [pickedImage, setPickedImage] = useState(images[0]);
  const [isLaptop, setIsLaptop] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsLaptop(width >= 1000);
      console.log(isLaptop);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);
  return (
    <>
      <Gallery>
        <div className="col-sm-6">
          <div className="sp-img-content mb15-md">
            <div
              className="popup-img preview-img-1 sp-img"
              style={{
                maxWidth: isLaptop ? "none" : "591px",
                maxHeight: isLaptop ? "none" : "558px",
                minHeight: isLaptop ? "700px" : "none",
              }}
            >
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
          <div className="row h-100">
            {images.map((image, index) =>
              index < 4 ? (
                <div
                  className="col-6 p0"
                  key={index}
                  style={{ maxWidth: "310px", maxHeight: "345px" }}
                >
                  <div
                    className="sp-img-content p-1"
                    style={{ width: "100%", height: "100%" }}
                  >
                    <div
                      className={`popup-img preview-img-${
                        index + 2
                      } sp-img mb10`}
                      style={{ width: "100%", height: "100%" }}
                    >
                      <Item
                        original={image}
                        thumbnail={image}
                        width={270}
                        height={250}
                      >
                        {({ ref }) => (
                          <Image
                            width={270}
                            height={250}
                            ref={ref}
                            onClick={() => setPickedImage(image)}
                            role="button"
                            src={image}
                            alt={image.alt}
                            style={{
                              objectFit: "cover",
                              width: "100%",
                              height: "100%",
                              display: "block",
                            }}
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
