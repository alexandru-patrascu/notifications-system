import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";

import { NotificationsPage, LoginPage } from "./pages";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import { AuthProvider } from "./providers/AuthProvider";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/" element={<ProtectedRoutes />}>
            <Route path="/notifications" element={<NotificationsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
