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

import { z } from "zod";
import { Header } from "./Header";
import { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";
// import { motion } from "motion/react";

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z.object({
  firstname: z
    .string()
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой")
    .regex(
      /^[a-zA-ZА-Яа-яёЁ\s\-']+$/,
      "Зөвхөн үсэг, зураас, апостроф зөвшөөрнө"
    )
    .trim()
    // .refine((val) => val.charAt(0) === val.charAt(0).toUpperCase(), {
    //   message: "Нэрийн эхний үсэг томоор бичнэ үү. Жишээ: 'бат' биш 'Бат'",
    // }),
    .transform((val) => {
      if (!val) return val;
      return val.charAt(0).toUpperCase() + val.slice(1).toLowerCase();
    }),

  lastname: z
    .string()
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой")
    .regex(
      /^[a-zA-ZА-Яа-яёЁ\s\-']+$/,
      "Зөвхөн үсэг, зураас, апостроф зөвшөөрнө"
    )
    .trim()

    .transform((val) => {
      if (!val) return val;

      return val
        .toLowerCase()
        .split(/\s+/) // Зайгаар хуваах
        .map((word) => {
          // Хэрэв үг нь зураас агуулж байвал
          if (word.includes("-")) {
            return word
              .split("-")
              .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
              .join("-");
          }
          // Энгийн үг
          return word.charAt(0).toUpperCase() + word.slice(1);
        })
        .join(" ");
    }),
  username: z
    .string()
    .min(2, "Нэр хамгийн багадаа 2 тэмдэгт байх ёстой")
    .max(50, "Нэр хамгийн ихдээ 50 тэмдэгт байх ёстой")

    .trim(),
});

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiigavah yostoi shuu gedgee tavij ogdog

type StepOneProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

const StepOne = ({ step, setStep }: StepOneProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      username: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setStep(step + 1);
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
                <div className="w-full h-fit flex flex-col gap-3 ">
                  <Header />
                  <FormField
                    control={form.control}
                    name="firstname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          First name<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Your firstname . . ."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="lastname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Last name<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your lastname . . ." {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          UserName<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Your username ..." {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className=" mt-[162px]">
                  <Button type="submit" className=" w-104 flex-1">
                    Continue <span>1</span>/ 3
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
export default StepOne;
