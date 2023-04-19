import React from "react";
import TopHeaderView from "./TopHeaderView";

const TopHeaderContainer = ({ open, handleOpen }) => {
  return <TopHeaderView handleOpen={handleOpen} open={open}></TopHeaderView>;
};

export default TopHeaderContainer;
