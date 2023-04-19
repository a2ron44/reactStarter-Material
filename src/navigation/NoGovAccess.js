import { Typography } from "@material-ui/core";
import React from "react";
import PageHeader from "./PageHeader/PageHeader";

const NoGovAccess = () => {
  return (
    <>
      <PageHeader title="No Access"></PageHeader>

      <Typography>
        You do not have any governments assigned. Try logging out and logging
        back in. Please contact your local Government Admin if problem still
        occurs.
      </Typography>
    </>
  );
};

export default NoGovAccess;
