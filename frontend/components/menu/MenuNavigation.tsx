"use client";

import { useRouter, usePathname } from "next/navigation";

const MenuNavigation = () => {
    const router = useRouter();
    const pathname = usePathname();

    const navItems = [
        { label: "Dashboard", path: "/dashboard/owner/menu" },
        { label: "Categories", path: "/dashboard/owner/menu/categories" },
        { label: "Items", path: "/dashboard/owner/menu/items" },
    ];

    return (
        <nav className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-wrap gap-2">
                {navItems.map((item) => (
                    <button
                        key={item.path}
                        onClick={() => router.push(item.path)}
                        className={`px-4 py-2 rounded-lg transition ${
                            pathname === item.path
                                ? "bg-blue-500 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default MenuNavigation;