import { useRouter } from "next/navigation";
import { AuthResponse } from "@/types/authTypes";

export const redirectToDashboard = (data: AuthResponse, router: ReturnType<typeof useRouter>) => {
    const userType = data.user.user_type;

    if (userType === "owner") router.push("/dashboard/owner");
    else if (userType === "customer") router.push("/dashboard/customer");
    else if (userType === "admin") router.push("/dashboard/admin");
    else router.push("/"); 
};
