import { makeStyles, Typography } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  error: {
    color: "red",
  },
});

const ErrorText = ({ text }) => {
  const classes = useStyles();
  return (
    <Typography variant="subtitle1" className={classes.error}>
      {text}
    </Typography>
  );
};

export default ErrorText;
