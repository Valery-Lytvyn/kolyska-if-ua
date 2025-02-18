"use client";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const Loader = () => {
  return (
    <div className="w-full mx-auto relative z-10 bg-white overflow-hidden min-h-[calc(100vh-13rem)] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  );
};

export default Loader;
