import type { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export function ProtectedRoute({ children, adminOnly = false }: { children: ReactElement; adminOnly?: boolean }) {
  const { currentUser } = useAppContext();

  if (!currentUser) return <Navigate to="/login" replace />;
  if (adminOnly && currentUser.role !== "admin") return <Navigate to="/" replace />;

  return children;
}