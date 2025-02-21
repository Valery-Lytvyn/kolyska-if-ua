import MapContainer from "@/components/MapContainer";
import SectionTitle from "@/components/typography/SectionTitle";
import { locations } from "@/lib/data";
import Image from "next/image";
import React from "react";
import { FaFacebookF, FaInstagram } from "react-icons/fa";

const Contact = () => {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4">
      <section className="w-full max-w-7xl mx-auto py-12 text-center">
        <SectionTitle title="Контакти" />
        <div className="grid md:grid-cols-2  grid-cols-1 gap-8 mt-4">
          {locations.map((location, index) => (
            <div
              key={index}
              className="bg-light-gray p-6 rounded-lg shadow-lg flex flex-col justify-between"
            >
              <h3 className="text-xl font-semibold text-secondary mb-2">
                {location.name}
              </h3>
              <p className="text-primary mb-4">{location.address}</p>
              <div className="flex flex-col gap-4">
                <div className="h-72 w-full relative">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    priority
                    quality={75}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg shadow-lg object-cover "
                  />
                </div>
                <MapContainer mapLink={location.mapLink} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 bg-light-gray p-6 rounded-lg shadow-lg text-center">
          <h3 className="text-xl font-semibold text-secondary mb-4">
            Зв&apos;язатися з нами
          </h3>
          <p className="flex items-center justify-center gap-2 text-primary">
            <a
              href="mailto:kolyskaifua@gmail.com"
              className="w-5 h-5 text-accent"
            />{" "}
            kolyskaifua@gmail.com
          </p>
          <p className="flex items-center justify-center gap-2 text-primary mt-2">
            <a href="tel:+380662958583" className="w-5 h-5 text-accent" />{" "}
            +380662958583
          </p>
          <div className="flex gap-4 mt-6 justify-center">
            <a
              href="#"
              className="hover:text-accent transition-colors duration-200"
            >
              <FaFacebookF className="text-2xl" />
            </a>
            <a
              href="#"
              className=" hover:text-accent transition-colors duration-200"
            >
              <FaInstagram className="text-2xl" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;
