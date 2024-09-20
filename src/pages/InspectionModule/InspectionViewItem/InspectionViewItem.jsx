import React, { useContext, useEffect, useState } from 'react';
import { useFormik, FieldArray, Formik } from 'formik';
import {
  ButtonContainer,
  Heading,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
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
import './InspectionViewItem.css';
import { Checkbox } from '@/components/ui/checkbox';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import { CustomSelectById } from '@/components/common/CustomSelect';
import { generateRandomString } from '@/lib/utils';


const InspectionViewItem = ({ dataItem, onCategoryDataFetched }) => {
  const [initialValues, setInitialValues] = useState({ components: [] });
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const data = dataItem;
  const [categoryData, setCategoryData] = useState();

  useEffect(() => {
    if (dataItem && dataItem.components) {
      const categories = dataItem.components.map((component) => ({
        id: component.category._id,
        title: component.category.name.english, // Adjust this based on your needs
      }));
      onCategoryDataFetched(categories);
    }
  }, [dataItem, onCategoryDataFetched]);

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
      // if (id) {
      getInspectionData();
    }
  }, [data]);

  // const getInspectionData = () => {
  //   InspectionsService.getinspectionById(
  //     data.id,
  //     { populate: 'false' },
  //     handleGetInspectionSuccess
  //   );
  // };
  const getInspectionData = () => {
    // Simulate a delay before loading the data
    setTimeout(() => {
      InspectionsService.getinspectionById(
        data.id,
        { populate: 'false' },
        handleGetInspectionSuccess
      );
    }, 1500); // Delay of 2000ms (2 seconds)
  };

  const handleGetInspectionSuccess = ({ data }) => {
    const formattedData = {
      components: data.data.components.map((component) => ({
        ...component,
        category: component.category._id, // Ensure this is the ID or a key that maps correctly
        subCategory: component?.subCategory?._id ?? null, // Same for subCategory
        choices: component.choices || [{ title: '', issueCreated: false }],
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
    setSubmitting(false);
  };

  const handleUpdateInspectionSuccess = () => {
    toast.success('Inspection updated successfully');
  };

  const getOptionLabelById = (id) => {
    const option = categoryData?.find((option) => option._id === id);
    return option ? option.name.english : '';
  };

  // Log the category values
  useEffect(() => {
    if (initialValues.components.length > 0) {
      const categories = initialValues.components.map(
        (component) => component.category
      );
      console.log('Categories:', categories);
    }
  }, [initialValues]);
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Inspection Items');
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
      validationSchema={InspectionsValidationSchemaFormBuilder}
      onSubmit={handleSubmit}
    >
      {({ values, isSubmitting, handleSubmit: formikSubmit }) => (
        <form style={{ width: '100%' }}>
          <FieldArray
            style={{ width: '100%' }}
            name="components"
            render={(arrayHelpers) => (
              <>
                <div className="add-v-main-container">
                  <div className="add-v-form-container">
                    <div className="IVI-bottom-section2">
                      <div className="aifbc-flex">
                        <div className="IVI-flex-er">
                          <div className="top-upper-section d-h-between">
                            <div className="IVI-font-20-600">
                              Inspection Detail
                            </div>
                            <ButtonContainer>
                              <Button
                                type={BUTTON_TYPES.PRIMARY}
                                onClick={() =>
                                  navigate(
                                    ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                                    { state: dataItem }
                                  )
                                }
                              >
                                {editIconPencil({ width: 30, height: 20 })} Edit
                              </Button>
                            </ButtonContainer>
                          </div>

                          {values.components.map((component, index) => (
                            <div
                              className="aifbc-box1-without-border"
                              key={index}
                            >
                              <div
                                type="multiple"
                                collapsible
                                className="text-details-one pl-3 pr-3"
                                style={{ border: '1px solid #e0e0e0' }}
                              >
                                <div value={`item-${index}`}>
                                  <div>
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
                                        {/* {arrowTraingleIcon({
                                          width: 30,
                                          height: 20,
                                        })} */}
                                        {getOptionLabelById(
                                          values?.components[index]?.category
                                        )}
                                        {/* <span
                                          className=""
                                          onClick={() =>
                                            navigate(
                                              ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                                              { state: dataItem }
                                            )
                                          }
                                        >
                                          {getOptionLabelById(
                                            values?.components[index]?.category
                                          )
                                            ? editIconPencil({
                                                width: 30,
                                                height: 20,
                                              })
                                            : ''}
                                        </span> */}
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
                                          <span className="aifbc-txt-8-400-002850 ">
                                            Pass / Fail
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
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
                                                placeholder: 'Select Category',
                                                isClearable: true,
                                                isRequired: true,
                                                isDisabled:true
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
                                                isDisabled:true
                                              }}
                                            />
                                          </div>
                                        </div>
                                        <div
                                          style={{ width: '100%' }}
                                          className="mt-3"
                                        >
                                          <FormikTextField
                                            isDisabled={true}
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
                                            isDisabled={true}
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
                                          <FieldArray
                                            name={`components[${index}].choices`}
                                            render={(choiceHelpers) => (
                                              <div>
                                                <label
                                                  htmlFor="default-checkbox"
                                                  className="text-sm font-medium text-gray-900 dark:text-gray-300 mt-1"
                                                >
                                                  Choices{' '}
                                                </label>
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
                                                      <FormikTextField
                                                        placeholder="Issue to create description"
                                                        name={`components[${index}].choices[${choiceIndex}].title`}
                                                        key={`components[${index}].choices[${choiceIndex}].title`}
                                                        style={{
                                                          width: '100%',
                                                        }}
                                                        isDisabled={true}
                                                      />
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
                                                          ].choices[choiceIndex]
                                                            .issueCreated
                                                        }
                                                        className="w-6 h-6 mt-1"
                                                        isDisabled={true}
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
                                                          ].choices[choiceIndex]
                                                            .comment
                                                        }
                                                        key={`components[${index}].choices[${choiceIndex}].comment`}
                                                        className="w-6 h-6 mt-1"
                                                        isDisabled={true}
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
                                                          ].choices[choiceIndex]
                                                            .photo
                                                        }
                                                        key={`components[${index}].choices[${choiceIndex}].photo`}
                                                        className="w-6 h-6 mt-1"
                                                        isDisabled={true}
                                                      />
                                                    </div>
                                                  )
                                                )}
                                              </div>
                                            )}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
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

export default InspectionViewItem;
