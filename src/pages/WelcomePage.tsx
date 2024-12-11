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
      <div className="container-fluid d-flex flex-column align-items-center p-auto gap-2 position-absolute top-50 start-50 translate-middle">
        <h1>Welcome To Vivaldi</h1>
        <a href="/login" className="btn btn-secondary">Login</a>
      </div>
    </>

  );
}
