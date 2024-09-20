import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { deleteApi, patchApi, postApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function ConfrimationModal({
  modal,
  setModal,
  endpoint,
  setRefresh,
  refresh,
}) {

  const [loading, setLoading] = useState(false);
  const handleStatusChange = () => {
    setLoading(true);
    const id = modal?.row?._id;
    if (modal?.type === "delete") {
      deleteApi(endpoint, id)
        .then(() => {
          toast.success("Data deleted Successfully");
        })
        .finally(() => {
          setLoading(false);
          setModal({ isVisble: false, row: null, type: "" });
          setRefresh(!refresh);
        });
    } else if (modal?.type === "status") {
      patchApi(endpoint, id, {
        isActive: !modal?.row?.isActive,
      })
        .then(() => {
          toast.success("Status Changed Successfully");
        })
        .finally(() => {
          setLoading(false);
          setModal({ isVisble: false, row: null, type: "" });
          setRefresh(!refresh);
        });
    }
  };
  return (
    <Modal
      open={modal?.isVisible}
      onClose={() => setModal({ isVisble: false, row: null })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style} className="rounded-xl">
        <IconButton
          aria-label="close"
          onClick={() => setModal({ isVisble: false, row: null })}
          sx={{
            position: "absolute",
            top: 5,
            right: 5,
            bgcolor: "primary",
          }}
        >
     
        </IconButton>
        <h3 className="heading-600-18">
          {modal?.type === "delete" ? "Delete" : "Status"}
        </h3>
        <p className="c-gray6 text-lg pb-4">
          {modal?.type === "delete"
            ? "Are you sure to delete it?"
            : "Are you sure to change status?"}
        </p>
        {modal?.type === "status" && (
          <p className="c-gray6 py-5 pb-10 flex">
            Current Status :{"  "}
            <div
              className={`${
                modal?.row?.isActive
                  ? "mui-status-active"
                  : "mui-status-deactive"
              }`}
            >
              {modal?.row?.isActive ? "Active" : "Inactive"}{" "}
            </div>{" "}
          </p>
        )}
        <div className="flex justify-end">
          <Button
            variant="contained"
            onClick={handleStatusChange}
            sx={{ marginRight: "10px" }}
          >
            {loading ? "Loading..." : "Yes"}
          </Button>
          <Button
            variant="outlined"
            onClick={() => setModal({ isVisble: false, row: null })}
          >
            No
          </Button>
        </div>
      </Box>
    </Modal>
  );
}


