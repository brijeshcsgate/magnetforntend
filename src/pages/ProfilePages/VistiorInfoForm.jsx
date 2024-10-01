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



const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    mobile: Yup.string()
        .min(8, 'Please fill valid mobile no.')
        .required('Contact number is required'),

});
export default function VistiorInfoForm({ openP, visitorInfoType, profileUserId ,setVisitorInfo}) {
    const [open, setOpen] = React.useState(openP);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = (event, reason) => {
        // Prevent closing if the user clicked outside (backdropClick) or pressed ESC (escapeKeyDown)
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
            return;
        }
        setOpen(false); // Close dialog only when the Cancel button is clicked
    };
    const handleSubmit = async (values) => {
        console.log('values', profileUserId);
        values.userId = profileUserId;
        await apiService.post(`${APIS.ADD_VISITOR}`, values)
            .then((res) => {
                setVisitorInfo(res.data)
                toast.success('Data saved successfully');
            })
        setOpen(false);

    }

    return (
        <React.Fragment>
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

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            mobile: '',
                            userId: '',
                            view_duration: '10',
                            location: 'lucknow'
                        }}
                        validationSchema={validationSchema}

                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ isSubmitting }) => (
                            <Form>
                                <div>
                                    <FormikTextField
                                        label="Your Good Name"
                                        placeholder="John"
                                        name="name"
                                        isRequired={visitorInfoType === 'Mandate' ? true : false}
                                    />
                                </div>
                                <div>
                                    <FormikTextField
                                        label="Enter Your Email"
                                        placeholder="john@gmail.com"
                                        name="email"
                                        isRequired={visitorInfoType === 'Mandate' ? true : false}
                                    />
                                </div>
                                <div>
                                    <FormikTextField
                                        label="Your Contact No."
                                        placeholder="+91 9999999999"
                                        name="mobile"
                                        isRequired={visitorInfoType === 'Mandate' ? true : false}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '25px', gap: '10px' }}>

                                    {visitorInfoType === 'Mandate' ? <></> :
                                        <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
                                    } <Button variant="contained" size="small" type="submit" autoFocus>
                                        Submit
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </DialogContent>
            </Dialog>
        </React.Fragment>
    );
}
