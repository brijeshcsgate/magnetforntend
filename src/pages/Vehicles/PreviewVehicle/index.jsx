// eslint-disable-next-line no-unused-vars
import BreadCrumbs from '@/components/common/BreadCrumbs/BreadCrumbs';
import { ROUTES } from '@/constants/route.constant';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { conductorIcon, driverIcon, editIcon1 } from '../../../assets/Icons';
import ChallanI from './Challan';
import Lifecycle from './Lifecycle/Lifecycle';
import OverView from './OverView/OverView';
import Specifications from './Specifications/Specifications';
import './VehiclePreview.css';
import { ResizedTabs } from '@/components/common/Tabs/Tabs';
import AddMeterEntryModal from './AddMeterEntryModal';

import { cn } from '@/lib/utils';
import StatusCombobox from './StatusCombobox';
import { CounterContext } from '@/components/Layout/commonLayout/TitleOfPageProvider';
import ComingSoonScreen from '@/components/ComingSoonScreen';
import { Button } from '@/components/ui/button';
import { PencilIcon } from 'lucide-react';

const PreviewVehicle = () => {
  const [isActiveTabs, setIsActiveTab] = useState('Overview');

  const [headerData, setHeasderData] = useState({
    vehicleNo: '',
    vehicleType: '',
    ManufacturingYear: '',
    chassisNo: '',
    engineNo: '',
    seats: '',
    VechicleGroup: '',
    busimage: ''
  });

  const [status, setStatus] = useState('active');
  const [responseData, setResponseData] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const { setCount } = useContext(CounterContext);
  useEffect(() => {
    setCount('Vehicles');
  }, []);

  const hasActiveTabHandler = (active) => {
    setIsActiveTab(active);
  };
  const tabs = [
    { tabName: 'Overview' },
    { tabName: 'Specifications' },
    { tabName: 'Lifecycle & Cost Detail' },
    { tabName: 'Time Table' },
    { tabName: 'Challan' },
    { tabName: 'Meter History' },
    { tabName: 'Expense History' },
    { tabName: 'Replacement Analysis' },
    { tabName: 'Issue' },
    { tabName: 'Service History' },
    { tabName: 'Work Order' },
    { tabName: 'More' },
  ];
  const headerDetails = {
    title: headerData?.vehicleNo,
    para1: `${headerData?.vehicleType} ${!headerData?.vehicleType === '' ? '|' : ''
      } ${headerData?.ManufacturingYear} ${headerData?.ManufacturingYear === '' ? '' : '|'
      } ${headerData?.chassisNo} ${headerData?.chassisNo === '' ? '' : '|'} ${headerData?.engineNo
      } ${headerData?.engineNo == '' ? '' : '|'} Seats`,
  };
  const onUserDetailsGetById = async () => {
    const getByIdUrl = `${import.meta.env.VITE_APP_BASE_URL}/vehicle/${id}`;
    let response;
    try {
      response = await axios.get(getByIdUrl, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response?.status === 200) {
        setResponseData(response);
        setHeasderData((prev) => ({
          ...prev,
          vehicleNo: response?.data?.data?.vehicle?.identification
            ?.registrationNumber
            ? response?.data?.data?.vehicle?.identification?.registrationNumber
            : '---',
          busimage: response?.data?.data?.vehicle?.identification?.images[0]?.url ? response?.data?.data?.vehicle?.identification?.images[0]?.url : response?.data?.data?.vehicle?.identification?.images[0]?.url,
          ManufacturingYear: response?.data?.data?.vehicle?.identification
            ?.manufacturingYear
            ? response?.data?.data?.vehicle?.identification?.manufacturingYear
            : '---',
          chassisNo: response?.data?.data?.vehicle?.identification
            ?.chassisNumber
            ? response?.data?.data?.vehicle?.identification?.chassisNumber
            : '---',
          engineNo: response?.data?.data?.vehicle?.identification?.engineNumber
            ? response?.data?.data?.vehicle?.identification?.engineNumber
            : '---',
          VechicleGroup: response?.data?.data?.vehicle?.serviceDetail?.groupId
            ?.name?.english
            ? response?.data?.data?.vehicle?.serviceDetail?.groupId?.name
              ?.english
            : '---',
        }));
        setStatus(
          response?.data?.data?.vehicle?.status
            ? response?.data?.data?.vehicle?.status
            : 'active'
        );
      }
    } catch (error) {
      //
    }
  };
  useEffect(() => {
    onUserDetailsGetById();
  }, []);

  function formatTitleText(text) {
    const firstPart = text.slice(0, 4); // First 4 characters
    const middlePart = text.slice(4, text.length - 4); // Middle part
    const lastPart = text.slice(text.length - 4); // Last 4 characters

    return `${firstPart} ${middlePart} ${lastPart}`;
  }
  return (
    <div className="preview-v-main-container">
      <div className="preview-v-form-container">
        <div className="preview-v-form-top-section ">
          <div className="top-upper-section d-h-between">
            <div>

              <BreadCrumbs
                backNavi={() => navigate("/vehicles")}
                breadCrumbs={[{
                  name: 'Vehicles',
                  path: ROUTES.VEHICLES,
                },]}
                boldItem={"View Vehicles"}
              />
              <div className="preview-top-v-details">
                <div className="preview-top-v-img">
                  <img
                    style={{ width: '100%', height: '100%' }}
                    src={headerData.busimage}
                    alt=""
                  />
                </div>
                <div>
                  <div className="heading-600-24 text-gray-primary v-center pt-7x">
                    {formatTitleText(headerDetails.title)}
                  </div>
                  <div className="heading-400-12 text-gray-quaternary">
                    {headerDetails.para1}
                  </div>
                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <AddMeterEntryModal />
                    <StatusCombobox
                      id={id}
                      status={status}
                      setStatus={setStatus}
                    />

                    <div className="heading-400-12 text-gray-secondary flex items-center justify-center gap-2">
                      <span className="flex items-center justify-center gap-1">
                        {driverIcon({ width: 12, height: 12 })} Driver1{' '}
                      </span>
                      |
                      <span className="flex items-center justify-center gap-1">
                        {driverIcon({ width: 12, height: 12 })} Driver 2{' '}
                      </span>
                      |
                      <span className="flex items-center justify-center gap-1">
                        {conductorIcon({ width: 8, height: 11 })} Conductor
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="preview-v-form-top-button">

              <div className="flex flex-wrap">
                <Button
                  onClick={() =>
                    navigate(`${ROUTES.VEHICLES}/edit/${id}`, {
                      state: {
                        editData: location.state?.rowData,
                        status: 'edit',
                      },
                    })
                  }
                  variant="outline"
                  size="icon"
                  className="group pd-l-4 pd-r-4"
                >
                  <span className="">
                    <PencilIcon width="12px" />
                  </span>
                  &nbsp;&nbsp; <span className="hidden lg:block"> Edit</span>
                </Button>
              </div>
            </div>
          </div>
          <div className="top-bottom-section">
            <ResizedTabs
              tabs={tabs}
              isActiveTabs={isActiveTabs}
              hasActiveTabHandler={hasActiveTabHandler}
            />
          </div>
        </div>
        {isActiveTabs === 'Overview' && (
          <OverView response={responseData} id={id} />
        )}
        {isActiveTabs === 'Specifications' && (
          <Specifications response={responseData} id={id} />
        )}
        {isActiveTabs === tabs[2].tabName && (
          <Lifecycle data={location.state?.rowData} />
        )}
        {isActiveTabs === 'Challan' && <ChallanI />}
        {isActiveTabs === 'Time Table' && <ComingSoonScreen />}


        {isActiveTabs === 'Meter History' && <ComingSoonScreen />}

        {isActiveTabs === 'Expense History' && <ComingSoonScreen />}

        {isActiveTabs === 'Replacement Analysis' && <ComingSoonScreen />}

        {isActiveTabs === 'Issue' && <ComingSoonScreen />}

        {isActiveTabs === 'Service History' && <ComingSoonScreen />}

        {isActiveTabs === 'Work Order' && <ComingSoonScreen />}
      </div>
    </div>
  );
};

export default PreviewVehicle;
