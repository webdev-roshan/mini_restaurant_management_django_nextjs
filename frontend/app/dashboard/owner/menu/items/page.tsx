"use client";

import ProtectedRoute from "@/components/routes/ProtectedRoute";
import MenuNavigation from "@/components/menu/MenuNavigation";
import ItemList from "@/components/menu/ItemList";

const ItemsPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <div className="space-y-6">
                <MenuNavigation />
                <ItemList />
            </div>
        </ProtectedRoute>
    );
};

export default ItemsPage;