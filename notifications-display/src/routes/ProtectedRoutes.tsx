import { Navigate } from "react-router-dom";

import Layout from "layout";
import { useAuth } from "providers/AuthProvider";
import { SocketProvider } from "providers/SocketProvider";

const ProtectedRoutes = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <SocketProvider>
      <Layout />
    </SocketProvider>
  ) : (
    <Navigate to="/" />
  );
};

export default ProtectedRoutes;
