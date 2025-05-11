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
      imageUrl: "/images/listings/as-2.jpg",
      title: "Chung cư",
      description: "22 Properties",
    },
    {
      id: 2,
      imageUrl: "/images/listings/as-7.jpg",
      title: "Nhà ở",
      description: "22 Properties",
    },
    {
      id: 3,
      imageUrl: "/images/listings/as-8.jpg",
      title: "Văn phòng",
      description: "22 Properties",
    },
    {
      id: 4,
      imageUrl: "/images/listings/as-9.jpg",
      title: "Vila",
      description: "22 Properties",
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
              <Link href="/property-list/for-sale">
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
