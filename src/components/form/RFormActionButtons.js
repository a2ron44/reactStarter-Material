import React from "react";
import PropTypes from "prop-types";
import { Button, Grid, makeStyles } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}));

const RFormActionButtons = ({
  onCancel,
  onSave,
  disabled,
  disableInvalid = true,
  cancelText = "Cancel",
  saveText = "Save",
}) => {
  const {
    formState: { isValid },
  } = useFormContext();

  const classes = useStyles();
  const buttonDisabled = disabled || (disableInvalid && !isValid);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          {onCancel && (
            <Button onClick={onCancel} color="secondary">
              {cancelText}
            </Button>
          )}
        </Grid>
        <Grid item xs={2}></Grid>
        <Grid item xs={3}>
          <Button
            color="primary"
            variant="contained"
            onClick={onSave}
            disabled={buttonDisabled}
            type="submit"
          >
            {saveText}
          </Button>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
};

RFormActionButtons.propTypes = {
  onCancel: PropTypes.func,
  onSave: PropTypes.func,
  cancelText: PropTypes.string,
  saveText: PropTypes.string,
  disabled: PropTypes.bool,
  disableInvalid: PropTypes.bool,
};

export default RFormActionButtons;
