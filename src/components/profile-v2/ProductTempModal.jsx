import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import ImageSliderBulk2 from '@/pages/ProfilePages/ImageSliderBulk2';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ProductTempModal({ item }) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <button
                //   variant="outlined" 
                className="text-secondary"
                // data-bs-toggle="modal"
                // data-bs-target="#serviceModal"

                onClick={handleClickOpen}>
                View Details
            </button>




            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    <h3 className="text-secondary">{item.name}</h3>

                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <ImageSliderBulk2 images={item?.image} autoChangeInterval={2000} />
                    {item.description}
                    <div className="text-secondary">
                        <b>  MRP:{" "}</b>              <span>{item.price}</span>
                    </div>
                </DialogContent>
              
            </BootstrapDialog>
        </React.Fragment>
    );
}
