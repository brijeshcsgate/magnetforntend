import {
  ButtonContainer,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { Field, Formik } from 'formik';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import './AddInspection.css';
import { ROUTES } from '@/constants/route.constant';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { Label } from '@/components/ui/label';
import FormikCheckboxWithHelperText from '@/components/inputs/formik/CheckBoxWithDropDown/FormikCheckboxWithHelperText';
import { InspectionsValidationSchema } from '@/Validations/InspectionsValidationSchema';
import { InspectionsService } from '@/services/InspectionsService';
import FormikColorField from '@/components/inputs/formik/FormikColorField';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import { getApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import {
  bloodGroup,
  validateAlphabets,
  validateMobileNumber,
  validateAlphabetsfortitle,
  validatePincode,
  governmentIssueCards,
  startSpcaeRemover,
} from '@/utils/common.helper';
import {
  CustomSelect,
  CustomSelectById,
} from '@/components/common/CustomSelect';
import { data } from 'autoprefixer';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';

const AddInspection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    title: '',
    template: null,
    enableLocationExceptionTracking: false,
    allowStoredPhotos: false,
    description: '',
    titleColor: '',
  });

  const [data, setData] = useState(initialValues);

  const [templateValues, setTemplateValues] = useState([]);

  useEffect(() => {
    if (id) {
      getApi(APIS.GET_ALL_Inspections, id)
        .then((res) => {
          const editData = res?.data;
          // Populate form with fetched data
          setData((prev) => ({
            ...prev,
            template: editData.template
              ? { label: editData.template.title, value: editData.template._id }
              : null,
            enableLocationExceptionTracking:
              editData.enableLocationExceptionTracking,
            allowStoredPhotos: editData.allowStoredPhotos,
            description: editData.description || '',
            titleColor: editData.titleColor,
            title: editData.title,
          }));
        })
        .catch((error) => {
          console.error('Error fetching data for editing:', error);
          toast.error('Failed to load data');
        })
        .finally(() => {
          setLoading(false);
        });
    }
    const fetchData = async () => {
      getApi(APIS.GET_ALL_Inspections).then((res) => {
        const transformedData = res.data.list.map((item) => ({
          label: item.title,
          value: item._id,
        }));

        console.log('transform data : ' + transformedData);

        setTemplateValues(transformedData);
      });
    };
    fetchData();
  }, [id]);

  // Handle selection of a template
  // const handleTemplateChange = async (selectedOption) => {
  //   if (!selectedOption) {
  //     // If the option is cleared (isClearable), you may want to reset or clear related fields.
  //     console.log('Template selection cleared');
  //     return;
  //   }

  //   try {
  //     // Make the second API call based on the selected template value (id)
  //     const res = await getApi(APIS.GET_ALL_Inspections, selectedOption.value);
  //     console.log('Data fetched based on selected template:', res);
  //     // Perform further actions with the fetched data (e.g., update form fields, etc.)
  //   } catch (error) {
  //     console.error('Error fetching data for selected template:', error);
  //     toast.error('Failed to fetch template data');
  //   }
  // };
  const handleTemplateChange = async (selectedOption,setFieldValue) => {
    if (!selectedOption) {
      setFieldValue('components', []); // Clear components if the template is cleared
      return;
    }

    try {
      const res = await getApi(APIS.GET_ALL_Inspections, selectedOption.value);
      const templateData = res.data;

      // Set components in form state
      setFieldValue('components', templateData.components || []);

      console.log(
        'Fetched components for selected template:',
        templateData.components
      );
    } catch (error) {
      console.error('Error fetching components for selected template:', error);
      toast.error('Failed to fetch template data');
    }
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    // const componentsData =
    //   values.template?.components?.map((component) => ({
    //     category: component.category, // Extract category ID
    //     subCategory: component.subCategory, // Extract sub-category ID
    //     component: component.component, // Extract component name
    //     description: component.description, // Extract component description
    //     choices: component.choices?.map((choice) => ({
    //       title: choice.title,
    //       issueCreated: choice.issueCreated,
    //       comment: choice.comment,
    //       photo: choice.photo,
    //     })),
    //   })) || [];
    const componentsData =
      values.components?.map((component) => ({
        category: component.category._id, // Extract category ID
        subCategory: component.subCategory._id, // Extract sub-category ID
        component: component.component, // Extract component name
        description: component.description, // Extract component description description
        choices: component.choices?.map((choice) => ({
          title: choice.title,
          issueCreated: choice.issueCreated,
          comment: choice.comment,
          photo: choice.photo,
        })),
      })) || [];

    const dataToSubmit = {
      ...values,
      template: values.template ? values.template.value : null,
      enableLocationExceptionTracking: values.enableLocationExceptionTracking,
      allowStoredPhotos: values.allowStoredPhotos,
      description: values.description || '',
      titleColor: values.titleColor,
      components: componentsData, // Include the components data
    };

    // const dataToSubmit = {
    //   ...values,
    //   template: values.template ? values.template.value : null,
    //   enableLocationExceptionTracking: values.enableLocationExceptionTracking,
    //   allowStoredPhotos: values.allowStoredPhotos,
    //   description: values.description || '',
    //   titleColor: values.titleColor,
    //   components: componentsData, // Include the components data
    // };

    if (!id) {
      InspectionsService.createinspection(dataToSubmit, (response) => {
        toast.success('Inspection form added successfully');
        const dataToSend = {
          id: response.data.data.id,
          title: response.data.data.title,
        };
        navigate(ROUTES.INSPECTIONS_FORM_BUILDER_FORM, { state: dataToSend });
      });
    } else {
      InspectionsService.updateinspectionById(
        id,
        dataToSubmit,
        handleUpdateinspectionSuccess
      );
    }
    setSubmitting(false);
  };

  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Inspection Form');
  }, []);

  const handleUpdateinspectionSuccess = () => {
    toast.success('inspection updated successfully');
    navigate(-1);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={InspectionsValidationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        setFieldValue,
      }) => (
        <div className="add-v-main-container">
          <div className="add-v-form-container">
            <div className="add-v-form-top-section">
              <div className="top-upper-section d-h-between mb-4">
                <div>
                  <BreadCrumbs
                    backNavi={() => navigate(ROUTES.INSPECTIONS_FORMS_LIST)}
                    breadCrumbs={[
                      {
                        name: 'Inspection List',
                        path: ROUTES.INSPECTIONS_FORMS_LIST,
                      },
                    ]}
                    boldItem="Add Inspection Form"
                  />

                  <Heading>{id ? 'Edit' : 'Add'} Inspection Form</Heading>
                </div>
                <ButtonContainer>
                  <Button
                    type={BUTTON_TYPES.SECONDARY}
                    onClick={() => navigate(-1)}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>

                  <Button
                    type={BUTTON_TYPES.PRIMARY}
                    onClick={() => {
                      formikSubmit();
                    }}
                  >
                    Save
                  </Button>
                </ButtonContainer>
              </div>
            </div>
            <div
              className="add-v-form-bottom-section "
              style={{ paddingLeft: '20%', paddingRight: '20%' }}
            >
              <div
                className=""
                style={{ display: 'flex', flexDirection: 'row ' }}
              ></div>
              <div className="add-v-form-section  pt-43  w100 add-edit-user-card">
                <SidePanel title={`Inspection Information`} />

                <div className="group-type-1">
                  <Label>
                    Title{' '}
                    <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                  </Label>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <FormikColorField
                      label="Title"
                      name="titleColor"
                      // isRequired
                    />
                    <div
                      style={{
                        marginLeft: '0px',
                        width: '100%',
                        paddingLeft: '10px', // Optional: Add some padding if you want a small space between the fields
                      }}
                    >
                      <FormikTextField
                        placeholder="Enter inspection form title"
                        name="title"
                        onChange={(e) =>
                          validateAlphabetsfortitle(e, setFieldValue, 'title')
                        }
                      />
                    </div>
                  </div>
                  <div className="add-inspection-helpertext add-insp-mt9-mb-9">
                    Choose a color as a visual indicator for inspection title
                  </div>
                </div>

                <div className="group-type-1">
                  <div className="to-input-field">
                    <Label
                      className="to-label c-black"
                      htmlFor="transmissionGears"
                    >
                      Description
                    </Label>
                    <Textarea
                      className="to-label c-black"
                      as="textarea"
                      id="description"
                      name="description"
                      rows={5}
                      placeholder="Enter description"
                      value={values.description}
                      onChange={(e) =>
                        setFieldValue('description', e.target.value)
                      }
                      style={{
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        padding: '8px',
                        width: '100%',
                        height: '100px',
                        transition: 'border-color 0.2s ease-in-out',
                        outline: 'none',
                        resize: 'none',
                      }}
                    />
                  </div>
                </div>
                <div className="group-type-1 mt-5">
                  <CustomSelect
                    useFormik={true}
                    name="template"
                    label="Copy from Template"
                    defaultValue={values?.template}
                    selectProps={{
                      placeholder: 'Select',
                      isClearable: true,
                      options: templateValues,
                      // onchange:handleTemplateChange
                      onChange: (selectedOption) => {
                        setFieldValue('template', selectedOption);
                        handleTemplateChange(selectedOption, setFieldValue); // Pass setFieldValue here
                      },
                    }}
                  />
                </div>
                <div className="add-inspection-helpertext add-insp-mt9-mb-9">
                  Use a pre-loaded vehicle checklist as a starting point
                  (Optional)
                </div>
                <div className="add-v-form-section">
                  <div className="aeu-flex-js">
                    <Checkbox
                      id="enableLocationExceptionTracking"
                      name="enableLocationExceptionTracking"
                      checked={values.enableLocationExceptionTracking}
                      onCheckedChange={(checked) =>
                        setFieldValue(
                          'enableLocationExceptionTracking',
                          checked
                        )
                      }
                      className="w-5 h-5"
                    />
                    <label
                      htmlFor="enableLocationExceptionTracking"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Enable Location Exception Tracking
                    </label>
                  </div>
                </div>

                <div className="add-v-form-section">
                  <div className="aeu-flex-js">
                    <Checkbox
                      id="allowStoredPhotos"
                      name="allowStoredPhotos"
                      checked={values.allowStoredPhotos}
                      onCheckedChange={(checked) =>
                        setFieldValue('allowStoredPhotos', checked)
                      }
                      className="w-5 h-5"
                    />
                    <div className="mt-3">
                      <label
                        htmlFor="allowStoredPhotos"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Prevent Use of Stored Photos
                      </label>
                      <br />
                      <label className="text-sm text-gray-500 leading-none">
                        Users will only be able to attach photos by taking them
                        with the device's built-in camera.
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddInspection;
