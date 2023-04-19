import AddRecordButton from "components/AddRecordButton";
import DetailDrawer from "components/drawer/DetailDrawer";
import ProgressModal from "components/ProgressModal";
import React, { useState } from "react";
import { useHistory } from "react-router";
import GovUserForm from "./GovUserForm";
import GovUserTable from "./GovUserTable";

const GovUsersView = ({ govUsers, isLoading, refresh }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});

  const history = useHistory();

  const handleOpen = (detail) => {
    history.push(`/manageuser/${detail.id}`);
  };

  const handleClose = () => {
    setDetail({});
    setOpen(false);
  };

  const handleAdd = () => {
    setDetail({});
    setOpen(true);
  };

  return (
    <>
      {/* <PageHeader
        title="Manage Gov Users"
        breadcrumbs={breadcrumbs}
        pageTitleVariant="h5"
      ></PageHeader> */}

      <AddRecordButton onClick={() => handleAdd()}></AddRecordButton>

      {isLoading && <ProgressModal />}
      {!isLoading && (
        <GovUserTable
          govUsers={govUsers}
          handleOpen={handleOpen}
        ></GovUserTable>
      )}
      {open && (
        <DetailDrawer
          open={open}
          handleClose={handleClose}
          title="User Details"
        >
          <GovUserForm
            handleClose={handleClose}
            data={detail}
            refresh={refresh}
          ></GovUserForm>
        </DetailDrawer>
      )}
    </>
  );
};

export default GovUsersView;
