import { createTheme } from "@material-ui/core";
import { teal } from "@material-ui/core/colors";

// Global styles can be moved to a separate file for ease of maintenance.
const globalStyle = {
  textRight: {
    textAlign: "right",
  },
  mygrey: "rgba(0, 0, 0, 0.5)",
};

export const menuDrawerWidth = () => 260;

export const dark = () =>
  createTheme({
    palette: {
      type: "dark",
      primary: {
        main: "#004d40",
        dark: "#00352c",
        light: "#337066",
      },
      secondary: {
        main: "#e65100",
        dark: "#a13800",
        light: "#eb7333",
      },
    },
    //common styles.
    globalStyle,
  });

export const light = () =>
  createTheme({
    palette: {
      type: "light",
      primary: teal,
      secondary: {
        main: "#e65100",
      },
    }, //,
    //common styles.
    globalStyle,
  });
