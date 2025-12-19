"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { boolean, z } from "zod";
import { Header } from "./Header";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { Dispatch, SetStateAction, useContext, useState } from "react";

import { motion } from "framer-motion";
import { Data, StepContext } from "../page";

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z
  .object({
    email: z
      .string()
      .email("Зөв имэйл хаяг оруулна уу")
      .min(5, "Имэйл хэт богино байна")
      .max(100, "Имэйл хэт урт байна")
      .toLowerCase(),
    // .endsWith("@gmail.com", "Зөвхөн Gmail хаяг зөвшөөрнө") ,// Домэйн хязгаарлалт
    // .refine(async (email) => {
    //   // Асинк шалгалт (датабазаас шалгах)
    //   const exists = await checkEmailExists(email);
    //   return !exists;
    // }, "Энэ имэйл аль хэдийн бүртгэгдсэн байна"),
    phone: z
      .string()
      .regex(
        /^[0-9+\-\s()]+$/,
        "Утасны дугаар зөвхөн тоо, +, -, (, ) тэмдэгт агуулна"
      )
      .min(8, "Утасны дугаар хэт богино")
      .max(15, "Утасны дугаар хэт урт")
      .transform((val) => val.replace(/\s+/g, "")) // Зайг авч хаях
      .refine((val) => {
        const mongolianPhoneRegex =
          /^(976)?(85|86|88|89|91|94|95|96|99|80|83|84|90|92|93|97|98)\d{6}$/;
        return mongolianPhoneRegex.test(val);
      }, "Монгол улсын утасны дугаар байх ёстой"),
    password: z
      .string()
      .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгт байх ёстой")
      .max(50, "Нууц үг хэт урт байна")
      .regex(/[A-Z]/, "Дор хаяж 1 том үсэг агуулна")
      .regex(/[a-z]/, "Дор хаяж 1 жижиг үсэг агуулна")
      .regex(/[0-9]/, "Дор хаяж 1 тоо агуулна")
      .regex(/[@$!%*?&#]/, "Дор хаяж 1 тусгай тэмдэгт агуулна (@$!%*?&)")
      .refine(
        (val) => !val.includes("123"),
        "123 гэх энгийн дарааллыг хэрэглэхгүй"
      ),
    confirmPassword: z.string().min(8),
  })
  .refine((values) => values.password === values.confirmPassword, {
    message: "Нууц үг таарахгүй байна",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiig avah yostoi shuu gedgee tavij ogdog

// type StepTwoProps = {
//   step: number;
//   setStep: Dispatch<SetStateAction<number>>;
//   data: Data;
//   setData: Dispatch<SetStateAction<Data>>;
// };
// const StepTwo = ({ step, setStep, data, setData }: StepTwoProps) => {
const StepTwo = () => {
  const { step, setStep, data, setData } = useContext(StepContext);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: data.email,
      phone: data.phone,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  const [see1, setSee1] = useState<boolean>(true);
  const [see2, setSee2] = useState<boolean>(true);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setData((prev) => ({
      ...prev,
      email: values.email,
      phone: values.phone,
      password: values.password,
      confirmPassword: values.confirmPassword,
    }));
    console.log(values);
    setStep(step + 1);
  };

  const goBack = () => {
    setStep(step - 1);
  };
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
          <div className=" ">
            <Form {...form}>
              <form
                className="flex flex-col w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="w-full h-fit flex flex-col gap-3">
                  <Header />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Email<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="email . . ." {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Phone number<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="phone . . ." {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Password<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={see1 ? "password" : "text"}
                              placeholder="your password . . ."
                              {...field}
                            />
                            <Button
                              variant={"secondary"}
                              type="button"
                              className="w-7 h-7 rounded-full bg-white text-black border border-black p-0 absolute top-1 right-1"
                              onClick={() => {
                                setSee1(!see1);
                              }}
                            >
                              {see1 ? <Eye /> : <EyeOff />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Confirm password
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={see2 ? "password" : "text"}
                              placeholder="confirm it . . ."
                              {...field}
                            />
                            <Button
                              variant={"secondary"}
                              type="button"
                              className="w-7 h-7 rounded-full bg-white text-black border-1  border-black  p-0 absolute top-1 right-1"
                              onClick={() => {
                                setSee2(!see2);
                              }}
                            >
                              {see2 ? <Eye /> : <EyeOff />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" mt-[162px] flex gap-2 ">
                  <Button
                    variant={"outline"}
                    type="button"
                    className=""
                    onClick={goBack}
                  >
                    <ChevronLeft /> Back
                  </Button>
                  <Button type="submit" className=" w-104 flex-1">
                    Continue <span>2</span>/ 3
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </Card>
      </div>
    </motion.div>
  );
};
export default StepTwo;
