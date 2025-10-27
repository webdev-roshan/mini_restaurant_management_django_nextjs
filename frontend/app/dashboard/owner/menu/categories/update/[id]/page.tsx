"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import UpdateCategoryForm from "@/components/menu/UpdateCategoryForm";
import { useParams } from "next/navigation";

const UpdateCategoryPage = () => {
    const params = useParams();
    const categoryId = parseInt(params.id as string);

    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <UpdateCategoryForm categoryId={categoryId} />
            </div>
        </ProtectedRoute>
    );
};

export default UpdateCategoryPage;