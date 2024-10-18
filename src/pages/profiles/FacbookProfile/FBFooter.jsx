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
    <div className="bg-gray-100 pt-3  fbgradient-box " style={{position:'fixed',bottom:'0', width:'100%',zIndex:'99'}}>
      {/* <div className="container mx-auto"> */}
        <div className="flex justify-center fbgradient-box">
          <div className="space-x-4 fbflex-db fblinkbutton px-3">
            
            <FBReferrelForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsReferalForm={IsReferalForm} setIsReferalForm={setIsReferalForm} />
            {/* <button>Enquiry</button> */}
            <FBEnquiryForm profileUserId={profileUserId} visitorInfo={visitorInfo} IsEnquiryFormData={IsEnquiryFormData} setIsEnquiryFormData={setIsEnquiryFormData} />
            <button onClick={generateVCard} className='fbref-button fbflex-db'><SaveIcon/><span> Save My Contact</span></button>


          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

export default FBFooter;
