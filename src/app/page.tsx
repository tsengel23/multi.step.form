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
import { Header } from "./_component/Header";

//3-n input-tei. input tus buriin shalgalt ni "iim bh yostoi gsn" shalgaltaa bas bichlee
const formSchema = z.object({
  firstname: z.string().min(5).max(30),
  lastname: z.string().min(5).max(30),
  username: z.string().min(5).max(30),
});

type FormSchemaType = z.infer<typeof formSchema>;
// resolver gedeg deer ene shalgaltuudiigavah yostoi shuu gedgee tavij ogdog
const Formpage = () => {
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
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center border border-red-500">
      <Card className="w-120 py-8 border-3 border-green-500">
        <CardHeader>
          <Header />
        </CardHeader>
        <CardContent className="">
          <Form {...form}>
            <form
              className="space-y-8 flex flex-col "
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="w-full h-fit flex flex-col gap-3">
                <FormField
                  control={form.control}
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First-name</FormLabel>
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
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last-name</FormLabel>
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
                  name="firstname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UserName</FormLabel>
                      <FormControl>
                        <Input placeholder="Username ..." {...field} />
                      </FormControl>
                      <FormDescription></FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="flex flex-1">
                Continue <span>1</span>/3
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
export default Formpage;
