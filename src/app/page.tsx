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
import { AnimatePresence } from "framer-motion";

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

const STORAGE_KEY_DATA = "multi_step_form_data";
const STORAGE_KEY_STEP = "multi_step_form_step";

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
      birthday: parsed.birthday ? new Date(parsed.birthday) : undefined,
      profileImage: null,
    };
  } catch {
    return defaultData;
  }
};

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
      birthday: data.birthday ? data.birthday.toISOString() : undefined,
    };
    localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(toSave));
  } catch {
    console.error("localStorage-д хадгалахад алдаа гарлаа");
  }
};

const Formpage = () => {
  const [step, setStep] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [initialized, setInitialized] = useState(false); // ✅ ШИНЭ
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

  // ✅ ӨӨРЧЛӨГДСӨН: step=4 хадгалагдсан байвал step=1-д буцна
  useEffect(() => {
    const savedStep = loadStepFromStorage();
    if (savedStep === 4) {
      setStep(1);
    } else {
      setStep(savedStep);
    }
    setData(loadDataFromStorage());
    setInitialized(true);
  }, []);

  // ✅ ӨӨРЧЛӨГДСӨН: initialized болсны дараа л хадгална
  useEffect(() => {
    if (!initialized || isFinished) return;
    saveDataToStorage(data);
  }, [data, initialized]);

  // ✅ ӨӨРЧЛӨГДСӨН: initialized болсны дараа л ажиллана
  useEffect(() => {
    if (!initialized) return;
    if (step === 4) {
      setIsFinished(true);
      localStorage.removeItem(STORAGE_KEY_DATA);
      localStorage.removeItem(STORAGE_KEY_STEP);
    } else if (!isFinished) {
      localStorage.setItem(STORAGE_KEY_STEP, String(step));
    }
  }, [step, initialized]);

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
