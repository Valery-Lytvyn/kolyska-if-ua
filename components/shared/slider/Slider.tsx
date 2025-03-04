"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import { motion } from "motion/react";
import "swiper/css";
import "swiper/css/navigation";
import { Offer } from "@/types/types";
import { sliderButtonVariants } from "@/lib/animations/animations";

interface CarouselProps {
  slides: Offer[];
  renderSlide: (slide: Offer, index: number) => React.ReactNode;
}

const Slider: React.FC<CarouselProps> = ({ slides, renderSlide }) => {
  return (
    <div className="relative w-full mx-auto grid grid-rows-1 gap-6 py-10">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={2000}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
          1280: {
            slidesPerView: 4,
          },
        }}
        className="w-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.$.id} className="h-full w-full py-6">
            {renderSlide(slide, index)}
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons with Framer Motion */}
      <motion.button
        className="swiper-button-prev"
        aria-label="Попередній слайд"
        {...sliderButtonVariants}
        style={{
          position: "absolute",
          top: "50%",
          left: "10px",
          zIndex: 10,
          cursor: "pointer",
          color: "var(--color-primary)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      ></motion.button>
      <motion.button
        className="swiper-button-next"
        aria-label="Наступний слайд"
        {...sliderButtonVariants}
        style={{
          position: "absolute",
          top: "50%",
          right: "10px",
          zIndex: 10,
          cursor: "pointer",
          color: "var(--color-primary)",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      ></motion.button>
    </div>
  );
};

export default Slider;
