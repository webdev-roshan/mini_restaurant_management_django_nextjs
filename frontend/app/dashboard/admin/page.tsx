import { useUser } from "@/hooks/useUser";
import ProtectedRoute from "@/components/routes/ProtectedRoute";


const page = () => {
    return (
        <ProtectedRoute allowedTypes={['admin']}>
            <div>
                hello admin
            </div>
        </ProtectedRoute>
    )
}

export default page