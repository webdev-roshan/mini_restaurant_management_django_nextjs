"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/hooks/useUser";

interface Props {
    children: React.ReactNode;
    allowedTypes: ("owner" | "customer" | "admin")[];
}

const ProtectedRoute = ({ children, allowedTypes }: Props) => {
    const { data: user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user && !allowedTypes.includes(user.user_type)) {
            router.push("/");
        }
    }, [user, isLoading, allowedTypes, router]);

    if (isLoading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading...</p>
        </div>
    );

    if (user && !allowedTypes.includes(user.user_type)) return null;

    return <>{children}</>;
};

export default ProtectedRoute;
