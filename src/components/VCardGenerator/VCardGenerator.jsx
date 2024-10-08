import { Button } from '@mui/material';
import React, { useState } from 'react';

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

        window.URL.revokeObjectURL(url);
    };

    return (
        <div>
            {/* <div>
        <label>Name: </label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <label>Phone: </label>
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>
      <div>
        <label>Email: </label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div> */}
            {/* <button onClick={generateVCard}>Download vCard</button> */}

            <Button onClick={generateVCard}
                className="btn extra contact-btn btn_animated"
            >
                <span className="circle center_icon line-height">
                    <span
                        className="ink animate "
                    ></span>
                    Save Contact
                </span>
            </Button>
        </div>
    );
};

export default VCardGenerator;
