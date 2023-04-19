import React, { useState } from "react";
import LoginView from "./LoginView";
import { useHistory } from "react-router";
import { useAuthContext } from "hooks/AuthContext";

const LoginContainer = () => {
  const history = useHistory();

  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuthContext();

  async function handleLogin({ email, password }) {
    setIsLoading(true);

    var res = await login(email, password);
    if (res.success) {
      history.push("/");
    } else {
      console.log(res);
      setErrors({ field: "password", message: res.message });
      setIsLoading(false);
    }
  }

  return (
    <LoginView
      handleLogin={handleLogin}
      initialErrors={errors}
      setErrors={setErrors}
      isLoading={isLoading}
    ></LoginView>
  );
};

export default LoginContainer;
