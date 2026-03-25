"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  {} as StepContextType,
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

// localStorage-д хадгалах key нэрс
const STORAGE_KEY_DATA = "multi_step_form_data";
const STORAGE_KEY_STEP = "multi_step_form_step";

// localStorage-аас data уншина (Date-ийг parse хийнэ, File-ийг skip)

const loadDataFromStorage = (): Data => {
  const defaultData: Data = {
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    profileImage: null,
  };

  try {
    const saved = localStorage.getItem(STORAGE_KEY_DATA);
    if (!saved) return defaultData;

    const parsed = JSON.parse(saved);

    return {
      ...defaultData,
      ...parsed,
      // birthday string байвал Date болгоно, байхгүй бол undefined
      birthday: parsed.birthday ? new Date(parsed.birthday) : undefined,
      // File object localStorage-д хадгалах боломжгүй тул null болгоно
      profileImage: null,
    };
  } catch {
    return defaultData;
  }
};

// localStorage-аас step уншина
const loadStepFromStorage = (): number => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY_STEP);
    if (!saved) return 1;
    const parsed = parseInt(saved, 10);
    return isNaN(parsed) ? 1 : parsed;
  } catch {
    return 1;
  }
};

// localStorage-д data хадгална (File-ийг оруулахгүй)
const saveDataToStorage = (data: Data) => {
  try {
    const toSave = {
      firstname: data.firstname,
      lastname: data.lastname,
      username: data.username,
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
      // Date-ийг ISO string болгон хадгална
      birthday: data.birthday ? data.birthday.toISOString() : undefined,
      // profileImage: File object тул хадгалахгүй
    };
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(toSave));
  } catch {
    console.error("localStorage-д хадгалахад алдаа гарлаа");
  }
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

  // Эхний render-д localStorage-аас уншина
  useEffect(() => {
    setStep(loadStepFromStorage());
    setData(loadDataFromStorage());
  }, []);

  // data өөрчлөгдөх бүрт localStorage-д хадгална
  useEffect(() => {
    saveDataToStorage(data);
  }, [data]);

  // step өөрчлөгдөх бүрт localStorage-д хадгална
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_STEP, String(step));
  }, [step]);

  return (
    <StepContext.Provider value={{ step, setStep, data, setData }}>
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100 ">
        <AnimatePresence>
          {step === 1 && (
            <StepOne
            // step={step}
            // setStep={setStep}
            // data={data}
            // setData={setData} <------uuniigee odo ustgaj bolno ygd gevel useContext gedeg "hook" ashiglaj bgaa bolhoor negdsen jurmaar medeellee neg damjuulna
            />
          )}
          /private/var/folders/m7/_jxbl3zs2qbgsdlfb20kbthm0000h1/T/TemporaryItems/NSIRD_screencaptureui_4JbpWD/Screenshot
          2026-03-25 at 11.27.07.png
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
