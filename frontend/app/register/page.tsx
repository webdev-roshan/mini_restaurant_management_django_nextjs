"use client";

import { useState } from "react";
import CustomerForm from "@/components/auth/CustomerForm";
import OwnerForm from "@/components/auth/OwnerForm";
import { UserPlus, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
    const router = useRouter();
    const [activeForm, setActiveForm] = useState<"customer" | "restaurant">("customer");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden slide-up">
                <div className="px-8 py-8">
                    <div className="flex justify-center mb-8">
                        <div className="bg-gray-100 p-1 rounded-lg flex">
                            <button
                                onClick={() => setActiveForm("customer")}
                                className={`px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                                    activeForm === "customer"
                                        ? "bg-green-500 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                                }`}
                            >
                                Customer
                            </button>
                            <button
                                onClick={() => setActiveForm("restaurant")}
                                className={`px-8 py-3 text-base font-medium rounded-lg transition-all duration-200 cursor-pointer ${
                                    activeForm === "restaurant"
                                        ? "bg-blue-500 text-white shadow-md"
                                        : "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                                }`}
                            >
                                Restaurant Owner
                            </button>
                        </div>
                    </div>

                    <div className="transition-all duration-300">
                        {activeForm === "customer" && <CustomerForm />}
                        {activeForm === "restaurant" && <OwnerForm />}
                    </div>
                </div>

                <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button
                            onClick={() => router.push("/login")}
                            className="text-blue-600 hover:text-blue-700 font-medium hover:underline cursor-pointer transition-colors"
                        >
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;