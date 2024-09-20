import {
  detailsIcon,
  financialIcon,
  lifeCycle,
  maintanceIcon,
  specifications,
  settingIcon,
  errorTriangleIcon,
} from '@/assets/Icons';
//import "./workshopForm.css";
import { CircleX, MoveRight, Ellipsis, Trash2 } from 'lucide-react';
import {
  ButtonContainer,
  Heading,
} from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import Button from '@/components/common/Button/Button';
import { BUTTON_TYPES } from '@/constants/common.constant';
import { VehicleService } from '@/services/VehicleService';
//import VehiclesSchedules from "./WorkshopTabs/VehiclesSchedules";
// Workshopsform from   "./WorkshopTabs/workshopsform";
import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { vehicleValidationSchema } from '@/Validations/VehicleValidationSchema';

import { ROUTES } from '@/constants/route.constant';
import FormikAsyncDropdown from '@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikCheckbox from '@/components/inputs/formik/FormikCheckbox';
import FormikTextField from '@/components/inputs/formik/FormikTextField';

import FormikCheckboxWithHelperText from '@/components/inputs/formik/CheckBoxWithDropDown/FormikCheckboxWithHelperText';
const detailsCss = {
  height: 'calc(100vh - 300px)',
  overflowY: 'scroll',
  paddingBottom: '20px',
};

const StatusIssues = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Details');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDropdownHeadOpen, setIsDropdownHeadOpen] = useState(false);
  const [isActiveTabs, setIsActiveTab] = useState('Details');
  const [initialValues, setInitialValues] = useState({
    identification: {
      chassisNumber: '',
      engineNumber: '',
      registrationNumber: '',
    },
  });
  const handleItemClick = (item) => {
    setIsDropdownOpen(false);
  };
  const handleItemheadClick = (item) => {
    setIsDropdownHeadOpen(false);
  };
  const toggleDropdownHead = () => {
    setIsDropdownHeadOpen(!isDropdownHeadOpen);
  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const tabs = [
    { tabName: 'Inspection Items' },
    {
      tabName: 'Workflows',
    },
    { tabName: 'Vehicles & Schedules' },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsActiveTab(tabName);
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {};

  const handleUpdateVehicleSuccess = () => {
    toast.success('Vehicle updated successfully');
    navigate(-1);
  };

  useEffect(() => {
    if (id) getVehicleData();
  }, [id]);

  const getVehicleData = () => {
    VehicleService.getVehicleById(
      id,
      { populate: 'false' },
      handleGetVehicleSuccess
    );
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;

    setInitialValues(formattedData);
  };

  const breadcrumb = {
    backNavi: () => navigate(ROUTES.MASTERS),
    breadCrumbs: [
      { name: 'Workshop', path: ROUTES.WORKSHOP },
      { name: 'Inspection', path: ROUTES.INSPECTIONS },
    ],
    boldItem: 'Inspection History',
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={vehicleValidationSchema}
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
              <div className="top-upper-section d-h-between">
                <div>
                  <BreadCrumbs
                    backNavi={() => navigate('/inspection')}
                    breadCrumbs={[
                      { name: 'Workshop', path: ROUTES.WORKSHOP },
                      { name: 'Forms', path: ROUTES.INSPECTIONS },
                    ]}
                    //  boldItem={"Add Inspection Form"}
                  />

                  <Heading> 13 Point Inspection</Heading>
                  <div className="flex text-[12px] mt-2">
                    <span className="text-[#555] mr-2">Description</span>
                    <span className="text-[#292929] font-normal">
                      Loriem ipusum Text for Batter Visibilty for 13 point
                      inspection
                    </span>
                  </div>
                  <div className="flex text-[12px] mt-2 ">
                    <span className="text-[#555] mr-2">Location</span>
                    <span className="mr-1">Enable</span>|
                    <span className="text-[#555] ml-1 mr-2">
                      Prevent Use of Stored Photos
                    </span>
                    <span>Enable</span>
                  </div>
                </div>
                <span
                  onClick={toggleDropdownHead}
                  className=" pr-2 pl-1.5 w-[39px] h-[30px] rounded-lg border bg-white flex justify-center items-center"
                >
                  <Ellipsis />
                </span>
                {isDropdownHeadOpen && (
                  <div className="absolute  right-16 mt-4 w-[176px] h-[124px] bg-white border rounded-md shadow-lg  ">
                    <ul className="list-none  m-0">
                      <li
                        onClick={() => handleItemheadClick('Option 1')}
                        className=" flex justify-between px-2 py-2.5 cursor-pointer  text-[12px]"
                      >
                        <span> Close</span>
                      </li>
                      <li
                        onClick={() => handleItemheadClick('Option 2')}
                        className=" flex justify-between px-2 py-2.5 cursor-pointer  text-[12px]"
                      >
                        <span>View Record History</span>{' '}
                      </li>
                      <li
                        onClick={() => handleItemheadClick('Option 3')}
                        className=" flex justify-between px-2 py-2.5 cursor-pointer text-[12px]"
                      >
                        <span>Delete</span> <Trash2 className="size-3" />
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              <div className="top-bottom-section ">
                <div className="tabs ">
                  {tabs.map((item, index) => (
                    <div
                      className={` tab  ${
                        isActiveTabs === item.tabName ? 'tab-active' : ''
                      }`}
                      key={index}
                      onClick={() => handleTabClick(item.tabName)}
                    >
                      <div
                        className={`text-[16px] ${
                          isActiveTabs === item.tabName
                            ? 'heading-600-16 c-blue2 '
                            : 'heading-400-16 c-gray'
                        } v-center`}
                      >
                        {' '}
                        {item.tabName}
                      </div>
                      <div
                        className={`v-center text-[16px]  rounded-lg flex  ${
                          isActiveTabs === item.tabName ? 'activetabIcon' : ''
                        } ${
                          isActiveTabs === item.tabName
                            ? 'heading-600-16 c-white bg-[#043566]'
                            : 'heading-400-16 text-[#043566] bg-[#e6e6e6]'
                        }`}
                      >
                        <span className="text-center w-[42px] h-[21px] rounded-lg">
                          00
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div
              className="add-v-form-bottom-section"
              style={{ padding: '0 5%' }}
            ></div>
            <div className="add-v-form-bottom-section">
              <div style={detailsCss}>
                {activeTab === 'Workflows' && (
                  <Workshopsform
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeTab === 'Inspection Items' && (
                  <InspectionItems
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
                {activeTab === 'Vehicles & Schedules' && (
                  <VehiclesSchedules
                    values={values}
                    setFieldValue={setFieldValue}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default StatusIssues;
