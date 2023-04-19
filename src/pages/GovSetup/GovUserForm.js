import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import userService from "services/userService";
import { toast } from "react-toastify";
import RTextField from "components/form/RTextField";
import RFormActionButtons from "components/form/RFormActionButtons";
import RForm from "components/form/RForm";
import RHiddenField from "components/form/RHiddenField";
import { useAuthContext } from "hooks/AuthContext";
import { useHistory } from "react-router";
import RSelectField from "components/form/RSelectField";

const GovUserForm = ({ data, handleClose, refresh }) => {
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();
  const { govId } = useAuthContext();

  const roleOptions = [
    { value: 2, name: "Admin" },
    { value: 3, name: "Reporter" },
  ];

  function initNewData() {
    var data = {
      email: "",
      governmentRoleId: "3",
    };
    return data;
  }

  var record = Object.keys(data).length === 0 ? initNewData() : data;

  const handleSubmit = async (record) => {
    try {
      setIsLoading(true);
      record.governmentId = govId;
      var res;

      delete record.id;
      res = await userService.addGovernmentUser(record);

      var newId = res.data.id;
      toast.success("Record Saved");
      setIsLoading(false);
      handleClose();
      history.push(`/manageuser/${newId}`);
    } catch (e) {
      console.log(e);
      setErrors({ field: "email", message: e.message });
    }
  };

  return (
    <RForm onSubmit={handleSubmit} mode="onChange" initialErrors={errors}>
      <Grid container spacing={4}>
        <Grid item container spacing={4}>
          <Grid item xs={12} md={6}>
            <RHiddenField
              name="id"
              type="hidden"
              defaultValue={record.id}
            ></RHiddenField>
            <RTextField
              label="Email"
              name="email"
              defaultValue={record.email}
              rules={{ required: true, maxLength: 30 }}
              autoFocus
              autoComplete="off"
            ></RTextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <RSelectField
              label="Role"
              name="governmentRoleId"
              defaultValue={record.governmentRoleId}
              options={roleOptions}
            ></RSelectField>
          </Grid>
        </Grid>
        <Grid item container spacing={4}>
          <Grid item xs={12}>
            <RFormActionButtons
              onCancel={handleClose}
              disabled={isLoading}
            ></RFormActionButtons>
          </Grid>
        </Grid>
      </Grid>
    </RForm>
  );
};

GovUserForm.propTypes = {
  data: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default GovUserForm;
