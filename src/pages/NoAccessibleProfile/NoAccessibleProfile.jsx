import React from 'react';
import './NoAccessibleProfile.css';

const NoAccessibleProfile = () => {
  return (
    <div className="no-profile-container">
      <div className="no-profile-card">
        <h1 className="no-profile-title">
          <span className="rotated-left">N</span>
          <span>o</span>
          <span className="rotated-right">P</span>
        </h1>
        <div className="no-profile-emoji" role="img" aria-label="Confused face">
          😕
        </div>
        <p className="no-profile-message">
          Oops! You have no accessible profile.
        </p>
        <p className="no-profile-sub-message">
          The profile you requested could not be found.
        </p>
      </div>
    </div>
  );
};

export default NoAccessibleProfile;
