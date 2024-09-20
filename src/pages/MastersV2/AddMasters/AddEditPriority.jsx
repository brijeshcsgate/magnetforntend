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
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikColorPicker from '@/components/inputs/formik/FormikColorPicker';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import FormikSwitch from '@/components/inputs/formik/FormikSwitch';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
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
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
// import AddEditIssueSubCategory from "./AddEditIssueSubCategory";

const initialValues = {
  name: {
    english: '',
    hindi: '',
  },
  colour: '#FFFFFF',
  dueDate: 0,
  isActive: true,
  // issueSubCategoryId: ''
};

const schema = Yup.object().shape({
  name: Yup.object().shape({
    english: Yup.string().trim().required(COMMON_SCHEMA),
  }),
  colour: Yup.string().trim().required('Colour is required'),
  dueDate: Yup.number()
    .required('Due date is required')
    .min(1, 'Due date must be greater than 0'),
  // issueSubCategoryId: Yup.string().required("Issue sub-category is required"),
});

// Generate due date options from 1 to 99
const dueDateOptions = Array.from({ length: 99 }, (_, i) => ({
  value: i + 1,
  label: `${i + 1}`,
}));

const AddEditPriority = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.PRIORITY, id)
        .then((res) => {
          const editData = res?.data?.priority;
          setData((prev) => ({
            ...prev,
            name: {
              english: editData?.name?.english,
              hindi: editData?.name?.hindi,
            },
            colour: editData?.colour,
            dueDate: editData?.dueDate,
            isActive: editData?.isActive,
            // issueSubCategoryId: editData?.issueSubCategoryId?._id
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
      colour: values.colour,
      dueDate: values.dueDate,
      isActive: values.isActive,
      // issueSubCategoryId: values.issueSubCategoryId,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.PRIORITY, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.PRIORITY, payload)
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
                      boldItem={'Priority'}
                    />
                    <Heading>{id ? 'Edit' : 'Add'} Priority</Heading>
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
                      title={`Add Priority (En)`}
                      description={`Enter Priority Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Priority Name"
                            placeholder="Enter Priority Name"
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
                        <FormikColorPicker
                          label="Colour"
                          type="color"
                          placeholder="Enter Colour"
                          name="colour"
                          isRequired={true}
                        />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikDropdown
                          label="Due Days"
                          placeholder="Enter Due Days"
                          options={dueDateOptions}
                          name="dueDate"
                          isRequired={true}
                        />
                      </div>
                      {/* <div className=" pb-4 md:w-1/3">
                        <FormikAsyncDropdown
                          label="Issue Sub Category"
                          placeholder="Select Issue Sub Category"
                          name="issueSubCategoryId"
                          id="issueSubCategory"
                          isRequired={true}
                        />
                      </div> */}
                    </InputsContainer>
                  </Section>
                  <Section>
                    <SidePanel
                      title={`Add Priority (Hi)`}
                      description={`Enter Priority Detail`}
                    />
                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Priority Name"
                          placeholder="Enter Priority Name"
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

export default AddEditPriority;
