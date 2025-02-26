"use client";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { FaUser } from "react-icons/fa";
import { motion } from "motion/react";
import Link from "next/link";
import Modal from "@/components/shared/modals/Modal";
import LoadingSpinner from "@/components/shared/spiners/LoadingSpinner";
import DeleteButton from "@/components/shared/buttons/DeleteButton";
import { ROUTES } from "@/routes/routes";
import { scaleUpSlow } from "@/lib/animations/animations";

const adminName = process.env.NEXT_PUBLIC_ADMIN_NAME;
const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;
const UserProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session } = useSession();
  const userData = session?.user;

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
  const handleDeleteProfile = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/delete-user", {
        method: "DELETE",
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to delete user");

      await signOut({ redirect: false });
      router.push(ROUTES.home);
    } catch (err) {
      if (err instanceof Error) {
        if (err.message === "User not found") {
          await signOut({ redirect: false });
          router.push(ROUTES.home);
        } else {
          setError(err.message);
        }
      } else {
        console.error("An unexpected error occurred:", err);
      }
    } finally {
      setIsLoading(false);
      handleCloseModal();
    }
  }, [router, handleCloseModal]);

  return (
    <div className="flex items-center justify-center p-4 bg-gray-100 min-h-[calc(100vh-10.5rem)] sm:min-h-[calc(100vh-11.5rem)] md:min-h-[calc(100vh-13rem)]">
      <motion.div
        {...scaleUpSlow}
        className="w-full max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
      >
        {/* Profile Header */}
        <header className="bg-primary text-white py-6 px-6 text-center">
          <div className="relative w-24 h-24 mx-auto flex items-center justify-center rounded-full overflow-hidden border-4 border-white">
            {/* User Avatar */}
            {userData?.image ? (
              <Image
                src={userData.image}
                alt="User Avatar"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                priority
              />
            ) : (
              <FaUser className="text-5xl text-accent" />
            )}
          </div>
          <h2 className="text-2xl font-bold mt-4">{userData?.name}</h2>
        </header>

        {/* Profile Details */}
        <div className="p-6 space-y-6">
          {/* Email */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-gray-600 font-medium">Email:</span>
            <span className="text-gray-800 text-lg">{userData?.email}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-50 p-6 flex flex-col items-center">
          <div className="w-full flex justify-center flex-col sm:flex-row gap-4">
            {/* Back to Home Link */}
            <Link
              href={ROUTES.home}
              className="w-full bg-accent text-white py-3 px-1 font-medium rounded-lg hover:bg-accent/90 transition-colors duration-200 text-center"
            >
              ← Повернутися на головну
            </Link>

            {/* Remove Profile Button */}

            <DeleteButton label="Видалити профіль" onClick={handleOpenModal} />
          </div>
          {/* Admin Panel Link */}

          {adminName === userData?.name && adminEmail === userData?.email && (
            <Link
              href={ROUTES.adminDashboard}
              className="w-full bg-primary text-accent mt-6
             py-3 px-1 font-medium rounded-lg hover:bg-secondary transition-colors duration-200 text-center"
            >
              Admin Panel →
            </Link>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-100 text-red-600 text-center">{error}</div>
        )}

        {/* Confirmation Modal */}
        <Modal isOpen={isModalOpen}>
          <div className="p-6 text-center">
            <h3 className="text-xl font-bold mb-4">Видалити профіль?</h3>
            <p className="text-gray-600 mb-6">
              Ви впевнені, що хочете видалити свій профіль? Ця дія є
              незворотною.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleCloseModal}
                className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
              >
                Скасувати
              </button>
              <button
                onClick={handleDeleteProfile}
                disabled={isLoading}
                className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? <LoadingSpinner /> : "Видалити"}
              </button>
            </div>
          </div>
        </Modal>
      </motion.div>
    </div>
  );
};

export default UserProfile;
