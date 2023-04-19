import { CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles({
  root: {
    width: "100%",
    textAlign: "center",
  },
});

const ProgressModal = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress color="secondary" />
    </div>
  );
};

export default ProgressModal;
