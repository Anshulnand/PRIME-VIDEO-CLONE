import React from "react";
import { motion } from "framer-motion";

const spinAnimation = {
  animate: {
    rotate: [0, 360],
    transition: {
      repeat: Infinity,
      duration: 1,
      ease: "linear",
    },
  },
};

const LoadingSpinner = () => {
  return (
    <motion.div
      variants={spinAnimation}
      animate="animate"
      className="w-12 h-12 border-4 border-white border-t-transparent rounded-full mx-auto"
    ></motion.div>
  );
};

export default LoadingSpinner;
