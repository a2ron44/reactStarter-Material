import { makeStyles } from "@material-ui/core";

export const drawerStyles = makeStyles((theme) => ({
  drawer: {
    width: "600px",
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
    height: "100%",
    padding: theme.spacing(3),
  },
  drawerClose: {
    float: "right",
    padding: 0,
  },
  drawerTitle: {
    fontWeight: "bold",
  },
  closeIcon: {
    paddingTop: 0,
  },
}));
