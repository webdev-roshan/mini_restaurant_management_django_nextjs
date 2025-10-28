"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import CreateCategoryForm from "@/components/menu/CreateCategoryForm";

const CreateCategoryPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <CreateCategoryForm />
            </div>
        </ProtectedRoute>
    );
};

export default CreateCategoryPage;