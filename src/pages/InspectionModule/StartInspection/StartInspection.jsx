import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  uploadIcon,
  imageThumbnail,
  pdfThumbnail,
  spearker,
  spearkerWorking,
  microphone,
  settingFillIcon,
} from '@/assets/Icons';
import * as Yup from 'yup';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDocumentUploder from '@/components/inputs/formik/FormikDocumentUploader/FormikDocumentUploader';

import { Button } from '@/components/ui/button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import FormikDropdown from '@/components/inputs/formik/FormikDropdown/FormikDropdown';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import FormikTextArea from '@/components/inputs/formik/FormikTextArea';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import { ROUTES } from '@/constants/route.constant';
import { getApi, postApi, patchApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import useStore from '@/store/userStore';
import { toast } from 'react-toastify';
import { items } from '@/utils/common.helper';
import './StarInspection.css';
import { Label } from 'recharts';
const validationSchema = Yup.object({
  vehicle: Yup.string().required('Please select a Vehicle'), // This enforces the validation
  // Add other fields and their validations here
});
import apiService from '@/lib/apiService';
import {
  CustomSelect,
  CustomSelectById,
} from '@/components/common/CustomSelect/index';
const StartInspection = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdd = searchParams.get('add') === 'true';
  const notAdd = searchParams.get('add') === 'false';

  const [initialValues, setInitialValues] = useState({
    vehicle: '',
    components: [],
  });

  const [data, setData] = useState(initialValues);
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useStore();
  const [showVehicle, setShowVehicleFields] = useState(true);
  // const [selectedRadio, setSelectedRadio] = useState();
  const [selectedRadio, setSelectedRadio] = useState({});

  const [showOptions, setShowOptions] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);

  const [commentVisibility, setCommentVisibility] = useState({});
  const [photoVisibility, setPhotoVisibility] = useState({});
  const [busNumbers, setBusNumbers] = useState([]);
  const [assets, setAssets] = useState([]);
  const [options, setOptions] = useState([]);

  const toggleCommentVisibility = (index) => {
    setCommentVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const togglePhotoVisibility = (index) => {
    setPhotoVisibility((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Function to handle radio button change
  const handleRadioChange = (componentId, choiceId) => {
    setSelectedRadio((prevState) => ({
      ...prevState,
      [componentId]: choiceId,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        if (id) {
          if (isAdd) {
            // In "add mode"
            console.log('Add mode active');
            const response = await getApi(APIS.GET_ALL_Inspections, id);
            setData(response.data);
          } else if (notAdd) {
            // Not in "add mode"
            console.log('Edit mode active');
            const res = await getApi(APIS.START_INSPECTION, id);
            const editData = res?.data;
            const formId = editData.inspectionFormId;

            console.log('edit', editData.inspectionFormId);
            if (formId) {
              const response_1 = await getApi(APIS.GET_ALL_Inspections, formId);
              const allInspectionsData = response_1.data;

              const mappedComponents = allInspectionsData.components.map(
                (component) => {
                  const matchingComponent = editData.components.find(
                    (c) => c.id === component.id
                  );
                  return {
                    ...component,
                    selectedChoiceId: matchingComponent
                      ? matchingComponent.choiceId
                      : '',
                    comment: matchingComponent ? matchingComponent.comment : '',
                    photo: matchingComponent ? matchingComponent.photo : [],
                  };
                }
              );
              setData((prevData) => ({
                ...prevData,
                components: mappedComponents || [],
                vehicle: editData?.vehicle || '', // Set vehicle value
              }));
              setShowAdditionalFields(Boolean(editData?.vehicle));

              // Pre-fill Formik values
              setFieldValue('vehicle', editData?.vehicle || '');
              editData.components.forEach((component) => {
                setFieldValue(
                  `components[${component.id}].selectedChoiceId`,
                  component.choiceId
                );
                setFieldValue(
                  `components[${component.id}].comment`,
                  component.comment
                );
                setFieldValue(
                  `components[${component.id}].photo`,
                  component.photo
                );
              });
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isAdd, notAdd]);

  const handleDropdownChange = (selectedOption, setFieldValue) => {
    // Extract value from selectedOption
    const value = selectedOption ? selectedOption.value : '';
    setFieldValue('vehicle', value);

    if (value) {
      setShowAdditionalFields(true);
      setShowVehicleFields(true);
    } else {
      setShowAdditionalFields(false);
      setShowVehicleFields(false);
    }
  };

  const fetchAssets = async (searchTerm, page) => {
    try {
      const limit = 15;
      const vehicleRes = await apiService.get(
        'v2/vehicle/all-vehicle-numbers',
        {
          params: {
            search: searchTerm || null,
            page: page || 0,
            limit,
          },
        }
      );

      const vehicleData = (vehicleRes?.data?.vehicles || []).map((data) => ({
        label: data.label,
        value: data.value,
      }));

      setAssets(vehicleData);
      return {
        results: vehicleData,
        nextPage: vehicleData.length > limit,
      };
    } catch (error) {
      console.error('Error fetching assets:', error);
      return {
        results: [],
        nextPage: false,
      };
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      let createdInspectionId; // Declare the variable at the top

      // Fetch component data before processing
      const componentDataResponse = await getApi(APIS.GET_ALL_Inspections, id);
      const componentDataList = componentDataResponse.data.components || [];

      // Process components and await async operations
      const components = await Promise.all(
        values.components.map(async (component) => {
          const selectedChoiceId = selectedRadio[component.id] || '';

          const payloadComponent = {
            choiceId: selectedChoiceId,
            comment: component.comment || '',
            photo:
              component.photo && component.photo.length > 0
                ? component.photo
                : [], // Ensure photo is an array or an empty array
            _id: component._id || '',
            categoryId: component.category?._id || '',
            subCategoryId: component.subCategory?._id || '',
          };

          if (component.categoryId) {
            payloadComponent.categoryId = component.categoryId;
          }

          if (component.subCategoryId) {
            payloadComponent.subCategoryId = component.subCategoryId;
          }

          // Find the corresponding choice object
          const componentData = componentDataList.find(
            (comp) => comp._id === component._id
          );
          const choice = componentData?.choices.find(
            (c) => c._id === selectedChoiceId
          );

          // Validate the photo and comment fields
          if (choice) {
            if (choice.photo && !payloadComponent.photo.length) {
              toast.error('Photo is required for the selected choice.');
              throw new Error('Photo is required for the selected choice.');
            }

            if (choice.comment && !payloadComponent.comment) {
              toast.error('Comment is required for the selected choice.');
              throw new Error('Comment is required for the selected choice.');
            }

            if (choice.issueCreated) {
              const issueInspection = {
                asset: values.vehicle || undefined,
                issueCategoryId: payloadComponent.categoryId,
                issueSubCategoryId: payloadComponent.subCategoryId,
                inspectionId: createdInspectionId,
              };

              await postApi(`${APIS.START_INSPECTION}/issues`, issueInspection);
            }
          }

          return payloadComponent;
        })
      );

      const payload = {
        vehicle: values.vehicle || undefined,
        userId: user._id || undefined, // Assuming you're getting user ID from the store
        components,
      };

      // let createdInspectionId;

      // Add or Edit mode based on the presence of `id` and `isAdd` or `notAdd`
      if (id && notAdd) {
        // In "edit mode", use PATCH API
        await patchApi(APIS.START_INSPECTION, id, payload);
        toast.success('Data updated successfully');
        navigate(-1);
      } else if (isAdd) {
        payload.inspectionFormId = id;
        // In "add mode", use POST API
        const response = await postApi(APIS.START_INSPECTION, payload);
        createdInspectionId = response.data.id; // Capture the created inspection ID
        toast.success('Data saved successfully');

        // Create issues using the created inspection ID
        await Promise.all(
          components.map(async (component) => {
            const selectedChoiceId = selectedRadio[component._id] || '';
            const componentData = componentDataList.find(
              (comp) => comp._id === component._id
            );
            const choice = componentData?.choices.find(
              (c) => c._id === selectedChoiceId
            );

            if (choice && choice.issueCreated) {
              const issueInspection = {
                asset: values.vehicle || undefined,
                issueCategoryId: component.categoryId,
                issueSubCategoryId: component.subCategoryId,
                inspectionId: createdInspectionId,
                
              };

              await postApi(`${APIS.START_INSPECTION}/issues`, issueInspection);
            }
          })
        );

        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
        } else {
          navigate(-1);
        }
      }
    } catch (error) {
      // toast.error('An error occurred while saving the data');
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        handleSubmit: formikSubmit,
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
                      backNavi={() => navigate(INSPECTIONS_FORMS_LIST)}
                      breadCrumbs={[
                        {
                          name: 'Inspection List',
                          path: ROUTES.INSPECTIONS_FORMS_LIST,
                        },
                        {
                          name: data.title || '---', // Display the title if available
                          path: ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                        },
                      ]}
                    />

                    <Heading>New Vehicle Inspection</Heading>
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
                      onClick={formikSubmit}
                      {...(isSubmitting && !values?.saveAndNew
                        ? { loading: true }
                        : {})}
                    >
                      {id ? 'Save' : 'Save'}
                    </Button>
                  </ButtonContainer>
                </Header>

                <div
                  className="add-v-form"
                  style={{ padding: '20px', justifyContent: 'center' }}
                >
                  <div className="width90">
                    <div
                      className="bg-white shadow-md rounded-lg p-7 add-v-form-section w100 pt-43"
                      style={{
                        borderRadius: '8px',

                        width: '100%',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        marginBottom: '18px',
                      }}
                    >
                      <SidePanel title={``} />
                      <span className="text-blue-900 font-semibold mb-4 ">
                        Inspection Details
                      </span>

                      <div className="w-100 flex-1">
                        <Label htmlFor={'vehicle'}>Vehicle</Label>

                        <CustomSelect
                          label="Vehicle Number"
                          defaultValue={
                            values.vehicle
                              ? { label: values.vehicle, value: values.vehicle }
                              : null
                          }
                          name="vehicle"
                          fetchData={fetchAssets}
                          onChange={(selectedOption) =>
                            handleDropdownChange(selectedOption, setFieldValue)
                          }
                          // useFormik={true}
                          selectProps={{
                            placeholder: 'Select',
                            isClearable: true,
                            isRequired: true,
                          }}
                        />
                      </div>
                    </div>

                    {showAdditionalFields &&
                      (data?.components || []).map((component, index) => (
                        <div
                          key={component.id || index}
                          className="add-v-form-section w100 pt-43 add-edit-user-card"
                        >
                          <div className="p-4 rounded-lg text-[14px]">
                            <div className="flex items-center mb-4">
                              <div className="flex-1 text-blue-900 font-semibold mr-4">
                                {component.category?.name?.english ||
                                  'Unknown Category'}{' '}
                                {component.subCategory?.name?.english &&
                                  `(${component.subCategory.name.english})`}
                              </div>

                              <div className="flex flex-1">
                                {(component.choices || []).map(
                                  (choice, choiceIndex) => (
                                    <div
                                      key={choice.id || choiceIndex}
                                      className="flex w-[170px] justify-between"
                                    >
                                      <label
                                        htmlFor={`radio-${component.id}-${choice.id}`}
                                        className="flex items-center cursor-pointer"
                                      >
                                        <input
                                          type="radio"
                                          id={`radio-${component.id}-${choice.id}`}
                                          name={`radioGroup-${component.id}`}
                                          checked={
                                            (selectedRadio[component.id] ||
                                              null) === choice.id
                                          }
                                          className="mr-2"
                                          onChange={() =>
                                            handleRadioChange(
                                              component.id,
                                              choice.id
                                            )
                                          }
                                        />
                                        <span>{choice.title}</span>
                                      </label>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>

                            <div className="flex justify-between text-[14px]">
                              <div></div>
                              <DropdownMenu>
                                <DropdownMenuTrigger>
                                  <div className="cursor-pointer text-blue-900 my-1 border-none">
                                    + Add Remark
                                  </div>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  <DropdownMenuItem
                                    onClick={() =>
                                      toggleCommentVisibility(index)
                                    }
                                  >
                                    <span>Add Comment</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => togglePhotoVisibility(index)}
                                  >
                                    <span>Add Photo</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>

                            {commentVisibility[index] && (
                              <div className="flex justify-end">
                                <div className="w-[434px] mb-2">
                                  <FormikTextArea
                                    label="Comment"
                                    style={{
                                      border: '1px solid #ccc',
                                      borderRadius: '4px',
                                      padding: '8px',
                                      width: '100%',
                                      height: '100px',
                                      transition:
                                        'border-color 0.2s ease-in-out',
                                      outline: 'none',
                                      resize: 'none',
                                    }}
                                    name={`components[${index}].comment`} // Adjusted name
                                  />
                                </div>
                              </div>
                            )}

                            {photoVisibility[index] && (
                              <div className="flex justify-end">
                                <div className="image-uploder-block w-[434px] mb-2">
                                  <FormikDocumentUploder
                                    name={`components[${index}].photo`} // Adjusted name
                                    id={`photo-${index}`} // Unique ID
                                    title="Add Photo"
                                    message="or drag & drop image files here"
                                    btnText="BROWSE FILE"
                                    bottomMessage="Supported File Format: jpeg, png & pdf (upto 1 MB)"
                                    accept="image/*,application/pdf"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
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

export default StartInspection;
