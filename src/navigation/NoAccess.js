import { Typography } from "@material-ui/core";
import React from "react";
import PageHeader from "./PageHeader/PageHeader";

const NoAccess = () => {
  return (
    <>
      <PageHeader title="No Access"></PageHeader>

      <Typography>You do not have access to view this page.</Typography>
    </>
  );
};

export default NoAccess;
