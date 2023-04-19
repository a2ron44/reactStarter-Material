import React from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 0,
  },
  link: {
    color: "inherit",
    textDecoration: "inherit",
  },
}));
const Crumbs = ({ initialRoutes }) => {
  var finalArray = [{ path: "/", text: "Home" }];
  if (initialRoutes) {
    finalArray = finalArray.concat(initialRoutes);
  }

  const classes = useStyles();

  return (
    <Breadcrumbs className={classes.root}>
      {finalArray.length > 0 &&
        finalArray.map((b, i) => (
          <Link key={i} to={b.path} className={classes.link} color="secondary">
            {b.text}
          </Link>
        ))}
    </Breadcrumbs>
  );
};

export default Crumbs;
