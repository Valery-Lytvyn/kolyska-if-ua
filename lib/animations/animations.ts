export const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.3 },
};

export const scaleUpSlow = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: { duration: 0.5 },
};
export const slideInLeftQuick = {
  initial: { opacity: 0, x: -10 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -10 },
  transition: { duration: 0.2 },
};
export const slideInLeft = {
  initial: { opacity: 0, x: "-100%" },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: "-100%" },
  transition: { duration: 0.5 },
};

export const slideInTop = {
  initial: { opacity: 0, y: "-100%" },
  animate: { opacity: 1, y: 0 },
  exit: { y: "-100%", opacity: 0 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const slideInBottom = {
  initial: { y: "100%" },
  animate: { y: 0 },
  exit: { y: "100%" },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const fadeInScale = {
  initial: { opacity: 0, scale: 1.1 },
  animate: { opacity: 0.7, scale: 1 },
  transition: { duration: 1, ease: "easeOut" },
};

export const slideInLeftSlow = {
  initial: { x: "-100%", opacity: 0 },
  animate: { x: "0%", opacity: 1 },
  transition: { duration: 0.8, ease: "easeIn" },
};

export const scaleUpWithDelay = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    duration: 0.6,
    delay: 0.8,
    type: "spring",
    bounce: 0.6,
  },
};

export const slideInLeftWithScale = {
  initial: { x: "-100%", scale: 1 },
  animate: { x: 0, scale: 1.05 },
  exit: { x: "-100%", scale: 1 },
  transition: { duration: 0.3, ease: "easeInOut" },
};

export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

export const fadeInDown = {
  initial: { y: -50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -50, opacity: 0 },
  transition: { duration: 0.3 },
};

export const pulseAnimation = {
  initial: { scale: 0.5, opacity: 0.5 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    repeat: Infinity,
    repeatType: "mirror",
    duration: 0.75,
    ease: "easeInOut",
    delay: 0.2, // delay can be overridden in the component
  },
};

export const fadeInUpWithEase = {
  initial: { opacity: 0, y: -100 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: "-100%" },
  transition: { duration: 0.3, easing: "easeInOut" },
};

export const fadeInWithSpring = {
  initial: { scale: 0.5, opacity: 0.5 },
  animate: { scale: 1, opacity: 1 },
  transition: {
    type: "spring",
    stiffness: 100,
    damping: 10,
    delay: 0.2,
  },
};

export const scaleUpWithExit = {
  initial: { scale: 0.8, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0.8, opacity: 0 },
  transition: { duration: 0.5 },
};

export const fadeInUpShort = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.2 },
};

export const buttonVariants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: 0.3, easing: "easeInOut" },
};

export const sliderButtonVariants = {
  initial: { scale: 1, opacity: 0.6 },
  whileHover: { scale: 1.1, opacity: 1 },
  whileTap: { scale: 0.95 },
  transition: { duration: 0.3, easing: "easeInOut" },
};
