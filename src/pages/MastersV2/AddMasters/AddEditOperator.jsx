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
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import RadioButton from '@/components/inputs/mui/RadioButton';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
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
  isActive: true,
};
const operatorSchema = Yup.object().shape({
  name: Yup.object().shape({
    english: Yup.string().required(COMMON_SCHEMA),
    hindi: Yup.string().trim(),
  }),
});

const AddEditOperator = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.OPERATOR, id)
        .then((res) => {
          const editData = res?.data?.depot;
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
      isActive: values.isActive,
    };

    if (id) {
      payload._id = id;
      patchApi(APIS.OPERATOR, id, payload)
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
      postApi(APIS.OPERATOR, payload)
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
      validationSchema={operatorSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
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
                      breadCrumbs={[
                        { name: 'Master Settings', path: ROUTES.MASTERS },
                      ]}
                      boldItem={'Operator'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Operator</Heading>
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
                      title={`Add Operator (En)`}
                      description={`Enter Operator Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Operator Name"
                            placeholder="Enter Operator Name"
                            name="name.english"
                            onChange={(e) => {
                              let value = e.target.value;
                              setFieldValue(
                                'name.english',
                                capitalization(value)
                              );
                            }}
                            isRequired={true}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Operator Short Name"
                            placeholder="Enter Operator Short Name"
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
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                    </div>
                  </Section>
                  <Section>
                    <SidePanel
                      title={`Add Operator (Hi)`}
                      description={`Enter Operator  Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Operator  Name"
                            placeholder="Enter Operator Name"
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
                          label="Operator  Short Name"
                          placeholder="Enter Operator  Short Name"
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

export default AddEditOperator;
