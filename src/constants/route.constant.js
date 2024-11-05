import { Email } from '@mui/icons-material';

export const ROUTES = {
  FORGOT_PASSWORD: '/forgot-password',
  VERIFY_OTP: '/verify-otp',
  RESET_PASSWORD: '/rest-password',
  SET_PASSWORD: '/set-password',
  NEW_PASSWORD: '/new-password',
  USER_PROFILE: '/user-profile',
  DASHBOARDS: '/dashboard',
  PRIVACYPOLICE: '/privacy-policy',
  TERMS_CONDITIONS: '/terms-conditions',

  //   Reseller/Company

  RESELLERCOMPANY: '/reseller-company',
  RESELLCOMP_ADD: '/reseller-company/add',

  RESELLCOMP_ADDEDIT: '/reseller-company/update',

  RESELLCOMP_PREVIE: '/reseller-company/preview',



  MAGUSER:'/mag-user',
  MAGUSER_ADD:'/mag-user/add',
  
  MAGUSER_EDIT:'/mag-user/edit',












  //profiles pages

  PROFILE_1: '/profile/v1',

  //Inspections

  INSPECTIONS_FORMS_LIST: '/inspection-form-list',
  INSPECTIONS_FORMS: '/inspectionForm',
  INSPECTIONS: '/inspections',
  INSERT_INSPECTIONS: '/inspections/add',
  INSPECTIONS_WORKSHOP: '/inspections/workshop',
  INSPECTIONS_WORKSHOPID: '/inspections/workshop/:id',
  INSPECTIONS_ADDWORKSHOP: '/inspections/workshop/add',
  UPDATE_INSPECTIONS_ADDWORKSHOP: '/inspections/workshop/edit',
  INSPECTIONS_ADDVEHICLE: '/inspections/vehicle/add',
  UPDATE_INSPECTIONS_ADDVEHICLE: '/inspections/vehicle/edit',
  UPDATE_INSPECTIONS: '/inspections/edit/:id',
  PREVIEW_INSPECTIONS: '/inspections/preview/:id',
  INSPECTIONS_FORM_BUILDER_FORM: '/inspections_form_builder',
  INSPECTIONS_START_INSPECTION: '/inspections/start_inspection/:id',
  INSPECTIONS_FORM_GEN: '/inspections_form_gen',
  INSPECTIONS_EDIT_FORM_BUILDER_FORM: '/workshop_inspections_view',
  INSPECTIONS_ITEM_FAILURES: '/inspections/itemFailues',
  INSPECTIONS_SCHEDULES: '/inspections/schedule',

  //Vehicles
  VEHICLES: '/vehicles',
  DISPATCHER: '/dispatcher',
  VEHICLE_ROSTER: '/roster',
  CREW_ROSTER: '/crew-roster',
  MASTER_HISTORY: '/master-history',
  EXPENSE_HISTORY: '/expense-history',
  REPLACEMENT_ANALYSIS: '/replacement-analysis',
  INSERT_VEHICLE: '/vehicles/add',
  UPDATE_VEHICLE: '/vehicles/edit/:id',
  PREVIEW_VEHICLE: '/vehicles/preview/:id',
  HRM: '/hrm',
  //Inspections
  ISSUES: '/issues',
  INSERT_ISSUES: '/issues/add',
  UPDATE_ISSUES: '/issues/edit/:id',
  PREVIEW_ISSUES: '/issues/preview/:id',
  WORKORDERS: '/work-orders',
  INSERT_WORKORDERS: '/work-order/add',
  UPDATE_WORKORDERS: '/work-order/edit/:id',
  PREVIEW_WORKORDERS: '/work-order/preview/:id',
  SERVICE: '/service',
  ACCOUNT_FINANCE: '/accounts-finance',
  REPORTS: '/reports',
  IMPORT_DATA: '/import-data',
  HELP: '/help',
  STATUS_ISSUES: '/issues/status',

  //Masters
  MASTERS: '/masters',
  //Vehicle Make
  VEHICLE_MAKES: '/masters/vehicle-makes',
  INSERT_VEHICLE_MAKE: '/masters/vehicle-makes/add',
  UPDATE_VEHILCE_MAKE: '/masters/vehicle-makes/edit/:id',
  //Vehicle Chassis
  VEHICLE_CHASSIS: '/masters/vehicle-chassis',
  INSERT_VEHICLE_CHASSIS: '/masters/vehicle-chassis/add',
  UPDATE_VEHICLE_CHASSIS: '/masters/vehicle-chassis/edit/:id',
  //Vehicle Fuel
  VEHICLE_FUEL_TYPE: '/masters/vehicle-fuel-type',
  INSERT_VEHICLE_FUEL_TYPE: '/masters/vehicle-fuel-type/add',
  UPDATE_VEHICLE_FUEL_TYPE: '/masters/vehicle-fuel-type/edit/:id',
  //Vehicle Model
  VEHICLE_MODEL: '/masters/vehicle-model',
  INSERT_VEHICLE_MODEL: '/masters/vehicle-model/add',
  UPDATE_VEHICLE_MODEL: '/masters/vehicle-model/edit/:id',
  //Vehicle Trim
  VEHICLE_TRIM: '/masters/vehicle-trim',
  INSERT_VEHICLE_TRIM: '/masters/vehicle-trim/add',
  UPDATE_VEHICLE_TRIM: '/masters/vehicle-trim/edit/:id',
  //Vehicle Model Euro
  VEHICLE_MODEL_EURO: '/masters/vehicle-model-euro',
  INSERT_VEHICLE_MODEL_EURO: '/masters/vehicle-model-euro/add',
  UPDATE_VEHICLE_MODEL_EURO: '/masters/vehicle-model-euro/edit/:id',
  //Vehicle Type
  VEHICLE_TYPE: '/master/vehicle-type',
  INSERT_VEHICLE_TYPE: '/master/vehicle-type/add',
  //Vehicle Group
  VEHICLE_GROUP: '/master/vehicle-group',
  INSERT_VEHICLE_GROUP: '/master/vehicle-group/add',
  //Braking System
  BRAKING_SYSTEM: '/master/braking-system',
  INSERT_BRAKING_SYSTEM: '/master/braking-system/add',
  UPDATE_BRAKING_SYSTEM: '/master/braking-system/edit/:id',
  //Tyre Type
  TYRE_TYPE: '/master/tyre-type',
  INSERT_TYRE_TYPE: '/master/tyre-type/add',
  UPDATE_TYRE_TYPE: '/master/tyre-type/edit/:id',
  //Driver Type
  DRIVE_TYPE: '/master/driver-type',
  INSERT_DRIVE_TYPE: '/master/driver-type/add',
  UPDATE_DRIVE_TYPE: '/master/driver-type/edit/:id',
  //Transmission Type
  TRANSMISSION_TYPE: '/master/transmission-type',
  INSERT_TRANSMISSION_TYPE: '/master/transmission-type/add',
  UPDATE_TRANSMISSION_TYPE: '/master/transmission-type/edit/:id',
  //Village
  VILLAGE: '/master/village',
  INSERT_VILLAGE: '/master/village/add',
  UPDATE_VILLAGE: '/master/village/edit/:id',
  //Depot
  DEPOT: '/master/depot',
  INSERT_DEPOT: '/master/depot/add',
  UPDATE_DEPOT: '/master/depot/edit/:id',
  //Region
  REGION: '/master/region',
  INSERT_REGION: '/master/region/add',
  UPDATE_REGION: '/master/region/edit/:id',
  //organisation
  Organisation: '/master/organisation',
  INSERT_Organisation: '/master/organisation/add',
  UPDATE_Organisation: '/master/organisation/edit/:id',
  //Organisation Structure
  Organisation_structure: '/master/organisation-structure',
  INSERT_Organisation_structure: '/master/organisation-structure/add',
  UPDATE_Organisation_structure: '/master/organisation-structure/edit/:id',
  //Roles and Permission
  ROLES_PERMISSION: '/master/userrole',
  INSERT_ROLES_PERMISSION: '/master/userrole/add',
  UPDATE_ROLES_PERMISSION: '/master/userrole/edit/:id',

  //Operator
  OPERATOR: '/master/operator',
  INSERT_OPERATOR: '/master/operator/add',
  UPDATE_OPERATOR: '/master/operator/edit/:id',

  //User Role
  USER_ROLE: '/master/operator',
  INSERT_USER_ROLE: '/master/userRole/add',
  UPDATE_USER_ROLE: '/master/userrole/edit/:id',

  //Workshop
  WORKSHOP: '/master/workshop',
  INSERT_WORKSHOP: '/master/workshop/add',
  UPDATE_WORKSHOP: '/master/workshop/edit/:id',

  //Type Of Road
  Type_Of_Road: '/master/typeOfRoad',
  INSERT_Type_Of_Road: '/master/typeOfRoad/add',
  UPDATE_Type_Of_Road: '/master/typeOfRoad/edit/:id',
  //Device Type
  Device_Type: '/master/deviceType',
  INSERT_Device_Type: '/master/deviceType/add',
  UPDATE_Device_Type: '/master/deviceType/edit/:id',
  //District
  DISTRICT: '/master/district',
  INSERT_DISTRICT: '/master/district/add',
  UPDATE_DISTRICT: '/master/district/edit/:id',
  //State
  STATE: '/master/state',
  INSERT_STATE: '/master/state/add',
  UPDATE_STATE: '/master/state/edit/:id',
  //Country
  COUNTRY: '/master/country',
  INSERT_COUNTRY: '/master/country/add',
  UPDATE_COUNTRY: '/master/country/edit/:id',
  //Challan
  CHALLAN: '/challan',
  //Route
  ROUTE: '/route',
  INSERT_ROUTE: '/route/add',
  PREVIEW_ROUTE: '/route/preview/:id',
  ROUTE_EDIT: '/route/edit/:id',

  // time-table
  TIME_TABLE: '/time-table',
  TIME_TABLE_ADD: '/time-table/add',
  TIME_TABLE_EDIT: '/time-table/edit/:id',
  TIME_TABLE_PREVIEW: '/time-table/preview/:id',

  //staff

  PREIVIEW_USER: '/user-preview',
  NEW_USER: '/new_user',
  USERS: '/users',
  ADD_USER: '/users/add',
  UPDATE_USER: '/users/edit',
  //crew
  CREW: '/crew',

  PREIVIEW_CREW: '/crew-preview',
  ADD_CREW: '/crew/add',
  UPDATE_CREW: '/crew/edit',
  //Email template
  Email_Template: '/verify-email',
  //Fuel & Charging
  FUEL_CHARGING: '/fuel-charging',
  ADD_FUEL_CHARGING: '/fuel-charging/add',
  UPDATE_FUEL_CHARGING: '/fuel-charging/edit',
  // PREVIEW_FUEL_CHARGING: '/fuel-charging/preview/:id',

  PREVIEW_FUEL_CHARGING: '/fuel-charging/preview',
  FUEL_CHARGING: '/fuel-charging',
  ADD_FUEL_CHARGING: '/fuel-charging/add',
  UPDATE_FUEL_CHARGING: '/fuel-charging/edit',

  //Vehicle Bunching
  VEHICLE_BUNCHING: '/vehicle-bunching',
  ADD_VEHICLE_BUNCHING: '/vehicle-bunching/add',
  UPDATE_VEHICLE_BUNCHING: '/vehicle-bunching/edit',
};
