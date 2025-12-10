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

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z.object({
  firstname: z
    .string()
    .min(5, "First name cannot contain special characters or numbers")
    .max(30),
  lastname: z
    .string()
    .min(5, "Last name cannot contain special characters or numbers")
    .max(30),
  username: z
    .string()
    .min(5, "User name cannot contain special characters or numbers")
    .max(30),
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

  // export default function MultiStepForm() {
  //   return <div></div>;
  // }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    setStep(step + 1);
  };
  return (
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
                        <Input placeholder="Your firstname . . ." {...field} />
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
                  Continue <span>1</span>/3
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default StepOne;
