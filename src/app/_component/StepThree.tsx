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
import { ChevronLeft } from "lucide-react";
import { date } from "zod/v4-mini";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction } from "react";

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z.object({
  birthday: z
    .date()
    .min(new Date("1900-01-01"), "Төрсөн огноо хэт эрт байна")
    .max(new Date(), "Ирээдүйн огноо оруулж болохгүй")
    .refine((date) => {
      const today = new Date();
      const age = today.getFullYear() - date.getFullYear();
      return age >= 18;
    }, "18-аас дээш нас байх ёстой"),
  image: z
  .file()
  .optional(),
});

type StepThreeProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiigavah yostoi shuu gedgee tavij ogdog
const StepThree = ({ step, setStep }: StepThreeProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      birthday: 
      image:
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
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
                    name="birthday"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Date of birth<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="yyyy.mm.dd" {...field} />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Profile image<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="" {...field} />
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
                    Continue <span>3</span>/3
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
export default StepThree;






