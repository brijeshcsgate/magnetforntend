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
  rtoCode: '',
  districtPopulation: '',
  isActive: true,
  // country: "",
  // state: "",
  // district: "",
  // region: "",
};
const dropdownFields = [
  { label: 'Country', routeId: 'country', id: 'countryOfOrigin' },
  { label: 'State', routeId: 'state', id: 'stateId' },
];
const districtSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  // districtId: Yup.string().trim().required("District is required"),
  // regionId: Yup.string().trim().required("Region is required"),
});

const AddEditDistrict = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.DISTRICT, id)
        .then((res) => {
          const editData = res?.data?.district;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            isActive: editData?.isActive,
            districtPopulation: editData?.districtPopulation,
            rtoCode: editData?.rtoCode,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            countryOfOrigin: editData?.countryOfOrigin,
            stateId: editData?.stateId,
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
      patchApi(APIS.DISTRICT, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.DISTRICT, payload)
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
      validationSchema={districtSchema}
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
                      boldItem={'District'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} District</Heading>
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
                      title={`Add District (En)`}
                      description={`Enter District Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="District Name"
                            placeholder="Enter District Name"
                            name="englishName"
                            isRequired={true}
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
                          label="District Short Name"
                          placeholder="Enter District Short Name"
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
                      <div className="grid grid-cols-2 gap-8 md:w-2/3 ">
                        {dropdownFields?.map((item) => (
                          <FormikAsyncDropdown
                            key={item?.id}
                            label={item?.label}
                            name={item?.id}
                            placeholder={item?.label}
                            id={item?.routeId}
                            defaultValue={data?.[item?.id]}
                            limit={5}
                            isRequired={true}
                          />
                        ))}
                        <FormikTextField
                          label="RTO Code"
                          type="string"
                          placeholder="Enter RTO code"
                          name="rtoCode"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue('rtoCode', startSpcaeRemover(value));
                          }}
                        />
                        <FormikTextField
                          label="Population of district"
                          type="number"
                          placeholder="Enter population"
                          name="districtPopulation"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue(
                              'districtPopulation',
                              startSpcaeRemover(value)
                            );
                          }}
                        />
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add District (Hi)`}
                      description={`Enter District Detail Here`}
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="District Name"
                            placeholder="Enter District Name"
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
                          label="District Short Name"
                          placeholder="Enter District Short Name"
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

export default AddEditDistrict;
