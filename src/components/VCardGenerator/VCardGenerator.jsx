import { Button } from '@mui/material';
import { CheckCircleIcon, CheckIcon } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'sonner';

const VCardGenerator = ({ name, whatsappNumber, email, companyName, designation, mobile }) => {
    //   const [name, setName] = useState('');
    //   const [phone, setPhone] = useState('');
    //   const [email, setEmail] = useState('');

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
        toast.success(<span style={{color:'green', display:'flex',flexDirection:'row',justifyContent:'space-between'}}><CheckCircleIcon/> &nbsp;&nbsp;&nbsp;<span>VC file downloaded successfully</span></span>);

        window.URL.revokeObjectURL(url);
    };

    return (

        <button onClick={generateVCard}
            className="btn extra contact-btn btn_animated"
        >
            <span className="circle center_icon line-height">
                <span
                // className="ink animate "
                ></span>
                Save Contact
            </span>
        </button>

    );
};

export default VCardGenerator;
