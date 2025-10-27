"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import CreateItemForm from "@/components/menu/CreateItemForm";

const CreateItemPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <CreateItemForm />
            </div>
        </ProtectedRoute>
    );
};

export default CreateItemPage;