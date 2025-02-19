import React from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "motion/react";
import { IoLogInOutline, IoLogOutOutline } from "react-icons/io5";
import Image from "next/image";

const AuthButton = React.memo(() => {
  const router = useRouter();
  const { status, data: session } = useSession();

  if (status === "authenticated") {
    return (
      <div className="flex items-center gap-3">
        <motion.div
          className="rounded-full w-10 h-10 flex items-center justify-center border border-primary bg-gray-100/25 cursor-pointer"
          whileHover={{ scale: 1.1 }}
          onClick={() => router.push("/user-profile")}
        >
          {session?.user?.image ? (
            <Image
              src={session?.user?.image}
              alt="User avatar"
              width={50}
              height={50}
              priority
              className="rounded-full w-full h-full object-cover border"
            />
          ) : (
            <span className="text-sm uppercase">
              {session?.user?.name?.charAt(0).toUpperCase()}
            </span>
          )}
        </motion.div>
        <motion.button
          onClick={() => signOut({ redirect: false })}
          className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Log out"
        >
          <IoLogOutOutline className="text-2xl" />
        </motion.button>
      </div>
    );
  } else if (status === "loading") {
    return <span className="w-8 h-8 text-center p-1 text-sm">...</span>;
  } else {
    return (
      <motion.button
        onClick={() => router.push("/login")}
        className="p-2 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Log in"
      >
        <IoLogInOutline className="text-2xl" />
      </motion.button>
    );
  }
});
AuthButton.displayName = "AuthButton";

export default AuthButton;
