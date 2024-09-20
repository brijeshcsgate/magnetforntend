import { getApi } from '@/services/method';

const modifyIssueResponse = ({
  setRows,
  setTotalCount,
  response,
  page,
  pageSize,
}) => {
  setTotalCount(
    response?.data?.totalCount || response?.pagination?.totalCount || 0
  );

  const rowdata = response?.data?.list?.map((item, index) => ({
    id: index + 1 + page * pageSize,
    _id: item?._id,
    allData: item,
    code: item?.code,
    asset: item?.asset?.name?.english
      ? item?.asset?.name?.english
      : item?.asset?.identification?.registrationNumber,
    assetType: item?.assetType,
    issueCategoryId: item?.issueCategoryId?.name?.english,
    issueSubCategoryId: item?.issueSubCategoryId?.name?.english,
    priorityId: item?.priorityId?.name?.english,
    reportedDate: item?.reportedDate,
    description: item?.description,
    assignedTo: item?.assignedTo?.name?.english,
    dueDate: item?.dueDate,
    watcher: item?.watcher?.name?.english,
    issueStatus: item?.issueStatus,
    reportedBy: item?.reportedBy?.name?.english,
    source: item?.source,
    // image: "/assets/imagePlaceHolder.svg",
    threedot: '/assets/threeDotDataGrid.svg',
  }));
  setRows(rowdata);
};
const stringToColor = (string) => {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
};

function truncateText(text, maxLength) {
  if (text?.length > maxLength) {
    return text.slice(0, maxLength) + '...';
  }
  return text;
}

const getFileInfo = async (fileUrl) => {
  try {
    const response = await fetch(
      `/api/file-metadata?url=${encodeURIComponent(fileUrl)}`
    );
    const metadata = await response.json();
    console.log('File metadata:', metadata);
    return metadata;
  } catch (error) {
    console.error('Error fetching file metadata:', error);
  }
};
export { modifyIssueResponse, stringToColor, truncateText, getFileInfo };
