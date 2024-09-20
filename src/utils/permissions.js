import {
  VEHICLE,
  WORKSHOP,
  WORKSHOP_SUB_ITEMS,
  VEHICLE_SUB_ITEMS,
} from '@/constants/permissionsConstants';

const getPermissions = (permissions, moduleName, subItemName) => {
  let hasPermission = {};
  permissions?.forEach((module) => {
    if (module.moduleName === moduleName) {
      module.subItems?.forEach((subItem) => {
        if (subItem.moduleName === subItemName) {
          hasPermission = subItem.actions || {};
        }
      });
    }
  });
  return hasPermission;
};

// const getPermissions = (permissions, moduleName, subItemName) => {
//   let hasPermission = {};

//   permissions?.forEach((module) => {
//     if (module.moduleName === moduleName) {
//       module.subItems?.forEach((subItem) => {
//         if (subItem.moduleName === subItemName) {
//           hasPermission = subItem.actions || {};
//         }

//         // Check for nested sub-items
//         subItem.subItems?.forEach((nestedSubItem) => {
//           console.log("nestedSubItem>>",nestedSubItem);
//           if (nestedSubItem.moduleName === subItemName) {
//             hasPermission = nestedSubItem.actions || {};
//           }
//         });
//       });
//     }
//   });

//   return hasPermission;
// };

const createPermissionChecker =
  (actionType, moduleName, subItemName) => (permissions) => {
    const permission = getPermissions(permissions, moduleName, subItemName);
    return permission[actionType] || false;
  };

export const hasAddVehiclePermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLES
);
export const hasViewVehiclePermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLES
);
export const hasEditVehiclePermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLES
);
export const hasDeleteVehiclePermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLES
);

export const hasAddVehicleRosterPermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLE_ROSTER
);
export const hasViewVehicleRosterPermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLE_ROSTER
);
export const hasEditVehicleRosterPermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLE_ROSTER
);
export const hasDeleteVehicleRosterPermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.VEHICLE_ROSTER
);

export const hasAddVehicleRoutePermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.ROUTES
);
export const hasViewVehicleRoutePermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.ROUTES
);
export const hasEditVehicleRoutePermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.ROUTES
);
export const hasDeleteVehicleRoutePermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.ROUTES
);

export const hasAddVehicleCrewPermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.CREW
);
export const hasViewVehicleCrewPermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.CREW
);
export const hasEditVehicleCrewPermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.CREW
);
export const hasDeleteVehicleCrewPermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.CREW
);
export const hasAddVehicleTimeTablePermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.TIME_TABLE
);
export const hasViewVehicleTimeTablePermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.TIME_TABLE
);
export const hasUpdateVehicleTimeTablePermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.TIME_TABLE
);
export const hasDeleteVehicleTimeTablePermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.TIME_TABLE
);
export const hasAddIssuePermission = createPermissionChecker(
  'create',
  WORKSHOP,
  WORKSHOP_SUB_ITEMS.ISSUE
);
export const hasViewIssuePermission = createPermissionChecker(
  'view',
  WORKSHOP,
  WORKSHOP_SUB_ITEMS.ISSUE
);
export const hasEditIssuePermission = createPermissionChecker(
  'update',
  WORKSHOP,
  WORKSHOP_SUB_ITEMS.ISSUE
);
export const hasDeleteIssuePermission = createPermissionChecker(
  'delete',
  WORKSHOP,
  WORKSHOP_SUB_ITEMS.ISSUE
);
export const hasAddBunchingPermission = createPermissionChecker(
  'create',
  VEHICLE,
  VEHICLE_SUB_ITEMS.BUNCHING
);
export const hasViewBunchingPermission = createPermissionChecker(
  'view',
  VEHICLE,
  VEHICLE_SUB_ITEMS.BUNCHING
);
export const hasEditBunchingPermission = createPermissionChecker(
  'update',
  VEHICLE,
  VEHICLE_SUB_ITEMS.BUNCHING
);
export const hasDeleteBunchingPermission = createPermissionChecker(
  'delete',
  VEHICLE,
  VEHICLE_SUB_ITEMS.BUNCHING
);