import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import {
  AppBar,
  Hidden,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
// import { useAuthContext } from "hooks/AuthContext";
// import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    lineHeight: 2.4,
  },
  menuItemHeight: {
    lineHeight: 2.4,
  },
  noLink: {
    textDecoration: "none",
    color: "black",
  },
}));

const TopHeaderView = ({ handleOpen }) => {
  //const { isLoggedIn } = useAuthContext();
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      color="primary"
      elevation={0}
    >
      <Toolbar>
        <Hidden mdUp>
          <IconButton
            onClick={handleOpen}
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon></MenuIcon>
          </IconButton>
        </Hidden>
        <Typography variant="h6" className={classes.title}>
          App Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TopHeaderView;
