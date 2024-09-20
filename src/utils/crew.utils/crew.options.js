import { exportIcon, importIcon, plusIcon } from "@/assets/Icons";
import { ROUTES } from "@/constants/route.constant";
import { hasAddVehicleCrewPermission,hasEditVehicleCrewPermission,hasViewVehicleCrewPermission,hasDeleteVehicleCrewPermission } from "../permissions";
import useStore from "@/store/userStore";
const initialTableOptions = {
  loading: false,
  page: 0,
  pageSize: 15,
  totalCount: 0,
  rows: [],
};

const crewActionButtons = (navigate) => {
  const {permissions}=useStore()
  return [
    {
      isRoute: true,
      label: '+Add Crew',
      onClick: () => navigate(ROUTES.ADD_CREW),
      show: hasAddVehicleCrewPermission(permissions),
      className: 'button',
    },
  ];
};

const crewMoreActionData = [
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
  { tabName: "ARM" },
  { tabName: "SM" },
  { tabName: "RM" },
];

export {
  initialTableOptions,
  // crewTableHeaders,
  crewActionButtons,
  crewMoreActionData,
  usersTabs,
};
