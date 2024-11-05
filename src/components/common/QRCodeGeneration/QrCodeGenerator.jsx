import React, { useState } from 'react';
import QRCode from 'react-qr-code';

const QrCodeGenerator = () => {
    const [url, setUrl] = useState('https://magnetnew.evalue8.info/profile/vishu456');

    const handleInputChange = (e) => {
        setUrl(e.target.value);
    };

    return (
        <div>
            <h1>QR Code Generator</h1>
            <input
                type="text"
                placeholder="Enter URL"
                value={url}
                onChange={handleInputChange}
            />
            {url && <QRCode value={url} />}
        </div>
    );
};

export default QrCodeGenerator;