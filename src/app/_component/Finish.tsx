"use client";
import { motion } from "framer-motion";
export const Finish = () => {
  return (
    <motion.div
      initial={{ x: 300, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -300, opacity: 0 }}
    >
      <div className="flex flex-col ">
        <img src="/Main 1.svg" className="w-15 h-15" />
        <p className="text-[26px] text-[#202124] font-semibold text-shadow-lg">
          You're All Set 🔥
        </p>
        <p className="text-lg text-[#8E8E8E] font-normal">
          We have received your submission. Thank you!
        </p>
      </div>
    </motion.div>
  );
};
