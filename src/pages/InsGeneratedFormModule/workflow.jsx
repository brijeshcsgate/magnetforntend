import React, { useEffect, useState } from 'react';
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

const InspectionFormGen = ({ }) => {

    const [initialValues, setInitialValues] = useState([
        {
            "category": "66a1eb330616aa3aad942dbe",
            "subCategory": "66a1ed890616aa3aad942f01",
            "component": "bus body",
            "description": "",
            "choices": [
                {
                    "title": "bus body",
                    "issueCreated": true,
                    "_id": "66c878a85ed01e6a80dc76ff",
                    "id": "66c878a85ed01e6a80dc76ff"
                }
            ]
        }]);

    useEffect(() => {
        getInspectionData();

    }, []);

    const getInspectionData = () => {
        InspectionsService.getinspectionById(
            '66c4440e3e57894029335807',
            { populate: 'false' },
            // handleGetInspectionSuccess
        );
    };


    const handleSubmit = (values, { setSubmitting }) => {
        // InspectionsService.updateinspectionById(
        //   data.id,
        //   values,
        //   handleUpdateInspectionSuccess
        // );
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
        if (initialValues?.components?.length > 0) {
            const categories = initialValues?.components?.map(component => component.category);
            console.log('Categories:', categories);
        }
    }, [initialValues]);

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
                                                            Inspection Form
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
                                                                Save
                                                            </Button>
                                                        </ButtonContainer>
                                                    </div>

                                                    {initialValues?.components?.map((component, index) => (
                                                        <div
                                                            className="aifbc-box1-without-border"
                                                            key={index}
                                                        >
                                                            <Accordion
                                                                type="multiple"
                                                                collapsible
                                                                className="text-details-one pl-3 pr-3"
                                                                style={{ border: '1px solid #e0e0e0' }}
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
                                                                                <span
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
                                                                                </span>
                                                                            </div>
                                                                            <div className="aifbc-flex-5 aifbc-jc-r">
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
                                                                                        <FormikAsyncDropdown
                                                                                            isDisabled={true}
                                                                                            isRequired
                                                                                            key={`components[${index}].category`}
                                                                                            label="Category"
                                                                                            name={`components[${index}].category`}
                                                                                            placeholder="Select"
                                                                                            id="issueCategory"
                                                                                            helpertext="Use a pre-loaded vehicle checklist as a starting point (Optional)"
                                                                                        />
                                                                                    </div>
                                                                                    <div
                                                                                        style={{ width: '100%' }}
                                                                                        className="mt-3"
                                                                                    >
                                                                                        <FormikAsyncDropdown
                                                                                            isDisabled={true}
                                                                                            key={`components[${index}].subCategory`}
                                                                                            label="Sub Category"
                                                                                            name={`components[${index}].subCategory`}
                                                                                            placeholder="Select"
                                                                                            id="issueSubCategory"
                                                                                            helpertext="Use a pre-loaded vehicle checklist as a starting point (Optional)"
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
                                                                            </div>
                                                                        </div>
                                                                    </AccordionContent>
                                                                </AccordionItem>
                                                            </Accordion>
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

export default InspectionFormGen;
