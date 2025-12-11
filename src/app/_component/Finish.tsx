"use client";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
export const Finish = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -20,
      }}
      transition={{
        duration: 0.5,
        ease: "easeInOut",
      }}
      style={{
        position: "absolute",
        width: "100%",
      }}
    >
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100 border-2 border-red-500">
        <Card className="w-120 p-8 ">
          <div className="flex flex-col ">
            <img src="/Main 1.svg" className="w-15 h-15" />
            <p className="text-[26px] text-[#202124] font-semibold text-shadow-lg">
              You're All Set 🔥
            </p>
            <p className="text-lg text-[#8E8E8E] font-normal">
              We have received your submission. Thank you!
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
