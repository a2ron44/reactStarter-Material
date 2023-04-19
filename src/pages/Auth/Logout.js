import { useEffect } from "react";
import { useHistory } from "react-router";
import { useAuthContext } from "hooks/AuthContext";

const Logout = () => {
  const { logout } = useAuthContext();
  const history = useHistory();
  useEffect(() => {
    logout();
    history.push("/login");
  }, [logout, history]);

  return null;
};

export default Logout;
