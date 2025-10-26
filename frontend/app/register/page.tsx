"use client";

import { useState } from "react";
import CustomerForm from "@/components/forms/(auth)/CustomerForm";
import OwnerForm from "@/components/forms/(auth)/OwnerForm";

const RegisterPage = () => {
    const [activeForm, setActiveForm] = useState<"customer" | "restaurant">("customer");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-md p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
                    Register
                </h2>
                <div className="flex justify-center mb-6 space-x-4">
                    <button
                        onClick={() => setActiveForm("customer")}
                        className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${activeForm === "customer"
                            ? "bg-green-300 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        Customer
                    </button>
                    <button
                        onClick={() => setActiveForm("restaurant")}
                        className={`px-5 py-2 rounded-full font-semibold transition cursor-pointer ${activeForm === "restaurant"
                            ? "bg-blue-300 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                            }`}
                    >
                        Restaurant
                    </button>
                </div>

                {activeForm === "customer" && <CustomerForm />}
                {activeForm === "restaurant" && <OwnerForm />}
            </div>
        </div>
    );
};

export default RegisterPage;
