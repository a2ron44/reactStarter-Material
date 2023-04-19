import {
  DialogTitle,
  Drawer,
  IconButton,
  Paper,
  Typography,
} from "@material-ui/core";
import React from "react";
import PropTypes from "prop-types";
import CancelIcon from "@material-ui/icons/Cancel";
import { drawerStyles } from "styles/drawerStyles";

const useStyles = drawerStyles;

const DetailDrawer = ({ open, handleClose, title, detailLabel, children }) => {
  const classes = useStyles();

  return (
    <Drawer anchor="right" open={open} onClose={handleClose}>
      <>
        <Paper className={classes.drawer}>
          <DialogTitle disableTypography className={classes.drawerClose}>
            <IconButton onClick={handleClose} className={classes.closeIcon}>
              <CancelIcon fontSize="small"></CancelIcon>
            </IconButton>
          </DialogTitle>

          <Typography
            variant="h6"
            className={classes.drawerTitle}
            display="inline"
          >
            {title}
          </Typography>
          <Typography variant="h6" className={classes.field} display="inline">
            {detailLabel ? ": " + detailLabel : ""}
          </Typography>

          {children}
        </Paper>
      </>
    </Drawer>
  );
};

DetailDrawer.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  detailLabel: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
};

export default DetailDrawer;
