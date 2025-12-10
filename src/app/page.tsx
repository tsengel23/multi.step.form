"use client";

import { useState } from "react";
import StepOne from "./_component/StepOne";
import StepTwo from "./_component/StepTwo";
import StepThree from "./_component/StepThree";
import { Finish } from "./_component/Finish";
import { AnimatePresence, motion } from "framer-motion";

const Formpage = () => {
  const [step, setStep] = useState(1);

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <AnimatePresence>
        {step === 1 && <StepOne step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 2 && <StepTwo step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {/* {step === 3 && <StepThree step={step} setStep={setStep} />} */}
      </AnimatePresence>
      <AnimatePresence>{step === 4 && <Finish />}</AnimatePresence>
    </div>
  );
};
export default Formpage;
