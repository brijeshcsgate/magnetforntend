// import Inspection from '@/pages/InspectionModule/index';

// import PreviewInspection from '@/pages/InspectionModule/PreviewInspections';

// //Vehicles
// import Vehicles from '@/pages/Vehicles';
// import PreviewVehicle from '@/pages/Vehicles/PreviewVehicle';
// import AddVehicleV2 from '@/pages/Vehicles/AddVehicleV2/AddVehicleV2';
import Login from '@/pages/Authentication/login/Login';
import { ROUTES } from '@/constants/route.constant';
import ForgotPassword from '@/pages/Authentication/forgotPassword';
import VerifyOtp from '@/pages/Authentication/verifyOtp';
import ResetPassword from '@/pages/Authentication/ResetPassword';
// import Challan from '@/pages/Challan';
// import MastersV2 from '@/pages/MastersV2/MastersV2';
// import CommonMastersList from '@/pages/MastersV2/CommonMastersList/CommonMastersList';
// import AddEditMasters from '@/pages/MastersV2/AddMasters';
// import Test from '@/components/Test';
// import DashBoard from '@/pages/DashBoard/DashBoard';
import UserRole from '@/pages/user-role';
// import Dispatcher from '@/pages/dms/Dispatcher';
// import Issues from '@/pages/issues';
// import IssuesList from '@/pages/issues/List';
// import PreviewIssues from '@/pages/issues/Preview';
// import StatusIssues from '@/pages/issues/Status';
// import WorkOrder from '@/pages/work-order';
// import WorkOrdersList from '@/pages/work-order/List';
// import PreviewWorkOrder from '@/pages/work-order/Preview';
// import Service from '@/pages/service';
// import HRM from '@/pages/hrm';
// import VehicleRoster from '@/pages/vehicle-roster';
// import Crew from '@/pages/crew/index';
// import CrewRoster from '@/pages/crew-roster';
// import MasterHistory from '@/pages/meter-history';
// import ExpensesHistory from '@/pages/expense-history';
// import ReplacementAnalysis from '@/pages/replacement-analysis';
// import FuelCharging from '@/pages/dms/fuelCharging/index';
// import AccountFinance from '@/pages/account-finace';
// import Reports from '@/pages/reports';
// import Help from '@/pages/help';
import PrivacyPolice from '@/pages/Authentication/PrivacyPolicy';
// import GettingStarted from '@/pages/getting-started';
// // Route
// import Route from '@/pages/dms/Route';
// import CreateRoute from '@/pages/dms/Route/AddEditRoute';
// import PreviewRoute from '@/pages/dms/Route/Preview';
// TimeTable
// import TimeTable from '@/pages/dms/TimeTable';
// import TimeTablePreview from '@/pages/dms/TimeTable/Preview';
// import AddTimeTable from '@/pages/dms/TimeTable/AddEditTimeTable';
import AddEditUser from '@/pages/UserAddEdit/AddEditUser';
// import AddInspectionFormBuilderCreateForm from '@/pages/InspectionModule/AddInspectionFormBuilder/AddInspectionFormBuilderCreateForm';
import EmailTemplate from '@/pages/verify-email';
import SetPassword from '@/pages/verify-email/set-password';
// import WorkShopForms from '@/pages/InspectionModule/WorkShopForms/WorkShopForms';
// import AddWorshop from '@/pages/InspectionModule/WorkShopForms/AddWorshop';
// import AddVehicle from '@/pages/InspectionModule/WorkShopForms/WorkshopTabs/Addvehicle';
// import AddEditCharging from '@/pages/dms/fuelCharging/AddEditFuleCharging';
// import PreviewCharging from '@/pages/dms/fuelCharging/preview';
// import AddInspection from '@/pages/InspectionModule/AddInspections/AddInspection';
// import InspectionViewNewItem from '@/pages/InspectionModule/InspectionViewItem/InspectionViewItem';
// import AddWorkshop from '@/pages/InspectionModule/WorkShopForms/AddWorshop';
import TermsOfUse from './pages/Authentication/PrivacyPolicy/TermsOfUse';
// import UserListView from './pages/user/index2';
// import PreviewUsers from './pages/user-role/UserPreview';
// import InspectionFormList from './pages/InspectionModule/InspectionForm/InspectionFormList/InspectionFormList';
// import CitizenCentricPage from './pages/citizen-app/index.page';
// import CitizenComplainPage from './pages/citizen-app/citizen-complain/index.page';
// import CitizenRequestroutePage from './pages/citizen-app/citizen-requestroute/index.page';
// import CitizenRentBusPage from './pages/citizen-app/citizen-rentbus/index.page';
// import CitizenBusRatingsPage from './pages/citizen-app/citizen-busratings/index.page';
// import CitizenBusStaffRatingsPage from './pages/citizen-app/citizen-busstaffratings/index.page';
// import CitizenFeedbackPage from './pages/citizen-app/citizen-feedback/index.page';
// import CitizenNotificationPage from './pages/citizen-app/citizen-notification/index.page';
// import AddEditCrewPage from './pages/crew/crew-add-edit/AddEditCrewPage';
// import CrewPreview from './pages/crew/crew-preview';
// import InspectionFormGen from './pages/InsGeneratedFormModule';
// import VehicleBunching from './pages/dms/Bunching';
// import StartInspection from './pages/InspectionModule/StartInspection/StartInspection';
// import UserProfilePage from './pages/UserProfile';
// import ItemFailures from './pages/InspectionModule/ItemFailures';
// import Schedules from './pages/InspectionModule/Schedules';
// import AddEditCrew from './pag@/pages/dms/fuelCharging/preview

// import InspectionFormGen from './pages/InsGeneratedFormModule';
const protectedRoutes = [
  // { path: '/test', component: Test },
  // { path: '/', component: GettingStarted },
  // { path: '/dashboard', component: DashBoard },

  // { path: ROUTES.NEW_PASSWORD, component: ResetPassword },
  // { path: ROUTES.USER_PROFILE, component: UserProfilePage },
  // //Masters
  // { path: ROUTES.MASTERS, component: MastersV2 },
  // { path: `${ROUTES.MASTERS}/:routeId`, component: CommonMastersList },
  // { path: `${ROUTES.MASTERS}/:routeId/add`, component: AddEditMasters },
  // { path: `${ROUTES.MASTERS}/:routeId/:id/edit`, component: AddEditMasters },

  // { path: ROUTES.VEHICLE_BUNCHING, component: VehicleBunching },

  // //INSPECTIONS

  // { path: ROUTES.INSPECTIONS, component: Inspection },

  // { path: ROUTES.INSPECTIONS_FORMS_LIST, component: InspectionFormList },

  // {
  //   path: ROUTES.INSPECTIONS_EDIT_FORM_BUILDER_FORM,
  //   component: InspectionViewNewItem,
  // },

  // { path: ROUTES.INSERT_INSPECTIONS, component: AddInspection },
  // { path: ROUTES.UPDATE_INSPECTIONS, component: AddInspection },
  // { path: ROUTES.PREVIEW_INSPECTIONS, component: PreviewInspection },
  // { path: ROUTES.INSPECTIONS_START_INSPECTION, component: StartInspection },
  // { path: ROUTES.INSPECTIONS_WORKSHOP, component: WorkShopForms },
  // { path: ROUTES.INSPECTIONS_ADDWORKSHOP, component: AddWorshop },
  // { path: ROUTES.INSPECTIONS_ADDVEHICLE, component: AddVehicle },
  // {
  //   path: `${ROUTES.UPDATE_INSPECTIONS_ADDWORKSHOP}/:id`,
  //   component: AddWorshop,
  //   // //permission: { moduleName: 'Inspection', actions: 'update' },
  // },
  // {
  //   path: `${ROUTES.UPDATE_INSPECTIONS_ADDVEHICLE}/:id`,
  //   component: AddVehicle ,
  //   // //permission: { moduleName: 'Inspection', actions: 'update' },
  // },
  // { path: ROUTES.INSPECTIONS_FORM_GEN, component: InspectionFormGen },

  // {
  //   path: ROUTES.INSPECTIONS_FORM_BUILDER_FORM,
  //   component: AddInspectionFormBuilderCreateForm,
  // },
  // // INSPECTIONS_FORM_BUILDER_FORM
  // //Vehicles
  // {
  //   path: ROUTES.VEHICLES,
  //   component: Vehicles,
  //   // //permission: { moduleName: 'Vehicles', actions: 'view' },
  // },
  // {
  //   path: ROUTES.INSERT_VEHICLE,
  //   component: AddVehicleV2,
  //   // //permission: { moduleName: 'Vehicles', actions: 'create' },
  // },
  // {
  //   path: ROUTES.UPDATE_VEHICLE,
  //   component: AddVehicleV2,
  //   // //permission: { moduleName: 'Vehicles', actions: 'update' },
  // },
  // { path: ROUTES.PREVIEW_VEHICLE, component: PreviewVehicle },
  // {
  //   path: ROUTES.CHALLAN,
  //   component: Challan,
  //   // //permission: { moduleName: 'Challan', actions: 'view' },
  // },
  // // ROUTE   NEW_USER

  // { path: ROUTES.PREIVIEW_USER, component: PreviewUsers },

  // { path: ROUTES.NEW_USER, component: UserListView },
  // {
  //   path: ROUTES.ROUTE,
  //   component: Route,
  //   // //permission: { moduleName: 'Routes', actions: 'view' },
  // },
  // {
  //   path: ROUTES.INSERT_ROUTE,
  //   component: CreateRoute,
  //   // //permission: { moduleName: 'Routes', actions: 'create' },
  // },
  // { path: ROUTES.PREVIEW_ROUTE, component: PreviewRoute },
  // {
  //   path: ROUTES.ROUTE_EDIT,
  //   component: CreateRoute,
  //   // //permission: { moduleName: 'Routes', actions: 'update' },
  // },
  // // TimeTable
  // {
  //   path: ROUTES.TIME_TABLE,
  //   component: TimeTable,
  //   // //permission: { moduleName: 'Time Table', actions: 'view' },
  // },
  // {
  //   path: ROUTES.TIME_TABLE_ADD,
  //   component: AddTimeTable,
  //   // //permission: { moduleName: 'Time Table', actions: 'create' },
  // },
  // { path: ROUTES.TIME_TABLE_PREVIEW, component: TimeTablePreview },
  {
    path: ROUTES.ADD_USER,
    component: AddEditUser,
    // //permission: { moduleName: 'User Management', actions: 'create' },
  },
  {
    path: `${ROUTES.UPDATE_USER}/:id`,
    component: AddEditUser,
    // //permission: { moduleName: 'User Management', actions: 'update' },
  },
  {
    path: ROUTES.USERS,
    component: UserRole,
    // //permission: { moduleName: 'User Management', actions: 'view' },
  },
  // {
  //   path: ROUTES.DISPATCHER,
  //   component: Dispatcher,
  //   // //permission: { moduleName: 'Dispatcher', actions: 'view' },
  // },
  // //Issues

  // //Issues
  // {
  //   path: ROUTES.ISSUES,
  //   component: IssuesList,
  //   // //permission: { moduleName: 'Issue', actions: 'view' },
  // },
  // {
  //   path: ROUTES.INSERT_ISSUES,
  //   component: Issues,
  //   // //permission: { moduleName: 'Issue', actions: 'create' },
  // },
  // {
  //   path: ROUTES.UPDATE_ISSUES,
  //   component: Issues,
  //   // //permission: { moduleName: 'Issue', actions: 'update' },
  // },
  // { path: ROUTES.PREVIEW_ISSUES, component: PreviewIssues },

  // {
  //   path: ROUTES.WORKORDERS,
  //   component: WorkOrdersList,
  //   // //permission: { moduleName: 'Issue', actions: 'view' },
  // },
  // {
  //   path: ROUTES.INSERT_WORKORDERS,
  //   component: WorkOrder,
  //   // //permission: { moduleName: 'Issue', actions: 'create' },
  // },
  // {
  //   path: ROUTES.UPDATE_WORKORDERS,
  //   component: WorkOrder,
  //   // //permission: { moduleName: 'Issue', actions: 'update' },
  // },
  // { path: ROUTES.PREVIEW_WORKORDERS, component: PreviewWorkOrder },

  // { path: ROUTES.STATUS_ISSUES, component: StatusIssues },
  // { path: ROUTES.SERVICE, component: Service },
  // {
  //   path: ROUTES.HRM,
  //   component: HRM,
  //   // //permission: { moduleName: 'HRM', actions: 'view' },
  // },
  // {
  //   path: ROUTES.VEHICLE_ROSTER,
  //   component: VehicleRoster,
  //   // //permission: { moduleName: 'Vehicle Roster', actions: 'view' },
  // },
  // {
  //   path: ROUTES.CREW,
  //   component: Crew,
  //   // //permission: { moduleName: 'Crew', actions: 'view' },
  // },
  // {
  //   path: ROUTES.ADD_CREW,
  //   component: AddEditCrewPage,
  //   //permission: { moduleName: 'Crew', actions: 'create' },
  // },

  // {
  //   path: ROUTES.PREIVIEW_CREW,
  //   component: CrewPreview,
  //   //permission: { moduleName: 'Crew', actions: 'view' },
  // },

  // {
  //   path: `${ROUTES.UPDATE_CREW}/:id`,
  //   component: AddEditCrewPage,
  //   //permission: { moduleName: 'Crew', actions: 'update' },
  // },
  // {
  //   path: ROUTES.CREW_ROSTER,
  //   component: CrewRoster,
  //   //permission: { moduleName: 'Crew Roster', actions: 'view' },
  // },

  // // { path: ROUTES.CREW, component: Crew },

  // // { path: ROUTES.PREIVIEW_CREW, component: CrewPreview },
  // // { path: ROUTES.ADD_CREW, component: AddEditCrewPage },

  // // // { path: ROUTES.ADD_CREW, component: AddEditCrew },
  // // // { path: `${ROUTES.UPDATE_CREW}/:id`, component: AddEditCrewPage },
  // // { path: `${ROUTES.UPDATE_CREW}/:id`, component: AddEditCrewPage },

  // {
  //   path: ROUTES.MASTER_HISTORY,
  //   component: MasterHistory,
  //   //permission: { moduleName: 'Meter History', actions: 'view' },
  // },
  // {
  //   path: ROUTES.EXPENSE_HISTORY,
  //   component: ExpensesHistory,
  //   //permission: { moduleName: 'Expense History', actions: 'view' },
  // },
  // {
  //   path: ROUTES.REPLACEMENT_ANALYSIS,
  //   component: ReplacementAnalysis,
  //   //permission: { moduleName: 'Replacement Analysis', actions: 'view' },
  // },

  // {
  //   path: ROUTES.ACCOUNT_FINANCE,
  //   component: AccountFinance,
  //   //permission: { moduleName: 'Accounts & Finance', actions: 'view' },
  // },
  // {
  //   path: ROUTES.REPORTS,
  //   component: Reports,
  //   //permission: { moduleName: 'Reports', actions: 'view' },
  // },
  // { path: ROUTES.HELP, component: CitizenCentricPage },
  // { path: '/help/citizen-complain', component: CitizenComplainPage },
  // { path: '/help/citizen-requestroute', component: CitizenRequestroutePage },
  // { path: '/help/citizen-rentbus', component: CitizenRentBusPage },
  // { path: '/help/citizen-feedback', component: CitizenFeedbackPage },
  // { path: '/help/citizen-busratings', component: CitizenBusRatingsPage },
  // { path: '/help/citizen-notification', component: CitizenNotificationPage },

  // {
  //   path: '/help/citizen-busstaffratings',
  //   component: CitizenBusStaffRatingsPage,
  // },

  // {
  //   path: ROUTES.FUEL_CHARGING,
  //   component: FuelCharging,
  //   //permission: { moduleName: 'Fuel & Charging', actions: 'view' },
  // },
  // {
  //   path: ROUTES.ADD_FUEL_CHARGING,
  //   component: AddEditCharging,
  //   //permission: { moduleName: 'Fuel & Charging', actions: 'create' },
  // },
  // {
  //   path: `${ROUTES.UPDATE_FUEL_CHARGING}/:id`,
  //   component: AddEditCharging,
  //   //permission: { moduleName: 'Fuel & Charging', actions: 'update' },
  // },
  // {
  //   path: `${ROUTES.PREVIEW_FUEL_CHARGING}/:id`,
  //   component: PreviewCharging,
  //   //permission: { moduleName: 'Fuel & Charging', actions: 'preview' },
  // },
  // {
  //   path: `${ROUTES.INSPECTIONS_WORKSHOP}`,
  //   component: InspectionViewNewItem,
  //   // //permission: { moduleName: 'Fuel & Charging', actions: 'preview' },
  // },
  // {
  //   path: `${ROUTES.INSPECTIONS_SCHEDULES}`,
  //   component: Schedules,
  //   // //permission: { moduleName: 'Fuel & Charging', actions: 'preview' },
  // },
  // {
  //   path: `${ROUTES.INSPECTIONS_ITEM_FAILURES}`,
  //   component: ItemFailures,
  //   // //permission: { moduleName: 'Fuel & Charging', actions: 'preview' },
  // },
];
const publicRoutes = [
  { path: '/', component: Login },
  { path: '/*', component: Login },
  { path: ROUTES.FORGOT_PASSWORD, component: ForgotPassword },
  { path: ROUTES.VERIFY_OTP, component: VerifyOtp },
  { path: ROUTES.RESET_PASSWORD, component: ResetPassword },
  { path: ROUTES.PRIVACYPOLICE, component: PrivacyPolice },
  { path: ROUTES.TERMS_CONDITIONS, component: TermsOfUse },
  { path: ROUTES.Email_Template, component: EmailTemplate },
  { path: ROUTES.SET_PASSWORD, component: SetPassword },
];
export { protectedRoutes, publicRoutes };
