"use client";

import { useState } from "react";
import { useRegisterOwner } from "@/hooks/useAuth";
import { OwnerRegisterData } from "@/types/authTypes";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, Phone, Building2 } from "lucide-react";
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
        <div className="fade-in">
            <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                    <Building2 className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">Restaurant Owner</h3>
                <p className="text-gray-600">Manage your restaurant business</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <User className="absolute left-4 top-[55px] -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="text"
                            name="fullname"
                            placeholder="Enter your full name"
                            value={formData.fullname}
                            onChange={handleChange}
                            className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <Mail className="absolute left-4 top-[55px] -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                        <Lock className="absolute left-4 top-[55px] -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="password"
                            name="password"
                            placeholder="Create a password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                            required
                        />
                    </div>

                    <div className="relative group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <Phone className="absolute left-4 top-[55px] -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                        <input
                            type="tel"
                            name="phone_number"
                            placeholder="Enter phone number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full px-4 py-4 pl-12 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white placeholder-gray-400 hover:border-gray-400"
                            required
                        />
                    </div>
                </div>

                <div className="max-w-xs">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="w-full px-4 py-4 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white cursor-pointer hover:border-gray-400"
                    >
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </select>
                </div>

                <button
                    type="submit"
                    disabled={isPending}
                    className="w-full inline-flex items-center justify-center px-6 py-4 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                    {isPending ? (
                        <div className="flex items-center justify-center gap-2">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-gray-300 border-t-white"></div>
                            Creating Account...
                        </div>
                    ) : (
                        "Create Restaurant Owner Account"
                    )}
                </button>

                {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
                        <p className="text-red-600 text-sm">
                            {(error as any)?.response?.data?.message || "Something went wrong. Please try again."}
                        </p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default OwnerForm;