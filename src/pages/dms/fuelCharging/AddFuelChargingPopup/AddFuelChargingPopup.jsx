import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function AddInspectionPopup({
  open,
  setOpen,
  title = "Select Inspection Form",
  message = "Oops! There are no inspection forms.",
  onConfirm,
  onCancel,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle
          sx={{ m: 0, p: 2 }}
          id="customized-dialog-title"
        >
          {title}
          {/* <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton> */}
        </DialogTitle>
        <DialogContent
          dividers
          style={{ width: "400px", padding: "20px" }} // Adjust width and padding
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              gap: "16px",
            }}
          >
            <span>{message}</span>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              onConfirm();
              handleClose();
            }}
            sx={{ marginRight: "10px" }}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onCancel();
              handleClose();
            }}
          >
            No
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
