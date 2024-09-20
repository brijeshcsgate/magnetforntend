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
  isActive: true,
  shortName: {
    english: '',
    hindi: '',
  },
  distance: '',
};

const schema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditRouteCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.ROUTE_CATEGORY, id)
        .then((res) => {
          const editData = res?.data?.routeCategory;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            isActive: editData?.isActive,
            distance: editData?.distance,
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
      isActive: values.isActive,
      shortName: {
        english: values.shortName.english,
        hindi: values.shortName.hindi,
      },
      distance: values.distance,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.ROUTE_CATEGORY, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.ROUTE_CATEGORY, payload)
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
                      boldItem={'Route Category'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Route Category</Heading>
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
                      title={`Add Route Category (En)`}
                      description={`Enter  Route Category Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Route Category Name"
                            placeholder="Enter Route Category Name"
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
                          label="Route Category Short Name"
                          placeholder="Enter Route Category Short Name"
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
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          min={0}
                          type="number"
                          label="Route Category Distance (km)"
                          placeholder="Enter Route Category Distance"
                          name="distance"
                        />
                      </div>
                    </InputsContainer>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Route Category (Hi)`}
                      description={`Enter Route Category Detail`}
                    />

                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Route Category Name"
                          placeholder="Enter Route Category Name"
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
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Route Category Short Name"
                          placeholder="Enter Route Category Short Name"
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
                    </InputsContainer>
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

export default AddEditRouteCategory;
