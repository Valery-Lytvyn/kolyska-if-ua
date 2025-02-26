"use client";
import LoadingSpinner from "@/components/shared/spiners/LoadingSpinner";

const Loader = () => {
  return (
    <main className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)] flex justify-center items-center">
      <LoadingSpinner />
    </main>
  );
};

export default Loader;
