import React, { useState } from 'react';

const FBAbout = ({ aboutUs,countryCode, mobile, whatsappNumberCountryCode, whatsappNumber, 
  email, address }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Toggle the text view
  const toggleText = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fbmainbody pb-2 ">
      <div id="prolink"></div>
      <div className="fbcontainer mn-pad p-4 pb-0 pt-0">
        <div className="fbcontainer">
          <div id="AboutSec">
            <div className="shadow-lg p-6 fbbg-white">
              <div className="flex flex-wrap">
                <div className="w-full md:w-7/12">
                  <div className="fbuserthum">
                    <div className="fbabouttext">
                      <h5 className="text-lg font-semibold mb-2">About Me</h5>
                      <p className="text-gray-700">
                      {isExpanded ? aboutUs : aboutUs?.slice(0, 200)}
        {aboutUs?.length >= 200 ?
          <span onClick={toggleText} id="dots" style={{color:'blue'}}>
            {isExpanded ? "show less" : "... see more"}
          </span> : <></>
        }
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-5/12">
                  <div className="fbuserabout">
                    <div className="contactBTN space-y-4">
                      <ContactItem icon="fa-mobile-button" text="(+91) 8126 139 074" />
                      <ContactItem icon="fa-whatsapp-square" text="(+91) 8126 139 074" />
                      <ContactItem icon="fa-google" text="www.magnet.cards" />
                      <ContactItem icon="fa-telegram" text="@gyangps" />
                      <ContactItem icon="fa-envelope" text="gyanedra.s@troology.com" />
                      <ContactItem icon="fa-address-card" text="Hazratganj, Lucknow, Uttar Pradesh 226001" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactItem = ({ icon, text }) => (
  <div className="flex items-center space-x-2">
    <i className={`fa ${icon} text-blue-500`}></i>
    <h6 className="text-gray-700">{text}</h6>
  </div>
);

export default FBAbout;
