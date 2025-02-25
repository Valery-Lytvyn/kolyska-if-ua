"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/actions/register";
import AnimatedWrapper from "@/components/ui/AnimatedWrapper";
import CustomInput from "@/components/shared/inputs/CustomInput";
import CustomButton from "@/components/shared/buttons/CustomButton";
import { useForm } from "@/hooks/useForm";
import { ROUTES } from "@/routes/routes";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const RegisterForm = ({ goToLink }: { goToLink: (path: string) => void }) => {
  const [loading, setLoading] = useState(false);
  const {
    formData,
    setFormData,
    errors,
    setErrors,
    handleChange,
    validateForm,
  } = useForm(initialState);

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setLoading(true);

    if (!validateForm()) {
      return;
    }

    const res = await register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    if (res?.error) {
      setErrors((prev) => ({ ...prev, form: res.error as string }));
    }

    if (res?.error) {
      setErrors((prev) => ({ ...prev, form: res.error as string }));
    } else {
      setFormData(initialState);
      goToLink(ROUTES.login);
    }
    setLoading(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 w-full  flex flex-col justify-between items-center gap-4       border  bg-white rounded-lg shadow-md "
    >
      {errors.form && <div className="text-red-500">{errors.form}</div>}
      <h1 className="mb-5 w-full text-2xl font-bold">Реєстрація</h1>
      <CustomInput
        type="text"
        placeholder="Ім'я"
        name="name"
        label="Ім'я"
        onChange={handleChange}
        value={formData.name}
        error={errors.name}
      />
      <CustomInput
        type="email"
        placeholder="Електронна пошта"
        name="email"
        label="Електронна пошта"
        onChange={handleChange}
        value={formData.email}
        error={errors.email}
      />
      <CustomInput
        type="password"
        placeholder="Пароль"
        name="password"
        label="Пароль"
        onChange={handleChange}
        value={formData.password}
        error={errors.password}
      />
      <CustomInput
        type="password"
        placeholder="Повторіть пароль"
        name="confirmPassword"
        label="Повторіть пароль"
        onChange={handleChange}
        value={formData.confirmPassword}
        error={errors.confirmPassword}
      />
      <CustomButton
        label="Зареєструватися"
        name={loading ? "..." : "Зареєструватися"}
        disabled={loading}
        aria-label="Зареєструватися"
      />
      <span
        onClick={() => goToLink(ROUTES.login)}
        className="text-sm text-[#888] transition duration-150 ease hover:text-black hover:underline cursor-pointer"
      >
        Вже маєте акаунт?
      </span>
    </form>
  );
};
const RegisterSection: React.FC = () => {
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
          <AnimatedWrapper isVisible={isVisible}>
            <RegisterForm goToLink={goToLink} />
          </AnimatedWrapper>
          <AnimatedWrapper isVisible={isVisible}>
            <article className="border p-6 bg-white rounded-lg shadow-md flex-1 overflow-hidden relative z-10 w-full h-full flex flex-col justify-center items-center">
              <h2 className="text-5xl font-bold p-4">Kolyska.if.ua</h2>
            </article>
          </AnimatedWrapper>
        </div>
      </div>
    </section>
  );
};

export default RegisterSection;
