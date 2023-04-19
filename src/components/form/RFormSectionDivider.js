import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  divider: {
    width: "100%",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

const RFormSectionDivider = ({ title }) => {
  const classes = useStyles();

  return (
    <Typography variant="subtitle1" className={classes.divider}>
      {title}
    </Typography>
  );
};

export default RFormSectionDivider;
