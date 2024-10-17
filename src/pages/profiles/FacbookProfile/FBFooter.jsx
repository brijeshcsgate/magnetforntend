import React, { useState } from 'react';
import FBReferrelForm from './FBReferrelForm';
import FBEnquiryForm from './FBEnquiryForm';
import { SaveIcon } from 'lucide-react';

const FBFooter = ({profileUserId, visitorInfo,   name, whatsappNumber,email,companyName,designation, mobile}) => {
  const generateVCard = () => {
    const vCardData = `

BEGIN:VCARD
VERSION:3.0
FN:${name}
ORG:${companyName}
TITLE:${designation}
TEL;TYPE=WORK,VOICE:${mobile}
TEL;TYPE=CELL,VOICE:${whatsappNumber}
EMAIL:${email}
END:VCARD
`;

    const blob = new Blob([vCardData], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'contact.vcf';
    link.click();

    window.URL.revokeObjectURL(url);
  };
  const [IsReferalForm,setIsReferalForm]=useState(false)
const [IsEnquiryFormData,setIsEnquiryFormData]=useState(false)


  return (
    <div className="bg-gray-100 pt-3  gradient-box " style={{position:'fixed',bottom:'0', width:'100%',zIndex:'99'}}>
      {/* <div className="container mx-auto"> */}
        <div className="flex justify-center gradient-box">
          <div className="space-x-4 flex-db linkbutton px-2">
            {/* <button 
              data-bs-toggle="modal" 
              data-bs-target="#refer-business" 
              className="btn bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2"
            >
              <i className="fa-solid fa-briefcase"></i>
              <span>Refer Business</span>
            </button>

            <button className="btn bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2">
              <i className="fa-solid fa-circle-question"></i>
              <span>Enquiry</span>
            </button>

            <button className="btn bg-blue-500 text-white py-2 px-4 rounded flex items-center space-x-2">
              <i className="fa-solid fa-floppy-disk"></i>
              <span>Save My Contact</span>
            </button> */}
            <FBReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
            {/* <button>Enquiry</button> */}
            <FBEnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
            <button onClick={generateVCard} className='ref-button flex-db'><SaveIcon/><span> Save My Contact</span></button>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default FBFooter;
