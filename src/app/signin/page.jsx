"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

const SignInPage = () => {
    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signIn.email({
            email: user.email,
            password: user.password,
        });

        console.log({ data, error });

        if (data) {
            redirect("/");
        }
        if (error) {
            alert(error.message);
        }
    };

    return (
        <div className="flex items-center justify-center my-20 min-h-[80vh] bg-white dark:bg-gray-950">
            <Form
                onSubmit={onSubmit}
                className="flex w-96 flex-col gap-4 border border-gray-200 dark:border-gray-700 px-10 py-7 rounded-3xl shadow-2xl bg-white dark:bg-gray-900"
            >
                {/* Header */}
                <h1 className="text-center">
                    <span className="text-2xl font-bold dark:text-white">Welcome </span>
                    <span className="text-2xl font-bold text-green-600">Back</span>
                </h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
                    Sign in to your PawsHome account
                </p>

                {/* Email */}
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
                    <Label className="dark:text-gray-300">Email</Label>
                    <Input
                        placeholder="john@example.com"
                        className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                    <FieldError />
                </TextField>

                {/* Password */}
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
                    <Label className="dark:text-gray-300">Password</Label>
                    <Input
                        placeholder="Enter your password"
                        className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                    <Description className="dark:text-gray-400">
                        Must be at least 8 characters with 1 uppercase and 1 number
                    </Description>
                    <FieldError />
                </TextField>

                {/* Submit Button */}
                <div className="flex gap-2 justify-center items-center">
                    <Button
                        type="submit"
                        className="px-10 py-7 text-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors rounded-2xl"
                    >
                        Sign In
                        <FaArrowRightLong />
                    </Button>
                </div>

                {/* Sign Up Link */}
                <div className="flex justify-center items-center my-5">
                    <p className="dark:text-gray-400">
                        New to PawsHome?{" "}
                        <a href="/signup" className="text-green-600 font-semibold hover:text-green-700">
                            Sign Up
                        </a>
                    </p>
                </div>
            </Form>
        </div>
    );
};

export default SignInPage;