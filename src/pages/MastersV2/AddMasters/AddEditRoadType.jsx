import React, { useContext, useEffect, useState } from 'react';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { capitalization } from '@/utils/common.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  route: {
    english: '',
    hindi: '',
  },
  point: {
    origin: '',
    end: '',
  },
  type: '',
  number: '',
  isActive: true,
};
const dropdownFields = [
  { label: 'Country', routeId: 'country', id: 'countryOfOrigin' },
  { label: 'State', routeId: 'state', id: 'stateId' },
  { label: 'Region', routeId: 'region', id: 'regionId' },
  { label: 'District', routeId: 'district', id: 'districtId' },
];
const schema = Yup.object().shape({
  route: Yup.object().shape({
    english: Yup.string().trim().required(COMMON_SCHEMA),
  }),
  point: Yup.object().shape({
    origin: Yup.string().trim().required(COMMON_SCHEMA),
    end: Yup.string().trim().required(COMMON_SCHEMA),
  }),

  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  districtId: Yup.string().trim().required(COMMON_SCHEMA),

  type: Yup.string().trim().required(COMMON_SCHEMA),
  number: Yup.string().trim().required(COMMON_SCHEMA),
  isActive: Yup.boolean(),
});

const AddEditRoadType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.ROAD_TYPE, id)
        .then((res) => {
          const editData = res?.data?.road;

          setData((prev) => (
            {
            ...prev,
            route: {
              english: editData?.route?.english,
              hindi: editData?.route?.hindi,
            },
            point: {
              origin: editData?.point?.origin,
              end: editData?.point?.end,
            },
            stateId: editData?.stateId,
            districtId: editData?.districtId,

            countryOfOrigin: editData?.countryOfOrigin,
            type: editData?.type,
            number: editData?.number,
            isActive: editData?.isActive,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      ...values,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.ROAD_TYPE, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.ROAD_TYPE, payload)
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
                      breadCrumbs={[
                        { name: 'Master Settings', path: ROUTES.MASTERS },
                      ]}
                      boldItem={'Road'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Road</Heading>
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
                      title={`Add Road (En)`}
                      description={`Enter Road Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Road Name (English)"
                            placeholder="Enter Road Name"
                            name="route.english"
                            // onChange={(e) => {
                            //   let value = e.target.value;
                            //   setFieldValue(
                            //     "route.english",
                            //     capitalization(value)
                            //   );
                            // }}
                            isRequired={true}
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 lg:w-2/3">
                        <FormikTextField
                          label="Road Type"
                          placeholder="Enter Road Type"
                          name="type"
                          isRequired={true}
                        />
                        <FormikTextField
                          label="Road Number"
                          placeholder="Enter Road Number"
                          name="number"
                          isRequired={true}
                        />
                        <FormikTextField
                          label="Origin Point"
                          placeholder="Enter Origin Point"
                          name="point.origin"
                          isRequired={true}
                        />
                        <FormikTextField
                          label="End Point"
                          placeholder="Enter End Point"
                          name="point.end"
                          isRequired={true}
                        />

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
                          otherFilters={{
                            countryOfOrigin: values?.countryOfOrigin,
                          }}
                          defaultValue={values?.stateId}
                          isRequired={true}
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
                      title={`Add Road (Hi)`}
                      description={`Enter Road Detail Here`}
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Road Name (Hindi)"
                            placeholder="Enter Road Name"
                            name="route.hindi"
                          />
                        </div>
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

export default AddEditRoadType;
