import React, { useEffect, useState, useContext } from 'react';
import { useFormik, FieldArray, Formik } from 'formik';
import {
  ButtonContainer,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AddInspectionFormBuilderCreateForm.css';
import { ROUTES } from '@/constants/route.constant';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import {
  arrowTraingleIcon,
  copyIcon,
  crossIcon,
  deleteIcon,
  editIconPencil,
  passFailIcon,
} from '@/assets/Icons';
import AddInspectionFormImg from '../../../assets/images/AddInspection.svg';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import { InspectionsValidationSchemaFormBuilder } from '@/Validations/InspectionsValidationSchemaFormBuilder';
import { InspectionsService } from '@/services/InspectionsService';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { CheckBox, Photo } from '@mui/icons-material';
import { Checkbox } from '@/components/ui/checkbox';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { Label } from 'recharts';
import { generateRandomString } from '@/lib/utils';
import { CustomSelectById } from '@/components/common/CustomSelect';
import { TrashIcon } from 'lucide-react';

const AddInspectionFormBuilderCreateForm = () => {
  // const [initialValues, setInitialValues] = useState({ components: [] });
  const [initialValues, setInitialValues] = useState({
    components: [
      {
        // description: '',
        choices: [
          {
            title: '',
            issueCreated: true,
            comment: true,
            photo: true,
          },
          {
            title: '',
            issueCreated: true,
            comment: true,
            photo: true,
          },
        ],
      },
      // You can add more components if needed
    ],
  });
  
  const [templateValues, setTemplateValues] = useState([]); // Define and initialize this
  const [subCategoryOptions, setSubCategoryOptions] = useState([]); // Define and initialize this

  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const data = location.state;
  const [categoryData, setCategoryData] = useState();
  const [editingIndex, setEditingIndex] = useState(null); // Track which form is being edited
  const [expandedIndex, setExpandedIndex] = useState([]); // Track which accordion is expanded

  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Add Inspection Items');
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      getApi(APIS.ISSUE_CATEGORY, id).then((res) => {
        setCategoryData(res.data.list);
      });
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data && data.id) {
      getInspectionData();
    }
  }, [data]);
  const getInspectionData = () => {
    InspectionsService.getinspectionById(
      data.id,
      { populate: 'false' },
      handleGetInspectionSuccess
    );
  };

  const handleGetInspectionSuccess = ({ data }) => {
    const formattedData = {
      components: data.data.components.map((component) => ({
        ...component,
        category: component.category._id,
        subCategory: component?.subCategory?._id ?? null, // Ensure this is the ID or a key that maps correctly
        // choices: component.choices || [
        //   { title: '', issueCreated: true, comment: true, photo: true },
        // ],
        choices: component.choices && component.choices.length > 0
        ? component.choices
        : [
            { title: '', issueCreated: true, comment: true, photo: true },
            { title: '', issueCreated: true, comment: true, photo: true },
          ],
      })),
    };
    setInitialValues(formattedData);
  };

  const handleSubmit = (values, { setSubmitting }) => {
    InspectionsService.updateinspectionById(
      data.id,
      values,
      handleUpdateInspectionSuccess
    );
    const dataToSend = { id: data.id, title: data.title };
    navigate(ROUTES.INSPECTIONS_WORKSHOP, { state: dataToSend });
    // window.location.reload();
    setSubmitting(false);
  };

  const handleUpdateInspectionSuccess = () => {
    toast.success('Inspection items added successfully');
  };

  const getOptionLabelById = (id) => {
    const option = categoryData?.find((option) => option._id === id);
    return option ? option.name.english : '';
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      // validationSchema={InspectionsValidationSchemaFormBuilder}
      onSubmit={handleSubmit}
    >
      {({
        values,
        isSubmitting,
        handleSubmit: formikSubmit,
        setFieldValue,
      }) => (
        <form style={{ width: '100%' }}>
          <FieldArray
            style={{ width: '100%' }}
            name="components"
            render={(arrayHelpers) => (
              <>
                <div className="add-v-main-container">
                  <div className="add-v-form-container">
                    <div className="add-v-form-top-section">
                      <div className="top-upper-section d-h-between">
                        <div style={{ marginBottom: '23px' }}>
                          {/* <BreadCrumbs
                            backNavi={() =>
                              navigate(ROUTES.INSPECTIONS_FORMS_LIST)
                            }
                            breadCrumbs={[
                              {
                                name: 'Inspection Form List',
                                path: ROUTES.INSPECTIONS_FORMS_LIST,
                              },
                            ]}
                            boldItem="Add Inspection Items"
                          /> */}
                          <BreadCrumbs
                            backNavi={() =>
                              navigate(ROUTES.INSPECTIONS_FORMS_LIST)
                            }
                            breadCrumbs={[
                              {
                                name: 'Inspection List',
                                path: ROUTES.INSPECTIONS_FORMS_LIST,
                              },
                              {
                                name: 'View Inspection Item',
                                path: ROUTES.INSPECTIONS_FORMS_LIST,
                              },
                            ]}
                          />
                          <Heading>
                            {id ? 'Edit' : 'Add'} Inspection Items -{' '}
                            {data?.title}
                          </Heading>
                        </div>
                        <ButtonContainer>
                          <Button
                            type={BUTTON_TYPES.SECONDARY}
                            onClick={() =>
                              navigate(ROUTES.INSPECTIONS_WORKSHOP, {
                                state: { id: data.id, title: data.title },
                              })
                            }
                            disabled={isSubmitting}
                          >
                            Cancel
                          </Button>
                          <Button
                            type={BUTTON_TYPES.PRIMARY}
                            onClick={() => formikSubmit()}
                          >
                            Save
                          </Button>
                        </ButtonContainer>
                      </div>
                    </div>

                    <div className="add-v-form-bottom-section ">
                      <div className="aifbc-flex">
                        <div className="aifbc-flex-er">
                          {values.components.length === 0 ? (
                            <div className="aifc-flex-jc-c-6">
                              <img
                                src={AddInspectionFormImg}
                                height={235}
                                width={240}
                              />
                              <div className="aifc-txt-16-400-939393 aifc-width-430">
                                Start building your inspection form by selecting
                                items from the panel on the right.
                              </div>
                            </div>
                          ) : (
                            values.components.map((component, index) => (
                              <div
                                className="aifbc-box1-without-border"
                                key={index}
                              >
                                {/* <Accordion
                                  type="multiple"
                                  collapsible
                                  className="text-details-one pl-3 pr-3"
                                  style={{ border: '1px solid #e0e0e0' }}
                                  defaultValue={`item-${expandedIndex}`} // Automatically expand the new form
                                > */}
                                <Accordion
                                  type="multiple"
                                  collapsible
                                  value={expandedIndex}
                                  onValueChange={(newValues) =>
                                    setExpandedIndex(newValues)
                                  } // Ensure this gets an array
                                >
                                  <AccordionItem value={`item-${index}`}>
                                    <AccordionTrigger>
                                      <div
                                        className="aifbc-flex-9"
                                        style={{
                                          width: '98%',
                                          marginRight: '8px',
                                        }}
                                      >
                                        <div
                                          className="aifbc-ml-24-mt-5"
                                          style={{
                                            display: 'flex',
                                            flexDirection: 'row',
                                            alignItems: 'center',
                                            gap: '10px',
                                          }}
                                        >
                                          {arrowTraingleIcon({
                                            width: 30,
                                            height: 20,
                                          })}
                                          {getOptionLabelById(
                                            values?.components[index]?.category
                                          )}
                                        </div>
                                        <div className="aifbc-flex-5 aifbc-jc-r mt-5">
                                          <div
                                            className="aifbc-date-time-cal aifbc-flex-5 aifc-onSelect"
                                            style={{ paddingLeft: '10px' }}
                                          >
                                            <span>
                                              {passFailIcon({
                                                width: 10,
                                                height: 9,
                                              })}
                                            </span>
                                            <span className="aifbc-txt-8-400-002850">
                                              Pass / Fail
                                            </span>
                                          </div>
                                          {/* <div className="aifc-onSelect">
                                            {copyIcon({
                                              width: 30,
                                              height: 20,
                                            })}
                                          </div> */}
                                          <div
                                            onClick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                            className="aifc-onSelect"
                                          >
                                            {crossIcon({
                                              width: 30,
                                              height: 20,
                                            })}
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="aifbc-box1-without-border aifbc-flex4-pl5-pr-5g12">
                                        <div className="group-type-1 ">
                                          <div
                                            style={{
                                              display: 'flex',
                                              flexDirection: 'row',
                                              gap: '10px',
                                            }}
                                          >
                                            <div
                                              style={{ width: '100%' }}
                                              className="mt-3"
                                            >
                                              <CustomSelectById
                                                label="Category"
                                                id="issueCategory"
                                                useFormik={true}
                                                key={`components[${index}].category`}
                                                name={`components[${index}].category`}
                                                refetch={
                                                  values.components[index]
                                                    ?.category &&
                                                  generateRandomString()
                                                }
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `components[${index}].category`,
                                                    e.value
                                                  );
                                                  setFieldValue(
                                                    `components[${index}].subCategory`,
                                                    ''
                                                  );
                                                }}
                                                defaultValue={
                                                  values.components[index]
                                                    ?.category
                                                }
                                                selectProps={{
                                                  placeholder:
                                                    'Select Category',
                                                  isClearable: true,
                                                  isRequired: true,
                                                }}
                                              />
                                            </div>
                                            <div
                                              style={{ width: '100%' }}
                                              className="mt-3"
                                            >
                                              <CustomSelectById
                                                label="Sub Category"
                                                id="issueSubCategory"
                                                isMulti={false}
                                                useFormik={true}
                                                key={`components[${index}].subCategory`} // Align key with FormikAsyncDropdown
                                                name={`components[${index}].subCategory`} // Match the name to Formik structure
                                                refetch={
                                                  values.components[index]
                                                    ?.subCategory &&
                                                  generateRandomString()
                                                }
                                                onChange={(e) => {
                                                  setFieldValue(
                                                    `components[${index}].subCategory`,
                                                    e.value
                                                  );
                                                }}
                                                defaultValue={
                                                  values.components[index]
                                                    ?.subCategory
                                                } // Set Formik defaultValue
                                                filters={{
                                                  issueCategoryId:
                                                    values?.components[index]
                                                      ?.category,
                                                }}
                                                selectProps={{
                                                  placeholder:
                                                    'Select Sub Category',
                                                  isClearable: true,
                                                  // isRequired: true,
                                                  isDisabled:
                                                    !values?.components[index]
                                                      ?.category,
                                                }}
                                              />
                                            </div>
                                          </div>
                                          <div
                                            style={{ width: '100%' }}
                                            className="mt-3"
                                          >
                                            <FormikTextField
                                              label="Component"
                                              placeholder="Enter inspection form component"
                                              name={`components[${index}].component`}
                                              key={`components[${index}].component`}
                                              style={{ width: '100%' }}
                                            />
                                          </div>
                                          <div
                                            style={{ width: '100%' }}
                                            className="mt-3"
                                          >
                                            <FormikTextField
                                              label="Description"
                                              placeholder="Enter description"
                                              name={`components[${index}].description`}
                                              key={`components[${index}].description`}
                                              style={{ width: '100%' }}
                                            />
                                          </div>
                                          <div
                                            style={{ width: '100%' }}
                                            className="mt-3"
                                          >
                                            <label
                                              className="to-label c-black"
                                              htmlFor="transmissionGears"
                                            >
                                              Choices
                                            </label>
                                            {/* <Label
                                              className="to-label c-black"
                                              htmlFor="transmissionGears"
                                            >
                                              Choices
                                            </Label> */}
                                            <FieldArray
                                              name={`components[${index}].choices`}
                                              render={(choiceHelpers) => (
                                                <div>
                                                  {component.choices.map(
                                                    (choice, choiceIndex) => (
                                                      <div
                                                        key={choiceIndex}
                                                        className="choice-container"
                                                        style={{
                                                          display: 'flex',
                                                          flexDirection: 'row',
                                                          gap: '10px',
                                                          marginBottom: '10px',
                                                          width: '100%',
                                                        }}
                                                      >
                                                        <div className="w-[700px]">
                                                          <FormikTextField
                                                            placeholder="Issue to create description"
                                                            name={`components[${index}].choices[${choiceIndex}].title`}
                                                            key={`components[${index}].choices[${choiceIndex}].title`}
                                                            style={{
                                                              width: '100%',
                                                            }}
                                                          />
                                                        </div>
                                                        <label
                                                          htmlFor="default-checkbox"
                                                          className="text-sm font-medium text-gray-900 dark:text-gray-300 mt-1"
                                                        >
                                                          Issue Created{' '}
                                                        </label>
                                                        <Checkbox
                                                          id={`components[${index}].choices[${choiceIndex}].issueCreated`}
                                                          name={`components[${index}].choices[${choiceIndex}].issueCreated`}
                                                          checked={
                                                            values.components[
                                                              index
                                                            ].choices[
                                                              choiceIndex
                                                            ].issueCreated
                                                          }
                                                          onCheckedChange={(
                                                            checked
                                                          ) =>
                                                            setFieldValue(
                                                              `components[${index}].choices[${choiceIndex}].issueCreated`,
                                                              checked
                                                            )
                                                          }
                                                          className="w-6 h-6 mt-1"
                                                        />
                                                        <label
                                                          htmlFor="default-checkbox"
                                                          className="text-sm font-medium text-gray-900 dark:text-gray-300 mt-1"
                                                        >
                                                          Comment{' '}
                                                        </label>
                                                        <Checkbox
                                                          id={`components[${index}].choices[${choiceIndex}].comment`}
                                                          name={`components[${index}].choices[${choiceIndex}].comment`}
                                                          checked={
                                                            values.components[
                                                              index
                                                            ].choices[
                                                              choiceIndex
                                                            ].comment
                                                          }
                                                          onCheckedChange={(
                                                            checked
                                                          ) =>
                                                            setFieldValue(
                                                              `components[${index}].choices[${choiceIndex}].comment`,
                                                              checked
                                                            )
                                                          }
                                                          key={`components[${index}].choices[${choiceIndex}].comment`}
                                                          className="w-6 h-6 mt-1"
                                                        />
                                                        <label
                                                          htmlFor="default-checkbox"
                                                          className="text-sm font-medium text-gray-900 dark:text-gray-300 mt-1"
                                                        >
                                                          Photo{' '}
                                                        </label>
                                                        <Checkbox
                                                          id={`components[${index}].choices[${choiceIndex}].photo`}
                                                          name={`components[${index}].choices[${choiceIndex}].photo`}
                                                          checked={
                                                            values.components[
                                                              index
                                                            ].choices[
                                                              choiceIndex
                                                            ].photo
                                                          }
                                                          onCheckedChange={(
                                                            checked
                                                          ) =>
                                                            setFieldValue(
                                                              `components[${index}].choices[${choiceIndex}].photo`,
                                                              checked
                                                            )
                                                          }
                                                          key={`components[${index}].choices[${choiceIndex}].photo`}
                                                          className="w-6 h-6 mt-1"
                                                        />

                                                        <div
                                                          style={{
                                                            display: 'flex',
                                                            alignItems:
                                                              'center',
                                                          }}
                                                        >
                                                          <button
                                                            onClick={() =>
                                                              choiceHelpers.remove(
                                                                choiceIndex
                                                              )
                                                            }
                                                            className="border rounded-md p-2"
                                                          >
                                                            <TrashIcon
                                                              style={{
                                                                width: 17,
                                                                height: 17,
                                                              }}
                                                            />
                                                          
                                                          </button>
                                                        </div>
                                                      </div>
                                                    )
                                                  )}
                                                  <div
                                                    style={{
                                                      marginTop: '12px',
                                                    }}
                                                  >
                                                    <button
                                                      className="aifbc-add-choice"
                                                      type="button"
                                                      onClick={() =>
                                                        choiceHelpers.push({
                                                          title: '',
                                                          issueCreated: true,
                                                          comment: true,
                                                          photo: true,
                                                        })
                                                      }
                                                    >
                                                      <span className="aifbc-add-choice-txt">
                                                        {' '}
                                                        + Add Choice
                                                      </span>
                                                    </button>
                                                  </div>
                                                </div>
                                              )}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                </Accordion>
                              </div>
                            ))
                          )}
                        </div>
                        <div className="aifbc-box2 aifbc-flex-col">
                          <RightSideBarOptions
                            addTodoMenu={() => {
                              arrayHelpers.push({
                                category: '',
                                subCategory: null,
                                component: '',
                                description: '',
                                choices: [
                                  {
                                    title: '',
                                    issueCreated: true,
                                    comment: true,
                                    photo: true,
                                  },
                                ],
                              });
                              // Automatically open the new form
                              // setExpandedIndex(values.components.length);
                              setExpandedIndex((prev) => [
                                ...prev,
                                `item-${values.components.length}`,
                              ]);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          />
        </form>
      )}
    </Formik>
  );
};

export default AddInspectionFormBuilderCreateForm;

const RightSideBarOptions = ({ addTodoMenu }) => {
  return (
    <div className="aifbc-right-box-fields aifbc-flex-2-row-sb">
      <div className="aifbc-flex-3-row-sb">
        <div className="mt-1">{passFailIcon({ width: 13, height: 15 })}</div>
        <div className="aifbc-r-txt-14-400-424750">Pass / Fail</div>
      </div>
      <div
        className="aifbc-r-txt-12-500-0f5cf1"
        style={{ cursor: 'pointer' }}
        onClick={
          () => addTodoMenu()
          // "radioButton",
          // <FreeTextAdd i={i} values={values} setFieldValue={setFieldValue} />
          // )
        }
      >
        +Add
      </div>
    </div>
  );
};

// export default AddInspectionFormBuilderCreateForm;
