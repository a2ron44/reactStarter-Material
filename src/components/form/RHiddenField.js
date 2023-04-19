import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RHiddenField = ({ name, defaultValue, rules }) => {
  const { control } = useFormContext();
  const defVal =
    defaultValue === undefined || defaultValue === null ? "" : defaultValue;

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defVal}
        rules={rules}
        render={({ field }) => <TextField {...field} type="hidden" />}
      ></Controller>
    </>
  );
};

export default RHiddenField;
