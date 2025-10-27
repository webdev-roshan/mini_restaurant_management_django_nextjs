"use client";

import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

export default function DashboardPage() {
    const { data: user, isLoading } = useUser();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && user) {
            if (user.user_type === "owner") router.push("/dashboard/owner");
            if (user.user_type === "customer") router.push("/dashboard/customer");
        }
    }, [user, isLoading, router]);

    return <p>Loading...</p>;
}
