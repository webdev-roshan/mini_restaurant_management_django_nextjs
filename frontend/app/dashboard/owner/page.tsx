import ProtectedRoute from "@/components/routes/ProtectedRoute";

const OwnerDashboard = () => {
    return (
        <ProtectedRoute allowedTypes={["owner"]}>
            <h1 className="text-2xl font-bold">Owner Dashboard</h1>
        </ProtectedRoute>
    );
};

export default OwnerDashboard;
