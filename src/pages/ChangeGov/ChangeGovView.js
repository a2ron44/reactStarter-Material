import { Box, Typography } from "@material-ui/core";
import RForm from "components/form/RForm";
import RFormActionButtons from "components/form/RFormActionButtons";
import RSelectField from "components/form/RSelectField";
import { useAuthContext } from "hooks/AuthContext";
import PageHeader from "navigation/PageHeader/PageHeader";
import React from "react";

const ChangeGovView = ({ govList, onChange, error }) => {
  const { govId } = useAuthContext();
  return (
    <>
      <PageHeader title="Select Government"></PageHeader>

      <Box style={{ maxWidth: "400px" }}>
        <RForm onSubmit={onChange} initialErrors={error}>
          {govList && (
            <RSelectField
              label="Government"
              name="governmentId"
              defaultValue={govId}
              options={govList}
            ></RSelectField>
          )}
          <RFormActionButtons saveText="Switch"></RFormActionButtons>
        </RForm>
      </Box>

      {error && <Typography>{error}</Typography>}
    </>
  );
};

export default ChangeGovView;
