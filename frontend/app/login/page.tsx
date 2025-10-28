"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { LoginData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { redirectToDashboard } from "@/utils/redirect";

const LoginPage = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<LoginData>({ email: "", password: "" });

    const { mutate, isPending, error } = useLogin();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: (data) => redirectToDashboard(data, router),
        });
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden slide-up">
                <div className="px-8 py-6 bg-linear-to-r from-blue-600 to-blue-700 text-white text-center">
                    <div className="flex items-center justify-center mb-4">
                        <div className="bg-white/20 p-3 rounded-full">
                            <LogIn className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold">Welcome Back</h1>
                    <p className="text-blue-100 mt-2">Sign in to your account</p>
                </div>

                <div className="px-8 py-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative group">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email Address"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 group"
                        >
                            {isPending ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-white"></div>
                                    Signing in...
                                </div>
                            ) : (
                                <div className="flex items-center justify-center gap-2">
                                    Sign In
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>

                        {error && (
                            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                                <p className="text-red-600 text-sm">
                                    {(error as any)?.response?.data?.message || "Invalid credentials. Please try again."}
                                </p>
                            </div>
                        )}
                    </form>
                </div>

                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-gray-600">
                        Don't have an account?{" "}
                        <button
                            onClick={() => router.push("/register")}
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer transition-colors"
                        >
                            Create Account
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;