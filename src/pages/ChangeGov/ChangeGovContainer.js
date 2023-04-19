import React, { useState, useEffect } from "react";
import { useAuthContext } from "hooks/AuthContext";
import ChangeGovView from "./ChangeGovView";
import { toast } from "react-toastify";
import { useHistory } from "react-router";
import governmentService from "services/governmentService";
import { Dialog, DialogTitle } from "@material-ui/core";

const ChangeGovContainer = () => {
  const [govList, setGovList] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSwitching, setIsSwitching] = useState(false);
  const [errors, setErrors] = useState();
  const { permissions, changeGov } = useAuthContext();
  const history = useHistory();

  useEffect(() => {
    function mapGovs(govs) {
      var govArray = [];
      for (let g of govs) {
        govArray.push({ value: g.governmentId, name: g.governmentName });
      }

      return govArray;
    }
    setIsLoading(true);

    governmentService
      .getAccessibleGovs()
      .then((res) => {
        var govList = mapGovs(res.data);
        setGovList(govList);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("System Error", err);
        setGovList();
        setIsLoading(false);
      });
  }, [permissions]);

  const selectGov = async (data) => {
    var newGovId = data.governmentId;

    setIsLoading(true);
    setIsSwitching(true);

    try {
      var res = await changeGov(newGovId);
      if (res.success) {
        toast.info("Government Changed!");
        history.push("/");
      } else {
        setErrors({ field: "form", message: res.message });
        setIsLoading(false);
        setIsSwitching(false);
      }
    } catch (err) {
      setIsLoading(false);
      setIsSwitching(false);
    }
  };

  return (
    <>
      {!isLoading && (
        <ChangeGovView
          govList={govList}
          onChange={selectGov}
          error={errors}
        ></ChangeGovView>
      )}
      <Dialog
        open={isSwitching}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Switching Governments, please wait"}
        </DialogTitle>
      </Dialog>
    </>
  );
};

export default ChangeGovContainer;
