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
import { capitalization } from '@/utils/common.helper';
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
};

const schema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditChassisBodyType = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.CHASSIS_BODY_TYPE, id)
        .then((res) => {
          const editData = res?.data?.chassisBodyType;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            isActive: editData?.isActive,
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
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.CHASSIS_BODY_TYPE, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.CHASSIS_BODY_TYPE, payload)
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
                      boldItem={'Chassis Type'}
                    />
                    {/* <Heading>{id ? 'Edit' : 'Add'} Chassis Type</Heading> */}
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
                      title={`Add Chassis Type (En)`}
                      description={`Enter Chassis Type Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Chassis Type Name"
                            placeholder="Enter Chassis Type Name"
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
                          label="Chassis Type Short Name"
                          placeholder="Enter Chassis Type Short Name"
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
                    </InputsContainer>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Chassis Type (Hi)`}
                      description={`Enter Chassis Type Detail`}
                    />

                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Chassis Type Name"
                          placeholder="Enter Chassis Type Name"
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
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Chassis Type Short Name"
                          placeholder="Enter Chassis Type Short Name"
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

export default AddEditChassisBodyType;
