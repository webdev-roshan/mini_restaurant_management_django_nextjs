"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import UpdateItemForm from "@/components/menu/UpdateItemForm";
import { useParams } from "next/navigation";

const UpdateItemPage = () => {
    const params = useParams();
    const itemId = parseInt(params.id as string);

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <UpdateItemForm itemId={itemId} />
            </div>
        </ProtectedRoute>
    );
};

export default UpdateItemPage;