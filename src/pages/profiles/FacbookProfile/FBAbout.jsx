import React, { useState } from 'react';

const FBAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mainbody">
      <div id="prolink"></div>
      <div className="container p-4 pb-0 pt-0">
        <div className="container">
          <div id="AboutSec">
            <div className="shadow-lg p-6 bg-white">
              <div className="flex flex-wrap">
                <div className="w-full md:w-7/12">
                  <div className="userthum">
                    <div className="abouttext">
                      <h5 className="text-lg font-semibold mb-2">About Me</h5>
                      <p className="text-gray-700">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro voluptas repudiandae fuga
                        similique, aut, soluta veniam earum inventore nemo esse sunt cumque excepturi saepe impedit at.
                        Aut ipsam consectetur vitae quidem. Rem neque, maxime recusandae{' '}
                        {!isExpanded && <span id="dots">... </span>}
                        {isExpanded && (
                          <span id="more">
                            totam et sit cupiditate! Dolor distinctio ipsum eveniet voluptate nobis ut quaerat fuga
                            earum aliquam. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Exercitationem,
                            corrupti sed delectus consectetur vel quis asperiores, omnis neque excepturi blanditiis
                            accusantium. Earum impedit qui culpa voluptate quam similique quos reiciendis voluptates,
                            consectetur non neque aut fuga, quod sit tempora, velit molestias modi quasi perspiciatis
                            voluptatem. Ipsa blanditiis modi eos expedita.
                          </span>
                        )}
                        <button
                          className="text-blue-500 hover:text-blue-700 font-medium ml-2"
                          onClick={toggleReadMore}
                        >
                          {isExpanded ? 'Read less' : 'Read more'}
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-5/12">
                  <div className="userabout">
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
