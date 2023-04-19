import React from "react";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";

export const NotFound = () => {
  return (
    <>
      {/* Page Not Found! */}

      <Typography variant="h3">404: page not found!</Typography>
      <Link to="/">Home</Link>
    </>
  );
};
