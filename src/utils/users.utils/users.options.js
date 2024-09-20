import {
  exportIcon,
  importIcon,
  plusIcon,
  editIcon,
  deleteIcon,
} from "@/assets/Icons";
import { ROUTES } from "@/constants/route.constant";
import RowDetailsButton from "@/components/DataGrid/RowDetailsButton";
const initialTableOptions = {
  loading: false,
  page: 0,
  pageSize: 15,
  totalCount: 0,
  rows: [],
};

const commonKeys = {
  headerClassName: "super-app-theme--header remove-separator",
  width: 180,
};
const commonKeys90 = {
  headerClassName: "super-app-theme--header remove-separator",
  width: 90,
};
const commonKeys120 = {
  headerClassName: "super-app-theme--header remove-separator",
  width: 120,
};

const staffTableHeaders = [
  {
    field: "index",
    headerName: "#",
    ...commonKeys90,
  },
  {
    field: "code",
    headerName: "ID",
    ...commonKeys,
    width: 100,
  },
  {
    field: "role",
    headerName: "Type",
    ...commonKeys90,
  },
  {
    field: "name",
    headerName: "Name",
    ...commonKeys90,
  },
  {
    field: "service",
    headerName: "Service",
    ...commonKeys120,
  },

  {
    field: "depot",
    headerName: "Depot ",
    ...commonKeys90,
  },
  {
    field: "category",
    headerName: "Category",
    ...commonKeys120,
  },
  {
    field: "age",
    headerName: "Age (Year)",
    ...commonKeys120,
  },

  {
    field: "runLastWeek",
    headerName: "Run (Last Week) (km)",
    ...commonKeys,
  },

  {
    field: "runTotal",
    headerName: "Total Run (km)",
    ...commonKeys,
  },
  {
    field: "doj",
    headerName: "Date Of Joining",
    ...commonKeys,
  },
  {
    field: "accidents",
    headerName: "Accidents",
    ...commonKeys120,
  },
  {
    field: "contractEndDate",
    headerName: "Contract End Date",
    ...commonKeys,
  },

  {
    field: "licenseValidity",
    headerName: "License Validity",
    ...commonKeys,
  },

  {
    field: "dutyCancellations",
    headerName: "Duty Cancellations",
    ...commonKeys,
  },
  {
    field: "avgMileage",
    headerName: "Avg Mileage",
    ...commonKeys,
  },
];

// const commonHeaders = armTableHeaders?.filter((ele) => ele?.field !== "depot");

const userRolesHeaders = {
  All: staffTableHeaders,
  ARM: "",
  SM: "",
  RM: "",
};

const staffActionButtons = (navigate) => {
  return [
    {
      isRoute: true,
      label: "+Add User",
      onClick: () => navigate(ROUTES.ADD_USER),
      show: true,
      className: "button",
    },
  ];
};

const staffMoreActionData = [
  {
    title: "Add Multiple users",
    icon: plusIcon({ width: 13, height: 13 }),
    onClick: "",
  },
  {
    title: "Import Users",
    type: "users",
    icon: importIcon({ width: 13, height: 13 }),
    onClick: () => {
      const fileInput = document.getElementById("bulk-upload");
      fileInput.click();
    },
  },
  {
    title: "Export CSV",
    icon: exportIcon({ width: 12, height: 11 }),
    onClick: "",
  },
];

const usersTabs = [
  { tabName: "All" },
  { tabName: "AMD" },
  { tabName: "ARM" },
  { tabName: "CGM" },
  { tabName: "DSM" },
  { tabName: "FC" },
  { tabName: "FM" },
  { tabName: "FI" },
  { tabName: "GM" },
  { tabName: "LA" },
  { tabName: "MD" },
  { tabName: "RM" },
  { tabName: "SF" },
  { tabName: "SM" },
  { tabName: "SI" },
  { tabName: "TK" },
];

export {
  initialTableOptions,
  userRolesHeaders,
  staffTableHeaders,
  staffActionButtons,
  staffMoreActionData,
  usersTabs,
};
