import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
  InputsContainer,
  Section,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import RadioButton from '@/components/inputs/mui/RadioButton';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { CompareSharp } from '@mui/icons-material';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import { DateField } from '@/components/inputs/formik/FormikDateField';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const initialValues = {
  name: {
    english: '',
    hindi: '',
  },
  shortName: {
    english: '',
    hindi: '',
  },
  type: 'Hired',
  isActive: true,
  gst: '',
  pan: '',
  address: {
    billing: '',
    communication: '',
  },
  contractDate: {
    start: '',
    end: '',
  },
  pointOfContact: '',
  email: '',
  mobile: '',
  designation: '',
  devicetype: '',
  devices: null,
  // document: "Document Link",
};

// const isValidObjectId = (value) => {
//   // Implement your logic to check if value is a valid ObjectId
//   // Example using regex (adjust as needed)
//   return /^[0-9a-fA-F]{24}$/.test(value);
// };
const deviceVendorSchema = Yup.object().shape({
  name: Yup.object().shape({
    english: Yup.string().required(COMMON_SCHEMA),
    hindi: Yup.string().trim(),
  }),
  gst: Yup.string()
    .trim()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      'Invalid GST number'
    ),
  pan: Yup.string()
    .trim()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number'),
  address: Yup.object().shape({
    billing: Yup.string(),
  }),
  pointOfContact: Yup.string(),
  contractDate: Yup.object().shape({
    start: Yup.string(),
    end: Yup.string(),
  }),
  email: Yup.string().email('Invalid Email'),
  mobile: Yup.string().matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  type: Yup.string()
    .required(COMMON_SCHEMA)
    .oneOf(['Owned', 'Hired'], "Type must be either 'Owned' or 'Hired'"),
  devices: Yup.array().min(1).required('Select At Least One Device Type'),
});

const AddEditDeviceVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.DEVICE_VENDOR, id)
        .then((res) => {
          const editData = res?.data?.deviceVendor;
          setData((prev) => ({
            ...prev,
            name: {
              english: editData?.name?.english || '',
              hindi: editData?.name?.hindi || '',
            },
            shortName: {
              english: editData?.shortName?.english || '',
              hindi: editData?.shortName?.hindi || '',
            },
            type: editData?.type || 'Hired',
            gst: editData?.gst || '',
            pan: editData?.pan || '',
            address: {
              billing: editData?.address?.billing || '',
              communication: editData?.address?.communication || '',
            },
            contractDate: {
              start: editData?.contractDate?.start || '',
              end: editData?.contractDate?.end || '',
            },
            pointOfContact: editData?.pointOfContact || '',
            email: editData?.email || '',
            mobile: editData?.mobile || '',
            designation: editData?.designation || '',
            devices: editData?.devices,
            isActive: editData?.isActive || false,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: {
        english: values.name.english,
        hindi: values.name.hindi,
      },
      shortName: {
        english: values.shortName.english,
        hindi: values.shortName.hindi,
      },
      type: values.type,
      gst: values.gst,
      pan: values.pan,
      address: {
        billing: values.address.billing,
        communication: values.address.communication,
      },
      contractDate: {
        start: values.contractDate.start,
        end: values.contractDate.end,
      },
      pointOfContact: values.pointOfContact,
      email: values.email,
      mobile: values.mobile,
      designation: values.designation,
      devices: values.devices,
      isActive: values.isActive,
    };

    if (id) {
      payload._id = id;
      patchApi(APIS.DEVICE_VENDOR, id, payload)
        .then(() => {
          toast.success('Data updated successfully');
          navigate(-1);
        })
        .catch((error) => {
          toast.error('Failed to update data');
          console.error(error);
        })
        .finally(() => setSubmitting(false));
    } else {
      postApi(APIS.DEVICE_VENDOR, payload)
        .then(() => {
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
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={deviceVendorSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        errors,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Container>
          <div className="">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Header>
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(-1)}
                      breadCrumbs={[
                        { name: 'Master Settings', path: ROUTES.MASTERS },
                      ]}
                      boldItem={'Device Vendor'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Device Vendor</Heading>
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
                      onClick={formikSubmit}
                      loading={isSubmitting && !values?.saveAndNew}
                    >
                      {id ? 'Update' : 'Save'}
                    </Button>
                  </ButtonContainer>
                </Header>

                <Content>
                  <Section>
                    <SidePanel
                      title={`Add Device Vendor (En)`}
                      description={`Enter Device Vendor Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Device Vendor Name"
                            placeholder="Enter Device Vendor Name"
                            name="name.english"
                            isRequired={true}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Device Vendor Short Name"
                            placeholder="Enter Device Vendor Short Name"
                            name="shortName.english"
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="GST"
                            onChange={(e) => {
                              setFieldValue(
                                'gst',
                                e.target.value.toUpperCase()
                              );
                            }}
                            placeholder="Enter GST"
                            name="gst"
                          />
                        </div>
                        <div className="add-v-form-right-section">
                          <div className="add-v-form-section">
                            <div className="group-type-1">
                              <FormikAsyncDropdown
                                label="Device Type"
                                placeholder="Select device type"
                                name="devices"
                                id="deviceType"
                                isMulti
                                isRequired={true}
                                value={values.devices} // Ensure the dropdown gets an array
                                onChange={(selectedOptions) => {
                                  setFieldValue('devices', selectedOptions);
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="PAN"
                            onChange={(e) => {
                              setFieldValue(
                                'pan',
                                e.target.value.toUpperCase()
                              );
                            }}
                            placeholder="Enter PAN"
                            name="pan"
                          />
                        </div>
                        <div className="flex flex-col  pb-">
                          <p className="text-[13px] font-medium">
                            Device Vendor Type
                          </p>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="type"
                            sx={{
                              display: 'flex',
                              width: '30%',
                            }}
                            value={values.type}
                            onChange={handleChange}
                          >
                            <FormControlLabel
                              sx={{
                                fontSize: '10px',
                                fontWeight: '400',
                              }}
                              value="Owned"
                              control={<RadioButton />}
                              label="Owned"
                            />
                            <FormControlLabel
                              value="Hired"
                              control={<RadioButton />}
                              label="Hired"
                            />
                          </RadioGroup>
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Billing Address"
                            placeholder="Enter Billing Address"
                            name="address.billing"
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Communication Address"
                            placeholder="Enter Communication Address"
                            name="address.communication"
                          />
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <DateField
                            labelName="Contract Start Date"
                            placeholder="Enter Contract Start Date"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="contractDate.start"
                            value={values?.contractDate.start}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <DateField
                            labelName="Contract Start End"
                            placeholder="Enter Contract Start End"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            name="contractDate.end"
                            value={values?.contractDate.end}
                          />
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Point of Contact"
                            placeholder="Enter Point of Contact"
                            name="pointOfContact"
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Email"
                            placeholder="Enter Email"
                            name="email"
                            type="email"
                          />
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            onChange={(e) => {
                              let value = e.target.value.replace(/[^0-9]/g, '');
                              if (value.length > 2) {
                                value = value.slice(0, 10);
                                setFieldValue('mobile', value);
                              }
                              setFieldValue('mobile', value);
                            }}
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            name="mobile"
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Designation"
                            placeholder="Enter Designation"
                            name="designation"
                          />
                        </div>
                      </div>
                    </div>
                  </Section>
                  <Section>
                    <SidePanel
                      title={`Add Device Vendor (Hi)`}
                      description={`Enter Device Vendor Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Device Vendor Name"
                            placeholder="Enter Device Vendor Name"
                            name="name.hindi"
                          />
                        </div>
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Device Vendor Short Name"
                          placeholder="Enter Device Vendor Short Name"
                          name="shortName.hindi"
                        />
                      </div>
                    </div>
                  </Section>
                </Content>
              </>
            )}
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default AddEditDeviceVendor;
