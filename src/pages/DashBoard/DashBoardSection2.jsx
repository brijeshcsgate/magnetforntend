import React, { useState } from 'react';
import { Fleet, Depot, Workshop } from './constent.js';

const DashBoardSection2 = () => {
  const tabs = [
    { label: 'All', locationData: [...Fleet, ...Depot, ...Workshop] },
    { label: 'Fleet', locationData: Fleet },
    { label: 'Terminus', locationData: '' },
    { label: 'Workshop', locationData: Workshop },
    { label: 'Depot', locationData: Depot },
    { label: 'Accident', locationData: '' },
    { label: 'Heat Map', locationData: '' },
  ];
  const [activeTabs, setActiveTabs] = useState({
    activeTab: 'All',
    activeLocationData: [...Fleet, ...Depot, ...Workshop],
  });

  return (
    <div className="dash-sec2">
      <div className="dash-tab-container">
        {tabs.map((item, index) => (
          <div
            className={`dash-tab heading-400-16 ${
              activeTabs?.activeTab === item.label ? 'dash-active-tab' : ''
            }`}
            key={index}
            onClick={() =>
              setActiveTabs((prev) => ({
                ...prev,
                activeTab: item.label,
                activeLocationData: item.locationData,
              }))
            }
          >
            {item?.label}{' '}
            {index < tabs.length - 1 ? (
              <span style={{ color: '#9ECEFF', fontWeight: 400 }}>|</span>
            ) : null}
          </div>
        ))}
      </div>
      <div className="dash-map"></div>
    </div>
  );
};

export default DashBoardSection2;
