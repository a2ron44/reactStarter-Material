import React, { useState } from "react";
import AddRecordButton from "components/AddRecordButton";
import DetailDrawer from "components/drawer/DetailDrawer";
import ProgressModal from "components/ProgressModal";
import GovOfficeForm from "./GovOfficesForm";
import GovOfficeTable from "./GovOfficesTable";

const GovOfficesView = ({ govOffices, isLoading, refresh }) => {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState({});

  const handleOpen = (detail) => {
    setDetail(detail);
    setOpen(true);
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
      <AddRecordButton onClick={() => handleAdd()}></AddRecordButton>

      {isLoading && <ProgressModal />}
      {!isLoading && (
        <GovOfficeTable
          govOffices={govOffices}
          handleOpen={handleOpen}
        ></GovOfficeTable>
      )}
      {open && (
        <DetailDrawer
          open={open}
          handleClose={handleClose}
          title="Office Details"
        >
          <GovOfficeForm
            handleClose={handleClose}
            data={detail}
            refresh={refresh}
          ></GovOfficeForm>
        </DetailDrawer>
      )}
    </>
  );
};

export default GovOfficesView;
