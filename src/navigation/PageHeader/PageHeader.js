import React from "react";
import PageTitle from "./PageTitle";
import Crumbs from "./Crumbs";

const PageHeader = ({ title, subTitle, breadcrumbs, pageTitleVariant }) => {
  return (
    <>
      <Crumbs initialRoutes={breadcrumbs}></Crumbs>
      <PageTitle
        title={title}
        subTitle={subTitle}
        variant={pageTitleVariant}
      ></PageTitle>
    </>
  );
};

export default PageHeader;
