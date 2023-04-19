import { TextField } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

const RTextField = ({
  name,
  defaultValue,
  rules,
  label,
  type = "text",
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const defVal =
    defaultValue === undefined || defaultValue === null ? "" : defaultValue;
  var hasError = false;
  var helperText = "";
  var isRequired = false;
  if (errors && errors[name]) {
    hasError = true;
    helperText = errors[name].message;
  }

  if (rules && "required" in rules) {
    isRequired = true;
  }

  return (
    <>
      <Controller
        control={control}
        name={name}
        defaultValue={defVal}
        rules={rules}
        render={({ field }) => (
          <TextField
            {...field}
            type={type}
            label={label}
            error={hasError}
            helperText={helperText}
            required={isRequired}
            fullWidth
            margin="normal"
            {...props}
          />
        )}
      ></Controller>
    </>
  );
};

export default RTextField;
