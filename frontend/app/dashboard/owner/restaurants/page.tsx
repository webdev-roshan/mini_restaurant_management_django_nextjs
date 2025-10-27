import ProtectedRoute from "@/components/routes/ProtectedRoute";
import RestaurantList from "@/components/restaurants/RestaurantList";

const RestaurantPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <RestaurantList onlyOwner={true} />
        </ProtectedRoute>
    );
};

export default RestaurantPage;
