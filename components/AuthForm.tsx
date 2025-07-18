"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Link from "next/link"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {Form} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"

const authFormSchema=(type: FormType)=> {
  return z.object({
    name :type==='sign-up' ? z.string().min(3, "Name is required") : z.string().optional(),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  })
}


const AuthForm = ({type}:{type:FormType}) => {
  const formSchema= authFormSchema(type)
  type FormType = "sign-in" | "sign-up";
     // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    try{
 
    }catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again later. ${error");
    }
  }
  const isSignIn = type === "sign-in";
  return (
    <div className="card-border lg:min-w-[566px]">
        <div className="flex flex-col gap-6 card py-14 px-10">
          <div className="flex flex-row gap-2 justify-center">
             <Image src="/logo.svg" alt="logo" height={32} width={38}/>
             <h2 className="text-primary-100">AlgoPanel</h2>
          </div>
          <h3 suppressHydrationWarning>Your Job preparation buddy!</h3>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 mt-4 form">
        {!isSignIn && <p>Name</p>}
        <p>Email</p>
        <p>Password</p>

        <Button className='btn' type="submit">{isSignIn ? 'Sign in' : 'Create an Account'}</Button>
      </form>
    </Form>
    <p className="text-center">
       {isSignIn ? "Don't have an account?" : "Already have an account?"}
       <Link href={!isSignIn ? '/sign-in' : '/sign-up'} className="font-bold text-user-primary ml-1">
        {!isSignIn ? 'Sign in' : 'Sign up'} 
       </Link>
    </p>
    </div>
    </div>
  )
}

export default AuthForm