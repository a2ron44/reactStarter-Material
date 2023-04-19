import React, { useState } from "react";
import clsx from "clsx";
import "@fontsource/roboto";
import { makeStyles } from "@material-ui/core/styles";
import { Hidden, ThemeProvider } from "@material-ui/core/";
import { dark, light, menuDrawerWidth } from "styles/muiTheme";
import CssBaseline from "@material-ui/core/CssBaseline";
import { BrowserRouter } from "react-router-dom";
import RouterConfig from "navigation/RouterConfig";
import TopHeaderContainer from "navigation/TopHeader/TopHeaderContainer";
import LeftNavMenuContainer from "navigation/LeftNavMenu/LeftNavMenuContainer";
import { AuthContextProvider } from "hooks/AuthContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const useStyles = makeStyles((theme) => ({
  belowToolbar: {
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
  },
  contentShift: {
    flexGrow: 1,
    marginLeft: menuDrawerWidth,
  },
}));

function App() {
  const classes = useStyles();
  const [darkState, setDarkState] = useState(false);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleThemeChange = () => {
    setDarkState(!darkState);
    console.log("theme=", !darkState ? "dark" : "light");
  };

  return (
    <div className="App">
      <AuthContextProvider>
        <ThemeProvider theme={darkState ? dark() : light()}>
          <CssBaseline>
            <BrowserRouter>
              <ToastContainer
                position="top-center"
                hideProgressBar={false}
                autoClose={1200}
              />
              <TopHeaderContainer
                handleOpen={handleDrawerOpen}
                open={open}
              ></TopHeaderContainer>
              <LeftNavMenuContainer
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
                handleThemeChange={handleThemeChange}
                open={open}
              ></LeftNavMenuContainer>
              <Hidden smDown>
                <main className={clsx(classes.content, classes.contentShift)}>
                  <div className={classes.belowToolbar} />

                  <RouterConfig></RouterConfig>
                </main>
              </Hidden>

              <Hidden mdUp>
                <main className={classes.content}>
                  <div className={classes.belowToolbar} />

                  <RouterConfig></RouterConfig>
                </main>
              </Hidden>
            </BrowserRouter>
          </CssBaseline>
        </ThemeProvider>
      </AuthContextProvider>
    </div>
  );
}

export default App;
