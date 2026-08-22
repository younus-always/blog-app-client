"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import Link from "next/link";
import { toast } from "sonner";
import z from "zod";


const formSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "Minimum length is 8")
});

export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Logging in user");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId })
          return
        };

        toast.success("User Logging Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong. Please try again!", { id: toastId });
      }
    }
  });

  const handleGoogleLogin = async () => {
    try {
      const { data, error } = await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000",
      });

      if (error) {
        console.log("Google login error:", error);
      };
    } catch (error) {
      console.error("Google login failed:", error);
    }
  };

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}>
          <FieldGroup>
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="johndoe@example.com"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}>

            </form.Field>
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;

                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="********"
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}>

            </form.Field>
          </FieldGroup>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5">
        <Button
          type="submit"
          form="register-form"
          className="w-full"
        >
          Login
        </Button>
        <Button
          onClick={() => handleGoogleLogin()}
          variant="outline"
          type="button"
          className="w-full"
        >
          Continue with Google
        </Button>
        <FieldDescription className="text-center">
          Don't have an account? <Link href="/register">Register</Link>
        </FieldDescription>
      </CardFooter>
    </Card>
  )
}
