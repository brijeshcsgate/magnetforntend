import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { ButtonGroup } from '@mui/material';
import { toast } from 'sonner';
import { postApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import axios from 'axios';
import apiService from '@/lib/apiService';
import FormikTextArea from '@/components/inputs/formik/FormikTextArea';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';



export default function DetailView({ profileUserId, visitorInfo }) {
 
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        // Prevent closing if the user clicked outside (backdropClick) or pressed ESC (escapeKeyDown)
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        setOpen(false); // Close dialog only when the Cancel button is clicked
    };
 
    return (
        <React.Fragment>
            <Button className="btn extra btn_animated has-popup"
                onClick={() => { setOpen(true) }}
            >
                <span
                //  className="circle center_icon"
                >
                    <span
                    // className="ink animate"
                    ></span>
                    Refer Business
                </span>
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                // maxWidth="md"  
                fullWidth
            >
                <DialogTitle style={{ fontSize: '16px', fontWeight: '700' }}>
                    {"Please fill this form"}
                </DialogTitle>
                <DialogContent>

                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
