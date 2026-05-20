"use client";
import { Check } from "@gravity-ui/icons";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
const SignInPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());
        // console.log(user)
        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password
        })
        console.log({ data, error })

        if (data) {
            redirect("/")
        }
        if (error) {
            alert(error.message)
        }

    };
    return (
        <div className="flex items-center justify-center my-20 bg-white ">
            <Form onSubmit={onSubmit} className="flex w-96 flex-col gap-4 border px-10 py-7 rounded-3xl shadow-2xl" >
                <h1 className="text-center"><span className="text-2xl font-bold">Welcome </span><span className="text-2xl font-bold text-blue-500">Back</span></h1>
                <p className="text-center text-muted mb-5">Create your account to start learning</p>
                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>
                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase and 1 number</Description>
                    <FieldError />
                </TextField>
                <div className="flex gap-2 justify-center items-center ">
                    <Button type="submit" className={"px-10 py-7 text-xl font-semibold"}>
                        Sign In
                        <FaArrowRightLong></FaArrowRightLong>
                    </Button>

                </div>
                <div className="flex justify-center items-center my-5">
                    <p>New to CourseHub? <a href="/signup" className="text-blue-500 font-semibold">Sign Up</a></p>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;