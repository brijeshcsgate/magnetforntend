import {
  rocketIcon,
  meterIcon,
  houseIcon,
  memberIcon,
  boxIcon,
  settingIcon,
  fuelIcon,
  cardIcon,
  notesIcon,
  heartIcon,
  issueSubIcon,
  serviceSubIcon,
  dispatchSubIcon,
  vehicleSubIcon,
  rosterSubIcon,
  crewSubIcon,
  crewRosterSubIcon,
  routeSubIcon,
  timeTableSubIcon,
  meterSubIcon,
  experienceSubIcon,
  replacementSubIcon,
  InspectionIcon,
  InspectionHistoryIcon,
  InspectionFailureIcon,
  InspectionScheduleIcon,
  InspectionFormsIcon,
} from '@/assets/Icons';
import { ROUTES } from '@/constants/route.constant';

const initialMenuState = {
  type: '',
  open: false,
};

const sidebarRoutes = [
  // {
  //   label: 'Getting Started',
  //   isMenu: false,
  //   img: rocketIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: '/',
  //   subItems: [],
  // },
  // {
  //   label: 'Dashboard',
  //   isMenu: false,
  //   img: meterIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: '/dashboard',
  //   subItems: [],
  // },
  // {
  //   label: 'Depot Fleet Operation',
  //   isMenu: true,
  //   img: houseIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: '#',
  //   subItems: [
  //     {
  //       label: 'Vehicles',
  //       img: vehicleSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.VEHICLES,
  //     },
  //     {
  //       label: 'Vehicle Roster',
  //       img: rosterSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.VEHICLE_ROSTER,
  //     },
  //     {
  //       label: 'Routes',
  //       img: routeSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.ROUTE,
  //     },
  //     {
  //       label: 'Crew',
  //       img: crewSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.CREW,
  //     },
  //     {
  //       label: 'Crew Roster',
  //       img: crewRosterSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.CREW_ROSTER,
  //     },
  //     {
  //       label: 'Time Table',
  //       img: timeTableSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.TIME_TABLE,
  //     },
  //     {
  //       label: 'Dispatcher',
  //       img: dispatchSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.DISPATCHER,
  //     },
  //     {
  //       label: 'Meter History',
  //       img: meterSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.MASTER_HISTORY,
  //     },
  //     {
  //       label: 'Expense History',
  //       img: experienceSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.EXPENSE_HISTORY,
  //     },
  //     {
  //       label: 'Replacement Analysis',
  //       img: replacementSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.REPLACEMENT_ANALYSIS,
  //     },
  //     {
  //       label: 'Bunching',
  //       img: replacementSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //        route: ROUTES.VEHICLE_BUNCHING
  //     },
  //   ],
  // },
  // {
  //   label: 'HRM',
  //   isMenu: false,
  //   img: memberIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.HRM,
  //   subItems: [],
  // },
  // {
  //   label: 'Challan',
  //   isMenu: false,
  //   img: boxIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.CHALLAN,
  //   subItems: [],
  // },
  // {
  //   label: 'Workshop & Maintenance',
  //   isMenu: true,
  //   img: settingIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: '#',
  //   subItems: [
  //     {
  //       label: 'Inspection',
  //       img: InspectionIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: '#',
  //       isMenu: true,
  //       subItems: [
  //         {
  //           label: 'Inspection History',
  //           img: InspectionHistoryIcon({
  //             width: 16,
  //             height: 16,
  //             fill: '#8da3b6',
  //           }),
  //           route: ROUTES.INSPECTIONS,
  //           isMenu: false,
  //           subItems: [],
  //         },
  //         {
  //           label: 'Item Failures',
  //           img: InspectionFailureIcon({
  //             width: 16,
  //             height: 16,
  //             fill: '#8da3b6',
  //           }),
  //           route: ROUTES.INSPECTIONS_ITEM_FAILURES,
  //           isMenu: false,
  //           subItems: [],
  //         },
  //         {
  //           label: 'Schedules',
  //           img: InspectionScheduleIcon({
  //             width: 16,
  //             height: 16,
  //             fill: '#8da3b6',
  //           }),
  //           route: ROUTES.INSPECTIONS_SCHEDULES,
  //           isMenu: false,
  //           subItems: [],
  //         },
  //         {
  //           label: 'Forms',
  //           img: InspectionFormsIcon({
  //             width: 16,
  //             height: 16,
  //             fill: '#8da3b6',
  //           }),
  //           route: ROUTES.INSPECTIONS_FORMS_LIST,
  //           isMenu: false,
  //           subItems: [],
  //         },
  //       ],
  //     },
  //     {
  //       label: 'Issue',
  //       img: issueSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.ISSUES,
  //     },
  //     {
  //       label: 'Service',
  //       img: serviceSubIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //       route: ROUTES.SERVICE,
  //     },
  //   ],
  // },
  // {
  //   label: 'Fuel & Charging',
  //   isMenu: false,
  //   img: fuelIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.FUEL_CHARGING,
  //   subItems: [],
  // },
  // {
  //   label: 'Accounts & Finance',
  //   isMenu: false,
  //   img: boxIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.ACCOUNT_FINANCE,
  //   subItems: [],
  // },
  // {
  //   label: 'Reports',
  //   isMenu: false,
  //   img: notesIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.REPORTS,
  //   subItems: [],
  // },
  {
    label: 'User Management',
    isMenu: false,
    img: cardIcon({ width: 16, height: 16, fill: '#8da3b6' }),
    route: ROUTES.USERS,
    subItems: [],
  },
  {
    label: 'Reseller/Company',
    isMenu: false,
    img: cardIcon({ width: 16, height: 16, fill: '#8da3b6' }),
    route:ROUTES.RESELLERCOMPANY,
    subItems: [],
  },
  // {
  //   label: 'Masters',
  //   isMenu: false,
  //   img: cardIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.MASTERS,
  //   subItems: [],
  // },
  // {
  //   label: 'Help',
  //   isMenu: false,
  //   img: heartIcon({ width: 16, height: 16, fill: '#8da3b6' }),
  //   route: ROUTES.HELP,
  //   subItems: [],
  // },
];

export { sidebarRoutes, initialMenuState };

