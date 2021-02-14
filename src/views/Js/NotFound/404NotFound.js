import React from "react";
import { Typography, Button } from "@material-ui/core";

function NotFound() {
  return (
    <div style={{ flexFlow: "column nowrap" }}>
      <Typography variant="h5">
        Maaf, halaman yang anda cari tidak ditemukan
      </Typography>
      <Button>Kembali</Button>
    </div>
  );
}

export default NotFound;
