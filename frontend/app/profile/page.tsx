"use client";

import { Mail, User, Phone, Home, Hash } from "lucide-react";
import { useUser } from "@/hooks/useUser";

const ProfilePage = () => {
    const { data, isLoading, error } = useUser();

    if (isLoading) return <p className="text-center mt-10">Loading...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{(error as any).message}</p>;

    const user = data;

    if (!user) return <p className="text-center mt-10 text-red-500">User not found</p>;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
            <div className="bg-white shadow-lg rounded-3xl w-full max-w-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">My Profile</h2>

                <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                        <User className="text-gray-400" />
                        <p><span className="font-semibold">Full Name:</span> {user.fullname}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail className="text-gray-400" />
                        <p><span className="font-semibold">Email:</span> {user.email}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone className="text-gray-400" />
                        <p><span className="font-semibold">Phone:</span> {user.phone_number}</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Hash className="text-gray-400" />
                        <p><span className="font-semibold">User Type:</span> {user.user_type}</p>
                    </div>

                    {user.user_type === "owner" && user.owner_profile && (
                        <>
                            <div className="flex items-center space-x-3">
                                <Home className="text-gray-400" />
                                <p><span className="font-semibold">Restaurant:</span> {user.owner_profile.restaurant_name}</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <p className="font-semibold">Description:</p>
                                <p>{user.owner_profile.description}</p>
                            </div>
                            {user.owner_profile.address && (
                                <div className="flex items-center space-x-3">
                                    <Home className="text-gray-400" />
                                    <p><span className="font-semibold">Address:</span> {user.owner_profile.address}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
