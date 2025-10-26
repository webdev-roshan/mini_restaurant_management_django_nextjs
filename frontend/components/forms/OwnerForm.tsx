"use client";

import { useState } from "react";
import { useRegisterOwner } from "@/hooks/useAuth";
import { OwnerRegisterData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Home, FileText } from "lucide-react";

const OwnerForm = () => {
    const router = useRouter();
    const [formData, setFormData] = useState<OwnerRegisterData>({
        fullname: "",
        email: "",
        password: "",
        gender: "M",
        phone_number: "",
        restaurant_name: "",
        description: "",
        address: "",
    });

    const { mutate, isPending, error } = useRegisterOwner();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
            <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                    type="text"
                    name="restaurant_name"
                    placeholder="Restaurant Name"
                    value={formData.restaurant_name}
                    onChange={handleChange}
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                />
            </div>
            <div className="relative">
                <FileText className="absolute left-3 top-2 text-gray-400" size={18} />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border border-blue-200 rounded-lg px-10 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
                    required
                />
            </div>
            <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-blue-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <button
                type="submit"
                disabled={isPending}
                className="w-full bg-blue-400 text-white py-2 rounded-lg hover:bg-blue-500 transition cursor-pointer"
            >
                {isPending ? "Registering..." : "Register as Restaurant"}
            </button>
            {error && <p className="text-red-500">{(error as any).message}</p>}
        </form>
    );
};

export default OwnerForm;
