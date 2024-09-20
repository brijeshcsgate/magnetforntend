import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
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
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
import { FormControlLabel, RadioGroup, Switch } from '@mui/material';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import * as Yup from 'yup';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import { customEmailValidation } from '@/utils/custValidations';
import {
  Delete,
  DeleteIcon,
  PlusIcon,
  RotateCwIcon,
  Trash2,
} from 'lucide-react';

import {
  bloodGroup,
  governmentIssueCards,
  licenceType,
  validateAlphabets,
  validateHindi,
  validateMobileNumber,
  validatePincode,
} from '@/utils/common.helper';

import { uploadIcon, imageThumbnail, deleteIcon } from '@/assets/Icons';
import FileUploadModal from '@/pages/issues/IssueFileSelector';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { DeleteOutline } from '@mui/icons-material';
import { DateField } from '@/components/inputs/formik/FormikDateField';
import { valuesIn } from 'lodash';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  contractorName: {
    english: '',
    hindi: '',
    shortname: '',
  },
  vendorType: [],
  // vendorType: {
  //   diesel: false,
  //   cng: false,
  //   chargingStation: false,
  // },
  isActive: true,
  gst: '',
  oem: '',
  pan: '',

  contractDate: {
    start: '',
    end: '',
  },
  billingAddress: {
    country: '6631f4585cbf7a33a5904343',
    stateId: '',
    districtId: '',
    pinCode: '',
    address1: '',
    address2: '',
  },
  communicationAddress: {
    country: '6631f4585cbf7a33a5904343',
    stateId: '',
    districtId: '',
    pinCode: '',
    address1: '',
    address2: '',
  },
  sameAddress: false,
  pointOfContact: '',
  email: '',
  mobileNo: '',
  fuelRates: [],
  document: [],
  isActive: true,
  // document: "Document Link",
};
const fuelvendorSchema = Yup.object().shape({
  contractorName: Yup.object().shape({
    english: Yup.string().required(COMMON_SCHEMA),
    hindi: Yup.string().nullable(),
    shortname: Yup.string().nullable(),
  }),

  gst: Yup.string()
    .trim()
    .matches(
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/,
      'Invalid GST number'
    )
    .nullable(),
  oem: Yup.string().nullable(),
  oem: Yup.string().nullable(),
  pan: Yup.string()
    .trim()
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .nullable(),
  // address: Yup.object().shape({
  //   billing: Yup.string().required(COMMON_SCHEMA),
  // }),

  vendorType: Yup.array().of(
    Yup.string().oneOf(
      ['diesel', 'cng', 'chargingStation'],
      'Invalid Vendor Type'
    )
  ),
  billingAddress: Yup.object().shape({
    country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
  communicationAddress: Yup.object().shape({
    country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
  pointOfContact: Yup.string().nullable(),
  pointOfContact: Yup.string().nullable(),
  contractDate: Yup.object().shape({
    start: Yup.string().nullable(),
    end: Yup.string().nullable(),
    start: Yup.string().nullable(),
    end: Yup.string().nullable(),
  }),
  // email: Yup.string().email("Invalid Email"),
  email: customEmailValidation.max(320).nullable(),
  email: customEmailValidation.max(320).nullable(),

  mobileNo: Yup.string()
    .trim()
    .nullable()
    .nullable()
    .matches(/^[0-9]\d{9}$/, 'Invailid mobile number'),

  documents: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().trim().required('Document name is required'),
      type: Yup.string().trim().required('Document type is required'),
      size: Yup.number().required('Document size is required'),
      dateAdded: Yup.date().required('Date added is required'),
      thumbnail: Yup.string().trim(),
    })
  ),
});

const AddEditFuelVender = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.FUELVENDORS, id)
        .then((res) => {
          const editData = res?.data;
          // Populate form with fetched data
          setData((prev) => ({
            ...prev,
            contractorName: {
              english: editData?.contractorName?.english || '',
              hindi: editData?.contractorName?.hindi || '',
              shortname: editData?.contractorName?.shortname || '',
            },
            vendorType: editData?.vendorType || [], // Array type
            gst: editData?.gst || '',
            pan: editData?.pan || '',
            oem: editData?.oem || '',
            billingAddress: {
              country: editData?.billingAddress?.country || '',
              stateId: editData?.billingAddress?.stateId || '',
              districtId: editData?.billingAddress?.districtId || '',
              pinCode: editData?.billingAddress?.pinCode || '',
              address1: editData?.billingAddress?.address1 || '',
              address2: editData?.billingAddress?.address2 || '',
            },
            sameAddress: false, // Assuming no need to pre-fill with true/false
            communicationAddress: {
              country: editData?.communicationAddress?.country || '',
              stateId: editData?.communicationAddress?.stateId || '',
              districtId: editData?.communicationAddress?.districtId || '',
              pinCode: editData?.communicationAddress?.pinCode || '',
              address1: editData?.communicationAddress?.address1 || '',
              address2: editData?.communicationAddress?.address2 || '',
            },
            contractDate: {
              start: editData?.contractDate?.start || '',
              end: editData?.contractDate?.end || '',
            },
            fuelRates: editData?.fuelRates || [], // Ensure fuelRates is an array

            // fuelRates: {
            //   date: editData?.fuelRates?.date || '',
            //   rate: editData?.fuelRates?.rate || '',
            // },
            pointOfContact: editData?.pointOfContact || '',
            email: editData?.email || '',
            mobileNo: editData?.mobileNo || '',
            isActive: editData?.isActive || false,
            documents: editData?.documents || [],
          }));
          // setInputList(editData?.fuelRates || []);
          setInputList(
            editData?.fuelRates?.map((item) => ({
              date: item.date
                ? new Date(item.date).toISOString().split('T')[0]
                : '',
              rate: item.rate || '',
            })) || []
          );
        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
          toast.error('Failed to load data');
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  // upload browser modal dialog
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showSubmittedTable, setShowSubmittedTable] = useState(false);

  const [inputList, setInputList] = useState([{ date: '', rate: '' }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    // Default to the current value if the new value is invalid
    let sanitizedValue = inputList[index][name]; // Retain the current value if invalid

    // Apply validation only to the 'rate' field
    if (name === 'rate') {
      // Ensure value is a valid number with at most two decimal places
      const regex = /^\d*(\.\d{0,2})?$/;

      // Update sanitizedValue only if the input is valid
      if (regex.test(value) && parseFloat(value) >= 0) {
        sanitizedValue = value;
      }
    } else {
      // For other fields, just set the value directly
      sanitizedValue = value;
    }

    // Update the list with the sanitized value if it is valid
    const updatedList = inputList.map((item, i) =>
      i === index ? { ...item, [name]: sanitizedValue } : item
    );

    setInputList(updatedList);
  };

  const handleAddClick = () => {
    setInputList([...inputList, { date: '', rate: '' }]); // Create new object
  };
  // Remove input field by index
  const handleRemoveClick = (index) => {
    setInputList(inputList.filter((_, i) => i !== index));
  };
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submit');
    const selectedVendorType = Object.keys(values.vendorType).find(
      (key) => values.vendorType[key] === true
    ); // Get the first true value
    const payload = {
      contractorName: {
        english: values.contractorName.english,
        hindi: values.contractorName.hindi,
        shortname: values.contractorName.shortname,
      },
      vendorType: values.vendorType,
      isActive: values.isActive,
      gst: values.gst,
      pan: values.pan,
      oem: values.oem,

      billingAddress: {
        pinCode: values?.billingAddress?.pinCode,
        address1: values?.billingAddress?.address1,
        address2: values?.billingAddress?.address2,
      },
      communicationAddress: {
        pinCode: values?.communicationAddress?.pinCode,
        address1: values?.communicationAddress?.address1,
        address2: values?.communicationAddress?.address2,
      },
      contractDate: {
        start: values.contractDate.start,
        end: values.contractDate.end,
      },
      // fuelRates: {
      //   rate: values.fuelRates.rate,
      //   date: values.fuelRates.date,
      // },
      // fuelRates: inputList.map((item) => ({
      //   date: item.date,
      //   rate: item.rate, // Assuming rate comes from another form field
      // })),
      fuelRates: inputList.map((item) => ({
        date: item.date ? new Date(item.date).toISOString() : null, // Convert date to ISO string if not null
        rate: item.rate,
      })),

      // fuelRates: values.fuelRates.map((fuelRate) => ({
      //   date: new Date(fuelRate.date), // Convert to Date object
      //   rate: fuelRate.rate,
      // })),
      // fuelRates:submittedData,
      pointOfContact: values.pointOfContact,
      email: values.email,
      mobileNo: values.mobileNo,
      isActive: values.isActive,
      documents: submittedData,
    };
    if (values?.billingAddress?.country) {
      payload.billingAddress.country = values?.billingAddress?.country;
    }
    if (values?.billingAddress?.stateId) {
      payload.billingAddress.stateId = values.billingAddress.stateId;
    }

    if (values?.billingAddress?.districtId) {
      payload.billingAddress.districtId = values.billingAddress.districtId;
    }
    if (values?.communicationAddress?.country) {
      payload.communicationAddress.country =
        values?.communicationAddress?.country;
    }
    if (values?.communicationAddress?.stateId) {
      payload.communicationAddress.stateId =
        values?.communicationAddress.stateId;
    }

    if (values?.communicationAddress?.districtId) {
      payload.communicationAddress.districtId =
        values?.communicationAddress?.districtId;
    }

    console.log('Payload:', payload);

    if (id) {
      payload._id = id;
      patchApi(APIS.FUELVENDORS, id, payload)
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
      postApi(APIS.FUELVENDORS, payload)
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
  const handleFileUpload = (fileData) => {
    const newFiles = fileData.files.map((file) => ({
      name: file.name,
      type: file.type,
      size: file.size,
      lastModified: new Date().toLocaleDateString(), // Add lastModified here if needed
      // preview: URL.createObjectURL(file), // Optionally, for preview
    }));

    const updatedData = [...submittedData, ...newFiles];
    setSubmittedData(updatedData);
    setShowSubmittedTable(true);
    closeModal(); // Close modal after submission
  };

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const handleStartDateChange = (date) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date) => {
    if (date && startDate && date < startDate) {
      // Handle invalid end date, e.g., show an error message
      console.error('End date cannot be earlier than start date');
      return;
    }
    setEndDate(date);
  };

  const shouldDisableDate = (date) => {
    return disabledDates.some(
      (disabledDate) => disabledDate.getTime() === date.getTime()
    );
  };
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={fuelvendorSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        handleChange,
        handleBlur,
        setFieldValue,
        errors,
      }) => {
        // console.log('errors', errors);
        useEffect(() => {
          if (values.sameAddress) {
            setFieldValue('communicationAddress', {
              ...values.billingAddress,
            });
          }
        }, [values.sameAddress]);

        return (
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
                        breadCrumbs={[{ name: 'Master', path: ROUTES.MASTERS }]}
                        boldItem={'Fuel Vendor'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Fuel Vendor</Heading>
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

                  {/* ------------------------- */}
                  <div
                    className="add-v-form-bottom-section"
                    style={{ paddingBottom: '20px' }}
                  >
                    <div
                      className="add-v-form"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel title={`Fuel Information`} />

                          <div className="group-type-3-equal">
                            <div className="w-100 flex-1">
                              <FormikTextField
                                label="Contractor Name (En)"
                                placeholder="Enter Contractor Name"
                                name="contractorName.english"
                                isRequired={true}
                                onChange={(e) => {
                                  validateAlphabets(
                                    e,
                                    setFieldValue,
                                    'contractorName.english'
                                  );
                                }}
                              />
                            </div>

                            <div className="w-100 flex-1">
                              <FormikTextField
                                label="Contractor Name (Hi)"
                                placeholder="Enter Contractor Name"
                                name="contractorName.hindi"
                                onChange={(e) => {
                                  validateHindi(
                                    e,
                                    setFieldValue,
                                    'contractorName.hindi'
                                  );
                                }}
                              />{' '}
                            </div>

                            <div className="w-100 flex-1">
                              <FormikTextField
                                label="Contractor Short Name"
                                placeholder="Enter Contractor Short Name"
                                name="contractorName.shortname"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  if (value.charAt(0) === ' ') {
                                    value = value.slice(1);
                                  }
                                  setFieldValue(
                                    'contractorName.shortname',
                                    value
                                  );
                                }}
                              />
                            </div>
                            <div className="w-100 flex-1">
                              {/* <FormikSwitch label="Is Active?" name="isActive" /> */}
                              <FormControlLabel
                                control={
                                  <Switch
                                    checked={values?.isActive}
                                    value={data.isActive}
                                    onChange={(e) => {
                                      setFieldValue(
                                        'isActive',
                                        e.target.checked
                                      );
                                    }}
                                    name="isActive"
                                  />
                                }
                                label="Is Active?"
                              />
                            </div>
                          </div>

                          <label className="to-label c-black">
                            Vendor Type
                          </label>

                          <div className="group-type-3-equal">
                            <div className="flex-1">
                              <FormikCheckbox
                                id="vendorType.diesel"
                                name="vendorType"
                                label="Diesel"
                                checked={values.vendorType.includes('diesel')}
                                onChange={() => {
                                  const newValue = values.vendorType.includes(
                                    'diesel'
                                  )
                                    ? values.vendorType.filter(
                                        (type) => type !== 'diesel'
                                      )
                                    : [...values.vendorType, 'diesel'];
                                  setFieldValue('vendorType', newValue);
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <FormikCheckbox
                                id="vendorType.cng"
                                name="vendorType"
                                label="CNG"
                                checked={values.vendorType.includes('cng')}
                                onChange={() => {
                                  const newValue = values.vendorType.includes(
                                    'cng'
                                  )
                                    ? values.vendorType.filter(
                                        (type) => type !== 'cng'
                                      )
                                    : [...values.vendorType, 'cng'];
                                  setFieldValue('vendorType', newValue);
                                }}
                              />
                            </div>
                            <div className="flex-1">
                              <FormikCheckbox
                                id="vendorType.chargingStation"
                                name="vendorType"
                                label="Charging Station"
                                checked={values.vendorType.includes(
                                  'chargingStation'
                                )}
                                onChange={() => {
                                  const newValue = values.vendorType.includes(
                                    'chargingStation'
                                  )
                                    ? values.vendorType.filter(
                                        (type) => type !== 'chargingStation'
                                      )
                                    : [...values.vendorType, 'chargingStation'];
                                  setFieldValue('vendorType', newValue);
                                }}
                              />
                            </div>
                          </div>

                          <div className="add-v-form-section">
                            <div className="group-type-3-equal">
                              <div className="d-flex w-100">
                                <FormikTextField
                                  label="OEM (Original Equipment Manufacturer)"
                                  placeholder="Enter OEM"
                                  name="oem"
                                />
                              </div>
                              <div className="d-flex w-100">
                                <FormikTextField
                                  label="GST"
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    if (value.charAt(0) === ' ') {
                                      value = value.slice(1);
                                    }

                                    setFieldValue('gst', value.toUpperCase());
                                  }}
                                  placeholder="Enter GST"
                                  name="gst"
                                />
                              </div>
                              <div className="d-flex w-100">
                                <FormikTextField
                                  label="PAN"
                                  onChange={(e) => {
                                    let value = e.target.value;
                                    if (value.charAt(0) === ' ') {
                                      value = value.slice(1);
                                    }
                                    setFieldValue('pan', value.toUpperCase());
                                  }}
                                  placeholder="Enter PAN"
                                  name="pan"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col w-full pt-43">
                          <div className="flex  items-center justify-between mb-4  relative w-[660px]">
                            <SidePanel title="Fuel Rate" description="" />

                            <div
                              className="font-medium flex justify-center items-center gap-2 text-base h-8 px-4 rounded-md cursor-pointer m-2 bg-[#256EB5] text-white"
                              onClick={handleAddClick}
                            >
                              <PlusIcon className="w-5 h-5" /> <span>Add</span>
                            </div>
                          </div>

                          {inputList.map((item, index) => (
                            <div
                              className="box mb-4 justify-content-right"
                              key={index} // Use index as a unique key
                            >
                              <div className="float-right"></div>
                              <div className="flex gap-4 items-center">
                                <div className="relative max-w-sm flex-1">
                                  <input
                                    type="date"
                                    placeholder="Enter Fuel Rate Date"
                                    name="date"
                                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-gray-400 text-gray-700"
                                    // name={`fuelRates[${index}].date`}
                                    value={item.date}
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  />
                                </div>
                                <div className="relative max-w-sm flex-1">
                                  <FormikTextField
                                    step="0.01"
                                    name="rate" // Unique name per field
                                    placeholder="Enter Fuel Rate"
                                    value={item.rate} // Bind value to state
                                    onChange={(e) =>
                                      handleInputChange(e, index)
                                    }
                                  />
                                </div>
                                <div>
                                  {inputList.length > 1 && (
                                    <Trash2
                                      onClick={() => handleRemoveClick(index)}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="add-v-form-section pt-43">
                          <SidePanel title={`Service Information`} />

                          <div className="group-type-3-equal">
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Point of Contact"
                                placeholder="Enter Point of Contact"
                                name="pointOfContact"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Email"
                                placeholder="Enter Email"
                                name="email"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Mobile No"
                                placeholder="Enter Mobile No"
                                name="mobileNo"
                                onChange={(e) =>
                                  validateMobileNumber(
                                    e,
                                    setFieldValue,
                                    'mobileNo'
                                  )
                                }
                              />
                            </div>
                          </div>
                          <div className="group-type-3-equal">
                            {/* <div className="flex-1 w-100">
                              <DateField
                                labelName="Contract Start Date"
                                placeholder="Enter Contract Start Date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                minDate={new Date()}
                                name="contractDate.start"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <DateField
                                labelName="Contract End End"
                                placeholder="Enter Contract End Date"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                minDate={new Date()}
                                name="contractDate.end"
                              />
                            </div> */}
                            <div>
                              <DateField
                                labelName="Contract Start Date"
                                placeholder="Enter Contract Start Date"
                                onBlur={handleBlur}
                                onChange={handleStartDateChange}
                                // minDate={new Date()}
                                name="contractDate.start"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <DateField
                                labelName="Contract End Date"
                                placeholder="Enter Contract End Date"
                                onBlur={handleBlur}
                                onChange={handleEndDateChange}
                                // minDate={
                                //   startDate ? new Date(startDate) : new Date()
                                // }
                                name="contractDate.end"
                                shouldDisableDate={shouldDisableDate}
                              />
                            </div>
                            <div className="flex-1 w-100"></div>
                          </div>
                        </div>
                        {/* 878789 */}
                        <div className="add-v-form-section pt-43">
                          <SidePanel
                            title={`Billing Address`}
                            description={``}
                          />

                          <div className="group-type-3-equal">
                            <div className="w-100">
                              <FormikTextField
                                label="Pin Code"
                                placeholder="Enter Pin Code"
                                name="billingAddress.pinCode"
                                onChange={(e) =>
                                  validatePincode(
                                    e,
                                    setFieldValue,
                                    'billingAddress.pinCode'
                                  )
                                }
                              />
                            </div>
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="country"
                                label="Country"
                                name="billingAddress.country"
                                placeholder="Select"
                                id="country"
                                limit={5}
                                defaultValue={values?.billingAddress?.country}
                                // isRequired={true}
                                callback={() => {
                                  setFieldValue('billingAddress.stateId', '');
                                  setFieldValue(
                                    'billingAddress.districtId',
                                    ''
                                  );
                                }}
                              />
                            </div>
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="presentState"
                                label="State"
                                name="billingAddress.stateId"
                                placeholder="Select"
                                id="state"
                                limit={5}
                                isDisabled={!values?.billingAddress?.country}
                                otherFilters={{
                                  countryOfOrigin:
                                    values?.billingAddress?.country,
                                }}
                                defaultValue={values?.billingAddress?.stateId}
                                callback={() => {
                                  setFieldValue(
                                    'billingAddress.districtId',
                                    ''
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <div className="group-type-3-equal">
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="presentDistrict"
                                label="District"
                                name="billingAddress.districtId"
                                placeholder="Select"
                                id="district"
                                limit={5}
                                isDisabled={!values?.billingAddress?.stateId}
                                otherFilters={{
                                  stateId: values?.billingAddress?.stateId,
                                }}
                                defaultValue={
                                  values?.billingAddress?.districtId
                                }
                              />
                            </div>
                            <div className="d-flex w-100">
                              <FormikTextField
                                label="Address 1"
                                placeholder="Enter Address"
                                name="billingAddress.address1"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue(
                                    'billingAddress.address1',
                                    startSpcaeRemover(value)
                                  );
                                }}
                              />
                            </div>
                            <div className="d-flex w-100">
                              <FormikTextField
                                label="Address 2"
                                placeholder="Enter Address"
                                name="billingAddress.address2"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue(
                                    'billingAddress.address2',
                                    startSpcaeRemover(value)
                                  );
                                }}
                              />
                            </div>
                          </div>
                          <div className="group-type-3-equal pt-43">
                            <div className="d-flex w-100">
                              <FormikCheckbox
                                id="sameAddress"
                                name="sameAddress"
                                label="Same as Billing Address"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="add-v-form-section pt-43">
                          <SidePanel
                            title={`Communication Address`}
                            description={``}
                          />
                          <div className="group-type-3-equal">
                            <div className="w-100">
                              <FormikTextField
                                label="Pin Code"
                                placeholder="Enter Pin Code"
                                name="communicationAddress.pinCode"
                                onChange={(e) =>
                                  validatePincode(
                                    e,
                                    setFieldValue,
                                    'communicationAddress.pinCode'
                                  )
                                }
                              />
                            </div>
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="country"
                                label="Country"
                                name="communicationAddress.country"
                                placeholder="Select"
                                id="country"
                                limit={5}
                                defaultValue={
                                  values?.communicationAddress?.country
                                }
                                // isRequired={true}
                                callback={() => {
                                  setFieldValue(
                                    'communicationAddress.stateId',
                                    ''
                                  );
                                  setFieldValue(
                                    'communicationAddress.districtId',
                                    ''
                                  );
                                }}
                              />
                            </div>
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="permanentState"
                                label="State"
                                name="communicationAddress.stateId"
                                placeholder="Select"
                                id="state"
                                limit={5}
                                defaultValue={
                                  values?.communicationAddress?.stateId
                                }
                                callback={() => {
                                  setFieldValue(
                                    'communicationAddress.districtId',
                                    ''
                                  );
                                }}
                              />
                            </div>
                          </div>

                          <div className="group-type-3-equal">
                            <div className="w-100">
                              <FormikAsyncDropdown
                                key="permanentDistrict"
                                label="District"
                                name="communicationAddress.districtId"
                                placeholder="Select"
                                id="district"
                                limit={5}
                                isDisabled={
                                  !values?.communicationAddress?.stateId
                                }
                                defaultValue={
                                  values?.communicationAddress?.districtId
                                }
                                otherFilters={{
                                  stateId:
                                    values?.communicationAddress?.stateId,
                                }}
                              />
                            </div>
                            <div className="d-flex w-100">
                              <FormikTextField
                                label="Address "
                                placeholder="Enter Address"
                                name="communicationAddress.address1"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue(
                                    'communicationAddress.address1',
                                    startSpcaeRemover(value)
                                  );
                                }}
                              />
                            </div>
                            <div className="d-flex w-100">
                              <FormikTextField
                                label="Address 2"
                                placeholder="Enter Address"
                                name="communicationAddress.address2"
                                onChange={(e) => {
                                  let value = e.target.value;
                                  setFieldValue(
                                    'communicationAddress.address2',
                                    startSpcaeRemover(value)
                                  );
                                }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* 45355 */}

                        <div className="group-type-1 py-8">
                          <div>
                            <label className="upload-wrap border ">
                              <div>{uploadIcon({ width: 40, height: 40 })}</div>
                              <div className="desc heading-700-22">
                                Upload Images/Documents
                              </div>
                              <div className="heading-400-12">
                                or drag & drop the files here
                              </div>
                              <div
                                className="upload-btn heading-400-12"
                                onClick={openModal}
                                style={{ cursor: 'pointer' }}
                              >
                                BROWSE FILE
                              </div>
                              <div className="heading-400-10 upload-bottom-message">
                                Supported File Format: jpeg, png, jpg, pdf, docx
                                (upto 5 MB)
                              </div>
                            </label>
                          </div>
                          <FileUploadModal
                            isOpen={modalIsOpen}
                            onClose={closeModal}
                            onSubmit={handleFileUpload} // Ensure this function is defined and passed correctly
                            initialName="Existing Document Name"
                            initialType="Existing Document Type"
                          />
                          {showSubmittedTable && (
                            <Table className="relative mt-4">
                              <TableHeader>
                                <TableRow className="text-[#424750]">
                                  <TableHead className="min-w-[150px]">
                                    Document Name
                                  </TableHead>
                                  <TableHead className="min-w-[150px]">
                                    Document Type
                                  </TableHead>
                                  <TableHead className="min-w-[130px]">
                                    Doc Size
                                  </TableHead>
                                  <TableHead className="min-w-[130px]">
                                    Date Added
                                  </TableHead>
                                  <TableHead className="min-w-[130px]">
                                    Thumbnail
                                  </TableHead>
                                  <TableHead className="min-w-[150px]">
                                    Action
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {submittedData.map((file, index) => (
                                  <TableRow
                                    key={index}
                                    className="shadow-[4px_4px_20px_0px_#0000001A] hover:bg-[#F4FCFF] px-2"
                                  >
                                    <TableCell className="text-[12px]">
                                      {file.name}
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      {file.type}
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      {(file.size / 1024).toFixed(2)} KB
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      {new Date(
                                        file.lastModified
                                      ).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      {imageThumbnail({})}
                                    </TableCell>
                                    <TableCell className="text-[12px]">
                                      <button
                                        onClick={() => handleDelete(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        Delete
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* ------------------------- */}
                </>
              )}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddEditFuelVender;
