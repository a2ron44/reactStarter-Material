import React from "react";
import { useAuthContext } from "hooks/AuthContext";
import { Redirect, Route, useLocation } from "react-router";
import { toast } from "react-toastify";

const ProtectedRoute = ({
  component,
  path,
  allowedRoles,
  requireCandidate,
}) => {
  const location = useLocation();

  const { isLoggedIn, govId, hasRole, isAuthLoading, candidate } =
    useAuthContext();

  if (isAuthLoading) {
    return <p> Loading</p>;
  }

  if (!isLoggedIn) {
    return <Redirect to={{ pathname: "/login", state: { from: location } }} />;
  }

  //if no govID set
  if (isLoggedIn === true && path !== "/changegov" && !govId) {
    return (
      <Redirect to={{ pathname: "/changegov", state: { from: location } }} />
    );
  }
  if (isLoggedIn === true && path === "/changegov") {
    return <Route path={path} component={component} />;
  }

  if (isLoggedIn && requireCandidate && !candidate) {
    toast.info("Select Candidate to Proceed");
    return (
      <Redirect
        to={{ pathname: "/changecandidate", state: { from: location } }}
      />
    );
  }

  //check permission
  if (isLoggedIn === true && govId && hasRole(allowedRoles)) {
    return <Route path={path} component={component} />;
  }

  return <Redirect to="/noaccess" replace state={{ path }} />;
};

export default ProtectedRoute;
