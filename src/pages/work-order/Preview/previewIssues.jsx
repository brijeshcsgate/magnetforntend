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
import './previewIssues.css';
import '@cyntler/react-doc-viewer/dist/index.css';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { formatDate } from '@/utils/dateHelper';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

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
    { title: 'Priority', name: '---' },
    { title: 'Watcher', name: '---' },
    { title: 'Reported By', name: '---' },
    { title: 'Reported Date & Time', name: '---' },
    { title: 'Due Date', name: '---' },
    { title: 'Asigned To', name: '---' },
    { title: 'Description', name: '---' },
    { title: 'Recording', name: '---' },
  ]);
  // const [details1, setDetails1] = useState([]);
  const [sortAsc, setSortAsc] = useState(true);
  const [files, setFiles] = useState([]);
  const [isDocumentsUploaded, setIsDocumentsUploaded] = useState(false);
  useEffect(() => {
    // Combining images, documents, and videos into one array for easy processing
    const combinedFiles = [
      ...(response?.data?.data?.proofFiles?.images || []).map((file) => ({
        type: 'image',
        file,
      })),
      ...(response?.data?.data?.proofFiles?.documents || []).map((file) => ({
        type: 'document',
        file,
      })),
      ...(response?.data?.data?.proofFiles?.videos || []).map((file) => ({
        type: 'video',
        file,
      })),
    ];

    setFiles(combinedFiles);
    if (combinedFiles.length > 0) {
      setIsDocumentsUploaded(true);
    }
  }, [response]);

  // Function to get file extension and render appropriate thumbnail
  const renderFile = (url) => {
    const extension = url.split('.').pop().toLowerCase();

    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return (
          <>{designerImageThumbnail({ width: '200px', height: '157px' })}</>
        );
      case 'pdf':
        return <>{pdfThumbnail({ width: '200px', height: '157px' })}</>;
      case 'docx':
        return <>{fileThumbnail({ width: '200px', height: '157px' })}</>;
      case 'xls':
      case 'xlsx':
        return <>{spreadSheetThumbnail({ width: '200px', height: '157px' })}</>;
      default:
        return <div>Unsupported file type</div>;
    }
  };

  // Sort files
  const handleSortFiles = () => {
    const sortedFiles = [...files].sort((a, b) => {
      if (sortAsc) {
        return a.file.localeCompare(b.file); // Ascending order
      } else {
        return b.file.localeCompare(a.file); // Descending order
      }
    });
    setSortAsc(!sortAsc); // Toggle sorting order
    setFiles(sortedFiles);
  };

  useEffect(() => {
    const updatedDetails1 = [
      {
        title: 'Asset Name',
        name:
          (response?.data?.data?.asset?.name?.english
            ? response?.data?.data?.asset?.name?.english
            : response?.data?.data?.asset?.identification
                ?.registrationNumber) ?? '---',
      },
      {
        title: 'Asset Type',
        name: response?.data?.data?.assetType
          ? response?.data?.data?.assetType
          : '---',
      },
      {
        title: 'Category',
        name: response?.data?.data?.issueCategoryId.name?.english
          ? response?.data?.data?.issueCategoryId.name?.english
          : '---',
      },
      {
        title: 'Sub-Category',
        name: response?.data?.data?.issueSubCategoryId.name?.english
          ? response?.data?.data?.issueSubCategoryId.name?.english
          : '---',
      },
      {
        title: 'Priority',
        name: response?.data?.data?.priorityId?.name?.english
          ? response?.data?.data?.priorityId?.name?.english
          : '---',
      },
      {
        title: 'Watcher',
        name:
          response?.data?.data?.watcher.length > 0
            ? response?.data?.data?.watcher
            : '---',
      },
      {
        title: 'Reported By',
        name: response?.data?.data?.reportedBy?.name?.english
          ? response?.data?.data?.reportedBy?.name?.english
          : '---',
      },
      {
        title: 'Reported Date & Time',
        name: response?.data?.data?.reportedDate
          ? formatDate(response?.data?.data?.reportedDate)
          : '---',
      },
      {
        title: 'Due Date',
        name: response?.data?.data?.dueDate
          ? formatDate(response?.data?.data?.dueDate)
          : '---',
      },
      {
        title: 'Asigned To',
        name: response?.data?.data?.assignedTo?.name?.english
          ? response?.data?.data?.assignedTo?.name?.english
          : '---',
      },
      {
        title: 'Description',
        name: response?.data?.data?.description
          ? response?.data?.data?.description
          : '---',
      },
      {
        title: 'Recording',
        name: response?.data?.data?.proofFiles?.audios[0],
      },
    ];

    setDetails1(() => updatedDetails1);
  }, [response]);
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-[#FF6F31]'; // or use hex codes: 'bg-[#28A745]'
      case 'Overdue':
        return 'bg-[#F6BF32]';
      case 'Resolved':
        return 'bg-[#4D9CF9]';
      case 'Closed':
        return 'bg-[#58D20E]';
      default:
        return 'bg-yellow-500'; // Default color if status is unknown
    }
  };
  const timeDifference = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    const differenceInMilliseconds = currentDate - inputDate;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);
    const differenceInWeeks = Math.floor(differenceInDays / 7);
    const differenceInMonths = Math.floor(differenceInDays / 30);
    const differenceInYears = Math.floor(differenceInMonths / 12);
    if (differenceInSeconds <= 60) {
      return `${differenceInSeconds} ${differenceInSeconds === 1 ? 'second' : 'seconds'} ago`;
    } else if (differenceInMinutes <= 60) {
      return `${differenceInMinutes} ${differenceInMinutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (differenceInHours <= 24) {
      return `${differenceInHours} ${differenceInHours === 1 ? 'hour' : 'hours'} ago`;
    } else if (differenceInDays <= 7) {
      return `${differenceInDays} ${differenceInDays === 1 ? 'day' : 'days'} ago`;
    } else if (differenceInWeeks <= 4) {
      return `${differenceInWeeks} ${differenceInWeeks === 1 ? 'week' : 'weeks'} ago`;
    } else if (differenceInMonths <= 12) {
      return `${differenceInMonths} ${differenceInMonths === 1 ? 'month' : 'months'} ago`;
    } else {
      return `${differenceInYears} ${differenceInYears === 1 ? 'year' : 'years'} ago`;
    }
  };

  const issueOpen = (reportedBy, date) => {
    return (
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[19px] h-[19px] bg-[#FF6F31]  rounded-3xl"></div>
          <span className="pl-2 text-[12px]">Issue Opened By</span>
          <span className="text-[#A6A6A6] pl-2 text-[12px]">
            {reportedBy ?? '-'}
          </span>
        </div>
        <div className="text-[#A6A6A6] pl-2 text-[12px]">
          {timeDifference(date ?? new Date())}
        </div>
      </div>
    );
  };
  const issueAssigned = (assignedTo, date) => {
    return (
      <div className="flex justify-between">
        <div className="flex">
          <div className="w-[19px] h-[19px] bg-[#FFBB0B]  rounded-3xl"></div>
          <span className="pl-2 text-[12px]">Issue Assigned To</span>
          <span className="text-[#A6A6A6] pl-2 text-[12px]">
            {assignedTo ?? '-'}
          </span>
        </div>
        <div className="text-[rgb(166,166,166)] pl-2 text-[12px]">
          {timeDifference(date ?? new Date())}
        </div>
      </div>
    );
  };
  const issueUpdated = (user, status, date) => {
    return (
      <div className="flex justify-between" key={user + status}>
        <div className="flex">
          <div
            className={`w-[19px] h-[19px] ${getStatusColor(status)} rounded-3xl`}
          ></div>
          <span className="pl-2 text-[12px]">Issue {status} By</span>
          <span className="text-[#A6A6A6] pl-2 text-[12px]">{user ?? '-'}</span>
        </div>
        <div className="text-[#A6A6A6] pl-2 text-[12px]">
          {timeDifference(date ?? new Date())}
        </div>
      </div>
    );
  };
  const lineComponent = () => {
    return (
      <>
        <div className="h-[15px] border-l-2 border-l-[#928D8D] border-dashed ml-2"></div>
      </>
    );
  };
  const redComponent = () => {
    return (
      <>
        <div className="flex">
          <div className="w-[25px] h-[25px] bg-[#FF1420] rounded-3xl items-center text-white flex">
            <span className=" pl-1.5 text-[8px]">S K</span>
          </div>
          <span className=" pl-2 text-[12px]">Workshop</span>
          <span className="text-[#A6A6A6] pl-2 text-[12px]">
            Submitted an inspection item
          </span>
        </div>
      </>
    );
  };

  return (
    <div className="overview-main-container">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="overview-inner-container-left">
          <TextDetailsOne details={details1} title={title1} />
        </div>
        <div className="overview-inner-container-right">
          <div className="w-100 h-[300px] border shadow-[4px_4px_20px_0px_#0000001A] mb-4 rounded-md">
            <div className="text-[#002850] w-[72px] h-[20px] text-[16px] font-semibold p-4">
              Timeline
            </div>
            {/* <div className="p-4 pt-2"> */}
            <div className="mt-6 mb-6 p-4 pt-2">
              <ScrollArea className="h-[200px] w-full">
                <div className="pl-1">
                  {issueOpen(
                    response?.data?.data?.reportedBy?.name?.english,
                    response?.data?.data?.createdAt
                  )}
                  {lineComponent()}
                  {issueAssigned(
                    response?.data?.data?.assignedTo?.name?.english,
                    response?.data?.data?.createdAt
                  )}
                  {lineComponent()}
                  {response?.data?.data?.issueStatusLogs.length > 0 && (
                    <>
                      {response?.data?.data?.issueStatusLogs.map(
                        (elem, index) => (
                          <React.Fragment key={index}>
                            {issueUpdated(
                              elem?.actionBy?.name?.english,
                              elem?.updatedStatus,
                              elem?.updatedOn
                            )}
                            {lineComponent()}
                          </React.Fragment>
                        )
                      )}
                    </>
                  )}
                </div>
                {redComponent()}
              </ScrollArea>
            </div>
            {/* </div> */}
          </div>
          {/* File List with Sorting */}
          {isDocumentsUploaded && (
            <div className="w-100 h-[492px] border shadow-[4px_4px_20px_0px_#0000001A] rounded-md">
              <div className="text-[#002850] w-100 h-[26px] text-[16px] font-semibold p-4 pl-2 mb-3 flex justify-between">
                <span>Images/Documents</span>
                <div className="cursor-pointer p-3" onClick={handleSortFiles}>
                  {upDownArrow({ width: 24, height: 24 })}
                </div>
              </div>
              <ScrollArea className="h-[400px] w-full">
                <div className="w-100 flex-wrap flex">
                  {files.map((elem, idx) => (
                    <div
                      key={idx}
                      className="flex flex-col align-middle items-center justify-center pl-3 pr-2 py-3"
                    >
                      <a
                        href={elem.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        {renderFile(elem.file)}
                      </a>
                      <div className="text-[14px]">{`File ${idx + 1}`}</div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;
