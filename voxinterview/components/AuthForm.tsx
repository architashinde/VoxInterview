"use client"

import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import {Controller, useForm } from "react-hook-form";
import {toast} from "sonner";
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import {
  Field,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Link from 'next/dist/client/link';
import FormField from './FormField';

interface AuthFormProps {
    type: "sign-in" | "sign-up";
}

const authformschema = (type: AuthFormProps["type"]) => {
  return z.object({
    name: type === "sign-up" ? z.string().min(3, { message: "Name is required" }) : z.string().optional(),
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  })
}

const AuthForm = ({ type }: AuthFormProps) => {
    const router = useRouter();
    const form = useForm<z.infer<ReturnType<typeof authformschema>>>({
     resolver: zodResolver(authformschema(type)),
     defaultValues: {
       name: "",
       email: "",
       password: "",
     },
     })
    function onSubmit(data: z.infer<ReturnType<typeof authformschema>>) {
      try{
        if(type === "sign-up"){
          toast.success("Account created successfully!");
          router.push("/sign-in");
        }else{
          toast.success("Signed in successfully!");
          router.push("/");
        }
      }catch(error){
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    }

     const isSignIn = type === "sign-in";
 
    return (
     <div className="card-border lg:min-w-141.5">
      <Card className="w-full sm:max-w-md">
      <CardContent>
        <div className="flex flex-col gap-6 card py-8 px-10">
          <div className="flex flex-row gap-2 items-center justify-center">
            <Image src="/logo.png" alt="Logo" width={32} height={28} />
            <h1 className="text-primary-100 text-bold">VoxInterview</h1>
          </div>
          <h3>Practice Interviews with AI</h3>
        </div>
        <form id="form-rhf-demo" onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {!isSignIn && (
          <FormField control={form.control} name="name" label="Name" placeholder="Enter your name" type="text" />)}
          <FormField control={form.control} name="email" label="Email" placeholder="Enter your email" type="email" />
          <FormField control={form.control} name="password" label="Password" placeholder="Enter your password" type="password" />
         </form>
       </CardContent>
       <CardFooter>
         <Field orientation="horizontal" >
           <Button type="button" variant="outline" onClick={() => form.reset()}>
             Reset
           </Button>
           <Button type="submit" form='form-rhf-demo'>{isSignIn ? "Sign In" : "Create an Account"}</Button>
         </Field>
       </CardFooter>
       <p className="text-center">
           {isSignIn ? "Don't have an account?" : "Already have an account?"}
           <Link href={!isSignIn ? "/sign-in" : "/sign-up"} className="font-bold text-user-primary hover:underline ml-1">
             {isSignIn ? "Sign Up" : "Sign In"}
           </Link>
        </p>
     </Card>
    </div>
);
}
export default AuthForm;