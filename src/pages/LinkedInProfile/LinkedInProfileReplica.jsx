import React from 'react';
import './LinkedInProfileReplica.css';

const LinkedInProfileReplica = () => {
    return (
        <div className="profile-container">
            <div className="cover-photo"></div>
            <div className="profile-content">
                <img
                    src="https://via.placeholder.com/152"
                    alt="Profile"
                    className="profile-picture"
                />
                <h1 className="name">Harsh Kumar</h1>
                <p className="title">
                    Technology Consultant | Digital Transformation Expert | Helping businesses
                    (Government, Corporate, Startups) to build & adapt technology enabled
                    solutions
                </p>
                <p className="location">New Delhi, Delhi, India</p>
                <p className="contact-info">Contact info</p>
                <img
                    src="https://via.placeholder.com/32"
                    alt="Company Logo"
                    className="company-logo"
                />
                <div className="anniversary">
                    <img
                        src="https://via.placeholder.com/100x50"
                        alt="10 Year Anniversary"
                    />
                </div>
                <div className="buttons">
                    <button className="btn btn-primary">Follow</button>
                    <button className="btn btn-secondary">Message</button>
                    <button className="btn btn-secondary">More</button>
                </div>
            </div>
        </div>
    );
};

export default LinkedInProfileReplica;
