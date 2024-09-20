
import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import './popupAlert.css'
export default function PopupAlert({ open, setOpen, title, message, onConfirm, submitTxt, cancelTxt, onCancel }) {
  const [openPopup, setOpenPopup] = React.useState(false);

  const handleClickOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {

    setOpen(false)
    onCancel()
    setOpenPopup(false);
  };
  const handleSubmit = () => {
    onConfirm()
    setOpenPopup(false);
    setOpen(false)
  }
  return (
    <React.Fragment>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={onCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle >
          <span className='popup-title-fontsize font-semibold text-[#002850]'>{title}</span>
        </DialogTitle>
        <DialogContent className="sm:max-w-[425px]">
          <DialogContentText  >
            {/* Let Google help apps determine location. This means sending anonymous
            location data to Google, even when no apps are running. */}
            <span className='popup-content-fontsize'>{message}</span>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button className='min-w-[28px] '
            type={BUTTON_TYPES.SECONDARY} onClick={handleClose}>{cancelTxt}</Button>
          <Button className='min-w-[28px]' type="primary" onClick={handleSubmit} autoFocus>
            {submitTxt}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
