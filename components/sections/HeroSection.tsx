"use client";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { ROUTES } from "@/routes/routes";
import Head from "next/head";
import {
  fadeInScale,
  scaleUpWithDelay,
  slideInLeftSlow,
} from "@/lib/animations/animations";

const HeroSection: React.FC = React.memo(() => {
  return (
    <section className="w-full h-screen max-h-[calc(100vh-16rem)] sm:max-h-[calc(100vh-11.5rem)] md:max-h-[calc(100vh-13rem)]  relative overflow-hidden  ">
      {
        <Head>
          <link rel="preload" href="/hero.webp" as="image" />
        </Head>
      }
      <motion.div
        {...fadeInScale}
        className="w-full h-full flex justify-end overflow-hidden relative"
      >
        {/* Background Image */}
        <Image
          src="/hero.webp"
          fill
          className="h-full w-auto object-contain object-right"
          alt="Фонове зображення коляски"
          priority={true}
          quality={75}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </motion.div>
      {/* Overlay Content */}
      <div className="absolute inset-0 z-10  dark-gradient">
        <div className=" px-10 py-10 sm:py-20  mx-auto flex flex-col   justify-between items-start gap-4 h-full">
          <div className="flex flex-col gap-2 sm:gap-10 items-center">
            <motion.h2
              {...slideInLeftSlow}
              className="text-4xl sm:text-6xl lg:text-8xl font-bold text-white/90 shadow-md py-2 sm:mb-6 mb-1"
            >
              Kolyska.if.ua
            </motion.h2>
            {/* Catalog Button */}
            <motion.div {...scaleUpWithDelay}>
              <Link href={ROUTES.catalog} aria-label="Перейти до каталогу">
                <div className="px-6 py-3 text-lg md:text-2xl font-semibold bg-accent text-black rounded-lg shadow-lg hover:bg-accent-hover transform duration-300 hover:scale-105">
                  Перейти до каталогу
                </div>
              </Link>
            </motion.div>
            {/* </div> */}
          </div>
          {/* Slogan */}
          <h3 className="md:pl-10 text-3xl sm:text-4xl  lg:text-6xl font-bold text-white/90 self-end dark-shadow text-end text-balance">
            Тільки найкращі товари для ваших дітей!
          </h3>
        </div>
      </div>
    </section>
  );
});
HeroSection.displayName = "HeroSection";
export default HeroSection;
