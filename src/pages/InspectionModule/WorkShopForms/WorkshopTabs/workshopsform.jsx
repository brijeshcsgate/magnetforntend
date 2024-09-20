import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { APIS } from '@/constants/api.constant';
import { VehicleService } from '@/services/VehicleService';
import RowDetailsButton from '@/components/DataGrid/RowDetailsButton';
import { getApi } from '@/services/method';
import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/route.constant';
import { EllipsisIcon } from 'lucide-react';
import { deleteIcon, editIcon } from '@/assets/Icons';
import axios from 'axios';
import { ArrowRight } from 'lucide-react';
import { CircleCheck, LockKeyhole, CircleX, LockKeyholeOpen, Send, TriangleAlert, Mail, CarFront, UserPlus } from "lucide-react";
//const token = localStorage.getItem('userToken') || sessionStorage.getItem('userToken');
import {
  ButtonContainer,
  Container,
  Header,
  Heading,
  SidePanel,
} from '@/components/AddFormLayout/AddFormLayout';
const Workshopsform = ({ tabId, onDataLengthChange, dataItem }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    getApi(APIS.INSPECTION_FORMS)
      .then(response => {
        if (response?.data) {
          const list = response.data.list || [];
          setData(list);
          if (onDataLengthChange) {
            onDataLengthChange(list.length); // Pass the length of the data back to the parent
          }
        }
      })
      .catch(error => console.error('Error fetching inspection forms:', error))
      .finally(() => setLoading(false));
  }, [onDataLengthChange]);

  useEffect(() => {
    if (tabId) {
      getVehicleData();
    }
  }, [tabId]);

  const getVehicleData = () => {
    VehicleService.getVehicleById(tabId, { populate: 'false' }, handleGetVehicleSuccess);
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;
    setInitialValues(formattedData); // Ensure `setInitialValues` is correctly used
  };

  const handleAdd = () => {
    navigate("/inspections/workshop/add");
  };

  const onRowDataDeleteHandler = async (id) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_APP_BASE_URL}/inspectionForm/${id}`,
        {
          headers: {

          },
        }
      );
      console.log(response);

      if (response?.data?.status === true) {
        toast.success('Data Deleted Successfully');
        setTimeout(() => {
          window.location.reload();
        }, 200);
      }
    } catch (error) {
      console.error('Error deleting resource:', error);
      toast.error(error?.message);
    }
  };
  const onRowDataDisableHandler = async (rowData) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/inspectionForm/${rowData._id}`,
        { isEnable: false },
        {
          headers: {

          },
        }
      );

      if (response?.data?.status === true) {
        toast.success('Data Disabled Successfully');
        // Remove the item from the "Enabled" section and add it to the "Disabled" section
        setData(prevData => prevData.map(item =>
          item._id === rowData._id
            ? { ...item, isEnable: false }
            : item
        ));
      }
    } catch (error) {
      console.error('Error disabling resource:', error);
      toast.error(error?.message);
    }
  };
  const onRowDataEnableHandler = async (rowData) => {
    try {
      const response = await axios.patch(
        `${import.meta.env.VITE_APP_BASE_URL}/inspectionForm/${rowData._id}`,
        { isEnable: true },
        {
          headers: {

          },
        }
      );

      if (response?.data?.status === true) {
        toast.success('Data Enabled Successfully');
        setData(prevData => prevData.map(item =>
          item._id === rowData._id
            ? { ...item, isEnable: true }
            : item
        ));
      }
    } catch (error) {
      console.error('Error enabling resource:', error);
      toast.error(error?.message);
    }
  };

  const navigateToEdit = (rowData) => {
    navigate(`${ROUTES.UPDATE_INSPECTIONS_ADDWORKSHOP}/${rowData?._id}`, {
      state: { isEditeActive: true },
    });
  };

  const getRowOptions = (rowData) => {
    const options = [];
    options.push({
      title: 'Edit',
      icon: editIcon({ width: 12, height: 12 }),
      onClick: () => navigateToEdit(rowData),
    });
    if (rowData.isEnable) {
      options.push({
        title: 'Disable',
        subTitle: 'Vehicle',
        icon: <LockKeyhole className='w-[14px] h-[14px]' />,
        onClick: () => onRowDataDisableHandler(rowData),
      });
    } else {
      options.push({
        title: 'Enable',
        subTitle: 'Vehicle',
        icon: <LockKeyholeOpen className='w-[14px] h-[14px]' />,
        onClick: () => onRowDataEnableHandler(rowData),
      });
    }
    options.push({
      title: 'Delete',
      subTitle: 'Vehicle',
      icon: deleteIcon({ width: 14, height: 14 }),
      onClick: () => onRowDataDeleteHandler(rowData._id),
    });

    return options;
  };

  // Separate data into enabled and disabled
  const enabledData = data.filter(item => item.isEnable);
  const disabledData = data.filter(item => !item.isEnable);
  const renderIcon = (radioButtonId) => {
    switch (radioButtonId) {
      case 'If an item passes':
        return <CircleCheck className="w-[16px] h-[16px]" />;
      case 'If an item fails':
        return <CircleX className="w-[16px] h-[16px]" />;
      case 'If an item needs review':
        return <Send className="w-[16px] h-[16px]" />;
      default:
        return null;
    }
  };
  return (
    <Container>
      <div className="">
              <>
    <div className="add-v-form-bottom-section" style={{ padding: '4% 5% 2% 5%' }} >
      {loading ? (
        <p>Loading...</p>
      ) : data.length === 0 ? (
        <div className="form-content flex content-center items-center h-[280px] border ">
          <div className="w-full max-w-[1320px] mx-auto ">
            <div className="flex justify-between px-4 -mt-20 mb-7">
              <div>
                <span className="flex text-[#002850] font-semibold text-lg"> </span>
              </div>
              <div className="text-[#0F5CF1] text-sm md:text-base cursor-pointer" onClick={handleAdd}>
                + Add Workflow
              </div>
            </div>
            <div>
              <div className="flex justify-center text-xl text-[#030303] font-medium mb-2">
                <span>Add vehicle rules to this inspection form</span>
              </div>
              <div className="flex justify-center text-[#8D8E93] text-center text-[10px] mb-4">
                <span>
                  Automatically send emails, create issues, assign vehicles, and update vehicle status based on inspection form submissions.
                </span>
              </div>
              <div className="flex justify-center">
                <div className="rounded-md w-[157px] h-[39px] bg-[#256EB5] text-white flex items-center justify-center text-[15px] cursor-pointer">
                  <span onClick={handleAdd}>+ Add Workflow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div style={{
            borderRadius: '8px',

            width: '100%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '18px',
          }}>
            {/* Enabled Section */}
            {enabledData.length > 0 && (
              <div className="data-item mb-4 py-4 px-6 border rounded-md">
                <div className="flex justify-between mb-9" >
                  <div>
                    <span className="flex text-[#002850] text-[20px] font-medium">Workflows----------</span>
                              {JSON.stringify(dataItem.id)}
                  </div>
                  <div className="text-[#0F5CF1] text-sm md:text-base cursor-pointer" onClick={handleAdd}>
                    + Add Workflow
                  </div>
                </div>
                <div>
                  <span className="text-[14px] bg-[#ABE7F4] text-[#002850] rounded-full px-3 py-0.5 ">Enable</span>
                </div>
                {enabledData.map(list => (
                  <div key={list._id} className="bg-[#EFF7FE] py-4 px-4 my-4 rounded-sm flex ">
                    {/* First Part */}
                    <div className="flex-1 flex flex-col">
                      {list.selectedRadio && (
                        <div className="text-[14px] font-normal flex items-center">
                          <span className="mr-2 ">{renderIcon(list.selectedRadio)}</span>
                          <span className='font-medium'>{list.selectedRadio}</span>
                        </div>
                      )}
                      {list.items && (
                        <div className="text-[14px] font-normal mt-3 pl-6">
                          <span className='py-1 rounded-full  text-[#818181]'>{list.items}</span>
                        </div>
                      )}
                      {list.description && (
                        <div className="text-[14px] mb-6 font-normal mt-auto">
                          <span className=' '>Description</span>
                          <span className="pl-2 font-extralight text-[#818181]">{list.description}</span>
                        </div>
                      )}
                    </div>

                    {/* Second Part */}
                    <div className="flex-1 flex flex-col">
                      {/* Container to align arrow and details side by side */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <ArrowRight className='mr-9' />
                        </div>
                        <div className="flex-1">
                          {list.status && (
                            <div className="text-[14px] font-normal mb-5 ">
                              <div className='flex font-medium '><CarFront className='mr-3 w-4 h-4' /> Change vehicle status</div>
                              <div className='pl-8 text-[#818181]'>{list.status}</div>
                            </div>
                          )}
                          {list.email && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '> <Mail className='mr-3 w-4 h-4' />Send an email</div>
                              <div className='pl-8 font-extralight text-[#818181]'>{list.email}</div>
                            </div>
                          )}
                          {list.issues && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '><TriangleAlert className='mr-3 w-4 h-4' color='#FF0000' />Create an issue</div>
                              <div className='flex pl-8 font-extralight text-[#818181]'>{list.issues}</div>
                            </div>
                          )}
                          {list.vehicle && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '> <UserPlus className='mr-3 w-4 h-4' />Assign user to vehicle</div>
                              <div className='pl-8 font-extralight text-[#818181]'>{list.vehicle}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Third Part */}
                    <div className="w-[5%]">

                      <RowDetailsButton
                        imgUrl="/assets/threeDotDataGrid.svg"
                        options={getRowOptions(list)}
                      />
                    </div>
                  </div>

                ))}
              </div>
            )}</div>
          {/* Disabled Section */}
          <div style={{
            borderRadius: '8px',

            width: '100%',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginBottom: '18px',
          }}>
            {disabledData.length > 0 && (
              <div className="data-item mb-4 py-4 px-6 border rounded-md">
                {enabledData.length === 0 && (
                  <div className="flex justify-between mb-9" >
                    <div>
                      <span className="flex text-[#002850] text-[20px] font-medium">Workflows</span>
                    </div>
                    <div className="text-[#0F5CF1] text-sm md:text-base cursor-pointer" onClick={handleAdd}>
                      + Add Workflow
                    </div>
                  </div>
                )}
                <div>
                  <span className="text-[14px] bg-[#F5F4F4] rounded-full px-4 py-1">Disable</span>
                </div>

                {disabledData.map(list => (

                  <div key={list._id} className="bg-[#F5F4F4] py-4 px-4 my-4 flex rounded-sm">
                    {/* First Part */}
                    <div className="flex-1 flex flex-col">
                      {list.selectedRadio && (
                        <div className="text-[14px] font-normal flex items-center">
                          <span className="mr-2 ">{renderIcon(list.selectedRadio)}</span>
                          <span className='font-medium'>{list.selectedRadio}</span>
                        </div>
                      )}
                      {list.items && (
                        <div className="text-[14px] font-normal mt-3 pl-6">
                          <span className='py-1 rounded-full  text-[#818181]'>{list.items}</span>
                        </div>
                      )}
                      {list.description && (
                        <div className="text-[14px] font-normal mb-6 mt-auto">
                          <span className=' '>Description</span>
                          <span className="pl-2 font-extralight text-[#818181]">{list.description}</span>
                        </div>
                      )}
                    </div>

                    {/* Second Part */}
                    <div className="flex-1 flex flex-col">
                      {/* Container to align arrow and details side by side */}
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-3">
                          <ArrowRight className='mr-9' />
                        </div>
                        <div className="flex-1">
                          {list.status && (
                            <div className="text-[14px] font-normal mb-5 ">
                              <div className='flex font-medium '><CarFront className='mr-3 w-4 h-4' /> Change vehicle status</div>
                              <div className='pl-8 text-[#818181]'>{list.status}</div>
                            </div>
                          )}
                          {list.email && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '> <Mail className='mr-3 w-4 h-4' />Send an email</div>
                              <div className='pl-8 font-extralight text-[#818181]'>{list.email}</div>
                            </div>
                          )}
                          {list.issues && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '><TriangleAlert className='mr-3 w-4 h-4' color='#FF0000' />Create an issue</div>
                              <div className='pl-8 font-extralight text-[#818181]'>{list.issues}</div>
                            </div>
                          )}
                          {list.vehicle && (
                            <div className="text-[14px] font-normal mb-5">
                              <div className='flex font-medium '> <UserPlus className='mr-3 w-4 h-4' />Assign user to vehicle</div>
                              <div className='pl-8 font-extralight text-[#818181]'>{list.vehicle}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>


                    {/* Third Part */}
                    <div className="w-[5%]">

                      <RowDetailsButton
                        imgUrl="/assets/threeDotDataGrid.svg"
                        options={getRowOptions(list)}
                      />
                    </div>
                  </div>

                ))}
              </div>
            )}</div>
        </>
      )}
    </div>
        </>
      </div>
    </Container>
  );
};

export default Workshopsform;
