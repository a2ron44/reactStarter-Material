import { FormControl, TextField } from "@material-ui/core";

const ZTextField = ({ name, label, value, onChange, ...props }) => {
  return (
    <FormControl fullWidth={true}>
      <TextField
        id={name}
        type="date"
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        {...props}
        variant="outlined"
      />
    </FormControl>
  );
};

export default ZTextField;
