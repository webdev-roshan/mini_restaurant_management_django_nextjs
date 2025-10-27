import ProtectedRoute from "@/components/routes/ProtectedRoute";
import CreateRestaurantForm from "@/components/restaurants/CreateRestaurantForm";

const RestaurantCreatePage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <CreateRestaurantForm></CreateRestaurantForm>
        </ProtectedRoute>
    );
};

export default RestaurantCreatePage;
