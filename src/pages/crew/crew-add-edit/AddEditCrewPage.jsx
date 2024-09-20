import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import moment from 'moment';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { getApi, postApi, patchApi } from '@/services/method';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from 'yup';

import { Checkbox } from '@/components/ui/checkbox';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import FormikRadioGroup from '@/components/inputs/formik/FormikRadioGroup';
import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import { customEmailValidation } from '@/utils/custValidations';
import { toast } from 'react-toastify';
import {
  bloodGroup,
  licenceType,
  validateAlphabets,
  validateMobileNumber,
  validatePincode,
  governmentIssueCards,
  startSpcaeRemover,
} from '@/utils/common.helper';
import { getTodaysDate } from '@/utils/dateHelper';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import { DatePickerInput } from '@/components/common/DateTimeInputs';
import {
  CustomSelect,
  CustomSelectById,
  FormikSelect,
} from '@/components/common/CustomSelect';
import apiService from '@/lib/apiService';
import CustomOptionSelect from '@/components/common/CustomSelect/CustomOptionSelect';
import { generateRandomString } from '@/lib/utils';
import dayjs from 'dayjs';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const fetchRolePermissions = async (inputValue, page) => {
  const limit = 15;
  const response = await apiService.get(`v2/masters/userrole/dropdown`, {
    params: {
      limit,
      page: page || 0,
      search: inputValue || null,
      sortBy: 'name',
      order: 'asc',
      roles: 'driverConductor',
    },
  });

  return {
    results: response.data,
    nextPage: false,
  };
};

const initialValues = {
  roleId: '',
  roleType: '',
  employeeId: '',
  employmentStatus: 'contractual',
  contractor: '',
  conductorLicense: '',
  contractStartDate: '',
  contractEndDate: '',
  stateId: '660bd0c8471febdfca7be9bc',
  regionId: [],
  depotId: [],
  designation: 'Crew',
  payRollId: '',
  name: { english: '', hindi: '' },
  email: '',
  mobileNo: '',
  dob: '',
  fatherName: { english: '', hindi: '' },
  emergencyNo: '',
  profileImage: [],

  hasDriverLicense: true,
  licenseType: '',
  licenseNo: '',
  issueDate: '',
  expiryDate: '',

  govtIssuedCard: '',
  cardNo: '',
  bloodGroup: '',
  govImage: [],

  presentAddress: {
    country: '6631f4585cbf7a33a5904343',
    stateId: '660bd0c8471febdfca7be9bc',
    districtId: '',
    pinCode: '',
    address1: '',
    address2: '',
  },
  sameAddress: false,
  permanentAddress: {
    country: '6631f4585cbf7a33a5904343',
    stateId: '660bd0c8471febdfca7be9bc',
    districtId: '',
    pinCode: '',
    address1: '',
    address2: '',
  },
  healthTestValidUpto: '',
  eyeTestValidUpto: '',
  saveAndNew: false,
};

const isAtLeast18YearsOld = (date) => {
  const today = new Date();
  const date18YearsAgo = new Date(today.setFullYear(today.getFullYear() - 18));
  return date <= date18YearsAgo;
};

const calculateAge = (dateOfBirth) => {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();
  const monthDifference = today.getMonth() - dob.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dob.getDate())
  ) {
    age--;
  }

  return age;
};

const crewSchema = Yup.object().shape({
  employmentStatus: Yup.string().required('Employment status is required'),
  contractor: Yup.string().trim(),
  contractStartDate: Yup.date(),
  contractEndDate: Yup.date().nullable(),
  conductorLicense: Yup.string(),
  stateId: Yup.string().required('State is required'),
  // regionId: Yup.string().required('Region is required'),
  regionId: Yup.mixed()
    .test('is-string-or-array', 'Region is required', function (value) {
      return (
        typeof value === 'string' || (Array.isArray(value) && value?.length > 0)
      );
    })
    .required('Region is required'),
  depotId: Yup.array(),
  employeeId: Yup.string().required('Employee id is required'),
  payRollId: Yup.string(),
  name: Yup.object().shape({
    english: Yup.string().trim().required('Name is required'),
    hindi: Yup.string().trim(),
  }),
  fatherName: Yup.object().shape({
    english: Yup.string().trim(),
    hindi: Yup.string().trim(),
  }),
  mobileNo: Yup.string()
    .trim()
    .required('Mobile no is required')
    .matches(/^[0-9]\d{9}$/, 'Invalid number'),
  email: customEmailValidation.max(320).required('Email is required'),
  designation: Yup.string(),
  hasDriverLicense: Yup.boolean(),
  licenseType: Yup.string(),
  licenseNo: Yup.string(),
  issueDate: Yup.date(),
  expiryDate: Yup.date(),
  govtIssuedCard: Yup.string(),
  dob: Yup.date().test(
    'is-18-years-old',
    'DOB must be at least 18 years past',
    (value) => {
      if (!value) return true;
      return isAtLeast18YearsOld(new Date(value));
    }
  ),
  cardNo: Yup.string(),
  bloodGroup: Yup.string().nullable(),

  presentAddress: Yup.object().shape({
    country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
  permanentAddress: Yup.object().shape({
    country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
  healthTestValidUpto: Yup.date().nullable(),
  eyeTestValidUpto: Yup.date().nullable(),
});

const AddEditCrewPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  const currentDate = dayjs();
  const min18YearsDate = currentDate.subtract(18, 'year');
  const {setCount } = useContext(CounterContext);
  useEffect(() => { 
    setCount('Crew');
  }, []);
  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.DRIVER_CONDUCTOR, id)
        .then((res) => {
          const editData = res?.data?.driverConductor;
          setData((prev) => ({
            ...prev,
            employeeId: editData?.employeeId,
            designation: editData?.designation,
            roleId: editData?.roleId,
            roleType: editData?.roleType,
            employmentStatus: editData?.employmentStatus,
            contractorId: editData?.contractorId,
            conductorLicense: editData?.conductorLicense,
            contractStartDate: editData?.servicePeriod?.startDate,
            contractEndDate: editData?.servicePeriod?.endDate,
            stateId: editData?.stateId,
            regionId: editData?.regionId,
            depotId: editData?.depotId,
            
            payRollId: editData?.payRollId,
            name: {
              english: editData?.name?.english,
              hindi: editData?.name?.hindi,
              hinglish: `${editData?.name?.english}(${editData?.name?.hindi})`,
            },
            email: editData?.loginEmail,
            mobileNo: editData?.loginMobile,
            dob: editData?.dob,
            fatherName: {
              english: editData?.fatherName?.english,
              hindi: editData?.fatherName?.hindi,
              hinglish: `${editData?.fatherName?.english}(${editData?.fatherName?.hindi})`,
            },
            emergencyNo: editData?.emergencyNumber,
            profileImage: editData?.profileImage,

            hasDriverLicense:
              editData?.haveDrivingLicense == 'true' ? true : false,
            licenseType: editData?.licenseType,
            licenseNo: editData?.licenseNumber,
            issueDate: editData?.licenseDate?.issue,
            expiryDate: editData?.licenseDate?.expiry,

            govtIssuedCard: editData?.govtIssuedCard,
            cardNo: editData?.cardNumber,
            bloodGroup: editData?.bloodGroup,
            govImage: editData?.govImage,

            presentAddress: {
              country: editData?.presentAddress?.country,
              stateId: editData?.presentAddress?.stateId,
              districtId: editData?.presentAddress?.districtId,
              pinCode: editData?.presentAddress?.pinCode,
              address1: editData?.presentAddress?.address1,
              address2: editData?.presentAddress?.address2,
            },
            sameAddress: false,
            permanentAddress: {
              country: editData?.permanentAddress?.country,
              stateId: editData?.permanentAddress?.stateId,
              districtId: editData?.permanentAddress?.districtId,
              pinCode: editData?.permanentAddress?.pinCode,
              address1: editData?.permanentAddress?.address1,
              address2: editData?.permanentAddress?.address2,
            },
            healthTestValidUpto: editData?.test?.healthValidity,
            eyeTestValidUpto: editData?.test?.eyeValidity,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    let payload = {
      age: 35,

      run: {
        lastWeek: '',
        total: '',
      },
      roleId: values?.roleId.value,
      roleType: values?.roleId.label,
      employeeId: values?.employeeId,
      // staffType: values?.crewType,
      designation: values?.designation,
      employmentStatus: values?.employmentStatus,

      conductorLicense: values?.conductorLicense,
      servicePeriod: {
        startDate: values?.contractStartDate,
        endDate: values?.contractEndDate,
      },
      stateId: values?.stateId,
      regionId: values?.regionId,
      depotId: values?.depotId,
      payRollId: values?.payRollId,

      name: {
        english: values?.name?.english,
        hindi: values?.name?.hindi,
        hinglish: `${values?.name?.english}(${values?.name?.hindi})`,
      },
      loginEmail: values?.email,
      loginMobile: values?.mobileNo,

      fatherName: {
        english: values?.fatherName?.english,
        hindi: values?.fatherName?.hindi,
        hinglish: `${values?.fatherName?.english}(${values?.fatherName?.hindi})`,
      },
      emergencyNumber: values?.emergencyNo,
      profileImage: values?.profileImage,
      haveDrivingLicense: values?.hasDriverLicense,

      licenseType: values?.licenseType,
      licenseNumber: values?.licenseNo,

      licenseDate: {
        issue: values?.issueDate,
        expiry: values?.expiryDate,
      },
      accident: 0,
      govtIssuedCard: values?.govtIssuedCard,
      cardNumber: values?.cardNo,
      bloodGroup: values?.bloodGroup,
      govImage: values?.govImage,

      dateofJoining: values?.contractStartDate, //service start date

      presentAddress: {
        pinCode: values?.presentAddress?.pinCode,
        address1: values?.presentAddress?.address1,
        address2: values?.presentAddress?.address2,
      },
      permanentAddress: {
        pinCode: values?.permanentAddress?.pinCode,
        address1: values?.permanentAddress?.address1,
        address2: values?.permanentAddress?.address2,
      },

      test: {
        healthValidity: values?.healthTestValidUpto,
        eyeValidity: values?.eyeTestValidUpto,
      },

      isActive: true,
      shortName: {
        english: '',
        hindi: '',
      },
    };

    if (values?.dob) {
      payload.dob = values?.dob;
    }
    if (values?.dob) {
      payload.age = calculateAge(values?.dob);
    }
    if (values?.contractor) {
      payload.contractorId = values?.contractorId;
    }
    if (values?.presentAddress?.country) {
      payload.presentAddress.country = values?.presentAddress?.country;
    }
    if (values?.presentAddress?.stateId) {
      payload.presentAddress.stateId = values.presentAddress.stateId;
    }

    if (values?.presentAddress?.districtId) {
      payload.presentAddress.districtId = values.presentAddress.districtId;
    }
    if (values?.permanentAddress?.country) {
      payload.permanentAddress.country = values?.permanentAddress?.country;
    }
    if (values?.permanentAddress?.stateId) {
      payload.permanentAddress.stateId = values?.permanentAddress.stateId;
    }

    if (values?.permanentAddress?.districtId) {
      payload.permanentAddress.districtId =
        values?.permanentAddress?.districtId;
    }
    if (id) {
      payload._id = id;
      patchApi(APIS.DRIVER_CONDUCTOR, id, payload).then(() => {
        toast.success('Data updated successfully');
        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
        } else {
          navigate(-1);
        }
      });
    } else {
      postApi(APIS.DRIVER_CONDUCTOR, payload)
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
  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={crewSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        setFieldValue,
        handleSubmit: formikSubmit,
        values,
        errors,
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
        }, [values?.sameAddress]);
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
                        breadCrumbs={[]}
                        boldItem={'Crew'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Crew</Heading>
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
                          values.saveAndNew = false;
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
                    
                    <div className="width90">
                      <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                        <SidePanel title={`User Information`} />

                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Email"
                              placeholder="Enter email"
                              name="email"
                              isRequired
                            />
                          </div>
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Mobile No"
                              placeholder="Enter mobile no"
                              name="mobileNo"
                              onChange={(e) =>
                                validateMobileNumber(
                                  e,
                                  setFieldValue,
                                  'mobileNo'
                                )
                              }
                              isRequired
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <CustomSelectById
                              id="state"
                              isMulti={false}
                              useFormik={true}
                              name="stateId"
                              onChange={(e) => {
                                setFieldValue('stateId', e.value);
                                setFieldValue(
                                  'regionId',
                                  values?.stateId ? values?.regionId : null
                                );
                                setFieldValue(
                                  'depotId',
                                  values?.stateId ? values?.depotId : null
                                );
                              }}
                              label="State"
                              showLabel={true}
                              defaultValue={values?.stateId}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                              }}
                            />
                            {/* <FormikSelect
                              id="state"
                              isMulti
                              name="stateId"
                              label="State"
                              onChange={(e) => {
                                setFieldValue('regionId', []);
                                setFieldValue('depotId', []);
                                setFieldValue('stateId', e?.value);
                              }}
                            /> */}
                          </div>
                          <div className="w-100 flex-1">
                            {/* <CustomSelectById
                              id="region"
                              isMulti={false}
                              useFormik={true}
                              name="regionId"
                              onChange={(e) => {
                                setFieldValue('regionId', e.value);

                                setFieldValue(
                                  'depotId',
                                  values?.stateId ? values?.depotId : null
                                );
                              }}
                              filters={{ stateId: values?.stateId }}
                              label="Region"
                              showLabel={true}
                              defaultValue={values?.regionId}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isRequired: true,
                                isDisabled: !values?.stateId ? true : false,
                              }}
                            /> */}
                            <FormikSelect
                              id="region"
                              isMulti
                              name="regionId"
                              label="Region"
                              filters={{
                                stateId: values?.stateId
                              }}
                              selectProps={{
                                isDisabled: !values?.stateId,
                              }}
                            />
                         
                          </div>
                          <div className="w-100 flex-1">
                            
                            <FormikSelect
                              id="depot"
                              isMulti
                              name="depotId"
                              label="Depot"
                              filters={{
                                regionId: values?.regionId?.map((r) => r?.value),
                              }}
                              selectProps={{
                                isDisabled: values?.regionId?.length < 1,
                              }}
                            />

                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <CustomSelect
                              useFormik={true}
                              name="roleId"
                              fetchData={fetchRolePermissions}
                              label="User (Roles & Permissions)"
                              defaultValue={values?.roleId}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                              }}
                            />
                          </div>
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Employee ID"
                              placeholder="Enter employee id"
                              name="employeeId"
                              isRequired
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Name [En]"
                              placeholder="Enter name"
                              name="name.english"
                              isRequired
                            />
                          </div>
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Name [Hn]"
                              placeholder="Enter name"
                              name="name.hindi"
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <FormikRadioGroup
                              label="Employment Status"
                              name="employmentStatus"
                              options={[
                                {
                                  label: 'Contractual (Agency)',
                                  value: 'contractual',
                                },
                                { label: 'Samvida', value: 'samvida' },
                                { label: 'Permanent', value: 'permanent' },
                              ]}
                              isRequired
                            />
                          </div>
                          <div className="w-100 flex-1">
                            {['contractual', 'samvida'].includes(
                              values.employmentStatus
                            ) && (
                                <div>
                                  <CustomSelectById
                                    id="contractor"
                                    isMulti={false}
                                    useFormik={true}
                                    name="contractorId"
                                    onChange={(e) => {
                                      setFieldValue('contractorId', e.value);
                                    }}
                                    label="Contractor"
                                    showLabel={true}
                                    defaultValue={values?.contractorId}
                                    selectProps={{
                                      placeholder: 'Select',
                                      isClearable: true,
                                      isRequired: true,
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className="add-v-form-section w100 add-edit-user-card">
                        <SidePanel title={`Personal Information`} />
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Emergency No"
                              placeholder="Enter emergency no"
                              name="emergencyNo"
                              onChange={(e) =>
                                validateMobileNumber(
                                  e,
                                  setFieldValue,
                                  'emergencyNo'
                                )
                              }
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <DatePickerInput
                              name="dob"
                              labelName="DOB"
                              placeholder="Select "
                              maxDate={min18YearsDate.toDate()}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <CustomOptionSelect
                            name="bloodGroup"
                            label="Blood Group"
                            placeholder="Select"
                            options={bloodGroup}
                          />
                          </div>
                        </div>

                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Father's Name [En]"
                              placeholder="Enter father's name"
                              name="fatherName.english"
                              onChange={(e) =>
                                validateAlphabets(
                                  e,
                                  setFieldValue,
                                  'fatherName.english'
                                )
                              }
                            />
                          </div>
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Father's Name [Hn]"
                              placeholder="Enter father's name"
                              name="fatherName.hindi"
                            />
                          </div>
                        </div>

                        <div className="group-type-1">
                          <div className="image-uploder-block">
                            <FormikDocumentUploder
                              name="profileImage"
                              id="profileImage-crew"
                              title="Upload Profile Image"
                              message="or drag & drop profile image files here"
                              btnText="BROWSE FILE"
                              bottomMessage="Supported File Format: jpeg, png (upto 1 MB)"
                              accept="image/*"
                              isSingle={true}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <SidePanel title={`Service Information`} />
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Designation"
                              placeholder="Enter designation"
                              name="designation"
                              defaultValue={values.designation}

                            />
                          </div>
                          <div className="flex-1 w-100">
                            <DatePickerInput
                              maxDate={getTodaysDate()}
                              name="contractStartDate"
                              labelName="Service posting Start Date"
                              placeholder="From"
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <DatePickerInput
                              minDate={
                                values?.contractStartDate
                                  ? moment(values?.contractStartDate)
                                    .add(1, 'days')
                                    .format('YYYY-MM-DD')
                                  : getTodaysDate()
                              }
                              name="contractEndDate"
                              labelName="Service Period End Date"
                              // isRequired
                              placeholder="To"
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Payroll ID"
                              placeholder="Enter payroll id"
                              name="payRollId"
                            />
                          </div>
                          <div className="flex-1 w-100"></div>
                          <div className="flex-1 w-100"></div>
                        </div>
                      </div>

                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="add-v-form-section pt-43">
                          <SidePanel
                            title={`Driver License Information`}
                            description={``}
                          />
                          <div className="group-type-3-equal">
                            <div className="d-flex w-100">
                              <FormikSwitch
                                label="Do you have a Driver License?"
                                name="hasDriverLicense"
                                onChange={() =>
                                  setFieldValue(
                                    'hasDriverLicense',
                                    values.roleType === 'Conductor'
                                      ? !values.hasDriverLicense
                                      : true
                                  )
                                }
                              />
                            </div>
                          </div>

                          {values.hasDriverLicense && (
                            <>
                              <div className="group-type-2-equal">
                                <div
                                  className="d-flex w-100"
                                  style={{ gap: '12px' }}
                                >
                                  
                                  <CustomOptionSelect
                                    name="licenseType"
                                    label="Licence Type"
                            placeholder="Select"
                            options={licenceType}
                          />
                                  <FormikTextField
                                    label="Licence No."
                                    placeholder="Enter licence no."
                                    name="licenseNo"
                                    onChange={(e) => {
                                      let value = e.target.value;
                                      setFieldValue(
                                        'licenseNo',
                                        startSpcaeRemover(value)
                                      );
                                    }}
                                  />
                                </div>
                                <div
                                  className="d-flex w-100"
                                  style={{ gap: '12px' }}
                                >
                                  <DatePickerInput
                                    name="issueDate"
                                    labelName="Issue Date"
                                    placeholder="Select issue date"
                                  />
                                  <DatePickerInput
                                    name="expiryDate"
                                    labelName="Expiry Date"
                                    placeholder="Select expiry date"
                                  />
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <SidePanel title={`Identity Information`} />
                        <div className="group-type-2-equal">
                          <div className="flex-1 w-100">
                          <CustomOptionSelect
                            name="govtIssuedCard"
                            label="Govt. Issued Card"
                            placeholder="Select"
                            options={governmentIssueCards}
                          />
                          </div>
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Card No."
                              placeholder="Enter card no"
                              name="cardNo"
                            />
                          </div>
                        </div>
                        <div className="group-type-1">
                          <div className="image-uploder-block ">
                            <FormikDocumentUploder
                              name="govImage"
                              id="govImage-crew"
                              title="Upload Govt. Issued Card"
                              message="or drag & drop Govt. Issued Card image files here"
                              btnText="BROWSE FILE"
                              bottomMessage="Supported File Format: jpeg, png & pdf (upto 1 MB)"
                              accept="image/*,application/pdf"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <SidePanel title={`Present Address `} />
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Pin Code"
                              placeholder="Enter pin code"
                              name="presentAddress.pinCode"
                              onChange={(e) =>
                                validatePincode(
                                  e,
                                  setFieldValue,
                                  'presentAddress.pinCode'
                                )
                              }
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="country"
                              isMulti={false}
                              useFormik={true}
                              name="presentAddress.country"
                              onChange={(e) => {
                                setFieldValue(
                                  'presentAddress.country',
                                  e.value
                                );
                                setFieldValue('presentAddress.stateId', '');
                                setFieldValue('presentAddress.districtId', '');
                              }}
                              label="Country"
                              showLabel={true}
                              defaultValue={values?.presentAddress.country}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="state"
                              isMulti={false}
                              useFormik={true}
                              name="presentAddress.stateId"
                              refetch={values?.presentAddress.stateId && generateRandomString()}

                              onChange={(e) => {
                                setFieldValue('presentAddress.stateId',e.value);
                                setFieldValue('presentAddress.districtId', '');
                              }}
                              label="State"
                              showLabel={true}
                              defaultValue={values?.presentAddress.stateId}
                              filters={{
                              }}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isDisabled: !values?.presentAddress?.country
                                  ? true
                                  : false,
                                isRequired: true,
                              }}
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="district"
                              isMulti={false}
                              useFormik={true}
                              name="presentAddress.districtId"
                              refetch={values?.presentAddress.districtId && generateRandomString()}

                              onChange={(e) => {
                                setFieldValue(
                                  'presentAddress.districtId',
                                  e.value
                                );
                              }}
                              label="District"
                              showLabel={true}
                              defaultValue={values?.presentAddress.districtId}
                              filters={{
                                stateId: values?.presentAddress?.stateId,
                              }}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isDisabled: !values?.presentAddress?.stateId
                                  ? true
                                  : false,
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Address 1"
                              placeholder="Enter address"
                              name="presentAddress.address1"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'presentAddress.address1',
                                  startSpcaeRemover(value)
                                );
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Address 2"
                              placeholder="Enter address"
                              name="presentAddress.address2"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'presentAddress.address2',
                                  startSpcaeRemover(value)
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="aeu-flex">
                          <SidePanel title={`Permanent Address`} />

                          <div className="aeu-flex-js">
                            <Checkbox
                              id="sameAddress"
                              name="sameAddress"
                              checked={values.sameAddress}
                              onCheckedChange={(checked) =>{
                                setFieldValue('sameAddress', checked);
                                if (checked===true) {setFieldValue('permanentAddress', {
                                  ...values?.permanentAddress,
                                  address1: 'values?.presentAddress?.address1',
                                  address2: values?.presentAddress?.address2,
                                  country: values?.presentAddress?.country,
                                  stateId: values?.presentAddress?.stateId,
                                  districtId: values?.presentAddress?.districtId,
                                  pinCode: values?.presentAddress?.pinCode,
                                })};
                              }
                              }
                              className="w-5 h-5"
                            />
                            <label
                              htmlFor="remember"
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              Same as Present Address
                            </label>
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Pin Code"
                              placeholder="Enter pin code"
                              name="permanentAddress.pinCode"
                              onChange={(e) =>
                                validatePincode(
                                  e,
                                  setFieldValue,
                                  'permanentAddress.pinCode'
                                )
                              }
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="country"
                              isMulti={false}
                              useFormik={true}
                              name="permanentAddress.country"
                              refetch={values?.permanentAddress.country && generateRandomString()}
                            
                              onChange={(e) => {
                                setFieldValue(
                                  'permanentAddress.country',
                                  e.value
                                );
                                setFieldValue('permanentAddress.stateId', '');
                                setFieldValue(
                                  'permanentAddress.districtId',
                                  ''
                                );
                              }}
                              label="Country"
                              showLabel={true}
                              defaultValue={values?.permanentAddress.country}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isRequired: true,
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="state"
                              isMulti={false}
                              useFormik={true}
                              name="permanentAddress.stateId"
                              refetch={values?.permanentAddress.stateId && generateRandomString()}

                              onChange={(e) => {
                                setFieldValue(
                                  'permanentAddress.stateId',
                                  e.value
                                );
                                setFieldValue(
                                  'permanentAddress.districtId',
                                  ''
                                );
                              }}
                              label="State"
                              showLabel={true}
                              defaultValue={values?.permanentAddress.stateId}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isDisabled: !values?.permanentAddress?.country
                                  ? true
                                  : false
                              }}
                            />
                          </div>
                        </div>
                        <div className="group-type-3-equal">
                          <div className="flex-1 w-100">
                            <CustomSelectById
                              id="district"
                              refetch={values?.permanentAddress.districtId && generateRandomString()}

                              isMulti={false}
                              useFormik={true}
                              name="permanentAddress.districtId"
                              onChange={(e) => {
                                setFieldValue(
                                  'permanentAddress.districtId',
                                  e.value
                                );
                              }}
                              label="District"
                              showLabel={true}
                              defaultValue={values?.permanentAddress.districtId}
                              filters={{
                                stateId: values?.permanentAddress?.stateId,
                              }}
                              selectProps={{
                                placeholder: 'Select',
                                isClearable: true,
                                isDisabled: !values?.permanentAddress?.stateId
                                  ? true
                                  : false,
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Address 1"
                              placeholder="Enter address"
                              name="permanentAddress.address1"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'permanentAddress.address1',
                                  startSpcaeRemover(value)
                                );
                              }}
                            />
                          </div>
                          <div className="flex-1 w-100">
                            <FormikTextField
                              label="Address 2"
                              placeholder="Enter address"
                              name="permanentAddress.address2"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'permanentAddress.address2',
                                  startSpcaeRemover(value)
                                );
                              }}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="add-v-form-section pt-43 w100 add-edit-user-card">
                        <div className="add-v-form-section ">
                          <SidePanel
                            title={`Check-up Details`}
                            description={``}
                          />
                          <div className="group-type-3-equal">
                            <div className="d-flex w-100">
                              {' '}
                              <DatePickerInput
                                name="healthTestValidUpto"
                                labelName="Health Test Valid Upto"
                                placeholder="Select health test valid upto date"
                              />
                            </div>
                            <div className="d-flex w-100">
                              <DatePickerInput
                                name="eyeTestValidUpto"
                                labelName="Eye Test Valid Upto"
                                placeholder="Select eye test valid upto date"
                              />
                            </div>
                            <div className="d-flex w-100"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddEditCrewPage;
