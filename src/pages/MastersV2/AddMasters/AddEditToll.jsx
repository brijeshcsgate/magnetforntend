import {
  ButtonContainer,
  Container,
  Content1,
  Header,
  Heading,
  Section,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextArea from '@/components/inputs/formik/FormikTextArea';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import AddressWithMap from '@/components/maps/AddressWithMap';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const initialValues = {
  countryId: '',
  stateId: '',
  districtId: '',
  name: {
    english: '',
    hindi: '',
  },
  shortName: {
    english: '',
    hindi: '',
  },
  vehicleType: '',
  price: 0,
  description: '',
};

const schema = Yup.object().shape({
  name: Yup.object().shape({
    english: Yup.string().trim().required(COMMON_SCHEMA),
  }),
  countryId: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required('State is required'),
  districtId: Yup.string().trim().required('District is required'),
});

const AddEditToll = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.TOLL, id)
        .then((res) => {
          const editData = res?.data?.toll;
          setData((prev) => ({
            ...prev,
            name: {
              english: editData?.name?.english,
              hindi: editData?.name?.hindi,
            },
            isActive: editData?.isActive,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            stateId: editData?.stateId,
            districtId: editData?.districtId,
            countryId: editData?.countryId,
            vehicleType: editData?.vehicleType,
            price: editData?.price,
            description: editData?.description,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: {
        english: values?.name?.english,
        hindi: values?.name?.hindi,
      },
      isActive: values?.isActive,
      shortName: {
        english: values?.shortName?.english,
        hindi: values?.shortName?.hindi,
      },
      stateId: values?.stateId,
      districtId: values?.districtId,
      countryId: values?.countryId,
      vehicleType: values?.vehicleType,
      price: values?.price,
      description: values?.description,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.TOLL, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.TOLL, payload)
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
                        boldItem={'Toll Tax'}
                      />
                      <Heading>{id ? 'Edit' : 'Add'} Toll Tax</Heading>
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

                  <Content1>
                    <div
                      className="add-v-form"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Add Toll Tax (En)`}
                            // description={`Enter Toll Tax Detail Here`}
                          />
                          <div className="group-type-2-equal">
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Toll Tax Name"
                                placeholder="Enter Toll Tax Name"
                                name="name.english"
                                isRequired={true}
                              />
                            </div>
                            <div
                              className="flex-1 w-100"
                              style={{ paddingTop: '15px' }}
                            >
                              <FormikSwitch
                                label="Is Active?"
                                name="isActive"
                              />
                            </div>
                          </div>
                          <div className="group-type-3-equal">
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Toll Tax Short Name"
                                placeholder="Enter Toll Tax Short Name"
                                name="shortName.english"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Vehicle Type"
                                placeholder="Enter Vehicle Type"
                                name="vehicleType"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikTextField
                                type="number"
                                label="Toll Tax Price"
                                placeholder="Enter Toll Tax Price"
                                name="price"
                              />
                            </div>
                          </div>
                          <div className="group-type-3-equal">
                            <div className="flex-1 w-100">
                              <FormikAsyncDropdown
                                key="country"
                                label="Country"
                                name="countryId"
                                placeholder="Select Country"
                                id="country"
                                limit={5}
                                defaultValue={values?.countryId}
                                isRequired={true}
                                callback={() => {
                                  setFieldValue('stateId', '');
                                  setFieldValue('districtId', '');
                                }}
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikAsyncDropdown
                                isDisabled={!values.countryId}
                                key="state"
                                label="State"
                                name="stateId"
                                placeholder="Select State"
                                id="state"
                                limit={5}
                                defaultValue={values?.stateId}
                                otherFilters={{
                                  countryOfOrigin: values?.countryId,
                                }}
                                isRequired={true}
                                callback={() => {
                                  setFieldValue('districtId', '');
                                }}
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikAsyncDropdown
                                isDisabled={!values.stateId}
                                key="district"
                                label="District"
                                name="districtId"
                                placeholder="Select District"
                                id="district"
                                limit={5}
                                defaultValue={values?.districtId}
                                otherFilters={{ stateId: values?.stateId }}
                                isRequired={true}
                              />
                            </div>
                          </div>
                          <div className="group-type-1">
                            <FormikTextArea
                              label="Description"
                              placeholder="Enter Description"
                              name="description"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <AddressWithMap
                      values={values}
                      setFieldValue={setFieldValue}
                    />

                    <div
                      className="add-v-form pt-43"
                      style={{ padding: '20px', justifyContent: 'center' }}
                    >
                      <div className="add-v-form-right-section">
                        <div className="add-v-form-section">
                          <SidePanel
                            title={`Add Toll Tax (Hi)`}
                            // description={`Enter Toll Tax Detail Here`}
                          />
                          <div className="group-type-2-equal">
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Toll Tax Name"
                                placeholder="Enter Toll Tax Name"
                                name="name.hindi"
                              />
                            </div>
                            <div className="flex-1 w-100">
                              <FormikTextField
                                label="Toll Tax Short Name"
                                placeholder="Enter Toll Tax Short Name"
                                name="shortName.hindi"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Content1>
                </>
              )}
            </div>
          </Container>
        );
      }}
    </Formik>
  );
};

export default AddEditToll;
