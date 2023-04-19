import { Typography } from "@material-ui/core";
import React, { useEffect } from "react";

const PageTitle = ({ title, variant, subTitle }) => {
  if (!variant) {
    variant = "h4";
  }
  usePageTitle("CampaignFi - " + title);

  return (
    <Typography variant={variant}>
      {title}
      {subTitle && (
        <Typography display="inline" variant="body1" color="secondary">
          {" " + subTitle}
        </Typography>
      )}
    </Typography>
  );
};

export default PageTitle;

export function usePageTitle(title) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;
    return () => {
      document.title = prevTitle;
    };
  });
}
