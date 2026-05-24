"use client";

import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaArrowRightLong } from "react-icons/fa6";
import { authClient } from "@/lib/auth-client";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

const SignUpPage = () => {
    const router = useRouter();
    const [passwordError, setPasswordError] = useState("");

    const onSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        const name = formData.get("name");
        const email = formData.get("email");
        const password = formData.get("password");
        const confirmPassword = formData.get("confirmPassword");
        const image = formData.get("image");

        // Confirm password check
        if (password !== confirmPassword) {
            setPasswordError("Passwords do not match");
            return;
        }
        setPasswordError("");

        const { data, error } = await authClient.signUp.email({
            name,
            email,
            password,
            image,
        });

        if (data) {
            toast.success("Account created!");
            router.push("/");
        } else {
            toast.error(error?.message || "Something went wrong");
        }
    };

    const handleGoogleSignIn = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/",
        });
    };

    const validatePassword = (value) => {
        if (value.length < 6) return "Password must be at least 6 characters";
        if (!/[A-Z]/.test(value)) return "Must contain at least one uppercase letter";
        if (!/[a-z]/.test(value)) return "Must contain at least one lowercase letter";
        return null;
    };

    return (
        <div className="flex items-center justify-center my-20 bg-white dark:bg-gray-950 min-h-[80vh]">
            <Form
                onSubmit={onSubmit}
                className="flex w-96 flex-col gap-4 border border-gray-200 dark:border-gray-700 px-10 py-7 rounded-3xl shadow-2xl bg-white dark:bg-gray-900"
            >
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
                    <Input placeholder="John Doe" className="dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <FieldError />
                </TextField>

                {/* Email */}
                <TextField isRequired name="email" type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value))
                            return "Please enter a valid email address";
                        return null;
                    }}
                >
                    <Label className="dark:text-gray-300">Email</Label>
                    <Input placeholder="john@example.com" className="dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <FieldError />
                </TextField>

                {/* Profile Image URL */}
                <TextField name="image" type="url">
                    <Label className="dark:text-gray-300">Profile Image URL</Label>
                    <Input placeholder="https://example.com/profile.jpg" className="dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <FieldError />
                </TextField>

                {/* Password */}
                <TextField isRequired name="password" type="password" validate={validatePassword}>
                    <Label className="dark:text-gray-300">Password</Label>
                    <Input placeholder="Enter your password" className="dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                        Min 6 characters, 1 uppercase, 1 lowercase
                    </p>
                    <FieldError />
                </TextField>

                {/* Confirm Password */}
                <TextField isRequired name="confirmPassword" type="password">
                    <Label className="dark:text-gray-300">Confirm Password</Label>
                    <Input placeholder="Re-enter your password" className="dark:bg-gray-800 dark:text-white dark:border-gray-600" />
                    <FieldError />
                </TextField>

                {/* Mismatch error */}
                {passwordError && (
                    <p className="text-red-500 text-sm -mt-2">{passwordError}</p>
                )}

                <div className="flex gap-2 justify-center items-center">
                    <Button
                        type="submit"
                        className="px-10 py-7 text-xl font-semibold bg-green-600 text-white hover:bg-green-700 transition-colors rounded-2xl"
                    >
                        Create Account <FaArrowRightLong />
                    </Button>
                </div>

                <div className="flex justify-center items-center my-5">
                    <p className="dark:text-gray-400">
                        Already have an account?{" "}
                        <a href="/signin" className="text-green-600 font-semibold hover:text-green-700">Sign in</a>
                    </p>
                </div>

                <p className="text-center text-gray-500 dark:text-gray-400">Or Sign up With</p>

                <Button onClick={handleGoogleSignIn} className="w-full rounded-xl text-center">
                    <FcGoogle /> Sign in with Google
                </Button>
            </Form>
        </div>
    );
};

export default SignUpPage;