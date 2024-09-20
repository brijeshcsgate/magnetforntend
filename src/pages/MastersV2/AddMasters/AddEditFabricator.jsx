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
import { DateField } from '@/components/inputs/formik/FormikDateField';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import RadioButton from '@/components/inputs/mui/RadioButton';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
import { CompareSharp } from '@mui/icons-material';
import { FormControlLabel, RadioGroup } from '@mui/material';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
  // document: "Document Link",
};
const fabricatorSchema = Yup.object().shape({
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
    billing: Yup.string().required(COMMON_SCHEMA),
  }),
  pointOfContact: Yup.string().required(COMMON_SCHEMA),
  contractDate: Yup.object().shape({
    start: Yup.string().required(COMMON_SCHEMA),
    end: Yup.string().required(COMMON_SCHEMA),
  }),
  email: Yup.string().email('Invalid Email'),
  mobile: Yup.string()
    .required(COMMON_SCHEMA)
    .matches(/^[6-9]\d{9}$/, 'Invalid mobile number'),
  type: Yup.string()
    .required(COMMON_SCHEMA)
    .oneOf(['Owned', 'Hired'], "Type must be either 'Owned' or 'Hired'"),
});

const AddEditFabricator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.FABRICATOR, id)
        .then((res) => {
          const editData = res?.data?.fabricator;
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
      isActive: values.isActive,
    };

    if (id) {
      payload._id = id;
      patchApi(APIS.FABRICATOR, id, payload)
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
      postApi(APIS.FABRICATOR, payload)
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
      validationSchema={fabricatorSchema}
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
                      breadCrumbs={[{ name: 'Master', path: ROUTES.MASTERS }]}
                      boldItem={'Fabricator'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Fabricator</Heading>
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
                      title={`Add Fabricator (En)`}
                      description={`Enter Fabricator Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Fabricator Name"
                            placeholder="Enter Fabricator Name"
                            name="name.english"
                            isRequired={true}
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'name.english',
                                capitalization(value)
                              );
                            }}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Fabricator Short Name"
                            placeholder="Enter Fabricator Short Name"
                            name="shortName.english"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'name.english',
                                startSpcaeRemover(value)
                              );
                            }}
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
                            Fabricator Type
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
                            isRequired={true}
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'address.billing',
                                startSpcaeRemover(value)
                              );
                            }}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Communication Address"
                            placeholder="Enter Communication Address"
                            name="address.communication"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'address.communication',
                                startSpcaeRemover(value)
                              );
                            }}
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
                            isRequired={true}
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'pointOfContact',
                                startSpcaeRemover(value)
                              );
                            }}
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
                            label="Mobile Number"
                            placeholder="Enter Mobile Number"
                            name="mobile"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue('mobile', startSpcaeRemover(value));
                            }}
                            isRequired={true}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Designation"
                            placeholder="Enter Designation"
                            name="designation"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'designation',
                                startSpcaeRemover(value)
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </Section>
                  <Section>
                    <SidePanel
                      title={`Add Fabricator (Hi)`}
                      description={`Enter Fabricator Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Fabricator Name"
                            placeholder="Enter Fabricator Name"
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
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Fabricator Short Name"
                          placeholder="Enter Fabricator Short Name"
                          name="shortName.hindi"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue(
                              'shortName.hindi',
                              startSpcaeRemover(value)
                            );
                          }}
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

export default AddEditFabricator;
