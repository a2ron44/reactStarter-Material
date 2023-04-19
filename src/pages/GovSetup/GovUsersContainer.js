import React, { useState, useEffect } from "react";
import GovUsersView from "./GovUsersView";
import userService from "services/userService";
import { toast } from "react-toastify";

const GovUsersContainer = () => {
  const [govUsers, setGovUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function getGovUsers() {
    userService
      .getGovernmentUsers()
      .then((res) => {
        setGovUsers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error Fetching Data");
        setGovUsers([]);
        setIsLoading(false);
      });
  }

  function refresh() {
    getGovUsers();
  }

  useEffect(() => {
    getGovUsers();
  }, []);

  return (
    <>
      <GovUsersView
        govUsers={govUsers}
        isLoading={isLoading}
        refresh={refresh}
      ></GovUsersView>
    </>
  );
};

export default GovUsersContainer;
