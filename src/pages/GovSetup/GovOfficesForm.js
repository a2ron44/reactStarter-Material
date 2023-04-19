import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import governmentService from "services/governmentService";
import { toast } from "react-toastify";
import RTextField from "components/form/RTextField";
import RFormActionButtons from "components/form/RFormActionButtons";
import RForm from "components/form/RForm";
import RHiddenField from "components/form/RHiddenField";
import { useAuthContext } from "hooks/AuthContext";
import ErrorText from "components/Text/ErrorText";

const GovOfficeForm = ({ data, handleClose, refresh }) => {
  const [errors, setErrors] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const { govId } = useAuthContext();

  function initNewData() {
    var data = {
      name: "",
    };
    return data;
  }

  var record;
  var isEdit = false;

  if (Object.keys(data).length === 0) {
    record = initNewData();
  } else {
    record = data;
    isEdit = true;
  }

  const handleSubmit = async (record) => {
    try {
      setIsLoading(true);
      record.governmentId = govId;
      if (!isEdit) {
        toast.error("No Edits allowed");
        handleClose();
        return;
      }
      //add only, no updates allowed
      // if (record.id) {
      //   await governmentService.updateGovernmentOffice(record.id, record);
      // } else {
      delete record.id;
      await governmentService.addGovernmentOffice(record);
      // }
      toast.success("Record Saved");
      setIsLoading(false);
      refresh();
      handleClose();
    } catch (e) {
      if (e.errorFields) {
        setErrors(e.errorFields[0]);
      } else {
        setErrors({ field: "form", message: e.message });
      }
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
              label="Name"
              name="name"
              defaultValue={record.name}
              rules={{ required: true, maxLength: 50 }}
              autoFocus
              autoComplete="off"
            ></RTextField>
          </Grid>
        </Grid>
        <Grid item container spacing={4}>
          {isEdit && <ErrorText text="Office cannot be modified."></ErrorText>}
          <Grid item xs={12}>
            <RFormActionButtons
              onCancel={handleClose}
              disabled={isEdit || isLoading}
            ></RFormActionButtons>
          </Grid>
        </Grid>
      </Grid>
    </RForm>
  );
};

GovOfficeForm.propTypes = {
  data: PropTypes.object.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default GovOfficeForm;
