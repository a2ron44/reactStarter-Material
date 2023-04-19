import { InputLabel, MenuItem, Select } from "@material-ui/core";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

const RSelectField = ({
  name,
  defaultValue,
  options,
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
          <FormControl
            error={hasError}
            fullWidth
            required={isRequired}
            margin="normal"
          >
            <InputLabel>{label}</InputLabel>
            <Select {...field} {...props}>
              {options &&
                options.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.name}
                  </MenuItem>
                ))}
            </Select>
            <FormHelperText>{helperText}</FormHelperText>
          </FormControl>
        )}
      ></Controller>
    </>
  );
};

export default RSelectField;
