import ErrorText from "components/Text/ErrorText";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";

const RForm = ({ children, initialErrors, onSubmit, mode = "onChange" }) => {
  const [formErrors, setFormErrors] = useState();
  const methods = useForm({ mode: mode });

  const { setError } = methods;

  //needed to set error from submit
  useEffect(() => {
    if (initialErrors) {
      if (initialErrors.field === "form") {
        setFormErrors(initialErrors);
      } else {
        setError(
          initialErrors.field,
          {
            message: initialErrors.message,
          },
          { shouldFocus: true }
        );
      }
    }
  }, [initialErrors, setFormErrors, setError]);

  return (
    <>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) => onSubmit(data))}
          noValidate
        >
          {formErrors && <ErrorText text={formErrors.message} />}
          {children}
        </form>
      </FormProvider>
    </>
  );
};

export default RForm;
