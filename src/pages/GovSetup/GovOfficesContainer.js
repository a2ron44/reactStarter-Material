import React, { useState, useEffect } from "react";
import GovOfficesView from "./GovOfficesView";
import governmentService from "services/governmentService";

const GovOfficesContainer = () => {
  const [govOffices, setGovOffices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getGovOffices() {
    governmentService
      .getGovernmentOffices()
      .then((res) => {
        setGovOffices(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setGovOffices([]);
        setIsLoading(false);
      });
  }

  function refresh() {
    getGovOffices();
  }

  useEffect(() => {
    getGovOffices();
  }, []);

  return (
    <>
      <GovOfficesView
        govOffices={govOffices}
        isLoading={isLoading}
        refresh={refresh}
      ></GovOfficesView>
    </>
  );
};

export default GovOfficesContainer;
