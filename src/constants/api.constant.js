import { VEHICLE } from './permissionsConstants';

export const APIS = {
  LOGIN: 'user/login',

  // LOGIN: 'v1/auth/login'
  // ADD_USER: 'v1/adminusers/addUser',
  FORGET_PASSWORD: 'v1/auth/forgotPassword',

  RESET_PASSWORD: 'v1/auth/resetpassword',
  CHANGE_PASSWORD: 'adminusers/changepassword',
  USER_PROFILE: 'v1/adminusers/userProfile',
  VERIFYOTP: 'v1/auth/verifyotp',
  GET_ALL_VEHICLES: 'v2/vehicle',

  GET_ALL_Inspections: 'v2/inspection',
  UPDATE_VEHICLE_STATUS: 'v2/vehicle/update-status',
  EXPORT_VEHICLES: 'v2/vehicle/export',
  INSERT_VEHICLE_MAKE: '/vehicleMakes/insert',
  UPDATE_VEHICLE_MAKE: '/vehicleMakes/insert',
  GET_ALL_CHASSIS_BODY_TYPE: 'vehicleChassisTypes/getall',
  INSERT_CHASSIS_BODY_TYPE: 'vehicleChassisTypes/insert',
  UPDATE_CHASSIS_BODY_TYPE: 'vehicleChassisTypes/update',
  GET_ALL_VEHICLE_MODEL: 'vehicleModels/getall',
  INSERT_VEHICLE_MODEL: 'vehicleModels/insert',
  UPDATE_VEHICLE_MODEL: 'vehicleModels/update',
  GET_ALL_FUEL_TYPE: 'vehicleFuelTypes/getall',
  INSERT_FUEL_TYPE: 'vehicleFuelTypes/insert',
  UPDATE_FUEL_TYPE: 'vehicleFuelTypes/update',
  GET_ALL_VEHICLE_TRIM: 'vehicleTrims/getall',
  INSERT_VEHICLE_TRIM: 'vehicleTrims/insert',
  UPDATE_VEHICLE_TRIM: 'vehicleTrims/update',
  GET_ALL_VEHICLE_MODEL_EURO: 'modelEuros/getall',
  INSERT_VEHICLE_MODEL_EURO: 'modelEuros/insert',
  UPDATE_VEHICLE_MODEL_EURO: 'modelEuros/update',
  //MastersV2
  COUNTRY: 'v2/masters/country/',
  STATE: 'v2/masters/state/',
  SEATING_CONFIGURATION: 'v2/masters/seatingConfiguration/',
  DISTRICT: 'v2/masters/district/',
  DEPOT: 'v2/masters/depot/',
  ORGANISATION: 'v2/masters/organisation',
  DESIGNATION: 'v2/masters/organisation-structure',
  ROAD_TYPE: 'v2/masters/typeOfRoad',
  DEVICE_TYPE: 'v2/masters/deviceType',
  OPERATOR: 'v2/masters/operator',
  USER_ROLE: 'v2/masters/userRole',
  FABRICATOR: 'v2/masters/fabricator/',
  FOOD_COURT: 'v2/masters/dhaba/',
  BRAKE_SYSTEM: 'v2/masters/brakingSystem/',
  FABRICTOR: 'v2/masters/fabricator/',
  REGION: 'v2/masters/region',
  PRIORITY: 'v2/masters/priority/',
  TYRE_TYPE: 'v2/masters/tyreType/',
  DRIVE_TYPE: 'v2/masters/vehicleDriveType/',
  ENGINE_BRAND: 'v2/masters/engineBrand/',
  BUS_CATEGORY: 'v2/masters/group-in-depot/',
  BUS_OWNERSHIP: 'v2/masters/busOwnership/',
  BUS_STOP: 'v2/masters/busStop/',
  CONTRACTOR: 'v2/masters/contractor/',
  BUS_SERVICE_TYPE: 'v2/masters/typeOfService/',
  CHASSIS_BODY_TYPE: 'v2/masters/chassisType/',
  VILLAGE: 'v2/masters/village/',
  FUEL_TYPE: 'v2/masters/fuelType/',
  ISSUE_CATEGORY: 'v2/masters/issueCategory/',
  ISSUE_SUB_CATEGORY: 'v2/masters/issueSubCategory/',
  OFFICE: 'v2/masters/office/',
  OFFICEFACILITY: 'v2/masters/officeFacility/',
  MODEL_EURO: 'v2/masters/modelEuro/',
  TOLL: 'v2/masters/toll/',
  ROUTE_TYPE: 'v2/masters/routeType/',
  ROUTE_CATEGORY: 'v2/masters/routeCategory/',
  VEHICE_COLOUR: 'v2/masters/vehicleColour/',
  VEHICLE_MAKE: 'v2/masters/vehicleMake/',
  VEHICLE_TYPE: 'v2/masters/vehicleType/',
  VEHICLE_TRIM: 'v2/masters/vehicleTrim/',
  VEHICLE_GROUP: 'v2/masters/vehicleGroup/',
  VEHICLE_COLOUR: 'v2/masters/vehicleColour/',
  VEHICLE_MODEL: 'v2/masters/vehicleModel/',
  VEHICLE_BULK_UPLOAD: 'v2/vehicle/bulk-upload',
  TRANSMISSION_TYPE: 'v2/masters/transmissionType/',
  VENDOR: 'v2/masters/vendor/',
  WORKSHOP: 'v2/masters/workshop/',
  USER_LIST: 'adminusers/getAllUsers',

  USER_ALL_LIST: '/v1/user',
  COMP_RESEL: '/user/getAllUsers',
  // USER_ALL_LIST: '/industry',
  UPDATE_USER_BY_ID: 'v1/user',

  ADD_USER: '/user/signup',


  // /visitors
  // https://magnet.evalue8.info/api/user/signup
  // USERS_BY_ID: 'adminusers/getUserById',

  USERS_BY_ID: '/v1/user',

  // api/user/userList
  // UPDATE_USER_BY_ID: 'adminusers/updateUserById',
  DRIVER_CONDUCTOR: 'v2/driverconductor',
  GET_ALL_ROUTES: '/v1/route',
  GET_ALL_TIME_TABLE: '/v1/time-table',
  DISPATCH: '/v1/time-table/dispatch',
  ISSUES: '/v2/issue',
  GET_ISSUES: '/v2/issue',
  DEVICE_VENDOR: 'v2/masters/deviceVendor',
  ROLES_PERMISSION: 'v2/masters/userrole',
  DEPOT_BULK_UPLOAD: 'v2/masters/depot/bulk-upload',
  STATE_BULK_UPLOAD: 'v2/masters/state/bulk-upload',
  DISTRICT_BULK_UPLOAD: 'v2/masters/district/bulk-upload',
  DHABA_BULK_UPLOAD: 'v2/masters/dhaba/bulk-upload',
  REGION_BULK_UPLOAD: 'v2/masters/region/bulk-upload',
  BUS_STOP_BULK_UPLOAD: 'v2/masters/busStop/bulk-upload',
  VERIFY_EMAIL: 'v1/adminusers/verify-email',
  INVITE: 'v1/adminusers/invite',
  SET_PASSWORD: 'v1/adminusers/setpassword',
  FUELVENDORS: 'v2/masters/fuelVendors',
  FUELANDCHAGING: 'v2/fuelCharging/',
  INSPECTION_FORMS: 'v2/inspectionForm',
  INSPECTION_VEHICLE_FORMS: 'v2/inspectionVehicleForm/',
  VEHICLEDATA: 'v2/vehicle/all-vehicle-numbers',
  VERIFY_USER_OTP: 'v1/adminusers/verifyotp',

  START_INSPECTION: 'V2/startInspection',
  START_INSPECTION_Issues: 'V2/startInspection/issues',

  //profile pages

  // PROFILE_1: 'user/getAllUsers',

  PROFILE_1: 'user/userList',

  PROFILE_IDENT:'user/userListIdentifier',

  INDUSTRY: 'industry',

  ADD_VISITOR: 'visitors',
  ADD_ENQUIRY: 'enquiry',
  ADD_REFERREL: 'referrel',


};
