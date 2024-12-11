import { useEffect } from "react";
import AuthService from "../services/AuthService";
import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  useEffect(() => {
    if (AuthService.isAuthenticated()) {
      navigate('/');
    }
  }, [])
  return (

    <>
      <h1>Welcome</h1>
      <a href="/login">Login</a>
    </>

  );
}
