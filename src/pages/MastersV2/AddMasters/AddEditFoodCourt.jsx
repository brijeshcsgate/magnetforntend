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
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
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
import { dhabaCatergory } from '@/utils/common.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  englishName: '',
  hindiName: '',
  shortName: {
    english: '',
    hindi: '',
  },
  isActive: true,
  // country: "",
  // state: "",
  // district: "",
  // region: "",
};
const dropdownFields = [
  { label: 'Country', routeId: 'country', id: 'countryOfOrigin' },
  { label: 'State', routeId: 'state', id: 'stateId' },
  { label: 'Region', routeId: 'region', id: 'regionId' },
  { label: 'District', routeId: 'district', id: 'districtId' },
];
const schema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  // districtId: Yup.string().trim(),
  regionId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditFoodCourt = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.FOOD_COURT, id)
        .then((res) => {
          const editData = res?.data?.foodCourt;

          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            isActive: editData?.isActive,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            stateId: editData?.stateId,
            districtId: editData?.districtId,
            regionId: editData?.regionId,
            countryOfOrigin: editData?.countryOfOrigin,
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
      patchApi(APIS.FOOD_COURT, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.FOOD_COURT, payload)
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
      validationSchema={schema}
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
                      breadCrumbs={[{ name: 'Master', path: ROUTES.MASTERS }]}
                      boldItem={'Dhaba'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Dhaba</Heading>
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
                      title={`Add Dhaba (En)`}
                      description={`Enter Dhaba Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Dhaba Name"
                            placeholder="Enter Dhaba Name"
                            name="englishName"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'englishName',
                                capitalization(value)
                              );
                            }}
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Dhaba Short Name"
                          placeholder="Enter Dhaba Short Name"
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
                      <div className="grid grid-cols-2 gap-3 lg:w-2/3 ">
                        <FormikAsyncDropdown
                          label="Country"
                          name="countryOfOrigin"
                          placeholder="Select Country"
                          id="country"
                          defaultValue={values.countryOfOrigin}
                          callback={() => {
                            setFieldValue('stateId', '');
                            setFieldValue('regionId', '');
                            setFieldValue('districtId', '');
                          }}
                          isRequired={true}
                          limit={5}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.countryOfOrigin}
                          label="State"
                          name="stateId"
                          placeholder="Select State"
                          id="state"
                          defaultValue={values.stateId}
                          limit={5}
                          otherFilters={{
                            countryOfOrigin: values?.countryOfOrigin,
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
                          defaultValue={values.regionId}
                          limit={5}
                          callback={() => {
                            setFieldValue('districtId', '');
                          }}
                        />

                        <FormikDropdown
                          key="category"
                          label="Category"
                          name="category"
                          placeholder="Select category"
                          options={dhabaCatergory}
                          defaultValue={values?.category}
                          isRequired
                        />
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Dhaba (Hi)`}
                      description={`Enter Dhaba Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Dhaba Name"
                            placeholder="Enter Dhaba Name"
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
                          label="Dhaba Short Name"
                          placeholder="Enter Dhaba Short Name"
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

export default AddEditFoodCourt;
