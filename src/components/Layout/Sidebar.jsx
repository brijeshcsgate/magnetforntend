import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Collapse } from '@mui/material';
import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { greaterThenIcon, closedStateLogo } from '@/assets/Icons';
import {
  initialMenuState,
  sidebarRoutes,
} from '@/utils/sidebar.utils/side.options';
import useStore from '@/store/userStore';
import { CounterContext } from './commonLayout/TitleOfPageProvider';

const Sidebar = ({ isShowSidebar, toggleSidebar, onMouseLeave, onMouseEnter }) => {
  const location = useLocation();
  const pathname = location.pathname;
  const { permissions } = useStore();
  const [toggleMenu, setToggleMenu] = useState({
    type: '',
    open: false,
  });
  const [updatedSidebar, setUpdatedSidebar] = useState([]);
  const setUserSidebar = () => {
    const sidebar = [];
    const permissionsArray = Array.isArray(permissions) ? permissions : [];
    const processSubItems = (subItems, module) => {
      const resultSubItems = [];

      subItems.forEach((subItem) => {
        if (subItem.actions?.view) {
          const foundSubItem = module?.subItems?.find(
            (d) => d?.label === subItem?.moduleName
          );
          if (foundSubItem) {
            const subItemCopy = { ...foundSubItem, subItems: [] };
            if (subItem.subItems && subItem.subItems.length > 0) {
              subItemCopy.subItems = processSubItems(
                subItem.subItems,
                foundSubItem
              );
            }

            resultSubItems.push(subItemCopy);
          }
        }
      });

      return resultSubItems;
    };

    permissionsArray.forEach((item) => {
      const module = sidebarRoutes.find((d) => d.label === item.moduleName);

      if (module) {
        const moduleCopy = { ...module };
        moduleCopy.subItems = [];

        if (item.subItems && item.subItems.length > 0) {
          moduleCopy.subItems = processSubItems(item.subItems, module);
          if (moduleCopy.subItems.length > 0) {
            sidebar.push(moduleCopy);
          }
        } else if (item.actions?.view) {
          sidebar.push(moduleCopy);
        }
      }
    });

    // setUpdatedSidebar(sidebar);
    
    setUpdatedSidebar(sidebarRoutes);
    
  };

  useEffect(() => {
    if (permissions) {
      setUserSidebar();
    }
  }, [permissions]);


  const {setCount } = useContext(CounterContext);
  const handleToggleMenu = (ele) => {
  // useEffect(() => { 
    // setCount(ele?.label);
  // }, []);
    if (ele?.isMenu) {
      if (ele?.label === toggleMenu.type) {
        setToggleMenu({ type: ele?.label, open: !toggleMenu?.open });
      } else {
        setToggleMenu({ type: ele?.label, open: true });
      }
      toggleSidebar(true);
    } else {
      setToggleMenu(initialMenuState);
    }

  };
  const handleCloseSubmenu = () => {
    setToggleMenu({ type: '', open: false });
    onMouseLeave()
  }
  const isRouteActive = (route) => {
    return pathname === route || pathname.startsWith(`/${route}`);
  };

  const getActiveState = (ele) => {
    const isActive = isRouteActive(ele.route);
    const isChildActive = ele.subItems?.some((subEle) => isRouteActive(subEle.route));
    return { isActive, isChildActive };
  };
  const isSubmenuActive = (subItems) => {
    return subItems?.some((subItem) => {
      if (pathname === subItem.route || pathname.startsWith(`/${subItem.route}`)) {
        return true;
      }
      if (subItem.subItems && subItem.subItems.length > 0) {
        return isSubmenuActive(subItem.subItems); // Recursive check for deeper levels
      }
      return false;
    });
  };
  return (
    <>
      <div className={`biSidebarWrap ${isShowSidebar ? 'hide' : ''}`} onMouseEnter={onMouseEnter}  // Attach the event handler for mouse enter
        onMouseLeave={handleCloseSubmenu}
      >
        <div
          className={`${isShowSidebar ? 'd-flex' : ''}`}
          style={{ justifyContent: 'center' }}
        >
          {/* {closedStateLogo({ width: 50, height: 50 })} */}
        </div>

        {/* <button
          className={`arrowBtn ${!isShowSidebar ? '' : 'rotate'}`} 
          onClick={() => toggleSidebar()}
        >
          {greaterThenIcon({ width: 14, height: 12, fill: '#fff' })}
        </button> */}
        <ul className={` ${isShowSidebar ? 'biSidebar' : 'biSidebar2'}`}>
          {updatedSidebar.map((ele) => {
            const isActive =
              pathname === ele.route || pathname.startsWith(`/${ele.route}`);

            const isChildActive = isSubmenuActive(ele.subItems);


            const parentClass = isChildActive ? 'biLink active menu-disp' : '';

            const parentClass2 = isChildActive ? 'sub-menu-disp' : '';
            return (
              <li
                className={`biList ${parentClass}`}
                key={ele?.label}
                onClick={() => handleToggleMenu(ele)}
              >
                <Link
                  to={ele?.route || '#'}
                  className={`biLink ${isActive ? (isChildActive ? 'child-active' : 'active') : ''
                    }`}
                >
                  {ele?.img}
                  <span>{ele?.label}</span>
                  <span>
                    {ele?.isMenu && (
                      <>
                        {toggleMenu?.type === ele?.label && toggleMenu?.open ? (
                          <ExpandLess />
                        ) : (
                          <ExpandMore />
                        )}

                      </>
                    )}
                  </span>
                </Link>

                <Collapse
                  in={toggleMenu?.type === ele?.label && toggleMenu?.open}
                  timeout="auto"
                  unmountOnExit
                  className={`collapse-menu  ${parentClass2}`}
                >
                  {ele?.subItems?.map((subEle) => {
                    const subActive =
                      pathname === subEle.route ||
                      pathname.startsWith(`/${subEle?.route}`);
                    const isNestedSubmenuActive = isSubmenuActive(subEle.subItems);

                    // Add class to submenu if active or if any nested submenu is active
                    const submenuClass = isNestedSubmenuActive ? 'biLink ' : 'biLink ';

                    return (
                      <React.Fragment key={subEle.label} >
                        <Link
                          key={subEle.label}
                          to={subEle?.route || '#'}
                          className={`biLink  sub-menu-text ${isActive ? (subActive ? ' sub-menu-text' : '') : ''
                            }`}
                        >
                          <span >{subEle?.img}</span>
                          <span>{subEle?.label}</span>
                        </Link>
                        <Collapse
                          in={
                            toggleMenu?.type === ele?.label && toggleMenu?.open
                          }
                          timeout="auto"
                          unmountOnExit
                          className="collapse-menu"
                        >
                          {subEle?.subItems?.map((subEle) => {
                            const subActive =
                              pathname === subEle.route ||
                              pathname.startsWith(`/${subEle?.route}`);
                            return (
                              <Link
                                key={subEle.label}
                                to={subEle?.route || '#'}
                                className={`biLink sub-menu-text ${isActive
                                  ? subActive
                                    ? 'sub-menu-text'
                                    : ''
                                  : ''
                                  }`}
                              >
                                {subEle?.img}
                                <span>{subEle?.label}</span>
                              </Link>
                            );
                          })}
                        </Collapse>
                      </React.Fragment>
                    );
                  })}
                </Collapse>

              </li>

            );
          })}
        </ul>
        {isShowSidebar ? (
          <div className="text-[#8990a5] flex gap-1 flex-col mt-auto">
            <div className="">
              <div className="flex text-xs">
                <strong>Version: </strong> &nbsp; <span>1.0.0</span>
              </div>
            </div>
            <div className="text-xs">Powered By MARGSOFT Technologies</div>
          </div>
        ) : (
          <div className="w-10 h-10 mx-auto mt-auto">
            <div className="w-8 h-8 bg-white rounded-full mx-auto flex items-center justify-center font-semibold text-[#002850]">
              M
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
