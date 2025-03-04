import React, { useState } from "react";
import DeleteButton from "../shared/buttons/DeleteButton";
import CustomInput from "../shared/inputs/CustomInput";
import { formatPrice } from "@/helpers/formatPrice";
import { validatePhoneNumber } from "@/lib/utils/validation";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";

interface CartFooterProps {
  totalAmount: number;
  handleClearCart: () => void;
  handlePlaceAnOrder: (value: string) => void;
  sitekey: string;
  onChange: (token: string | null) => void;
}

const CartFooter: React.FC<CartFooterProps> = ({
  totalAmount,
  handleClearCart,
  handlePlaceAnOrder,
  sitekey,
  onChange,
}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneError, setPhoneError] = useState<string | null | undefined>(null);

  const handlePhoneChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setPhoneNumber(value);
    setPhoneError(validatePhoneNumber(value) as string);
  };

  return (
    <footer className="bg-gray-50 p-6 space-y-2">
      <div className="flex justify-between items-center mb-6">
        <span className="text-lg font-semibold text-gray-800">Разом:</span>
        <span className="text-xl font-bold text-accent">
          {formatPrice(totalAmount)}
          {" грн"}
        </span>
      </div>
      <div className="grid sm:grid-cols-2 gap-2 my-4">
        <ReCAPTCHA sitekey={sitekey} onChange={onChange} />
        <CustomInput
          label="Щоб зробити замовлення, введіть номер телефону для зв'язку з Вами."
          type="tel"
          name="phone"
          value={phoneNumber}
          onChange={handlePhoneChange}
          placeholder="Номер Вашого телефону"
          error={phoneError}
        />
        <DeleteButton label="Очистити кошик" onClick={handleClearCart} />
        <motion.button
          whileHover={{ scale: phoneNumber && !phoneError ? 1.02 : 1 }}
          whileTap={{ scale: phoneNumber && !phoneError ? 0.98 : 1 }}
          type="button"
          className="w-full bg-accent text-white py-4 font-medium rounded-lg hover:bg-accent/90 transition duration-200"
          aria-label="Оформити замовлення"
          disabled={!phoneNumber || phoneError !== null}
          onClick={() => handlePlaceAnOrder(phoneNumber)}
        >
          Оформити замовлення
        </motion.button>
      </div>
    </footer>
  );
};

export default React.memo(CartFooter);
