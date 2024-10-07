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


import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input'
import { cn } from '@/utils';

const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    tempratur_scale: Yup.string()
        .required('Name is required'),

    mobile: Yup.string()
        .min(8, 'Please fill valid mobile no.')
        .required('Contact number is required'),
    requirement_summary: Yup.string()
        .required('Email is required'),


});
export default function EnquiryInfoForm({ profileUserId, visitorInfo }) {
    const [charCount, setCharCount] = React.useState(0);

    const [open, setOpen] = React.useState(false);
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
        values.userId = profileUserId;
        await apiService.post(`${APIS.ADD_ENQUIRY}`, values)
            .then((res) => {
                toast.success('Data saved successfully');
            })
        setOpen(false);

    }

    return (
        <React.Fragment>
            
            <Button className="btn extra btn_animated has-popup"
                onClick={() => { setOpen(true) }}
                
            >
                <span
                 className="circle center_icon"
                >
                    <span
                    // className="ink animate"
                    ></span>
                    Enquiry
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

                    <Formik
                        initialValues={{
                            name: visitorInfo.name,
                            email: visitorInfo.email,
                            mobile: visitorInfo.mobile,
                            tempratur_scale: '4',
                            requirement_summary: '',
                            userId: ''
                        }}
                        validationSchema={validationSchema}

                        onSubmit={(values) => handleSubmit(values)}
                    >
                        {({ isSubmitting, setFieldValue, values }) => (
                            <Form>
                                <div>
                                    <FormikTextField
                                        label="Your Good Name"
                                        placeholder="John"
                                        name="name"
                                        isRequired
                                    />
                                </div>
                                <div>
                                    <FormikTextField
                                        label="Enter Your Email"
                                        placeholder="john@gmail.com"
                                        name="email"
                                        isRequired
                                    />
                                </div>
                                <div style={{ flex: '0 0 48%' }}>
                                    <FormikTextField
                                        label="Temperature Scale"
                                        placeholder="5"
                                        name="temperature_scale"
                                        isRequired
                                    />

                                </div>
                                <div>
                                    {/* <FormikTextField
                                        label="Your Contact No."
                                        placeholder="+91 9999999999"
                                        name="mobile"
                                        isRequired
                                    /> */}
                                    <Label
                                        className={cn('c-black mb-1')} // Adjusting label styling with cn
                                    //   htmlFor={name} // Updated to use `name` as `htmlFor` to match input id
                                    >
                                        Your Contact No. <span style={{ color: 'red' }}>*</span>
                                    </Label>
                                    <PhoneInput
                                        international
                                        defaultCountry="RU"
                                        value={values.mobile}
                                        // onChange={(e) => setFieldValue('mobile', e)}
                                        
                                     onChange={(value) => {
                                          setFieldValue('mobile', value);
                                        }}
                                        className={cn(
                                            'flex h-8 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-xs ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-primary-200 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ',
                                        )}

                                    />

                                </div>

                                <div>

                                    <div className="to-input-field">
                                        <Label>Requirement Summary</Label>

                                        <Textarea
                                            className="to-label c-black"
                                            charCount={charCount}
                                            name={`requirement_summary`}
                                            maxLength={500}
                                            rows={2}
                                            value={charCount > 0 ? values?.requirement_summary : ''}

                                            onChange={(e) => {
                                                setFieldValue(`requirement_summary`, e.target.value);
                                                setCharCount(e.target.value.length)
                                            }}

                                            placeholder="Requirement summary"
                                            style={{
                                                border: '1px solid #ccc',
                                                borderRadius: '4px',
                                                padding: '8px',
                                                width: '100%',
                                                transition: 'border-color 0.2s ease-in-out',
                                                outline: 'none',
                                            }}
                                        />
                                    </div>




                                </div>

                                <div style={{ display: 'flex', justifyContent: 'end', marginTop: '25px', gap: '10px' }}>


                                    <Button variant="outlined" size="small" onClick={handleClose}>Cancel</Button>
                                    <Button variant="contained" size="small" type="submit" autoFocus>
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
