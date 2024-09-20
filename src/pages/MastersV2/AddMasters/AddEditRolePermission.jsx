import React, { useContext } from 'react';
import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
  Section,
} from '@/components/AddFormLayout/AddFormLayout';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { APIS } from '@/constants/api.constant';
import { BUTTON_TYPES, COMMON_SCHEMA } from '@/constants/common.constant';
import { ROUTES } from '@/constants/route.constant';
import { getApi, patchApi, postApi } from '@/services/method';
import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { sidebarRoutes } from '@/utils/sidebar.utils/side.options';
import { Checkbox } from '@/components/ui/checkbox';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
const initialValues = {
  description: '',
  role: null,
  permissions: sidebarRoutes.map((route) => ({
    moduleName: route.label,
    actions: {
      create: false,
      view: false,
      update: false,
      delete: false,
    },
    subItems: route.subItems.map((subItem) => ({
      moduleName: subItem.label,
      actions: {
        create: false,
        view: false,
        update: false,
        delete: false,
      },
      subItems: subItem.subItems
        ? subItem.subItems.map((nestedSubItem) => ({
            moduleName: nestedSubItem.label,
            actions: {
              create: false,
              view: false,
              update: false,
              delete: false,
            },
            subItems: nestedSubItem.subItems
              ? nestedSubItem.subItems.map((deepNestedSubItem) => ({
                  moduleName: deepNestedSubItem.label,
                  actions: {
                    create: false,
                    view: false,
                    update: false,
                    delete: false,
                  },
                  subItems: deepNestedSubItem.subItems || [],
                }))
              : [],
          }))
        : [],
    })),
  })),
};

const roleSchema = Yup.object().shape({
  role: Yup.string().required(COMMON_SCHEMA),
});

const AddEditRolePermission = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [expandedModules, setExpandedModules] = useState({});
  const [expandedSubItems, setExpandedSubItems] = useState({});


  const toggleExpand = (index) => {
    setExpandedModules((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const toggleSubItemExpand = (index, subIndex) => {
    setExpandedSubItems((prev) => ({
      ...prev,
      [index]: {
        ...prev[index],
        [subIndex]: !prev[index]?.[subIndex],
      },
    }));
  };

  useEffect(() => {
    const initialExpandedModules = sidebarRoutes.reduce((acc, route, index) => {
      if (route.subItems.length > 0) {
        acc[index] = true;
      }
      return acc;
    }, {});
    setExpandedModules(initialExpandedModules);
    if (id) {
      getApi(APIS.ROLES_PERMISSION, id).then((res) => {
        const editData = res?.data?.userRole;
        setData((prev) => ({
          ...prev,
          role: editData?.role,
          description: editData?.description,
          isActive: editData?.isActive || false,
          permissions: editData?.permissions || initialValues.permissions,
        }));
      });
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      description: values.description,
      role: values.role,
      permissions: values.permissions.map((permission) => ({
        moduleName: permission.moduleName,
        actions: permission.actions,
        subItems: permission.subItems.map((subItem) => ({
          moduleName: subItem.moduleName,
          actions: subItem.actions,
          subItems: subItem.subItems.map((nestedSubItem) => ({
            moduleName: nestedSubItem.moduleName,
            actions: nestedSubItem.actions,
            subItems: nestedSubItem.subItems,
          })),
        })),
      })),
    };

    if (id) {
      payload._id = id;
      patchApi(APIS.ROLES_PERMISSION, id, payload)
        .then(() => {
          toast.success('Data updated successfully');
            window.location.reload();
          // navigate(-1);
        })
        .finally(() => {
          setSubmitting(false);
        });
    } else {
      postApi(APIS.ROLES_PERMISSION, payload)
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

const handleCheckboxChange = (
  e,
  index,
  setFieldValue,
  action,
  values,
  checked = undefined,
  parentIndex = null,
  subIndex = null
) => {
  const isChecked =
    typeof e === "object" && e !== null && e.target !== undefined
      ? e.target.checked
      : checked !== undefined
      ? checked
      : e;

 

  if (subIndex === null) {
    if (!values?.permissions || !values.permissions[index]) {
      return;
    }

    setFieldValue(`permissions[${index}].actions.${action}`, isChecked);

    if (["create", "update", "delete"].includes(action)) {
      if (isChecked) {
        setFieldValue(`permissions[${index}].actions.view`, true);
      } else {
        const { create, update, delete: del } = values.permissions[index].actions;
        if (!create && !update && !del) {
          setFieldValue(`permissions[${index}].actions.view`, false);
        }
      }
    }
  } else {
    const subItemPath = `permissions[${parentIndex}].subItems[${subIndex}].actions.${action}`;
    setFieldValue(subItemPath, isChecked);

    if (isChecked && ["create", "update", "delete"].includes(action)) {
      setFieldValue(`permissions[${parentIndex}].subItems[${subIndex}].actions.view`, true);
    } else if (!isChecked) {
      const { create, update, delete: del } = values.permissions[parentIndex].subItems[subIndex].actions;
      if (!create && !update && !del) {
        setFieldValue(`permissions[${parentIndex}].subItems[${subIndex}].actions.view`, false);
      }
    }

    const subItems = values.permissions[parentIndex]?.subItems || [];
    const anySubItemViewTrue = subItems.some((subItem) => subItem.actions.view);
    setFieldValue(`permissions[${parentIndex}].actions.view`, anySubItemViewTrue);
  }
};

const handleNestedSubItemCheckboxChange = (
  isChecked,
  nestedIndex,
  subIndex,
  parentIndex,
  action,
  setFieldValue,
  values
) => {
  const nestedSubItemPath = `permissions[${parentIndex}].subItems[${subIndex}].subItems[${nestedIndex}].actions.${action}`;
  setFieldValue(nestedSubItemPath, isChecked);

  if (isChecked && ['create', 'update', 'delete'].includes(action)) {
    setFieldValue(
      `permissions[${parentIndex}].subItems[${subIndex}].subItems[${nestedIndex}].actions.view`,
      true
    );
  } else if (!isChecked) {

    const {
      create,
      update,
      delete: del,
    } = values.permissions[parentIndex].subItems[subIndex].subItems[nestedIndex]
      ?.actions || {};
    if (!create && !update && !del) {
      setFieldValue(
        `permissions[${parentIndex}].subItems[${subIndex}].subItems[${nestedIndex}].actions.view`,
        false
      );
    }
  }

  const subItems =
    values.permissions[parentIndex].subItems[subIndex]?.subItems || [];
  const anyNestedSubItemViewTrue = subItems.some(
    (nestedSubItem) => nestedSubItem.actions.view
  );

  setFieldValue(
    `permissions[${parentIndex}].subItems[${subIndex}].actions.view`,
    anyNestedSubItemViewTrue
  );
  const allNestedSubItemViewsFalse = subItems.every(
    (nestedSubItem) => !nestedSubItem.actions.view
  );
  if (allNestedSubItemViewsFalse) {

    setFieldValue(
      `permissions[${parentIndex}].subItems[${subIndex}].actions.view`,
      false
    );
  }
  const subItemViewTrue = values.permissions[parentIndex].subItems.some(
    (subItem) => subItem.actions.view
  );

  setFieldValue(`permissions[${parentIndex}].actions.view`, subItemViewTrue);
};
const {setCount } = useContext(CounterContext);

useEffect(() => { 
  setCount('Masters');
}, []);

return (
  <Formik
    enableReinitialize
    initialValues={data}
    validationSchema={roleSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting, handleSubmit: formikSubmit, values, setFieldValue }) => (
      <Container>
        {/* Header Section */}
        <Header>
          <div>
            <BreadCrumbs
              backNavi={() => navigate(-1)}
              breadCrumbs={[
                { name: 'Role and Permission', path: ROUTES.ROLE_MANAGEMENT },
              ]}
              boldItem={'Add/Edit Role and Permission'}
            />
            <Heading>{id ? 'Edit' : 'Add'} Role and Permission</Heading>
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

        {/* Content Section */}
        <Content>
          <Section>
            <div className="flex flex-col w-full">
              <div className="grid grid-cols-3 gap-4 mb-4">
                <FormikAsyncDropdown
                  key="designation"
                  label="Role"
                  name="role"
                  placeholder="Select"
                  id="designation"
                  limit={5}
                  defaultValue={values?.role}
                  isRequired={true}
                />
                <FormikTextField
                  label="Description"
                  placeholder="Enter description"
                  name="description"
                />
              </div>
            </div>
          </Section>

          <Section>
            <div
              className="flex flex-col w-full"
              style={{ width: '90%', height: '585px' }}
            >
              <div
                className="flex-1 overflow-y-scroll border rounded-lg"
                style={{ height: '400px' }}
              >
                <table className="min-w-full text-sm border-collapse">
                  <thead className="text-black bg-[#CDE9F6]">
                    <tr>
                      <th
                        className="py-3.5 border-b "
                        style={{ width: '300px' }}
                      >
                        Module
                      </th>
                      <th className="py-3.5 px-4 border-b ">Create</th>
                      <th className="py-3.5 px-4 border-b ">View</th>
                      <th className="py-3.5 px-4 border-b ">Update</th>
                      <th className="py-3.5 px-4 border-b ">Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sidebarRoutes
                      .filter((route) => route.label !== 'Help')
                      .map((route, index) => (
                        <React.Fragment key={index}>
                          <tr>
                            <td
                              className={`py-3 pl-4 border-y border-[#227FD9] text-white ${route.subItems.length > 0 ? 'bg-[#227FD9] flex justify-between items-center cursor-pointer' : 'bg-[#227FD9]'}`}
                              style={{ width: '300px' }}
                              onClick={() => {
                                route.subItems.length > 0 &&
                                  toggleExpand(index);
                              }}
                            >
                              <span>{route.label}</span>
                              {route.subItems.length > 0 &&
                                (expandedModules[index] ? (
                                  <ExpandLess className="text-white" />
                                ) : (
                                  <ExpandMore className="text-white" />
                                ))}
                            </td>

                            {!route.subItems.length > 0 &&
                              ['create', 'view', 'update', 'delete'].map(
                                (action) => (
                                  <td key={action} className="py-2 pl-4 border">
                                    <div className="flex justify-center">
                                      <FormikCheckbox
                                        type="checkbox"
                                        name={`permissions[${index}].actions.${action}`}
                                        className="form-checkbox rounded mx-auto"
                                        style={{
                                          width: '20px',
                                          height: '20px',
                                        }}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            index,
                                            setFieldValue,
                                            action,
                                            values
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                )
                              )}
                          </tr>
                          <tr>
                            <td colSpan={5} className="p-0 border-0">
                              <Collapse
                                in={expandedModules[index]}
                                timeout="auto"
                                unmountOnExit
                              >
                                {route.subItems.length > 0 && (
                                  <table className="min-w-full text-sm border-collapse">
                                    <tbody>
                                      {route.subItems.map(
                                        (subItem, subIndex) => (
                                          <React.Fragment key={subIndex}>
                                            <tr className="bg-[#FFFFFF]">
                                              <td
                                                className="py-3 pl-8 text-[#FFFFFF] bg-[#227FD9]"
                                                style={{ width: '300px' }}
                                              >
                                                {subItem.label}
                                              </td>

                                              {/* Render checkboxes only if subItem does not have nested subItems */}
                                              {!subItem.subItems && (
                                                <>
                                                  {[
                                                    'create',
                                                    'view',
                                                    'update',
                                                    'delete',
                                                  ].map((action) => (
                                                    <td
                                                      key={action}
                                                      className="py-2 pl-4 border"
                                                    >
                                                      <div className="flex justify-center">
                                                        <FormikCheckbox
                                                          type="checkbox"
                                                          name={`permissions[${index}].subItems[${subIndex}].actions.${action}`}
                                                          className="form-checkbox rounded mx-auto"
                                                          style={{
                                                            width: '20px',
                                                            height: '20px',
                                                          }}
                                                          onChange={(e) =>
                                                            handleCheckboxChange(
                                                              e,
                                                              index,
                                                              setFieldValue,
                                                              action,
                                                              values,
                                                              undefined,
                                                              index,
                                                              subIndex
                                                            )
                                                          }
                                                        />
                                                      </div>
                                                    </td>
                                                  ))}
                                                </>
                                              )}
                                            </tr>

                                            {/* Render nested subItems */}
                                            {subItem.subItems &&
                                              subItem.subItems.map(
                                                (
                                                  nestedSubItem,
                                                  nestedIndex
                                                ) => (
                                                  <tr
                                                    key={nestedIndex}
                                                    className="bg-[#FFFFFF]"
                                                  >
                                                    <td
                                                      className="py-3 pl-12 bg-[#227FD9] text-[#FFFFFF]"
                                                      style={{ width: '300px' }}
                                                    >
                                                      {nestedSubItem.label}
                                                    </td>

                                                    {[
                                                      'create',
                                                      'view',
                                                      'update',
                                                      'delete',
                                                    ].map((action) => (
                                                      <td
                                                        key={action}
                                                        className="py-2 pl-4 border"
                                                      >
                                                        <div className="flex justify-center">
                                                          <FormikCheckbox
                                                            type="checkbox"
                                                            name={`permissions[${index}].subItems[${subIndex}].subItems[${nestedIndex}].actions.${action}`}
                                                            className="form-checkbox rounded mx-auto"
                                                            style={{
                                                              width: '20px',
                                                              height: '20px',
                                                            }}
                                                            onChange={(
                                                              checked
                                                            ) => {
                                                            
                                                              handleNestedSubItemCheckboxChange(
                                                                checked,
                                                                nestedIndex,
                                                                subIndex,
                                                                index,
                                                                action,
                                                                setFieldValue,
                                                                values
                                                              );
                                                            }}
                                                          />
                                                        </div>
                                                      </td>
                                                    ))}
                                                  </tr>
                                                )
                                              )}
                                          </React.Fragment>
                                        )
                                      )}
                                    </tbody>
                                  </table>
                                )}
                              </Collapse>
                            </td>
                          </tr>
                        </React.Fragment>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Section>
        </Content>
      </Container>
    )}
  </Formik>
);
}

export default AddEditRolePermission;
