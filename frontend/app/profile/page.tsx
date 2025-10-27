"use client";

import { Mail, User, Phone, Hash, Home, CheckCircle2, XCircle } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const ProfilePage = () => {
    const { data, isLoading, error } = useUser();

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return (
        <p className="text-center mt-10 text-red-500">
            {(error as any)?.response?.data?.message || (error as any).message}
        </p>
    );

    const user = data;
    if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-xl rounded-3xl w-full max-w-2xl p-8">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
                    My Profile
                </h2>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <User className="text-gray-400" />
                        <p>
                            <span className="font-semibold">Full Name:</span>{" "}
                            {user.fullname}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Mail className="text-gray-400" />
                        <p>
                            <span className="font-semibold">Email:</span>{" "}
                            {user.email}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Phone className="text-gray-400" />
                        <p>
                            <span className="font-semibold">Phone:</span>{" "}
                            {user.phone_number}
                        </p>
                    </div>

                    <div className="flex items-center space-x-3">
                        <Hash className="text-gray-400" />
                        <p>
                            <span className="font-semibold">User Type:</span>{" "}
                            {user.user_type.charAt(0).toUpperCase() + user.user_type.slice(1)}
                        </p>
                    </div>

                    {user.gender && (
                        <div className="flex items-center space-x-3">
                            <p>
                                <span className="font-semibold">Gender:</span>{" "}
                                {user.gender === "M"
                                    ? "Male"
                                    : user.gender === "F"
                                        ? "Female"
                                        : "Other"}
                            </p>
                        </div>
                    )}

                    {user.user_type === "owner" && user.owner_profile && (
                        <div className="mt-6 border-t border-gray-200 pt-4">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2 flex items-center gap-2">
                                <Home size={20} className="text-blue-500" />
                                Restaurant Information
                            </h3>

                            <div className="flex items-center space-x-2 mb-3">
                                {user.owner_profile.verified ? (
                                    <>
                                        <CheckCircle2 className="text-green-500" />
                                        <span className="text-green-600 font-medium">Verified</span>
                                    </>
                                ) : (
                                    <>
                                        <XCircle className="text-red-500" />
                                        <span className="text-red-600 font-medium">Not Verified</span>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
