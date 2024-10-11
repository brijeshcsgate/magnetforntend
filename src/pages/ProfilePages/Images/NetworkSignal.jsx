import React from 'react';

const NetworkSignal = () => {
  return (
    <div className="network-signal">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="50" height="50">
        <rect x="10" y="75" width="12" height="15" fill="#FFD700" />
        <rect x="27" y="60" width="12" height="30" fill="#FFAA00" />
        <rect x="44" y="45" width="12" height="45" fill="#FF7400" />
        <rect x="61" y="30" width="12" height="60" fill="#FF3800" />
        <rect x="78" y="15" width="12" height="75" fill="#FF0000" />
      </svg>
      <span>Signal Strength</span>
    </div>
  );
};

export default NetworkSignal;