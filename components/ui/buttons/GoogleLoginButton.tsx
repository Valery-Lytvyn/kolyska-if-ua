import { signIn } from "next-auth/react";
import React from "react";

const GoogleLoginButton: React.FC = () => {
  return (
    <button
      className="w-full  bg-primary text-white py-4 px-2 rounded-md text-center  transition duration-300 ease hover:bg-primary-hover my-4 focus:scale-95 hover:shadow-md flex items-center justify-center gap-2"
      aria-label="Увійти через Google"
      onClick={() => signIn("google", { callbackUrl: "/" })}
    >
      Увійти через <span className="text-xl text-accent lp-2">Google</span>
    </button>
  );
};

export default GoogleLoginButton;
