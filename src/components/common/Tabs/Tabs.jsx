import { chevronDown } from "@/assets/Icons";
import { useEffect, useState } from "react";

const Tabs = ({ isActiveTab, setIsActiveTab, tabs }) => {
  return (
    <div className="list-tab">
      <div className="tabs ">
        {tabs.map((item, index) => (
          <div
            className={` tab ${
              isActiveTab === item.tabName ? "tab-active" : ""
            }`}
            key={index}
            onClick={() => setIsActiveTab(item.tabName)}
          >
            <div
              className={` ${
                isActiveTab === item.tabName
                  ? "heading-600-14 c-blue2 "
                  : "heading-400-14 c-gray"
              } v-center`}
            >
              {item.tabName}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Tabs;

/**
 * Renders a set of tabs based on the provided list of tabs.
 *
 * @param {Object} props - The props object.
 * @param {Array} props.tabs - The list of tabs to render.
 * @param {string} props.isActiveTabs - The currently active tab.
 * @param {Function} props.hasActiveTabHandler - The handler function for tab activation.
 * @return {JSX.Element} The rendered set of tabs.
 */
export const ResizedTabs = ({ tabs, isActiveTabs, hasActiveTabHandler }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [allTabs, setAllTabs] = useState({
    tabList: [],
    extraTabList: [],
  });

  const handleResize = () => {
    if (window.innerWidth < 500) {
      setAllTabs({
        tabList: tabs.slice(0, 1),
        extraTabList: tabs.slice(1),
      });
    } else if (window.innerWidth < 768) {
      setAllTabs({
        tabList: tabs.slice(0, 2),
        extraTabList: tabs.slice(2),
      });
    } else if (window.innerWidth < 1024) {
      setAllTabs({
        tabList: tabs.slice(0, 3),
        extraTabList: tabs.slice(3),
      });
    } else {
      setAllTabs({
        tabList: tabs.slice(0, 6),
        extraTabList: tabs.slice(6),
      });
    }
  };
  useEffect(() => {
    if (showDropdown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  return (
    <div className="tabs">
      {allTabs.tabList.map((item, index) => (
        <div
          className={` tab ${
            isActiveTabs === item.tabName
              ? "border-b-2 border-blue-primary-200"
              : ""
          }`}
          key={index}
          onClick={() => hasActiveTabHandler(item.tabName)}
        >
          <div
            className={` ${
              isActiveTabs === item.tabName
                ? "text-sm text-blue-primary-200"
                : "text-sm text-gray-tertiary hover:text-gray-secondary"
            } flex items-center justify-center whitespace-nowrap font-medium`}
          >
            {" "}
            {item.tabName}
          </div>
        </div>
      ))}
      <div
        className={`tab relative ${
          allTabs.extraTabList.some((tab) => tab.tabName === isActiveTabs)
            ? "border-b-2 border-blue-primary-200"
            : ""
        }`}
      >
        <div
          className={` ${
            allTabs.extraTabList.some((tab) => tab.tabName === isActiveTabs)
              ? "text-sm text-blue-primary-200"
              : "text-sm text-gray-tertiary hover:text-gray-secondary"
          } flex items-center justify-center whitespace-nowrap font-medium gap-2`}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          More
          {chevronDown({ width: 14, height: 14 })}
        </div>

        {showDropdown && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => setShowDropdown(false)}
            />
            <section className="absolute top-10 right-0 bg-white rounded-md shadow h-[200px] overflow-scroll z-auto p-1">
              {allTabs.extraTabList.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    isActiveTabs === item.tabName
                      ? "text-sm text-blue-primary-200"
                      : "text-sm text-gray-tertiary hover:text-gray-secondary"
                  } flex items-center whitespace-nowrap font-medium hover:bg-gray-quaternary/10 px-3 py-2 rounded-md w-full`}
                  onClick={() => {
                    hasActiveTabHandler(item.tabName);
                    setShowDropdown(false);
                  }}
                >
                  {item.tabName}
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
};

export const ResizedTabsWithIcons = ({
  tabs,
  isActiveTabs,
  hasActiveTabHandler,
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [allTabs, setAllTabs] = useState({
    tabList: [],
    extraTabList: [],
  });

  const handleResize = () => {
    if (window.innerWidth < 500) {
      setAllTabs({
        tabList: tabs.slice(0, 1),
        extraTabList: tabs.slice(1),
      });
    } else if (window.innerWidth < 768) {
      setAllTabs({
        tabList: tabs.slice(0, 2),
        extraTabList: tabs.slice(2),
      });
    } else if (window.innerWidth < 1024) {
      setAllTabs({
        tabList: tabs.slice(0, 3),
        extraTabList: tabs.slice(3),
      });
    } else {
      setAllTabs({
        tabList: tabs.slice(0, 6),
        extraTabList: tabs.slice(6),
      });
    }
  };
  useEffect(() => {
    if (showDropdown) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabs]);

  return (
    <div className="tabs">
      {allTabs.tabList.map((item, index) => (
        <div
          className={` tab ${
            isActiveTabs === item.tabName
              ? "border-b-2 border-blue-primary-200"
              : ""
          }`}
          key={index}
          onClick={() => hasActiveTabHandler(item.tabName)}
        >
          <div
            className={` ${
              isActiveTabs === item.tabName
                ? "text-sm text-blue-primary-200"
                : "text-sm text-gray-tertiary hover:text-gray-secondary"
            } flex items-center justify-center whitespace-nowrap font-medium gap-1`}
          >
            {" "}
            {item.icon}
            {item.tabName}
          </div>
        </div>
      ))}
      <div
        className={`tab relative ${
          allTabs.extraTabList.some((tab) => tab.tabName === isActiveTabs)
            ? "border-b-2 border-blue-primary-200"
            : ""
        }`}
      >
        {allTabs.extraTabList.length === 0 ? null : (
          <div
            className={` ${
              allTabs.extraTabList.some((tab) => tab.tabName === isActiveTabs)
                ? "text-sm text-blue-primary-200"
                : "text-sm text-gray-tertiary hover:text-gray-secondary"
            } flex items-center justify-center whitespace-nowrap font-medium gap-2`}
            onClick={() => setShowDropdown(!showDropdown)}
          >
            More
            {chevronDown({ width: 14, height: 14 })}
          </div>
        )}

        {showDropdown && (
          <>
            <div
              className="fixed inset-0"
              onClick={() => setShowDropdown(false)}
            />
            <section className="absolute top-10 right-0 bg-white rounded-md shadow h-[200px] overflow-scroll z-auto p-1">
              {allTabs.extraTabList.map((item, index) => (
                <div
                  key={index}
                  className={` ${
                    isActiveTabs === item.tabName
                      ? "text-sm text-blue-primary-200"
                      : "text-sm text-gray-tertiary hover:text-gray-secondary"
                  } flex items-center whitespace-nowrap font-medium hover:bg-gray-quaternary/10 px-3 py-2 rounded-md w-full`}
                  onClick={() => {
                    hasActiveTabHandler(item.tabName);
                    setShowDropdown(false);
                  }}
                >
                  {item.tabName}
                </div>
              ))}
            </section>
          </>
        )}
      </div>
    </div>
  );
};
