"use client";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import CustomInput from "@/components/ui/CustomInput";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import CustomButton from "@/components/ui/buttons/CustomButton";
import { useForm } from "@/hooks/useForm";
import GoogleLoginButton from "@/components/ui/buttons/GoogleLoginButton";

const LoginForm = ({ goToLink }: { goToLink: (path: string) => void }) => {
  const { formData, error, setError, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError("Потрібно заповнити всі поля!");
      return;
    } else {
      const res = await signIn("credentials", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        redirect: false,
      });
      if (res?.error) {
        setError(res.error as string);
      }
      if (res?.ok) {
        return goToLink("/");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-full flex flex-col justify-between items-center gap-4 border bg-white rounded-lg shadow-md"
    >
      {error && <div className="text-red-500">{error}</div>}
      <h1 className="mb-2 w-full text-2xl font-bold">Авторизуватися</h1>
      <CustomInput
        type="text"
        placeholder="Ім'я"
        name="name"
        label="Ім'я"
        onChange={handleChange}
        value={formData.name}
      />
      <CustomInput
        type="email"
        placeholder="Електронна пошта"
        name="email"
        label="Електронна пошта"
        onChange={handleChange}
        value={formData.email}
      />
      <CustomInput
        type="password"
        placeholder="Пароль"
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formData.password}
      />
      <CustomButton
        name="Авторизуватися"
        label="Авторизуватися"
        aria-label="Авторизуватися"
      />
      <span
        onClick={() => goToLink("/register")}
        className="text-sm text-[#888] transition duration-150 ease hover:text-black hover:underline cursor-pointer"
      >
        Не маєте облікового запису?
      </span>
    </form>
  );
};

const LoginSection = () => {
  const [isVisible, setIsVisible] = useState(true);
  const router = useRouter();

  const goToLink = (path: string) => {
    setIsVisible(false);
    setTimeout(() => {
      router.push(path);
    }, 500);
  };
  return (
    <section className="bg-gray-100 w-full  m-auto">
      <div className=" p-4 w-full min-h-[calc(100vh-13rem)] flex-1 max-w-7xl flex items-center justify-center mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mx-auto md:max-w-screen-md max-w-sm">
          <AnimatedWrapper
            isVisible={isVisible}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col justify-center items-center w-full h-full border p-6 bg-white rounded-lg shadow-md flex-1 overflow-hidden relative z-10">
              <h2 className="text-5xl font-bold p-4">Kolyska.if.ua</h2>

              <GoogleLoginButton />
            </div>
          </AnimatedWrapper>
          <AnimatedWrapper
            isVisible={isVisible}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoginForm goToLink={goToLink} />
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default LoginSection;
