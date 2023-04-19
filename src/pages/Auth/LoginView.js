import React from "react";

import { Avatar, Box, makeStyles, Typography } from "@material-ui/core";

import PageHeader from "navigation/PageHeader/PageHeader";
import { LockOutlined } from "@material-ui/icons";
import RTextField from "components/form/RTextField";
import RForm from "components/form/RForm";
import RFormActionButtons from "components/form/RFormActionButtons";

const useStyles = makeStyles((theme) => ({
  form: {
    maxWidth: "600px",
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

const LoginView = ({ handleLogin, isLoading, initialErrors }) => {
  const classes = useStyles();

  return (
    <>
      <PageHeader title="Login"></PageHeader>

      <Box className={classes.form}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlined />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <RForm
          onSubmit={handleLogin}
          initialErrors={initialErrors}
          mode="onSubmit"
        >
          <RTextField
            name="email"
            label="Email"
            autoFocus
            rules={{
              required: "Field is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            }}
          ></RTextField>
          <RTextField
            name="password"
            label="Password"
            type="password"
            rules={{ required: "Field is required" }}
          ></RTextField>
          <RFormActionButtons
            saveText="Submit"
            disabled={isLoading}
            disableInvalid={false}
          ></RFormActionButtons>
        </RForm>
      </Box>
    </>
  );
};

export default LoginView;
