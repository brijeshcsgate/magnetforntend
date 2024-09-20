import {
  ButtonContainer,
  Heading,
} from "@/components/AddFormLayout/AddFormLayout";
import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import Button from "@/components/common/Button/Button";
import { BUTTON_TYPES } from "@/constants/common.constant";
import { VehicleService } from "@/services/VehicleService";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormikAsyncDropdown from "@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown";
import { Checkbox } from '@/components/ui/checkbox';
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import FormikTextArea from "@/components/inputs/formik/FormikTextArea";
import { ROUTES } from "@/constants/route.constant";
import { CircleCheck, CircleX, Send } from "lucide-react";
import FormikCheckbox from "@/components/inputs/formik/FormikCheckbox";
import { Description } from "@mui/icons-material";
import { getApi, postApi, patchApi, postFileApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
import useStore from "@/store/userStore";
import { toast } from "react-toastify";
import FormikDropdown from "@/components/inputs/formik/FormikDropdown/FormikDropdown";
import { Pencil, BusFront, Mail } from 'lucide-react';
import { vehicleStatus, items } from "@/utils/common.helper";
import {
  errorTriangleIcon,
} from "@/assets/Icons";
import {
  EditPencilIcon, BusIcon, EmailIcon, IssuesIcon, UserIcon
} from "@/components/icons";

const AddWorkshop = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    selectedRadio: '',
    items: '',
    status: '',
    email: '',
    issues: '',
    vehicle: '',
    description: '',
    isEnable: true,
  });
  const [data, setData] = useState(initialValues);
  const [selectedRadio, setSelectedRadio] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedLabel, setSubmittedLabel] = useState('');
  const [submittedText, setSubmittedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedRadioIcon, setSelectedRadioIcon] = useState(null);
  const [values, setValues] = useState({ items: null });
  const [submittedItems, setSubmittedItems] = useState([]);
  const { user } = useStore();
  const radioLabelMap = {
    'If an item passes': 'If an item passes',
    'If an item fails': 'If an item fails',
    'If an item needs review': 'If an item needs review',
  };

  const dummyItems = [
    { label: 'Item 1', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
  ];

  const handleRadioChange = (e) => {
    setSelectedRadio(e.target.id);
  };

 

  const handleEditButtonClick = () => {
    setFormSubmitted(false);
    setValues({ items: submittedText });
  };

  const handlecontinueClick = (values) => {
    console.log('Form Data:', values); // Log form data to the console
    setFormSubmitted(true);
    setSubmittedLabel(radioLabelMap[selectedRadio] || '');
    setSelectedRadioIcon(renderIcon(selectedRadio));
    setSubmittedItems(values.items);
  };

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.INSPECTION_FORMS, id)
        .then((res) => {
          const editData = res?.data;
          setData((prev) => ({
            ...prev,
            items: editData?.items || '',
            status: editData?.status || '',
            email: editData?.email || '',
            issues: editData?.issues || '',
            description: editData?.description || '',
            isEnable: editData?.isEnable || true,
            vehicle: editData?.vehicle || '',
            selectedRadio: editData?.selectedRadio || '', // Include selectedRadio in payload
          
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log('Submitting Data:', values); // Log form data on submit
    const selectedRadioLabel = radioLabelMap[values.selectedRadio] || '';
    const payload = {
      items: values.items,
      status: values.status,
      email: values.email,
      issues: values.issues,
      description: values.description,
      isEnable: values.isEnable,
      vehicle: values.vehicle,
      selectedRadio: values.selectedRadio, // Include selectedRadio in payload
      selectedRadioLabel, // Include the label of the selected radio button
    };
    if (id) {
      // payload._id = id;
      patchApi(APIS.INSPECTION_FORMS, id, payload).then(() => {
        toast.success('Data updated successfully');
        navigate(-1);
      });
    } else {
      postApi(APIS.INSPECTION_FORMS, payload)
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
    console.log(values.selectedRadio)
  };

  const getVehicleData = () => {
    VehicleService.getVehicleById(
      id,
      { populate: "false" },
      handleGetVehicleSuccess
    );
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;
    setInitialValues(formattedData);
  };

  const renderIcon = (radioButtonId) => {
    switch (radioButtonId) {
      case 'If an item passes':
        return <CircleCheck className="w-[13px] h-[13px]" />;
      case 'If an item fails':
        return <CircleX className="w-[13px] h-[13px]" />;
      case 'If an item needs review':
        return <Send className="w-[13px] h-[13px]" />;
      default:
        return null;
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}

      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleSubmit: formikSubmit,
      }) => (
        
        <div className="add-v-main-container">
          <div className="add-v-form-container">
            <div className="add-v-form-top-section">
              <div className="top-upper-section d-h-between pb-8">
                <div>
                  <BreadCrumbs
                    backNavi={() => navigate("/inspection")}
                    breadCrumbs={[
                      { name: "Inspection List", path: ROUTES.INSPECTIONS_FORMS_LIST },
                      { name: "Add Inspection Form", path: ROUTES.INSPECTIONS_FORM_BUILDER_FORM },
                      { name: "Add Workflow", path: ROUTES.INSPECTIONS_WORKSHOP },
                    ]}
                  />
                  
                  <Heading>{id ? 'Edit' : 'Add'} Workflow</Heading>
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
                    loading={isSubmitting && !values?.saveAndNew}
                  >
                    {id ? 'Update' : 'Save'}
                  </Button>
                </ButtonContainer>
              </div>
            </div>

            <div className="radio-button-container" style={{ padding: '0 14%' }}>
              {!formSubmitted ? (
                <>
                  <div className="text-[16px] mt-10">
                    When do you want to trigger this workflow?
                  </div>
                  <div className=" flex mt-4 text-[14px]">
                    {Object.keys(radioLabelMap).map((radioId) => (
                      <div key={radioId} className={`radio-box w-[364px] h-[47px] border rounded-md flex-1 items-center mr-2 p-2 pt-3 ${selectedRadio === radioId ? 'bg-blue-100 border-blue-500' : ''}`}>
                        <label htmlFor={radioId} className="flex items-center w-full cursor-pointer justify-between">
                          <div>
                            <input
                              type="radio"
                              id={radioId}
                              name="selectedRadio"
                              checked={values.selectedRadio === radioId}
                              onChange={(e) => setFieldValue("selectedRadio", e.target.id)}
                              className={`mr-2 ${values.selectedRadio === radioId ? 'accent-blue-500' : ''} cursor-pointer`}
                            />
                            <span>{radioLabelMap[radioId]}</span>
                          </div>
                          {renderIcon(radioId)}


                        </label>
                      </div>
                    ))}
                  </div>

                  {(values.selectedRadio === 'If an item passes' || values.selectedRadio === 'If an item fails') && (
                    <div className="mt-4">
                      <FormikDropdown
                        key="items"
                        label="Which inspection item(s)?"
                        name="items"
                        placeholder="Select"
                        id="items"
                        options={items}
                        limit={5}
                        defaultValue={values?.items}

                      />
                    </div>
                  )}

                  <button
                    onClick={() => handlecontinueClick(values)}
                    className=" flex items-center justify-center w-[140px] mt-8 float-right py-1 rounded-md bg-white text-[#256EB5] border border-[#256EB5] hover:bg-[#256EB5] hover:text-white"
                  >
                    Continue
                  </button>
                </>
              ) : (
                <>
                  <div className="submitted-data mt-6 flex border h-[84px] px-4 rounded-md text-[13px]  justify-between">
                    <div className="mr-4 w-[200px] py-4">
                      <p>Trigger</p>
                        <p className="py-2">
                          <span className="inline-flex items-center mr-2">
                            {renderIcon(values.selectedRadio)}
                          </span>
                          { radioLabelMap[values.selectedRadio]}
                        </p>

                    </div>
                      {(values.selectedRadio === 'If an item passes' || values.selectedRadio === 'If an item fails') && (
                    <div className="py-4 w-[600px]">
                      <p>Items</p>
                        <p className="py-2">{submittedItems}</p> 
                    </div>)}
                    <div className="flex mt-2">
                      <button
                        onClick={handleEditButtonClick}
                        className="h-[26px] px-3 py-1 flex justify-between border items-center rounded-full w-[57px] bg-[#F7F7F7] text-[#A39E9E] text-[10px]"
                      >
                        <EditPencilIcon className="w-[10px] h-[10px]" /> <span className="pl-1"> Edit </span>
                      </button>
                    </div>
                  </div>
                    <div className="mt-9">
                      <div className="my-5">
                        <FormikDropdown
                          key="status"
                          label={
                            <div className="flex items-center my-2">
                              <BusIcon className="w-[16px] h-[16px] mr-2" />
                              <span>Change Vehicle Status</span>
                            </div>
                          }
                          name="status"
                          placeholder="Select"
                          id="status"
                          options={vehicleStatus}
                          limit={5}
                          defaultValue={values?.vehicleStatus}

                        />
                        

                      </div>
                      <div className="my-5">

                        <FormikTextField
                          label={
                            <div className="flex items-center my-2">
                              <EmailIcon className="w-[16px] h-[16px] mr-2" />
                              <span>Send an Email</span>
                            </div>
                          }
                          placeholder="Select"
                          name="email"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("email", value);
                          }}
                        />
                      </div>
                      <div className="my-5">
                        <FormikTextField
                          label={
                            <div className="flex items-center my-2">
                              <IssuesIcon className="w-[16px] h-[16px]" />
                              <span className="ml-2">Create an Issue</span>
                            </div>
                          }
                          placeholder="Issues"
                          name="issues"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("issues", value);
                          }}
                          isDisabled={values.selectedRadio === 'If an item passes' || values.selectedRadio === 'If an item needs review'}
                        
                        /> 
                      </div>
                      <div className="my-5">
                        <FormikTextField
                          label={
                            <div className="flex items-center my-2">
                              <UserIcon className="w-[16px] h-[16px]" />
                              <span className="ml-2">Assign User to Vehicle</span>
                            </div>
                          }
                          placeholder="Vehicle"
                          name="vehicle"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("vehicle", value);
                          }}
                          isDisabled={values.selectedRadio === 'If an item passes' || values.selectedRadio === 'If an item fails'}

                        />
                      </div>
                      <div className="mt-9">
                        <FormikTextArea
                          label="Description"
                          placeholder="Enter Description"
                          name="description"
                          onChange={(e) => {
                            let value = e.target.value;
                            setFieldValue("description", value);
                          }}
                        />
                      </div>

                      <div className="mt-3 flex items-center">
                        <FormikCheckbox
                          id="isEnable"
                          name="isEnable"
                          label="Enable Workflow" />
                       
                      </div>

                    </div>
                  </>
              )}
              <div className="h-[100px]"></div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddWorkshop;
