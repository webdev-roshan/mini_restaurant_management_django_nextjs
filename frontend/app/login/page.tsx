"use client";

import { useState } from "react";
import { useLogin } from "@/hooks/useAuth";
import { LoginData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { Mail, Lock } from "lucide-react";
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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-green-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border border-green-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-500 transition cursor-pointer"
                    >
                        {isPending ? "Logging in..." : "Login"}
                    </button>
                    {error && <p className="text-red-500">{(error as any).message}</p>}
                </form>
                <p className="mt-4 text-center text-gray-500">
                    Don’t have an account? <a href="/register" className="text-blue-400 hover:underline">Register</a>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
