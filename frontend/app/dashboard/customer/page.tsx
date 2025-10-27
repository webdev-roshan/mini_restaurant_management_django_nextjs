import ProtectedRoute from "@/components/routes/ProtectedRoute";
import RestaurantList from "@/components/restaurants/RestaurantList";

const CustomerDashboard = () => {
    return (
        <ProtectedRoute allowedTypes={["customer"]}>
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            <RestaurantList />
        </ProtectedRoute>
    );
};

export default CustomerDashboard;
