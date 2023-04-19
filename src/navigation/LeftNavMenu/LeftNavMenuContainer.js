import React from "react";
import LeftNavMenuView from "./LeftNavMenuView";

const LeftNavMenuContainer = ({
  darkState,
  handleThemeChange,
  open,
  handleDrawerOpen,
  handleDrawerClose,
}) => {
  return (
    <LeftNavMenuView
      darkState={darkState}
      handleThemeChange={handleThemeChange}
      open={open}
      handleDrawerOpen={handleDrawerOpen}
      handleDrawerClose={handleDrawerClose}
    ></LeftNavMenuView>
  );
};

export default LeftNavMenuContainer;
