import React from 'react';
import ShowImageGridView from '@/components/common/ImageDetails/ImageDetails';
import {
  dotIcon,
  pdfThumbnail,
  upDownArrow,
  fileThumbnail,
  spearker,
  spearkerWorking,
  spreadSheetThumbnail,
  designerImageThumbnail,
} from '@/assets/Icons';
import TextDetailsOne from '@/components/common/TextDetails/TextDetails';
import { useEffect, useState } from 'react';
// import sampkeImg from '@/assets/images/bus1.png'
// import getUserIdFromToken from "@/services/GetUserFromToken";
import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer';
import '../../issues/Preview/previewIssues.css';
import '@cyntler/react-doc-viewer/dist/index.css';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatDate } from '@/utils/dateHelper';
import { Badge } from '@/components/ui/badge';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { getApi, postApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { ROUTES } from '@/constants/route.constant';

const renderStatus = (params, onlyColor = false) => {
  let statusColor;
  let statusText;
  let textColor;

  switch (params) {
    case 'Open':
      statusColor = 'issueOpen';
      statusText = 'OPEN';
      textColor = 'white';
      break;
    case 'Overdue':
      statusColor = 'closedOpen';
      statusText = 'OVERDUE';
      textColor = 'white';
      break;
    case 'Resolved':
      statusColor = 'resolvedOpen';
      statusText = 'RESOLVED';
      textColor = 'white';
      break;
    case 'Closed':
      statusColor = 'overdueOpen';
      statusText = 'CLOSE';
      textColor = 'white';
      break;
    default:
      statusColor = 'transparent';
      statusText = 'Unknown';
      textColor = 'white';
  }
  return <>{<Badge variant={statusColor}> {statusText}</Badge>}</>;
};
const Preview = ({ response }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const isAdd = searchParams.get('add') === 'true';
  const notAdd = searchParams.get('add') === 'false';
  //const title1 = "Details ";
  const title1 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Details</span>
      {renderStatus(response?.data?.data?.issueStatus)}
    </div>
  );

  const [details1, setDetails1] = useState([
    { title: 'Asset Type', name: '---' },
    { title: 'Asset Name', name: '---' },
    { title: 'Category', name: '---' },
    { title: 'Sub-Category', name: '---' },
  ]);
  // const [details1, setDetails1] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [files, setFiles] = useState([]);
  const [isDocumentsUploaded, setIsDocumentsUploaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState([]);
  const [editData, setEditData] = useState(null);
  const [vehicleData, setVehicleData] = useState(null);
  const [issuesdata, setIssuesData] = useState([]); // Assume data comes from API

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id && notAdd) {
          // Fetch edit data (start inspection data)
          const res = await getApi(APIS.START_INSPECTION, id);
          const data = res?.data.inspectionVehicleForm;
          setEditData(data);
          console.log('Edit data:', res?.data.issuesdata);
          setIssuesData(res?.data?.issuesdata);

          console.log('vehicle data:', data.vehicle._id);
          // Set vehicle data
          setVehicleData(data?.vehicle || {});

          // Fetch and set components if inspectionFormId exists
          const formId = data?.inspectionFormId;
          if (formId) {
            const response_1 = await getApi(APIS.GET_ALL_Inspections, formId);
            const allInspectionsData = response_1.data;
            console.log('Inspection data: ', allInspectionsData);

            // Merge components from editData and allInspectionsData
            const mergedComponents = allInspectionsData.components.map(
              (inspectionComponent) => {
                const matchingEditComponent = data.components.find(
                  (editComponent) => editComponent.id === inspectionComponent.id
                );
                // Combine data from both sources
                return {
                  ...inspectionComponent,
                  ...matchingEditComponent,
                  choiceId: matchingEditComponent?.choiceId || '',
                  comment: matchingEditComponent?.comment || '',
                  photo: matchingEditComponent?.photo || [],
                };
              }
            );

            setComponents(mergedComponents);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, notAdd]);

  const onAddIssue = (id) => {
    // navigate(ROUTES.INSERT_ISSUES, id);
    navigate(`${ROUTES.ISSUES}/edit/${id}`, {
      state: { isEditeActive: true },
    });
  };

  useEffect(() => {
    if (editData) {

      console.log("zdetails: ",editData);
      const assetName = editData?.vehicle.identification.registrationNumber || '---';
      const categoryName = editData?.components?.name?.english || '---';
      // const categoryName = editData?.data?.issueCategoryId?.name?.english || '---';
      // const subCategoryName = editData?.data?.subCategoryId?.name?.english || '---';

      // const assetName = editData.data || '---';
      // console.log('vehicle: ', assetName);

      const updatedDetails1 = [
        {
          title: 'Vehicle Name',
          name: assetName,
        },
        // {
        //   title: 'Asset Type',
        //   name: editData?.data?.assetType || '---',
        // },
        // {
        //   title: 'Category',
        //   name: categoryName || '---',
        // },
        // {
        //   title: 'Sub Category',
        //   name: editData?.data?.issueCategoryId?.name?.english || '---',
        // },
        // Add more fields as necessary
      ];

      setDetails1(updatedDetails1);
    }
  }, [response]);

  return (
    <div className="overview-main-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="overview-inner-container-left">
          <TextDetailsOne details={details1} title={title1} />
          <div className="w-100 h-[300px] border shadow-[4px_4px_20px_0px_#0000001A] mb-4 rounded-md">
              <div className="mt-6 mb-6 p-4 pt-2">
                {components.length > 0 ? (
                 <div className='flex flex-wrap -mx-4 gap-4'>
                   {components.map((component, index) => (
                    <div key={index} className="mb-4">
                      {/* Render category and sub-category */}
                      <h3 className="font-semibold text-blue-600">
                        Category:{' '}
                        {component?.categoryId?.name?.english || '---'}
                      </h3>
                      <p className="font-light text-black">
                        Sub Category:{' '}
                        {component?.subCategoryId?.name?.english || '---'}
                      </p>

                      {/* Check and render photos */}
                      {component.photo && component.photo.length > 0 && (
                        <div className="mt-2">
                          {component.photo.map((photo, photoIdx) => (
                            <div key={photoIdx} className="mb-2">
                              <img
                                src={photo.url}
                                alt={`Inspection photo ${photoIdx}`}
                                className="max-w-full h-auto border rounded"
                                style={{ height: '160px', objectFit: 'cover' }}
                              />
                              <p className="text-sm text-gray-600">
                                {photo.name}
                              </p>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Render comment */}
                      {component.comment ? (
                        <div className="mt-2">
                          <p>
                            <strong>Comment:</strong> {component.comment}
                          </p>
                        </div>
                      ) : (
                        <p className="text-gray-500">No comment provided</p>
                      )}
                    </div>
                  ))}
                 </div>
                ) : (
                  <p className="text-gray-500">No components available</p>
                )}
              </div>
            </div>
        </div>
        
        <div className="overview-inner-container-right">
          <div className="w-100 h-[300px] border shadow-[4px_4px_20px_0px_#0000001A] mb-4 rounded-md">
            <div className="text-[#002850] w-[80px] h-[20px] text-[16px] font-semibold p-4">
              Inspections
            </div>
            {/* <div className="p-4 pt-2"> */}
            <div className="mt-6 mb-6 p-4 pt-2">
              <ScrollArea className="h-[200px] w-full">
                <div className="pl-1">
                  <h3>Inspection Items (Pass/Fail)</h3>
                  {components.length > 0 ? (
                    components.map((component, index) => (
                      <div key={index}>
                        <div className="font-semibold text-blue-600">
                          Category:{' '}
                          {component?.categoryId?.name?.english || '---'}
                        </div>
                        <div className="font-light text-black">
                          Sub Category:{' '}
                          {component?.subCategoryId?.name?.english}
                        </div>
                        <ul className="pl-4">
                          {component?.choices &&
                          component.choices.length > 0 ? (
                            component.choices.map((choice, idx) => (
                              <li
                                key={idx}
                                className={`text-gray-700 ${
                                  component.choiceId === choice._id
                                    ? 'font-bold text-blue-600'
                                    : ''
                                }`}
                              >
                                {choice?.title || 'Untitled'} (Comment:{' '}
                                {choice?.comment ? 'Yes' : 'No'}, Photo:{' '}
                                {choice?.photo ? 'Yes' : 'No'})
                                {/* {choice?.title?.toLowerCase() === 'fail' && */}
                                {component.choiceId === choice._id && (
                                  <button
                                    className="ml-2 bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() =>
                                      onAddIssue(issuesdata[idx]?._id)
                                    } // Pass vehicle ID and choice ID
                                  >
                                    Issue#{issuesdata[idx]?.code}
                                  </button>
                                )}
                              </li>
                            ))
                          ) : (
                            <li className="text-gray-500">
                              No choices available
                            </li>
                          )}
                        </ul>
                        <div className="border-t my-2"></div>
                      </div>
                    ))
                  ) : (
                    <p>No components available</p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
          {/* File List with Sorting */}
        </div>
      </div>
    </div>
  );
};

export default Preview;
