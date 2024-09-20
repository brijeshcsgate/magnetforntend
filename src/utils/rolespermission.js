export const getRolesPermissions = (permissions, moduleName, action) => {
    let hasPermission = false;
  
    const checkModulePermissions = (module, moduleName, action) => {
      if (module?.moduleName === moduleName) {
        if (module.actions[action]) {
          return true;
        }
      }

      return module?.subItems?.some(subItem => checkModulePermissions(subItem, moduleName, action));
    };
  
    permissions?.forEach((module) => {
      if (checkModulePermissions(module, moduleName, action)) {
        hasPermission = true;
      }
    });
  
    return hasPermission;
  };
  