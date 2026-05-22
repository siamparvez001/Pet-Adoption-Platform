"use client";

import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { redirect } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SignUpPage = () => {
    // const onSubmit = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData(e.currentTarget);
    //     const user = Object.fromEntries(formData.entries());

    //     const { data, error } = await authClient.signUp.email({
    //         email: user.email,
    //         password: user.password,
    //         name: user.name,
    //         image: user.image,
    //     });

    //     console.log({ data, error });

    //     if (data) {
    //         redirect("/");
    //     }
    //     if (error) {
    //         alert(error.message);
    //     }
    // };


    // const handleGoogleSignIn = async () => {
    //     await authClient.signIn.social({
    //         provider: "google",
    //         callbackURL: "/",
    //     });
    // };

    const router = useRouter();

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const user = Object.fromEntries(formData.entries());

        const { data, error } = await authClient.signUp.email({
            email: user.email,
            password: user.password,
            name: user.name,
            image: user.image,
        });

        if (data) {
            toast.success("Account created successfully!");
            router.push("/");
        }
        if (error) {
            toast.error(error.message);
        }
    };
    const handleGoogleSignIn = async () => {
    await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
    });
};

    return (
        <div className="flex items-center justify-center my-20 bg-white dark:bg-gray-950 min-h-[80vh]">
            <Form
                onSubmit={onSubmit}
                className="flex w-96 flex-col gap-4 border border-gray-200 dark:border-gray-700 px-10 py-7 rounded-3xl shadow-2xl bg-white dark:bg-gray-900"
            >
                {/* Header */}
                <h1 className="text-center">
                    <span className="text-2xl font-bold dark:text-white">Join </span>
                    <span className="text-2xl font-bold text-green-600">PawsHome</span>
                </h1>
                <p className="text-center text-gray-500 dark:text-gray-400 mb-5">
                    Create your account to get started
                </p>

                {/* Name */}
                <TextField isRequired name="name" type="text">
                    <Label className="dark:text-gray-300">Name</Label>
                    <Input
                        placeholder="John Doe"
                        className="dark:bg-gray-800 dark:text-white dark:border-gray-600"
                    />
                    <FieldError />
                </TextField>

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

                {/* Profile Image URL */}
                <TextField name="image" type="url">
                    <Label className="dark:text-gray-300">Profile Image URL</Label>
                    <Input
                        placeholder="https://example.com/profile.jpg"
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
                        Create Account
                        <FaArrowRightLong />
                    </Button>
                </div>

                {/* Sign In Link */}
                <div className="flex justify-center items-center my-5">
                    <p className="dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/signin" className="text-green-600 font-semibold hover:text-green-700">
                            Sign in
                        </a>
                    </p>
                </div>
                <div>
                    <p className="text-center text-gray-500 dark:text-gray-400 mb-5">Or Sign up With</p>
                </div>
                <div>
                    <Button onClick={handleGoogleSignIn} className={"w-full rounded-none text-center"}> <FcGoogle></FcGoogle> Sign in with Google</Button>
                </div>
            </Form>

        </div>
    );
};

export default SignUpPage;