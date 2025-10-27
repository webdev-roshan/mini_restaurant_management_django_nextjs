import ProtectedRoute from "@/components/routes/ProtectedRoute";

const CustomerDashboard = () => {
    return (
        <ProtectedRoute allowedTypes={["customer"]}>
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
        </ProtectedRoute>
    );
};

export default CustomerDashboard;
