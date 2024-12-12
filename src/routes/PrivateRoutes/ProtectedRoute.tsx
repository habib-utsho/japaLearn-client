import { ReactNode } from "react";
import { useAppSelector } from "../../redux/hook";
import { Navigate } from "react-router-dom";
import { Skeleton } from "antd";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthLoading, token, user } = useAppSelector((state) => state.auth);

  if (!token) {
    return <Navigate to={"/signin"} replace />; //TODO back to location history
  }

  if (!user?.role) {
    return <Navigate to={"/signin"} replace />; //TODO back to location history
  }

  if (isAuthLoading) {
    return <Skeleton.Button active className="!h-screen !w-full" />;
  }

  return children;
};

export default ProtectedRoute;
