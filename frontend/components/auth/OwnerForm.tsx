"use client";

import { useState } from "react";
import { useRegisterOwner } from "@/hooks/useAuth";
import { OwnerRegisterData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone } from "lucide-react";
import { redirectToDashboard } from "@/utils/redirect";

const OwnerForm = () => {
    const router = useRouter();

    const [formData, setFormData] = useState<OwnerRegisterData>({
        fullname: "",
        email: "",
        password: "",
        gender: "M",
        phone_number: "",
    });

    const { mutate, isPending, error } = useRegisterOwner();

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.fullname || !formData.email || !formData.password) {
            alert("Please fill in all required fields.");
            return;
        }

        mutate(formData, {
            onSuccess: (data) => redirectToDashboard(data, router),
        });
    };

    return (
        <form
            className="space-y-4 bg-white rounded-2xl w-full"
            onSubmit={handleSubmit}
        >
            <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                />
            </div>

            <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
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
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                />
            </div>

            <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="+1234567890"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                />
            </div>

            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>

            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isPending ? "Registering..." : "Register as Restaurant Owner"}
            </button>

            {error && (
                <p className="text-red-500 text-center text-sm mt-2">
                    {(error as any)?.response?.data?.message || "Something went wrong. Please try again."}
                </p>
            )}
        </form>
    );
};

export default OwnerForm;
