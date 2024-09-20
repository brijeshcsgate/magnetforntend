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
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { startSpcaeRemover, validateAlphabets } from '@/utils/common.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  englishName: '',
  hindiName: '',
  isActive: true,
  shortName: {
    english: '',
    hindi: '',
  },
  countryId: '',
  stateId: '',
  districtId: '',
  regionId: '',
  depotId: '',
};
/* countryId: yup.string().required("Country is required"),
  stateId:yup.string().required("State is required"),
  districtId:yup.string().required("District is required"),
  regionId:yup.string().required("Region is required"),
  depotId:yup.string().required("Depot is required"), */

Yup.addMethod(Yup.string, 'capitalizeFirstLetter', function (message) {
  return this.transform(function (value, originalValue) {
    if (typeof value === 'string' && value.length > 0) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
    return value;
  }).test('is-capitalized', message, function (value) {
    return value === undefined || value === null || /^[A-Z]/.test(value);
  });
});

const workshopSchema = Yup.object().shape({
  englishName: Yup.string()
    .trim()
    .capitalizeFirstLetter('The first letter must be capitalized')
    .required(COMMON_SCHEMA),
  countryId: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  districtId: Yup.string().trim().required(COMMON_SCHEMA),
  regionId: Yup.string().trim().required(COMMON_SCHEMA),
  depotId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditWorkshop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.WORKSHOP, id)
        .then((res) => {
          const editData = res?.data?.workshop;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            isActive: editData?.isActive,
            stateId: editData?.stateId?.id,
            districtId: editData?.districtId?.id,
            regionId: editData?.regionId?.id,
            countryId: editData?.countryId,
            depotId: editData?.depotId,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { englishName, hindiName, ...rest } = values;
    const payload = {
      name: {
        english: englishName,
        hindi: hindiName,
      },
      ...rest,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.WORKSHOP, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.WORKSHOP, payload)
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

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={workshopSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        errors,
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
                      boldItem={'Workshop'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Workshop</Heading>
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

                <Content>
                  <Section>
                    <SidePanel
                      title={`Add Workshop (En)`}
                      description={`Enter Workshop Detail`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Workshop Name"
                            placeholder="Enter Workshop Name"
                            name="englishName"
                            onChange={(e) =>
                              validateAlphabets(e, setFieldValue, 'englishName')
                            }
                            isRequired
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Workshop Short Name"
                          placeholder="Enter Workshop Short Name"
                          name="shortName.english"
                          onChange={(e) =>
                            validateAlphabets(
                              e,
                              setFieldValue,
                              'shortName.english'
                            )
                          }
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 lg:w-2/3 ">
                        <FormikAsyncDropdown
                          label="Country"
                          name="countryId"
                          placeholder="Select Country"
                          id="country"
                          defaultValue={values?.countryId}
                          callback={() => {
                            setFieldValue('stateId', '');
                            setFieldValue('regionId', '');
                            setFieldValue('districtId', '');
                          }}
                          isRequired={true}
                          limit={5}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.countryId}
                          label="State"
                          name="stateId"
                          placeholder="Select State"
                          id="state"
                          defaultValue={values?.stateId}
                          limit={5}
                          otherFilters={{
                            countryOfOrigin: values?.countryId,
                          }}
                          isRequired={true}
                          callback={() => {
                            setFieldValue('regionId', '');
                            setFieldValue('districtId', '');
                          }}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.stateId}
                          label="Region"
                          name="regionId"
                          placeholder="Select Region"
                          id="region"
                          isRequired={true}
                          otherFilters={{
                            stateId: values.stateId,
                          }}
                          defaultValue={values?.regionId}
                          limit={5}
                          callback={() => {
                            setFieldValue('districtId', '');
                          }}
                        />

                        <FormikAsyncDropdown
                          isDisabled={!values.regionId}
                          key="district"
                          label="District"
                          name="districtId"
                          placeholder="Select District"
                          // id='region/'
                          endpoint={'v2/masters/region/districtByRegion'}
                          limit={5}
                          defaultValue={values?.districtId}
                          otherFilters={{
                            regionId: values?.regionId,
                          }}
                          isRequired={true}
                        />
                        <FormikAsyncDropdown
                          label="Depot"
                          name="depotId"
                          placeholder="Select Depot"
                          id="depot"
                          isRequired={true}
                          defaultValue={values?.depotId}
                          isDisabled={!values?.regionId}
                          limit={5}
                          otherFilters={{
                            stateId: values?.stateId,
                            regionId: values?.regionId,
                          }}
                        />
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Workshop (Hi)`}
                      description={`Enter Workshop Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Workshop Name"
                            placeholder="Enter Workshop Name"
                            name="hindiName"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'hindiName',
                                startSpcaeRemover(value)
                              );
                            }}
                          />
                        </div>
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Workshop Short Name"
                          placeholder="Enter Workshop Short Name"
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

export default AddEditWorkshop;
