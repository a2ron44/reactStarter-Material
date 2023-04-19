import { IconButton, makeStyles } from "@material-ui/core";
import { AddCircleOutline } from "@material-ui/icons";
import React from "react";

const useStyles = makeStyles((theme) => ({
  addButton: {
    float: "right",
    marginRight: theme.spacing(0),
    paddingTop: theme.spacing(1),
  },
}));

const AddRecordButton = ({ onClick }) => {
  const classes = useStyles();

  return (
    <IconButton className={classes.addButton} color="primary" onClick={onClick}>
      <AddCircleOutline></AddCircleOutline>
    </IconButton>
  );
};

export default AddRecordButton;
