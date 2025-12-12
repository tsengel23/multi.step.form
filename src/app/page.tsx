"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import StepOne from "./_component/StepOne";
import StepTwo from "./_component/StepTwo";
import StepThree from "./_component/StepThree";
import { Finish } from "./_component/Finish";
import { AnimatePresence, motion } from "framer-motion";

type StepContextType = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
};

export const StepContext = createContext<StepContextType>(
  {} as StepContextType
);

export type Data = {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  birthday?: Date;
  profileImage: File | null;
};

const Formpage = () => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState<Data>({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  });

  return (
    <StepContext.Provider value={{ step, setStep, data, setData }}>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100 border-2 border-red-500">
        <AnimatePresence>
          {step === 1 && (
            <StepOne
            // step={step}
            // setStep={setStep}
            // data={data}
            // setData={setData} <------uuniigee odo ustgaj bolno ygd gevel useContext gedeg "hook" ashiglaj bgaa bolhoor negdsen jurmaar medeellee neg damjuulna
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 2 && (
            <StepTwo
            // step={step}
            // setStep={setStep}
            // data={data}
            // setData={setData} <------uuniigee odo ustgaj bolno ygd gevel useContext gedeg "hook" ashiglaj bgaa bolhoor negdsen jurmaar medeellee neg damjuulna
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {step === 3 && (
            <StepThree
            // step={step}
            // setStep={setStep}
            // data={data}
            // setData={setData}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {/* {step === 4 && <Finish step={step} setStep={setStep} />}  <----uuniigee odo ustgaj bolno ygd gevel useContext gedeg "hook" ashiglaj bgaa bolhoor negdsen jurmaar medeellee neg damjuulna*/}
          {step === 4 && <Finish />}
        </AnimatePresence>
      </div>
    </StepContext.Provider>
  );
};
export default Formpage;
