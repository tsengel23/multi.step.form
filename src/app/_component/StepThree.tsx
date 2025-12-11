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
import { ChevronDownIcon, ChevronLeft, ImageIcon } from "lucide-react";
// import { date } from "zod/v4-mini";
import { motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import Image from "next/image";
import { Calendar } from "@/components/ui/calendar";
import { Data } from "../page";

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
  profileImage: z.file("Файлаа ахин оруулна уу ?!").optional(),
});

type StepThreeProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
  data: Data;
  setData: Dispatch<SetStateAction<Data>>;
};
// date-iig oruulj irhiin tuld edgeer huvisagchiig zarlaj ogdog.(shadcn-ni: Date of Birth Picker)

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiigavah yostoi shuu gedgee tavij ogdog

const StepThree = ({ step, setStep, data, setData }: StepThreeProps) => {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // birthday:
      // image: "",   ed nar deer "utga" tavih hereggui anhnii utga ni undifined bdg bolhoor!!!!
      // birthday: data.birthday,
      // profileImage: data.profileImage,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // setData((prev) => ({
    //   ...prev,
    //   birthday: values.birthday,
    //   profileImage: values.profileImage,
    // }));
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
                          Date of birth
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-48 justify-between font-normal"
                              >
                                {field.value
                                  ? field.value.toLocaleDateString()
                                  : "--/--/--"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent
                              className="w-auto overflow-hidden p-0"
                              align="start"
                            >
                              <Calendar
                                mode="single"
                                selected={field.value}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  field.onChange(date);
                                  setOpen(false);
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="profileImage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-semibold text-sm">
                          Profile image<span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              placeholder="placeholder"
                              type="file"
                              className="absolute w-full h-full top-0 left-0 opacity-0 z-10 cursor-pointer"
                              onChange={(e) => {
                                const files = e.target.files;
                                if (!files) return;
                                const [file] = files;
                                field.onChange(file);
                              }}
                            />
                            {field.value && (
                              <div className="absolute w-full h-full top-0 left-0 rounded-xl overflow-hidden">
                                <Image
                                  src={URL.createObjectURL(field.value)}
                                  alt="Profile"
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div className="w-full h-40 rounded-xl flex justify-center items-center bg-[#7f7f800d]">
                              <div className="flex flex-col items-center gap-2">
                                <ImageIcon className="text-[#8e8e8e]" />
                                Add Image
                              </div>
                            </div>
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
