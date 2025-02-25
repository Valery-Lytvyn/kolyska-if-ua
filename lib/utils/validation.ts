export const validateEmail = (email: string): string | undefined | null => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim()) return "Електронна пошта обов'язкова";
  if (email.length > 320) return "Електронна пошта занадто довга";
  if (!emailRegex.test(email)) return "Невірний формат електронної пошти";
  return null;
};

export const validateName = (name: string): string | undefined | null => {
  if (!name.trim()) return "Ім'я обов'язкове";
  if (name.length < 2) return "Ім'я повинно містити щонайменше 2 символи";
  if (!/^[A-Za-zА-Яа-яЇїЄєІіҐґ'’\-]+$/.test(name))
    return "Ім'я може містити лише букви та апостроф";
  return null;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined | null => {
  if (!confirmPassword.trim()) return "Підтвердіть пароль";
  if (password !== confirmPassword) return "Паролі не співпадають";
  return null;
};

export const validatePhoneNumber = (
  phoneNumber: string
): string | undefined | null => {
  if (!phoneNumber.trim()) return "Номер телефону обов'язковий";

  const phoneRegex =
    /^(\+?[0-9]{1,3})?[-. (]?[0-9]{2,4}[-. )]?[0-9]{3,5}[-. ]?[0-9]{3,5}$/;

  if (!phoneRegex.test(phoneNumber)) return "Невірний формат номера телефону";
  if (phoneNumber.length < 10 || phoneNumber.length > 15)
    return "Номер телефону має містити від 10 до 15 цифр";

  return null;
};

export const validateMessage = (message: string): string | undefined | null => {
  if (!message.trim()) return "Повідомлення обов'язкове";
  if (message.length < 10)
    return "Повідомлення повинно містити щонайменше 10 символів";
  if (message.length > 500)
    return "Повідомлення занадто довге (макс. 500 символів)";
  return null;
};

export const validatePassword = (
  password: string
): string | undefined | null => {
  if (!password.trim()) return "Пароль обов'язковий";
  if (password.length < 6)
    return "Пароль повинен містити щонайменше 6 символів";
  return null;
};
