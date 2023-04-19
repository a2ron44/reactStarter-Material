import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  ListSubheader,
  SwipeableDrawer,
  Hidden,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Lock, LockOpen, Settings, Business, Person } from "@material-ui/icons";
import * as AUTH from "constants/AuthConstants";
import { useAuthContext } from "hooks/AuthContext";
import { Link } from "react-router-dom";
import { menuDrawerWidth } from "styles/muiTheme";

const useStyles = makeStyles((theme) => ({
  belowToolbar: {
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: menuDrawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: menuDrawerWidth,
  },
  nested: {
    paddingLeft: theme.spacing(3),
  },
}));

const LeftNavMenuView = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const classes = useStyles();

  const { isLoggedIn, govId, govName, hasRole } = useAuthContext();

  const drawerContents = (
    <>
      <Hidden smDown>
        <div className={classes.belowToolbar}></div>
      </Hidden>

      {!isLoggedIn && (
        <List>
          <ListItem button component={Link} to="/login">
            <ListItemIcon>
              <LockOpen />
            </ListItemIcon>
            <ListItemText primary="Login" />
          </ListItem>
        </List>
      )}

      {isLoggedIn && govName && (
        <List>
          <ListSubheader>
            <Typography
              variant="caption"
              style={{ fontWeight: "bold" }}
              display="inline"
            >
              Gov:
            </Typography>{" "}
            {" " + govName}
          </ListSubheader>
          <ListItem
            button
            component={Link}
            to="/changegov"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <Lock></Lock>
            </ListItemIcon>
            <ListItemText primary="Change Government"></ListItemText>
          </ListItem>
        </List>
      )}

      {isLoggedIn && hasRole(AUTH.ROLE_SUPPORT) && (
        <>
          <List>
            <ListItem button component={Link} to="/admin">
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Admin" />
            </ListItem>
          </List>
        </>
      )}
      {hasRole([AUTH.ROLE_SUPPORT, AUTH.ROLE_ADMIN]) && (
        <List>
          <ListItem
            button
            component={Link}
            to="/govsetup"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <Business />
            </ListItemIcon>
            <ListItemText primary="Manage Government" />
          </ListItem>
        </List>
      )}

      {isLoggedIn && govId && hasRole([AUTH.ROLE_SUPPORT]) && (
        <>
          <ListSubheader>Campaign Contributions</ListSubheader>
          <List>
            <ListItem
              button
              component={Link}
              to="/myprofile"
              onClick={handleDrawerClose}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText primary="My Profile" />
            </ListItem>
          </List>
          <Divider />
        </>
      )}
      {isLoggedIn && (
        <List>
          <ListItem
            button
            component={Link}
            to="/logout"
            onClick={handleDrawerClose}
          >
            <ListItemIcon>
              <Lock></Lock>
            </ListItemIcon>
            <ListItemText primary="Logout"></ListItemText>
          </ListItem>
        </List>
      )}
    </>
  );

  const drawerMobile = (
    <SwipeableDrawer
      className={classes.drawer}
      anchor="left"
      open={open}
      onClose={handleDrawerClose}
      onOpen={handleDrawerOpen}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {drawerContents}
    </SwipeableDrawer>
  );

  const drawerDesktop = (
    <Drawer
      variant="permanent"
      className={classes.drawer}
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      {drawerContents}
    </Drawer>
  );

  return (
    <>
      <Hidden smDown>{drawerDesktop}</Hidden>
      <Hidden mdUp>{drawerMobile}</Hidden>
    </>
  );
};

export default LeftNavMenuView;
