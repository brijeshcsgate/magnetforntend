import {
    ButtonContainer,
    Container,
    Header,
    Heading,
    SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { postApi, patchApi } from '@/services/method';
import { ErrorMessage, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';
import { customEmailValidation } from '@/utils/custValidations';
import { toast } from 'react-toastify';
import {
    validateMobileNumber,
    validatePincode,
} from '@/utils/common.helper';
import apiService, { BASE_URL_WAPI } from '@/lib/apiService';
import { useQuery } from '@tanstack/react-query';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import CustomOptionSelect from '@/components/common/CustomSelect/CustomOptionSelect';
import axios from 'axios';
import ImageUploadPreview from '@/components/ui/ImageUploader';
import { ROUTES } from '@/constants/route.constant';

const fetchRolePermissions = async (inputValue, page) => {
    const limit = 15;
    const response = await apiService.get(`v2/masters/userrole/userdropdown`, {
        params: {
            limit,
            page: page || 0,
            search: inputValue || null,
            sortBy: 'name',
            order: 'asc',
        },
    });

    return {
        results: response.data,
        nextPage: false,
    };
};
const validationSchema = Yup.object().shape({
    // orgName: Yup.string().required('Organization Name is required'),
    // industry: Yup.string().required('Please select an industry.'),
    // name: Yup.string().required('Name is required'),
    // email: Yup.string().email('Please enter a valid email id').required('Email is required'),
    // mobile: Yup.string().length(10, 'Mobile number must be 10 digits').required('Mobile is required'),
    // address: Yup.string().required('Address is required.'),
    // country: Yup.string().required('Please select a country.'),
    // state: Yup.string().required('Please select a state.'),
    // city: Yup.string().required('Please select a city.'),
    // pinCode: Yup.string().length(6, 'Pin code must be 6 digits').required('Pin code is required.'),
    // gstNo: Yup.string().required('GST number is required.'),
    // logo: Yup.mixed().required('Please select an organization logo.'),
});

const MagUserAddEdit = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [imagePreview, setImagePreview] = useState(null);
    const [data, setData] = useState({
        orgName: '',
        industry: null,
        name: '',
        email: '',
        mobile: '',
        address: '',
        country: '',
        state: '',
        city: '',
        pinCode: '',
        gstNo: '',
        countryCode: '+1', // Default country code
        orgLogo: null,
    });




    const [industries, setIndustries] = useState([]);

    // Fetch industry options from backend

    useEffect(() => {
        axios.get(`${BASE_URL_WAPI}industry`)
            .then(response => {
                setIndustries(response.data.data);
            })
            .catch(error => {
                console.error('Error fetching industries:', error);
            });
    }, []);

    const { setCount } = useContext(CounterContext);
    useEffect(() => {
        setCount('');
    }, []);
    const fetchUserById = useQuery({
        queryKey: ['userById', id || ''],
        queryFn: async () =>
            await apiService.get(`${APIS.COMP_RESEL}/${id || ''}`).then((res) => {
                const editData = res?.data[0];
                console.log('editData', editData)
                setData({
                    orgName: editData?.orgName,
                    industry: editData?.industry,
                    name: editData?.name,
                    email: editData?.email,
                    mobile: editData?.mobile,
                    address: editData?.address,
                    country: editData?.country,
                    state: editData?.state,
                    city: editData?.city,
                    pinCode: editData?.pinCode,
                    gstNo: editData?.gstNo,
                    countryCode: editData?.countryCode || '+1', // Default country code
                    orgLogo: editData?.orgLogo,
                });
                console.log('data', data)
                return res.data;
            }),
        enabled: id !== '',
        refetchOnWindowFocus: false,
    });

    // const handleSubmit = (values) => {
    //   console.log('Form Data:', values);
    //   // Handle form submission logic here
    // };


    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        let payload = {
        }

        console.log('valuse', values.orgLogo)
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('orgName', values.orgName);
        formData.append('mobile', values.mobile);
        formData.append('email', values.email);
        formData.append('address', values.address);
        formData.append('country', values.country);
        formData.append('state', values.state);
        formData.append('city', values.city);
        formData.append('industry', values.industry);
        formData.append('pinCode', values.pinCode);
        formData.append('gstNo', values.gstNo);
        formData.append('orgLogo', values.orgLogo);
        formData.append('invitationCode', 'S16974');

        formData.append('countryCode', '+91');

        formData.append('userType', 'Company');

        // formData.append('orgLogo', values.orgLogo);



        if (id) {

            formData.append('_id', id);
            // payload._id = id;
            patchApi(APIS.EDIT_RESEL_COMP, id, formData).then(() => {
                toast.success('Data updated successfully');
                if (values?.saveAndNew) {
                    resetForm();
                    setData(initialValues);
                } else {
                    navigate(ROUTES.RESELLERCOMPANY);
                }
            });
        } else {
            postApi(APIS.ADD_USER, formData)
                .then((res) => {
                    toast.success('Data saved successfully');
                    if (values?.saveAndNew) {
                        resetForm();
                        setData(initialValues);
                    } else {
                        navigate(ROUTES.RESELLERCOMPANY);
                    }
                })
                .finally(() => {
                    setSubmitting(false);
                });
        }
    };



    // Handle image change and show preview
    // const handleImageChange = (event, setFieldValue) => {
    //   const file = event.target.files[0];
    //   setFieldValue('orgLogo', file);

    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     setImagePreview(reader.result);
    //   };
    //   reader.readAsDataURL(file);
    // };

    if (id && fetchUserById.isLoading) {
        return <div>Loading...</div>;
    }
    return (
        <Formik
            enableReinitialize
            initialValues={data}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({
                isSubmitting,
                setFieldValue,
                handleSubmit: formikSubmit,
                values,
            }) => {
                return (
                    <Container>
                        <div className="">
                            <>
                                <Header>
                                    <div>
                                        <BreadCrumbs
                                            backNavi={() => navigate(-1)}
                                            breadCrumbs={[]}
                                            boldItem={'User'}
                                        />
                                        <Heading>
                                            {/* {
                      id ? 'Edit' : 'Add'} */}
                                            Reseller</Heading>
                                    </div>
                                    <ButtonContainer>
                                        <Button
                                            type={BUTTON_TYPES.SECONDARY}
                                            onClick={() => navigate(-1)}
                                            disabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        {!id && (
                                            <Button
                                                type={BUTTON_TYPES.SECONDARY}
                                                onClick={() => {
                                                    values.saveAndNew = true;
                                                    formikSubmit();
                                                }}
                                                disabled={isSubmitting && values?.saveAndNew === true}
                                            >
                                                Save & Add New
                                            </Button>
                                        )}
                                        <Button
                                            type={BUTTON_TYPES.PRIMARY}
                                            onClick={() => {
                                                formikSubmit();
                                            }}
                                        // loading={isSubmitting && !values?.saveAndNew}
                                        >
                                            {id ? 'Update' : 'Save'}
                                        </Button>

                                    </ButtonContainer>
                                </Header>

                                <div
                                    className="add-v-form"
                                    style={{ padding: '20px', justifyContent: 'center' }}
                                >

                                    <Heading>
                                        Let's MAGNETize an Organization</Heading>
                                    Invite an Organization to onboard on MAGNET and Invite there users
                                    <div className="width90">
                                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                                            <SidePanel title={`Organization Information`} />

                                            <div className="group-type-3-equal">
                                                {/* <div className="w-100 flex-1"> */}
                                                <FormikTextField
                                                    label="Organization Name"
                                                    placeholder="Enter organization name"
                                                    name="orgName"
                                                    isRequired
                                                />
                                                {/* </div>
  
                          <div className="flex-1 w-100"> */}
                                                <CustomOptionSelect
                                                    name="industry"
                                                    label="industry"
                                                    placeholder="Select"
                                                    options={industries}
                                                    className={`flex justify-between items-center `}
                                                />

                                                {/* </div> */}
                                            </div>

                                        </div>
                                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                                            <SidePanel title={`Concerned Information`} />

                                            <div className="group-type-3-equal">
                                                {/* <div className="w-100 flex-1"> */}
                                                <FormikTextField
                                                    label="name"
                                                    placeholder="name"
                                                    name="name"
                                                // isRequired
                                                />
                                                {/* </div>
                          <div className="w-100 flex-1"> */}
                                                <FormikTextField
                                                    label="email"
                                                    placeholder="email"
                                                    name="email"
                                                // isRequired
                                                />
                                                {/* </div> */}
                                            </div>

                                            <div className="group-type-3-equal">

                                                {/* <div className="w-100 flex-1"> */}
                                                <FormikTextField
                                                    label="mobile"
                                                    placeholder="mobile"
                                                    name="mobile"
                                                    onChange={(e) =>
                                                        validateMobileNumber(
                                                            e,
                                                            setFieldValue,
                                                            'mobile'
                                                        )
                                                    }
                                                // isRequired
                                                />
                                                {/* </div> */}
                                            </div>
                                        </div>
                                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                                            <SidePanel title={`BILLING & SHIPPING INFORMATION`} />

                                            <div className="group-type-3-equal">
                                                {/* <div className="flex-1 w-100"> */}
                                                <FormikTextField
                                                    label="Address"
                                                    placeholder="Address"
                                                    name="pinCode"
                                                    onChange={(e) =>
                                                        validatePincode(
                                                            e,
                                                            setFieldValue,
                                                            'pinCode'
                                                        )
                                                    }
                                                />
                                                {/* </div>
                          <div className="flex-1 w-100"> */}
                                                <FormikTextField
                                                    label="Pin Code"
                                                    placeholder="Enter pin code"
                                                    name="pinCode"
                                                    onChange={(e) =>
                                                        validatePincode(
                                                            e,
                                                            setFieldValue,
                                                            'pinCode'
                                                        )
                                                    }
                                                />
                                                {/* </div>
                          <div className="flex-1 w-100"> */}
                                                <CustomOptionSelect
                                                    name="country"
                                                    label="country"
                                                    placeholder="country"
                                                    options={industries}
                                                    className={`flex justify-between items-center `}
                                                />

                                                {/* </div>
                          <div className="flex-1 w-100"> */}

                                                <CustomOptionSelect
                                                    name="state"
                                                    label="state"
                                                    placeholder="Select"
                                                    options={industries}
                                                    className={`flex justify-between items-center `}
                                                />

                                            </div>
                                            {/* </div>
                        <div className="flex-1 w-100"> */}
                                            <CustomOptionSelect
                                                name="city"
                                                label="city"
                                                placeholder="Select"
                                                options={industries}
                                                className={`flex justify-between items-center `}
                                            />

                                            {/* </div> */}
                                        </div>
                                        <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                                            <SidePanel title={`Additional Information`} />


                                            <div className="group-type-3-equal">
                                                <div className="w-100 flex-1">
                                                    <FormikTextField
                                                        label="gstNo"
                                                        placeholder="gstNo"
                                                        name="gstNo"
                                                    // isRequired
                                                    />
                                                </div>
                                            </div>

                                            {/* <div>
                          <label htmlFor="orgLogo">Image</label>
                          <input
                            id="orgLogo"
                            name="orgLogo"
                            type="file"
                            accept="image/*"
                            onChange={(event) => handleImageChange(event, setFieldValue)}
                          />
                          <ErrorMessage name="orgLogo" component="div" className="error" />
                        </div>
  
                        {imagePreview && (
                          <div>
                            <h4>Image Preview:</h4>
                            <img src={imagePreview} alt="Preview" width="150" />
                          </div>
                        )} */}
                                            <ImageUploadPreview
                                                field="orgLogo"
                                                label="Organization Logo"
                                                setFieldValue={setFieldValue}
                                                imageurl={data?.orgLogo ? data?.orgLogo : ''}
                                                error={<ErrorMessage name="orgLogo" />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                    </Container>
                );
            }}
        </Formik>
    );
};

export default MagUserAddEdit;
