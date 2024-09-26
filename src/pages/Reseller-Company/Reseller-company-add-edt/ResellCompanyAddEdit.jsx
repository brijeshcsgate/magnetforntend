import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import { Checkbox } from '@/components/ui/checkbox';
// import './ResellCompanyAddEdit.css';
import moment from 'moment';
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
import FormikRadioGroup from '@/components/inputs/formik/FormikRadioGroup';
import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import { customEmailValidation } from '@/utils/custValidations';
import { toast } from 'react-toastify';
import {
  bloodGroup,
  validateAlphabets,
  validateMobileNumber,
  validatePincode,
  governmentIssueCards,
  startSpcaeRemover,
} from '@/utils/common.helper';
import { getTodaysDate } from '@/utils/dateHelper';
import { DatePickerInput } from '@/components/common/DateTimeInputs';
import {
  CustomSelect,
  CustomSelectById,
  FormikSelect,
} from '@/components/common/CustomSelect';
import apiService, { BASE_URL_WAPI } from '@/lib/apiService';
import { generateRandomString } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
// import CustomOptionSelect from '../../components/common/CustomSelect/CustomOptionSelect';

import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import CustomOptionSelect from '@/components/common/CustomSelect/CustomOptionSelect';
import axios from 'axios';

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

const ResellCompanyAddEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
//   const [data, setData] = useState({
//     invitationCode: '',
//     userType: '',
//     name: '',
//     orgName: '',
//     mobile: '',
//     email: '',
//     address: '',
//     country: '',
//     state: '',
    
// city: '',
// industry: '',
// pinCode: '',
// gstNo: '',
// orgLogo: '',
   
//   });
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
  axios.get(`${BASE_URL_WAPI}/industry`)
    .then(response => {
      console.log(response.data.data)
      setIndustries(response.data.data);
    })
    .catch(error => {
      console.error('Error fetching industries:', error);
    });
}, []);

// Handle input change
const handleChange = (e) => {
  // setFormData({
  //   ...formData,
  //   [e.target.name]: e.target.value
  // });
};











  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('');
  }, []);
  const fetchUserById = useQuery({
    queryKey: ['userById', id || ''],
    queryFn: async () =>
      await apiService.get(`${APIS.USERS_BY_ID}/${id || ''}`).then((res) => {
        const editData = res?.data;
        // setData({
        //   employeeId: editData?.employeeId,
        //   roleId: [
        //     {
        //       label: editData?.roleId?.description,
        //       value: editData?.roleId?._id,
        //     },
        //   ],
        //   roleType: editData?.roleType,
        //   contractStartDate: editData?.servicePeriod?.startDate,
        //   contractEndDate: editData?.servicePeriod?.endDate,
        //   stateId: editData?.stateId._id,
        //   regionId: editData?.regionId.map((r) => r._id) || [],
        //   depotId: editData?.depotId.map((r) => r._id) || [],
        //   payRollId: editData?.payRollId,
        //   profileImage: editData?.profileImage,
        //   name: {
        //     english: editData?.name?.english,
        //     hindi: editData?.name?.hindi,
        //   },
        //   loginEmail: editData?.loginEmail,
        //   loginMobile: editData?.loginMobile,
        //   dob: editData?.dob,
        //   fatherName: {
        //     english: editData?.fatherName?.english,
        //     hindi: editData?.fatherName?.hindi,
        //   },
        //   emergencyNo: editData?.emergencyNumber,

        //   govtIssuedCard: editData?.govtIssuedCard,
        //   cardNo: editData?.cardNumber,
        //   bloodGroup: editData?.bloodGroup,
        //   govImage: editData?.govImage,
        //   designation: editData?.designation,
        //   presentAddress: {
        //     country: editData?.presentAddress?.country,
        //     stateId: editData?.presentAddress?.stateId?.id,
        //     districtId: editData?.presentAddress?.districtId?.id,
        //     pinCode: editData?.presentAddress?.pinCode,
        //     address1: editData?.presentAddress?.address1,
        //     address2: editData?.presentAddress?.address2,
        //   },
        //   sameAddress: false,
        //   permanentAddress: {
        //     country: editData?.permanentAddress?.country,
        //     stateId: editData?.permanentAddress?.stateId?.id,
        //     districtId: editData?.permanentAddress?.districtId?.id,
        //     pinCode: editData?.permanentAddress?.pinCode,
        //     address1: editData?.permanentAddress?.address1,
        //     address2: editData?.permanentAddress?.address2,
        //   },

        //   employmentStatus: editData?.employmentStatus,
        //   contractorId: editData?.contractorId,
        // });
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

console.log('valuse',values.orgLogo)
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
        payload._id = id;
        patchApi(APIS.UPDATE_USER_BY_ID, id, payload).then(() => {
          toast.success('Data updated successfully');
          if (values?.saveAndNew) {
            resetForm();
            setData(initialValues);
          } else {
            navigate(-1);
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
              navigate(-1);
            }
          })
          .finally(() => {
            setSubmitting(false);
          });
      }
    };


  
// Handle image change and show preview
const handleImageChange = (event, setFieldValue) => {
  const file = event.target.files[0];
  setFieldValue('orgLogo', file);

  const reader = new FileReader();
  reader.onloadend = () => {
    setImagePreview(reader.result);
  };
  reader.readAsDataURL(file);
};

  if (id && fetchUserById.isLoading) {
    return <div>Loading...</div>;
  }
  const currentDate = dayjs();
  const min18YearsDate = currentDate.subtract(18, 'year');
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
        useEffect(() => {
          if (values?.sameAddress) {
            setFieldValue('permanentAddress', {
              ...values?.permanentAddress,
              address1: values?.presentAddress?.address1,
              address2: values?.presentAddress?.address2,
              country: values?.presentAddress?.country,
              stateId: values?.presentAddress?.stateId,
              districtId: values?.presentAddress?.districtId,
              pinCode: values?.presentAddress?.pinCode,
            });
          }
        }, [values?.sameAddress, values?.userType]);
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
                      loading={isSubmitting && !values?.saveAndNew}
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
                      {/* {
                    id ? 'Edit' : 'Add'} */}
                     Let's MAGNETize an Organization</Heading>
                     Invite an Organization to onboard on MAGNET and Invite there users
                  <div className="width90">
                    <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                      <SidePanel title={`Organization Information`} />

                      <div className="group-type-3-equal">
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="Organization Name"
                            placeholder="Enter organization name"
                            name="orgName"
                            isRequired
                          />
                        </div>
                        
                        <div className="flex-1 w-100">
                          <CustomOptionSelect
                            name="industry"
                            label="industry"
                            placeholder="Select"
                            options={industries}
                          />
                          
      {/* <div>
        <label htmlFor="industry">Industry:</label>
        <select
          id="industry"
          name="industry"
          value={data.industry}
          // onChange={handleChange}
          
          onChange={(e)=>setFieldValue('data.industry',e.target.value)}
          required
        >
          <option value="">Select an industry</option>
          {industries?.map((industry) => (
            <option key={industry._id} value={industry._id}>
              {industry.industry}
            </option>
          ))}
        </select>
      </div> */}
                        {/* <FormikTextField
                            label="Industry"
                            placeholder="Select"
                            name="industry"
                            // isRequired
                          /> */}
                        </div>
                      </div>
                      
                    </div>
                    <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                      <SidePanel title={`Concerned Information`} />

                      <div className="group-type-3-equal">
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="name"
                            placeholder="name"
                            name="name"
                            // isRequired
                          />
                        </div>
                        <div className="w-100 flex-1">
                        <FormikTextField
                            label="email"
                            placeholder="email"
                            name="email"
                            // isRequired
                          />
                        </div>
                      </div>
                      
                      <div className="group-type-3-equal">
                        
                        <div className="w-100 flex-1">
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
                        </div>
                      </div>
                    </div>
                    <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                      <SidePanel title={`BILLING & SHIPPING INFORMATION`} />

                      <div className="group-type-3-equal">
                        <div className="flex-1 w-100">
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
                        </div>
                        <div className="flex-1 w-100">
                          <FormikTextField
                            label="country"
                            placeholder="country"
                            name="country"
                            // isRequired
                          />
                        </div>
                        <div className="flex-1 w-100">
                       
<FormikTextField
                            label="state"
                            placeholder="state"
                            name="state"
                            // isRequired
                          />
                        </div>
                      </div>
                        <div className="flex-1 w-100">
                        <FormikTextField
                            label="city"
                            placeholder="city"
                            name="city"
                            // isRequired
                          />
                        </div>
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
                



{/* <FormikDocumentUploder
                            name="orgLogo"
                            id="govImage-crew"
                            title="Logo"
                            message="or drag & drop Logo files here"
                            btnText="BROWSE FILE"
                            bottomMessage="Supported File Format: jpeg, png & pdf (upto 1 MB)"
                            accept="image/*,application/pdf"
                            isSingle={true}
                          /> */}



<div>
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
          )}

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

export default ResellCompanyAddEdit;
