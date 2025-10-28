"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import MenuNavigation from "@/components/menu/MenuNavigation";
import CategoryList from "@/components/menu/CategoryList";

const CategoriesPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <MenuNavigation />
                <CategoryList onlyOwner={true} />
            </div>
        </ProtectedRoute>
    );
};

export default CategoriesPage;