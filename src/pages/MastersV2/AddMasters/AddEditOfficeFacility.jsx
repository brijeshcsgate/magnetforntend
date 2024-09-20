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
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const initialValues = {
  englishName: '',
  hindiName: '',
  isActive: true,
  shortName: {
    english: '',
    hindi: '',
  },
  icon: '',
};

const brakingSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditOfficeFacility = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.OFFICEFACILITY, id)
        .then((res) => {
          const editData = res?.data?.officeFacility;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            icon: editData?.icon,
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
      icon: values?.icon,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.OFFICEFACILITY, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.OFFICEFACILITY, payload)
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
      validationSchema={brakingSchema}
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
                      boldItem={'Office Facitlity'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Office Facitlity</Heading>
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

                <div
                  className="add-v-form-bottom-section"
                  style={{ paddingBottom: '20px' }}
                >
                  <div className="add-v-form">
                    <div className="add-v-form-left-section">
                      <div class="heading-600-16 c-blue1 md:whitespace-nowrap">
                        Add Office Facitlity (En)
                      </div>
                    </div>
                    <div className="add-v-form-right-section">
                      <div className="add-v-form-section">
                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            {' '}
                            <FormikTextField
                              label="Office Facitlity Name"
                              placeholder="Enter Office Facitlity Name"
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

                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Office Facitlity Short Name"
                              placeholder="Enter Office Facitlity Short Name"
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
                          <div className="w-100 flex-1 d-flex justify-end ">
                            <div className=" w-fit">
                              <FormikSwitch
                                label="Is Active?"
                                name="isActive"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="add-v-form pt-43">
                    <div className="add-v-form-left-section">
                      <div class="heading-600-16 c-blue1 md:whitespace-nowrap">
                        Images
                      </div>
                    </div>
                    <div className="add-v-form-right-section">
                      <div className="add-v-form-section">
                        <div className="group-type-1">
                          <div className="image-uploder-block">
                            <FormikDocumentUploder
                              name="icon"
                              id="office-image"
                              title="Upload Office Facitlity Image"
                              message="or drag & drop Office image file here"
                              btnText="BROWSE FILE"
                              bottomMessage="Supported File Format: jpeg, png (upto 1 MB)"
                              accept="image/*"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="add-v-form pt-43">
                    <div className="add-v-form-left-section">
                      <div class="heading-600-16 c-blue1 md:whitespace-nowrap">
                        Office Details [Hn]
                      </div>
                    </div>
                    <div className="add-v-form-right-section">
                      <div className="add-v-form-section">
                        <div className="group-type-3-equal">
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Name"
                              placeholder="Select Name"
                              name="hindiName"
                              onChange={(e) => {
                                let value = e.target.value;
                                setFieldValue(
                                  'hindiName',
                                  startSpcaeRemover(value)
                                );
                              }}
                              isRequired={true}
                            />
                          </div>
                          <div className="w-100 flex-1">
                            <FormikTextField
                              label="Office Facitlity Short Name"
                              placeholder="Enter Office Facitlity Short Name"
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
                          <div className="w-100 flex-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default AddEditOfficeFacility;
