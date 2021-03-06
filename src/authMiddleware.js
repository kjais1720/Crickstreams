import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function AuthMiddleware() {
  const {
    userState: { isLoggedIn },
    setShowAuthModal
  } = useAuth();
  const location = useLocation();
  useEffect(() => {
    if (!localStorage.getItem('userToken')) {
      setShowAuthModal(true)
      toast.error("You need to login to access this page!");
    }
  },[isLoggedIn]);
  return localStorage.getItem('userToken') ? <Outlet /> : <Navigate to="/explore" state={{from:location}} />;
}
