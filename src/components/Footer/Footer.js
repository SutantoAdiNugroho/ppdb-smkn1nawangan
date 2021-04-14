import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      color="textSecondary"
      align="center"
      style={{ marginTop: "50px" }}
    >
      {"This website template by © "}
      <a
        rel="noreferrer"
        target="_blank"
        href="https://material-ui.com/getting-started/templates/"
      >
        Material UI Template
      </a>
    </Typography>
  );
}
