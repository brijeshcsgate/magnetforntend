import React, { useContext, useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

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
import FormikColorPicker from '@/components/inputs/formik/FormikColorPicker'; // Import the new color picker component
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import { capitalization, startSpcaeRemover } from '@/utils/common.helper';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const initialValues = {
  name: {
    english: '',
    hindi: '',
  },
  shortName: {
    english: '',
    hindi: '',
  },
  priorityId: '',
  isActive: true,
};

const schema = Yup.object().shape({
  name: Yup.object().shape({
    english: Yup.string().trim().required(COMMON_SCHEMA),
  }),
  priorityId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditIssueCategory = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.ISSUE_CATEGORY, id)
        .then((res) => {
          const editData = res?.data?.issueCategory;
          setData((prev) => ({
            ...prev,
            name: {
              english: editData?.name?.english,
              hindi: editData?.name?.hindi,
            },
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            priorityId: editData?.priorityId,
            isActive: editData?.isActive,
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
      priorityId: values.priorityId,
      isActive: values.isActive,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.ISSUE_CATEGORY, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.ISSUE_CATEGORY, payload)
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
                      boldItem={'Issue Category'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Issue Category</Heading>
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
                      title={`Add Issue Category (En)`}
                      description={`Enter Issue Category Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Issue Category Name"
                            placeholder="Enter Issue Category Name"
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
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Short Name"
                          placeholder="Enter Short Name"
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
                        <FormikAsyncDropdown
                          label="Select Priority"
                          id="priority"
                          placeholder="Select Priority"
                          name="priorityId"
                          isRequired={true}
                        />
                      </div>
                    </InputsContainer>
                  </Section>
                  <Section>
                    <SidePanel
                      title={`Add Issue Category (Hi)`}
                      description={`Enter Issue Category Detail`}
                    />
                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Issue Category Name"
                          placeholder="Enter Issue Category Name"
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
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Short Name"
                          placeholder="Enter Short Name"
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

export default AddEditIssueCategory;
