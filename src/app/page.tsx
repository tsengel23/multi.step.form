"use client";

import { useState } from "react";
import StepOne from "./_component/StepOne";
import StepThree from "./_component/StepThree";
import StepTwo from "./_component/StepTwo";

const Formpage = () => {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <StepOne step={step} setStep={setStep} />}
      {step === 2 && <StepTwo step={step} setStep={setStep} />}
      {step === 3 && <StepThree step={step} setStep={setStep} />}
    </div>
  );
};
export default Formpage;
