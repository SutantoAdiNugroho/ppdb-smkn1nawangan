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
      {"Admin © "}
      <Link color="inherit">SMKN 1 Nawangan</Link> {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
