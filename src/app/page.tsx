"use client";

import { useState } from "react";
import StepOne from "./_component/StepOne";
import StepThree from "./_component/StepThree";
import StepTwo from "./_component/StepTwo";
import { Finish } from "./_component/Finish";
import { AnimatePresence } from "framer-motion";

const Formpage = () => {
  const [step, setStep] = useState(1);

  return (
    <div>
      <AnimatePresence>
        {step === 1 && <StepOne step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 2 && <StepTwo step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>
        {step === 3 && <StepThree step={step} setStep={setStep} />}
      </AnimatePresence>
      <AnimatePresence>{step == 4 && <Finish />}</AnimatePresence>
    </div>
  );
};
export default Formpage;
