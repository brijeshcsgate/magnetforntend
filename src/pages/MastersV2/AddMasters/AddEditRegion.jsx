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
import { FormikSelect } from '@/components/common/CustomSelect';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const initialValues = {
  englishName: '',
  hindiName: '',
  shortName: {
    english: '',
    hindi: '',
  },
  isActive: true,
  countryOfOrigin: '',
  stateId: '',
  districtId: [],
};

const regionSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  districtId: Yup.array().required(COMMON_SCHEMA),
});

const AddEditRegion = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.REGION, id)
        .then((res) => {
          const editData = res?.data?.region;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            isActive: editData?.isActive,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            countryOfOrigin: editData?.countryOfOrigin,
            stateId: editData?.stateId,
            districtId: editData?.districtId,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: {
        english: values.englishName,
        hindi: values.hindiName,
      },
      isActive: values?.isActive,
      shortName: {
        english: values?.shortName?.english,
        hindi: values?.shortName?.hindi,
      },
      countryOfOrigin: values?.countryOfOrigin,
      stateId: values?.stateId,
      districtId: values?.districtId,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.REGION, id, payload).then(() => {
        toast.success('Data updated successfully');
        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
        } else {
          navigate(-1);
        }
      });
    } else {
      postApi(APIS.REGION, payload)
        .then(() => {
          toast.success('Data saved successfully');
          navigate(-1);
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
      validationSchema={regionSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        setFieldValue,
      }) => {
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
                        boldItem={'Region'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Region</Heading>
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
                        title={`Add Region (En)`}
                        description={`Enter Region Detail Here`}
                      />
                      <div className="flex flex-col w-full">
                        <div className="flex gap-8">
                          <div className=" pb-4 md:w-1/3">
                            <FormikTextField
                              label="Region Name"
                              placeholder="Enter Region Name"
                              name="englishName"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'englishName',
                                  capitalization(value)
                                );
                              }}
                              isRequired={true}
                            />
                          </div>
                          <FormikSwitch label="Is Active?" name="isActive" />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Region Short Name"
                            placeholder="Enter Region Short Name"
                            name="shortName.english"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'shortName.english',
                                startSpcaeRemover(value)
                              );
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-8 lg:w-2/3 ">
                          <FormikAsyncDropdown
                            key="country"
                            label="Country"
                            name="countryOfOrigin"
                            placeholder="Select Country"
                            id="country"
                            limit={5}
                            defaultValue={values?.countryOfOrigin}
                            isRequired={true}
                            callback={() => {
                              setFieldValue('stateId', '');
                              setFieldValue('districtId', '');
                            }}
                          />
                          <FormikAsyncDropdown
                            isDisabled={!values.countryOfOrigin}
                            key="state"
                            label="State"
                            name="stateId"
                            placeholder="Select State"
                            id="state"
                            limit={5}
                            defaultValue={values?.stateId}
                            otherFilters={{
                              countryOfOrigin: values?.countryOfOrigin,
                            }}
                            isRequired={true}
                            callback={() => {
                              setFieldValue('districtId', '');
                            }}
                          />

                          <FormikSelect
                            id="district"
                            isMulti
                            name="districtId"
                            label="District"
                            filters={{ stateId: values?.stateId }}
                            selectProps={{
                              isDisabled: !values?.districtId,
                            }}
                          />

                          <FormikSelect
                            id="district"
                            isMulti
                            name="districtId"
                            label="District"
                            filters={{ stateId: values?.stateId }}
                          />
                        </div>
                      </div>
                    </Section>

                    <Section>
                      <SidePanel
                        title={`Add Region (Hi)`}
                        description={`Enter Region Detail Here`}
                      />

                      <div className="flex flex-col w-full">
                        <div className="flex gap-8">
                          <div className=" pb-4 md:w-1/3">
                            <FormikTextField
                              label="Region Name"
                              placeholder="Enter Region Name"
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
                            label="Region Short Name"
                            placeholder="Enter Region Short Name"
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
        );
      }}
    </Formik>
  );
};

export default AddEditRegion;
