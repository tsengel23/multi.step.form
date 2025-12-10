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
import { Dispatch, SetStateAction } from "react";

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z.object({
  email: z.string().min(5, "Please provide a valid email address.").max(30),
  phoneNumber: z.string().min(5, "Please enter a valid phone number.").max(30),
  password: z
    .string()
    .min(5, "Password must include letters and numbers.")
    .max(30),
  confirmPassword: z
    .string()
    .min(5, "Passwords do not match. Please try again.")
    .max(30),
});

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiigavah yostoi shuu gedgee tavij ogdog

type StepTwoProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};
const StepTwo = ({ step, setStep }: StepTwoProps) => {
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  // export default function MultiStepForm() {
  //   return <div></div>;
  // }

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
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
                  name="phoneNumber"
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
                        <Input placeholder="your password . . ." {...field} />
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
                        Confirm password<span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="confirm it . . ." {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className=" mt-[162px] flex gap-2 ">
                <Button variant={"outline"} type="button" className="">
                  <ChevronLeft /> Back{" "}
                </Button>
                <Button type="submit" className=" w-104 flex-1">
                  Continue <span>2</span>/3
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};
export default StepTwo;
