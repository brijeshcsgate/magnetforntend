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
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { capitalization } from '@/utils/common.helper';
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
  // country: "",
  // state: "",
  // district: "",
  // region: "",
};
const depotSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  districtId: Yup.string().trim().required(COMMON_SCHEMA),
  regionId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditDepot = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.DEPOT, id)
        .then((res) => {
          const editData = res?.data?.depot;
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
      patchApi(APIS.DEPOT, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.DEPOT, payload)
        .then(() => {
          toast.success('Data saved successfully');
          navigate(-1);
        })
        .finally(() => {
          resetForm();
          setData(initialValues);
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
      validationSchema={depotSchema}
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
                      boldItem={'Depot'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Depot</Heading>
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
                        onClick={formikSubmit}
                        disabled={isSubmitting}
                      >
                        Save & Add New
                      </Button>
                    )}
                    <Button
                      type={BUTTON_TYPES.PRIMARY}
                      onClick={formikSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : id ? 'Update' : 'Save'}
                    </Button>
                  </ButtonContainer>
                </Header>

                <Content>
                  <Section>
                    <SidePanel
                      title={`Add Depot (En)`}
                      description={`Enter Depot Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Depot Name"
                            placeholder="Enter Depot Name"
                            name="englishName"
                            isRequired={true}
                            onChange={(e) => {
                              let value = e.target.value;
                              if (value.charAt(0) === ' ') {
                                value = value.slice(1);
                              }
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
                          label="Depot Short Name"
                          placeholder="Enter Depot Short Name"
                          name="shortName.english"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.charAt(0) === ' ') {
                              value = value.slice(1);
                            }
                            setFieldValue('shortName.english', value);
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
                            setFieldValue('regionId', '');
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
                          isRequired={true}
                          otherFilters={{
                            countryOfOrigin: values?.countryOfOrigin,
                          }}
                          callback={() => {
                            setFieldValue('regionId', '');
                            setFieldValue('districtId', '');
                          }}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.stateId}
                          key="region"
                          label="Region"
                          name="regionId"
                          placeholder="Select Region"
                          id="region"
                          limit={5}
                          defaultValue={values?.regionId}
                          otherFilters={{ stateId: values?.stateId }}
                          isRequired={true}
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
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Depot (Hi)`}
                      description={`Enter Depot Detail Here`}
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Depot Name"
                            placeholder="Enter Depot Name"
                            name="hindiName"
                            onChange={(e) => {
                              let value = e.target.value;
                              if (value.charAt(0) === ' ') {
                                value = value.slice(1);
                              }
                              setFieldValue('hindiName', value);
                            }}
                          />
                        </div>
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Depot Short Name"
                          placeholder="Enter Depot Short Name"
                          name="shortName.hindi"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.charAt(0) === ' ') {
                              value = value.slice(1);
                            }
                            setFieldValue('shortName.hindi', value);
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

export default AddEditDepot;
