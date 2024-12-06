import { useNavigate } from "react-router-dom";

const useLogout = () => {
  const navigate = useNavigate(); // Assuming you're using React Router

  const handleLogout = () => {
    console.log("User logged out");
    localStorage.removeItem("token");
    navigate("/"); 
  };

  return handleLogout;
};

export default useLogout;