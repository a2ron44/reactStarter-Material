import React from "react";
import { Switch } from "@material-ui/core";

export const ThemeSwitch = ({ darkState, handleThemeChange }) => {
  return (
    <div>
      <Switch checked={darkState} onChange={handleThemeChange} />
    </div>
  );
};
