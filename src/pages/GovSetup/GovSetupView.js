import { Card, CardContent, Grid } from "@material-ui/core";
import PageHeader from "navigation/PageHeader/PageHeader";
import React from "react";
import GovOfficesContainer from "./GovOfficesContainer";
import GovUsersContainer from "./GovUsersContainer";

const GovSetupView = () => {
  return (
    <>
      <PageHeader title="Manage Government"></PageHeader>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <Card variant="outlined">
            <CardContent>
              <GovUsersContainer></GovUsersContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card variant="outlined">
            <CardContent>
              <GovOfficesContainer></GovOfficesContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default GovSetupView;
