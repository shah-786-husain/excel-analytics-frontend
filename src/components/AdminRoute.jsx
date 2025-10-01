import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    // Not logged in → redirect to login
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Logged in but not admin → redirect home
    return <Navigate to="/" replace />;
  }

  // ✅ User is admin
  return children;
}
