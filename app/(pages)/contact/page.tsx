import MapContainer from "@/components/MapContainer";
import Socials from "@/components/shared/socials/Socials";
import SectionTitle from "@/components/typography/SectionTitle";
import ContactForm from "@/components/ui/ContactForm";
import { CONTACTS, LOCATIONS } from "@/lib/data/constants";
import Image from "next/image";
import React from "react";

const Contact = () => {
  return (
    <main className="bg-white min-h-screen flex items-center justify-center px-4 py-12">
      <section className="w-full max-w-7xl mx-auto">
        <SectionTitle title="Контакти" className="text-center mb-12" />
        <div className="grid md:grid-cols-2 grid-cols-1 gap-8 mb-12">
          {LOCATIONS.map((location, index) => (
            <article
              key={index}
              className="bg-light-gray p-6 rounded-lg shadow-lg flex flex-col justify-between transition-transform hover:scale-105"
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
                    className="rounded-lg shadow-lg object-cover"
                  />
                </div>
                <MapContainer mapLink={location.mapLink} />
              </div>
            </article>
          ))}
        </div>
        <ContactForm />
        <div className="mt-12 bg-light-gray p-8 rounded-lg shadow-lg text-center ">
          <a
            href={`mailto:${CONTACTS.email.value}`}
            aria-label={CONTACTS.email.label}
            className="flex gap-2 items-center justify-center hover:scale-105 transition-transform duration-500  p-2 mx-auto"
          >
            <CONTACTS.email.icon className="text-2xl text-accent hover:text-accent-hover transition-colors " />
            {CONTACTS.email.value}
          </a>

          <a
            href={`tel:${CONTACTS.phone.value}`}
            aria-label={CONTACTS.phone.label}
            className="flex gap-2 items-center justify-center hover:scale-105 transition-transform duration-500 w-fit p-2 mx-auto"
          >
            <CONTACTS.phone.icon className="text-2xl text-accent hover:text-accent-hover transition-colors" />
            {CONTACTS.phone.value}
          </a>
          {/* Socials */}
          <Socials className="text-secondary hover:text-accent transition-colors duration-200" />
        </div>
      </section>
    </main>
  );
};

export default Contact;
