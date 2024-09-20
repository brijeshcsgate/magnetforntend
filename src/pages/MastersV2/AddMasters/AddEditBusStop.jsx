import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
  Section,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import { busStationArea } from '@/utils/common.helper';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
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
import FormikRadioGroup from '@/components/inputs/formik/FormikRadioGroup';
import FormikAsyncDistrictDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDistrictDropDown';
import { capitalization } from '@/utils/common.helper';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const initialValues = {
  type: 'Bus Stop',
  englishName: '',
  hindiName: '',
  shortName: {
    english: '',
    hindi: '',
  },
  busStationArea: '',
  isActive: true,
  // country: "",
  // state: "",
  // district: "",
  // region: "",
};

const schema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  busStationArea: Yup.string().trim(),
  districtId: Yup.string().trim().required(COMMON_SCHEMA),
  regionId: Yup.string().trim().required(COMMON_SCHEMA),
  type: Yup.string().trim(),
});

const AddEditBusStop = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.BUS_STOP, id)
        .then((res) => {
          const editData = res?.data?.busStop;
          setData((prev) => ({
            ...prev,
            type: editData?.type,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            isActive: editData?.isActive,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            busStationArea: editData?.busStationArea,
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
      patchApi(APIS.BUS_STOP, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.BUS_STOP, payload)
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
                      breadCrumbs={[{ name: 'Master', path: ROUTES.MASTERS }]}
                      boldItem={'Bus Stations / Stops'}
                    />
                    <Heading>
                      {id ? 'Edit' : 'Add'} Bus Stations / Stops
                    </Heading>
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Saving...' : id ? 'Update' : 'Save'}
                    </Button>
                  </ButtonContainer>
                </Header>

                <Content>
                  <Section>
                    <SidePanel
                      title={`Add Bus Stations / Stops (En)`}
                      description={`Enter Bus Stations / Stops Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-2 gap-4 lg:w-2/3 ">
                        <FormikRadioGroup
                          label="Type"
                          name="type"
                          options={[
                            { label: 'Bus Stop', value: 'Bus Stop' },
                            { label: 'Bus Station', value: 'Bus Station' },
                          ]}
                          isRequired
                        />
                        <FormikSwitch label="Is Active?" name="isActive" />

                        <FormikTextField
                          label={`Bus ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Name`}
                          placeholder={`Enter Bus  ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Name`}
                          name="englishName"
                          isRequired={true}
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.charAt(0) === ' ') {
                              value = value.slice(1);
                            }
                            setFieldValue('englishName', capitalization(value));
                          }}
                        />

                        <FormikTextField
                          label={`Bus  ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Short Name`}
                          placeholder={`Enter Bus  ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Short Name`}
                          name="shortName.english"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.charAt(0) === ' ') {
                              value = value.slice(1);
                            }
                            setFieldValue('shortName.english', value);
                          }}
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
                        <div className="w-100 flex-1">
                          <FormikDropdown
                            key="busStationArea"
                            label="Bus Station Area"
                            name="busStationArea"
                            placeholder="Select"
                            options={busStationArea}
                            defaultValue={values?.busStationArea}
                            // isRequired
                          />
                        </div>
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Bus Stations / Stops (Hi)`}
                      description={`Enter Bus Stations / Stops Detail Here`}
                    />

                    <div className="flex flex-col w-full">
                      <div className="grid grid-cols-2 gap-4 lg:w-2/3 ">
                        <FormikTextField
                          label={`Bus ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Name`}
                          placeholder={`Enter Bus ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Name`}
                          name="hindiName"
                          onChange={(e) => {
                            let value = e.target.value;
                            if (value.charAt(0) === ' ') {
                              value = value.slice(1);
                            }
                            setFieldValue('hindiName', value);
                          }}
                        />

                        <FormikTextField
                          label={`Bus ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Short Name`}
                          placeholder={`Enter Bus ${
                            values?.type === 'Bus Station' ? 'Station' : 'Stop'
                          } Short Name`}
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

export default AddEditBusStop;
