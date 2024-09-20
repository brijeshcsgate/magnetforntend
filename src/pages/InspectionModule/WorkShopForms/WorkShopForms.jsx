import './workshopForm.css';
import { Ellipsis, Trash2 } from 'lucide-react';
import { Heading } from '@/components/AddFormLayout/AddFormLayout';
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import VehiclesSchedules from './WorkshopTabs/VehiclesSchedules';
import Workshopsform from './WorkshopTabs/workshopsform';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { ROUTES } from '@/constants/route.constant';
import InspectionViewItem from '../InspectionViewItem/InspectionViewItem';
import { InspectionsService } from '@/services/InspectionsService';
import InspectionToolTip from '../InspectionToolTip/InspectionToolTip';

const detailsCss = {
  height: 'calc(100vh - 300px)',
  overflowY: 'scroll',
  paddingBottom: '20px',
};

const WorkShopForms = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('Inspection Items');
  const [isDropdownHeadOpen, setIsDropdownHeadOpen] = useState(false);
  const [apiData, setApiData] = useState();
  const [workflowsCount, setWorkflowsCount] = useState(0);
  const [iCount, setiCount] = useState(0);
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    if (data && data.id) {
      getInspectionData();
    }
    if (data && data.activeTab) {
      setActiveTab(data.activeTab);
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
    setApiData(data.data);
    console.log('api data: ',data.data);
  };

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const toggleDropdownHead = () => {
    setIsDropdownHeadOpen(!isDropdownHeadOpen);
  };

  const handleItemheadClick = (item) => {
    setIsDropdownHeadOpen(false);
  };

  const handleWorkflowsCountChange = (count) => {
    setWorkflowsCount(count);
  };

  const tabs = [
    { tabName: 'Inspection Items' },
    { tabName: 'Workflows', count: workflowsCount },
    { tabName: 'Vehicles & Schedules' },
  ];

  return (
    <div className="add-v-main-container">
      <div className="add-v-form-container">
        <div className="add-v-form-top-section">
          <div className="top-upper-section d-h-between">
            <div>
              <BreadCrumbs
                backNavi={() => navigate(ROUTES.INSPECTIONS_FORMS_LIST)}
                breadCrumbs={[
                  {
                    name: 'Inspection Form List',
                    path: ROUTES.INSPECTIONS_FORMS_LIST,
                  },
                  // {
                  //   name: 'Add Inspection Form',
                  //   path: ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
                  // },
                ]}
                // boldItem="Add Inspection Item"
              />
              <Heading>{location?.state?.title}</Heading>
              <div className="flex text-[12px] mt-2">
                <span className="text-[#555] mr-2">Description</span>
                <span className="text-[#292929] font-normal">
                  <InspectionToolTip
                    t_title={apiData?.description}
                    t_desc={apiData?.description}
                  />
                </span>
              </div>
              <div className="flex text-[12px] mt-2">
                <span className="text-[#555] mr-2">Location</span>
                <span className="mr-1">
                  {apiData?.enableLocationExceptionTracking
                    ? 'Enable'
                    : 'Disable'}
                </span>{' '}
                |
                <span className="text-[#555] ml-1 mr-2">
                  Prevent Use of Stored Photos
                </span>
                <span>{apiData?.allowStoredPhotos ? 'Enable' : 'Disable'}</span>
              </div>
            </div>
            <span
              onClick={toggleDropdownHead}
              className="pr-2 pl-1.5 w-[39px] h-[30px] rounded-lg border bg-white flex justify-center items-center cursor-pointer"
            >
              <Ellipsis />
            </span>
            {isDropdownHeadOpen && (
              <div className="absolute right-0 mt-8 w-[176px] h-[124px] bg-white border rounded-md shadow-lg">
                <ul className="list-none m-0">
                  <li
                    onClick={() => handleItemheadClick('Option 1')}
                    className="flex justify-between px-2 py-2.5 cursor-pointer text-[12px]"
                  >
                    <span>Close</span>
                  </li>
                  <li
                    onClick={() => handleItemheadClick('Option 2')}
                    className="flex justify-between px-2 py-2.5 cursor-pointer text-[12px]"
                  >
                    <span>View Record History</span>
                  </li>
                  <li
                    onClick={() => handleItemheadClick('Option 3')}
                    className="flex justify-between px-2 py-2.5 cursor-pointer text-[12px]"
                  >
                    <span>Delete</span> <Trash2 className="size-3" />
                  </li>
                </ul>
              </div>
            )}
          </div>
          <div className="top-bottom-section">
            <div className="tabs">
              {tabs.map((item, index) => (
                <div
                  className={`tab ${activeTab === item.tabName ? 'tab-active' : ''}`}
                  key={index}
                  onClick={() => handleTabClick(item.tabName)}
                >
                  <div
                    className={`text-[16px] ${activeTab === item.tabName ? 'heading-600-16 c-blue2' : 'heading-400-16 c-gray'} v-center`}
                  >
                    {item.tabName}
                  </div>
                  <div
                    className={`v-center text-[16px] rounded-lg flex ${activeTab === item.tabName ? 'activetabIcon' : ''} ${activeTab === item.tabName ? 'heading-600-16 c-white bg-[#043566]' : 'heading-400-16 text-[#043566] bg-[#e6e6e6]'}`}
                  >
                    <span className="text-center w-[42px] h-[21px] rounded-lg">
                      {item.tabName === 'Inspection Items'
                        ? apiData?.components?.length
                        : ''}
                      {item.tabName === 'Workflows' ? workflowsCount : ''}
                      {item.tabName === 'Vehicles & Schedules'
                        ? apiData?.components?.length
                        : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="h-[auto] w-full">
          {activeTab === 'Inspection Items' && (
            <InspectionViewItem dataItem={data} />
          )}
          {activeTab === 'Workflows' && (
            <Workshopsform
              dataItem={data} tabId={data.id}
              onDataLengthChange={handleWorkflowsCountChange}
            />
          )}
          {activeTab === 'Vehicles & Schedules' && <VehiclesSchedules dataItem={data} />}
        </div>
      </div>
    </div>
  );
};

export default WorkShopForms;
