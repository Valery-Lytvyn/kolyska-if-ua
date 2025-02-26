"use client";
import React from "react";
import { motion } from "motion/react";
import CountUp from "react-countup";
import SectionTitle from "../typography/SectionTitle";
import SectionSlogan from "../typography/SectionSlogan";
import AdvantageTiles from "../advantageTiles/AdvantageTiles";

interface Counter {
  value: number;
  label: string;
  suffix: string;
}

const counters: Counter[] = [
  { value: 20, label: "років на ринку", suffix: "+" },
  { value: 1000, label: "товарів у каталозі", suffix: "+" },
  { value: 6000, label: "задоволених малюків", suffix: "+" },
];

const ShopBlurbSection: React.FC = React.memo(() => {
  return (
    <section className="relative min-h-screen bg-white py-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 max-w-7xl">
        <div className="text-center mb-12">
          <SectionTitle title="Чому обирають Kolyska.if.ua" />
          <SectionSlogan slogan="Найкращі пропозиції для комфортного дитинства" />
        </div>

        {/* Counters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          {counters.map(({ value, label, suffix }, index) => (
            <motion.div
              key={value}
              className="bg-light-gray p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 space-y-4 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.2,
                ease: "easeInOut",
              }}
              viewport={{ once: true }}
            >
              <CountUp
                start={0}
                end={value}
                duration={3}
                delay={0}
                suffix={suffix}
              >
                {({ countUpRef }) => (
                  <span
                    className="text-5xl font-bold text-accent"
                    ref={countUpRef}
                  />
                )}
              </CountUp>
              <p className="text-secondary text-lg uppercase font-bold">
                {label}
              </p>
            </motion.div>
          ))}
        </div>

        <AdvantageTiles />
      </div>
    </section>
  );
});
ShopBlurbSection.displayName = "ShopBlurbSection";

export default ShopBlurbSection;
