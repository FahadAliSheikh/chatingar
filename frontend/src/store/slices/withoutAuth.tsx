import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "./authSlice";

const WithoutAuth = () => {
  const user = useSelector(selectCurrentUser);
  const location = useLocation();

  return user?.token ? (
    <Navigate to="/chat" state={{ from: location }} replace />
  ) : (
    <Outlet />
  );
};
export default WithoutAuth;
