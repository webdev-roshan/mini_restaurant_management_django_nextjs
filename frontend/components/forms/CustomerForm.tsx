"use client";

import { useState } from "react";
import { useRegisterCustomer } from "@/hooks/useAuth";
import { CustomerRegisterData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, User as UserIcon, Calendar } from "lucide-react";

const CustomerForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<CustomerRegisterData>({
        fullname: "",
        email: "",
        password: "",
        gender: "M",
        phone_number: "",
    });

    const { mutate, isPending, error } = useRegisterCustomer();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData, {
            onSuccess: () => router.push("/"),
        });
    };

    return (
        <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    name="fullname"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
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
            <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="tel"
                    name="phone_number"
                    placeholder="+1234567890"
                    value={formData.phone_number}
                    onChange={handleChange}
                    className="w-full border border-green-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
                    required
                />
            </div>
            <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full border border-green-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-300 focus:outline-none"
            >
                <option value="M">Male</option>
                <option value="F">Female</option>
                <option value="O">Other</option>
            </select>
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-green-400 text-white py-2 rounded-lg hover:bg-green-500 transition cursor-pointer"
            >
                {isPending ? "Registering..." : "Register as Customer"}
            </button>
            {error && <p className="text-red-500">{(error as any).message}</p>}
        </form>
    );
};

export default CustomerForm;
