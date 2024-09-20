import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import { Checkbox } from '@/components/ui/checkbox';
import './AddEditUser.css';
import moment from 'moment';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { postApi, patchApi } from '@/services/method';
import { Formik } from 'formik';
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
import apiService from '@/lib/apiService';
import { generateRandomString } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import CustomOptionSelect from '../../components/common/CustomSelect/CustomOptionSelect';

import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

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

const userSchema = Yup.object().shape({
  // name: Yup.string().required("Name is required"),
  employmentStatus: Yup.string().required('Employment status is required'),
  contractorId: Yup.string(),
  name: Yup.object().shape({
    english: Yup.string().trim().required('Name is required'),
    hindi: Yup.string().trim(),
  }),
  fatherName: Yup.object().shape({
    english: Yup.string().trim(),
    hindi: Yup.string().trim(),
  }),
  employeeId: Yup.string().required('Employee id is required'),
  emergencyNo: Yup.string()
    .trim()
    .matches(/^[0-9]\d{9}$/, 'Invalid number'),
  loginMobile: Yup.string()
    .trim()
    .required('Mobile no is required')
    .matches(/^[0-9]\d{9}$/, 'Invalid number'),
  roleId: Yup.mixed().required('User (roles & permissions) is required'),
  loginEmail: customEmailValidation.max(320).required('Email is required'),
  stateId: Yup.string().required('State is required'),
  designation: Yup.string(),
  regionId: Yup.mixed()
    .test('is-string-or-array', 'Region is required', function (value) {
      return (
        typeof value === 'string' || (Array.isArray(value) && value?.length > 0)
      );
    })
    .required('Region is required'),
  depotId: Yup.array(),
  presentAddress: Yup.object().shape({
    // country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
  permanentAddress: Yup.object().shape({
    // country: Yup.string().nullable(),
    address1: Yup.string().nullable(),
    address2: Yup.string().nullable(),
    stateId: Yup.string().nullable(),
    districtId: Yup.string().nullable(),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, 'Pin code must be 6 digits')
      .nullable(),
  }),
});

const AddEditUser = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState({
    roleId: '',
    employeeId: '',
    roleType: '',
    contractStartDate: '',
    contractEndDate: '',
    stateId: '660bd0c8471febdfca7be9bc',
    regionId: [],
    depotId: [],
    designation: 'User',
    payRollId: '',
    name: { english: '', hindi: '', hinglish: '' },
    loginMobile: '',
    loginEmail: '',
    dob: '',
    fatherName: { english: '', hindi: '' },
    emergencyNo: '',
    govtIssuedCard: '',
    cardNo: '',
    bloodGroup: '',
    govImage: [],
    profileImage: [],
    presentAddress: {
      country: '6631f4585cbf7a33a5904343',
      stateId: '660bd0c8471febdfca7be9bc',
      districtId: '',
      pinCode: '',
      address1: '',
      address2: '',
    },
    permanentAddress: {
      country: '6631f4585cbf7a33a5904343',
      stateId: '660bd0c8471febdfca7be9bc',
      districtId: '',
      pinCode: '',
      address1: '',
      address2: '',
    },
    sameAddress: false,
    saveAndNew: false,
    employmentStatus: 'contractual',
    contractorId: '',
  });

  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('User Management');
  }, []);
  const fetchUserById = useQuery({
    queryKey: ['userById', id || ''],
    queryFn: async () =>
      await apiService.get(`${APIS.USERS_BY_ID}/${id || ''}`).then((res) => {
        const editData = res?.data;
        setData({
          employeeId: editData?.employeeId,
          roleId: [
            {
              label: editData?.roleId?.description,
              value: editData?.roleId?._id,
            },
          ],
          roleType: editData?.roleType,
          contractStartDate: editData?.servicePeriod?.startDate,
          contractEndDate: editData?.servicePeriod?.endDate,
          stateId: editData?.stateId._id,
          regionId: editData?.regionId.map((r) => r._id) || [],
          depotId: editData?.depotId.map((r) => r._id) || [],
          payRollId: editData?.payRollId,
          profileImage: editData?.profileImage,
          name: {
            english: editData?.name?.english,
            hindi: editData?.name?.hindi,
          },
          loginEmail: editData?.loginEmail,
          loginMobile: editData?.loginMobile,
          dob: editData?.dob,
          fatherName: {
            english: editData?.fatherName?.english,
            hindi: editData?.fatherName?.hindi,
          },
          emergencyNo: editData?.emergencyNumber,

          govtIssuedCard: editData?.govtIssuedCard,
          cardNo: editData?.cardNumber,
          bloodGroup: editData?.bloodGroup,
          govImage: editData?.govImage,
          designation: editData?.designation,
          presentAddress: {
            country: editData?.presentAddress?.country,
            stateId: editData?.presentAddress?.stateId?.id,
            districtId: editData?.presentAddress?.districtId?.id,
            pinCode: editData?.presentAddress?.pinCode,
            address1: editData?.presentAddress?.address1,
            address2: editData?.presentAddress?.address2,
          },
          sameAddress: false,
          permanentAddress: {
            country: editData?.permanentAddress?.country,
            stateId: editData?.permanentAddress?.stateId?.id,
            districtId: editData?.permanentAddress?.districtId?.id,
            pinCode: editData?.permanentAddress?.pinCode,
            address1: editData?.permanentAddress?.address1,
            address2: editData?.permanentAddress?.address2,
          },

          employmentStatus: editData?.employmentStatus,
          contractorId: editData?.contractorId,
        });
        return res.data;
      }),
    enabled: id !== '',
    refetchOnWindowFocus: false,
  });

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    let payload = {
      roleId: values?.roleId.value,
      roleType: values?.roleId.label,
      employeeId: values?.employeeId,

      employmentStatus: values?.employmentStatus,

      servicePeriod: {
        startDate: values?.contractStartDate,
        endDate: values?.contractEndDate,
      },
      stateId: values?.stateId,
      regionId: values?.regionId,
      depotId: values?.depotId,
      payRollId: values?.payRollId,
      designation: values?.designation,
      name: {
        english: values?.name?.english,
        hindi: values?.name?.hindi,
        hinglish: `${values?.name?.english || ''} (${values?.name?.hindi || ''})`,
      },
      loginEmail: values?.loginEmail,
      loginMobile: values?.loginMobile,
      dob: values?.dob,
      fatherName: {
        english: values?.fatherName?.english,
        hindi: values?.fatherName?.hindi,
        hinglish: `${values?.fatherName?.english || ''} (${values?.fatherName?.hindi || ''})`,
      },
      emergencyNumber: values?.emergencyNo,
      profileImage: values?.profileImage,

      govtIssuedCard: values?.govtIssuedCard,
      cardNumber: values?.cardNo,
      bloodGroup: values?.bloodGroup,
      govImage: values?.govImage,

      dateofJoining: values?.contractStartDate, //
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
      isActive: true,
      shortName: {
        english: '',
        hindi: '',
      },
    };
    if (values?.contractorId !== '') {
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
      postApi(APIS.ADD_USER, payload)
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

  if (id && fetchUserById.isLoading) {
    return <div>Loading...</div>;
  }
  const currentDate = dayjs();
  const min18YearsDate = currentDate.subtract(18, 'year');
  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={userSchema}
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
                    <Heading>{id ? 'Edit' : 'Add'} User</Heading>
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
                  <div className="width90">
                    <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                      <SidePanel title={`User Information`} />

                      <div className="group-type-3-equal">
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="Email"
                            placeholder="Enter email"
                            name="loginEmail"
                            isRequired
                          />
                        </div>
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="Mobile No"
                            placeholder="Enter mobile no"
                            name="loginMobile"
                            onChange={(e) =>
                              validateMobileNumber(
                                e,
                                setFieldValue,
                                'loginMobile'
                              )
                            }
                            isRequired
                          />
                        </div>
                      </div>
                      <div className="group-type-3-equal">
                        <div className="w-100 flex-1">

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

                          <CustomSelectById
                            id="state"
                            isMulti={false}

                            refetch={values?.stateId && generateRandomString()}
                            useFormik={true}
                            name="stateId"
                            onChange={(e) => {

                              setFieldValue('regionId', []);
                              setFieldValue('depotId', []);
                              setFieldValue('stateId', e?.value)
                            }}
                            label="State"
                            showLabel={true}
                            filters={{
                            }}
                            defaultValue={values?.stateId}
                            selectProps={{
                              placeholder: 'Select',
                              isClearable: true,

                            }}
                          />
                        </div>

                        <div className="w-100 flex-1">

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
                              regionId: values?.regionId?.map((r) => r.value),
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
                              isRequired: true,
                            }}
                          />
                        </div>
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="Employee ID"
                            placeholder="Enter employee id"
                            name="employeeId"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'employeeId',
                                startSpcaeRemover(value)
                              );
                            }}
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
                            onChange={(e) =>
                              validateAlphabets(
                                e,
                                setFieldValue,
                                'name.english'
                              )
                            }
                          />
                        </div>
                        <div className="w-100 flex-1">
                          <FormikTextField
                            label="Name [Hn]"
                            placeholder="Enter name"
                            name="name.hindi"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'name.hindi',
                                startSpcaeRemover(value)
                              );
                            }}
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
                            onChange={(e) =>
                              validateAlphabets(e, setFieldValue, 'designation')
                            }
                            defaultValue={values.designation}
                          />
                        </div>
                        <div className="flex-1 w-100">
                          <DatePickerInput
                            maxDate={getTodaysDate()}
                            name="contractStartDate"
                            labelName="Service Period Start Date"
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
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'payRollId',
                                startSpcaeRemover(value)
                              );
                            }}
                          />
                        </div>
                        <div className="flex-1 w-100"></div>
                        <div className="flex-1 w-100"></div>
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
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue('cardNo', startSpcaeRemover(value));
                            }}
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
                              setFieldValue('presentAddress.country', e.value);
                              setFieldValue('presentAddress.stateId', '');
                              setFieldValue('presentAddress.districtId', '');
                            }}
                            label="Country"
                            showLabel={true}
                            defaultValue={values?.presentAddress.country}
                            selectProps={{
                              placeholder: 'Select',
                              isClearable: true,
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
                              setFieldValue('presentAddress.stateId', e.value);
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
                            refetch={values?.presentAddress.districtId && generateRandomString()}

                            name="presentAddress.districtId"
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
                            onCheckedChange={(checked) => {
                              setFieldValue('sameAddress', checked);
                              if (checked === true) {
                                setFieldValue('permanentAddress', {
                                  ...values?.permanentAddress,
                                  address1: 'values?.presentAddress?.address1',
                                  address2: values?.presentAddress?.address2,
                                  country: values?.presentAddress?.country,
                                  stateId: values?.presentAddress?.stateId,
                                  districtId: values?.presentAddress?.districtId,
                                  pinCode: values?.presentAddress?.pinCode,
                                })
                              };
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
                            placeholder="Enter Pin Code"
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

                            refetch={values?.permanentAddress.country && generateRandomString()}
                            useFormik={true}
                            name="permanentAddress.country"
                            onChange={(e) => {
                              setFieldValue(
                                'permanentAddress.country', e.value
                              );
                              setFieldValue('permanentAddress.stateId', '');
                              setFieldValue('permanentAddress.districtId', '');
                            }}
                            label="Country"
                            showLabel={true}
                            filters={{
                            }}
                            defaultValue={values?.permanentAddress.country}
                            selectProps={{
                              placeholder: 'Select',
                              isClearable: true,
                              isDisabled: !values?.permanentAddress?.country
                                ? true
                                : false,

                            }}
                          />
                        </div>
                        <div className="flex-1 w-100">
                          <CustomSelectById
                            id="state"
                            isMulti={false}
                            useFormik={true}
                            refetch={values?.permanentAddress.stateId && generateRandomString()}

                            name="permanentAddress.stateId"
                            onChange={(e) => {
                              setFieldValue(
                                'permanentAddress.stateId',
                                e.value
                              );
                              setFieldValue('permanentAddress.districtId', '');
                            }}
                            filters={{
                            }}
                            label="State"
                            showLabel={true}
                            defaultValue={values?.permanentAddress.stateId}
                            selectProps={{
                              placeholder: 'Select',
                              isClearable: true,
                              isDisabled: !values?.permanentAddress?.country
                                ? true
                                : false,
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

export default AddEditUser;
