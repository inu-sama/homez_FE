"use client";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const FeaturedHomes = () => {
  const featuredHomesData = [
    {
      id: 1,
      imageUrl: "/images/listings/cate-01.webp",
      title: "Chung cư",
      category: "Chung+cư",
    },
    {
      id: 2,
      imageUrl: "/images/listings/cate-02.webp",
      title: "Nhà phố",
      category: "Nhà+phố",
    },
    {
      id: 3,
      imageUrl: "/images/listings/cate-03.webp",
      title: "Văn phòng",
      category: "Văn+phòng",
    },
    {
      id: 4,
      imageUrl: "/images/listings/cate-04.webp",
      title: "Shop house",
      category: "Shop+house",
    },
  ];

  return (
    <>
      <Swiper
        spaceBetween={30}
        modules={[Navigation, Pagination]}
        navigation={{
          nextEl: ".properties_homes-next__active",
          prevEl: ".properties_homes-prev__active",
        }}
        pagination={{
          el: ".properties_homes_pagination__active",
          clickable: true,
        }}
        breakpoints={{
          300: {
            slidesPerView: 2,
            spaceBetween: 15,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 3,
          },
          1200: {
            slidesPerView: 4,
          },
        }}
      >
        {featuredHomesData.map((home) => (
          <SwiperSlide key={home.id}>
            <div className="item">
              <Link href={`/property-list/for-sale?category=${home.category}`}>
                <div className="apartment-style2 text-center mb30">
                  <div className="apartment-img">
                    <Image
                      width={270}
                      height={321}
                      className="cover"
                      src={home.imageUrl}
                      alt="homes"
                    />
                  </div>
                  <div className="apartment-content">
                    <h6 className="title mb-0">{home.title}</h6> 
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default FeaturedHomes;
