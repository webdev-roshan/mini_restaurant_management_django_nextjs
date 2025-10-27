import ProtectedRoute from "@/components/routes/ProtectedRoute";
// import RestaurantForm from "@/components/dashboard/owner/RestaurantForm";

const CreateRestaurantPage = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            {/* <RestaurantForm /> */}
            <div></div>
        </ProtectedRoute>
    );
};

export default CreateRestaurantPage;
