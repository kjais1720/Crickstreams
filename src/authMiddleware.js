import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "contexts";
import { toast } from "react-toastify";
import { useEffect } from "react";

export function AuthMiddleware() {
  const {
    userState: { isLoggedIn },
    setShowAuthModal
  } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      setShowAuthModal(true)
      navigate(-1)
      toast.error("You need to login first!");
    }
  }, []);
  return isLoggedIn ? <Outlet /> : "";
}
