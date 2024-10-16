import React from 'react';

const FBPayment = ({profileImage}) => {
  return (
    <div className="container p-4">
      <div className="container">
        <section id="PAYMENT">
          <div className="container">
            {/* UPI Image and Account Info */}
            <div className="bg-white p-4 shadow-md rounded-md">
              <label htmlFor="upiImage" className="block text-gray-700 font-medium">UPI Image</label>
              <div className="flex justify-center my-4">
                <img src={profileImage} alt="QR Code" className="w-32 h-32 object-cover" />
              </div>
              <div className="text-center text-lg font-semibold">
                <p>1234 1234 1234 1234</p>
              </div>
              <div className="text-center mt-4">
                <label htmlFor="accountName" className="block text-gray-700 font-medium">ACCOUNT NAME</label>
                <p className="text-lg font-semibold">BRIJESH YADAV</p>
              </div>
            </div>

            {/* Payment Title */}
            <div className="row mt-8">
              <div className="col-md-10 col-lg-8 mx-auto text-center">
                <div className="header-section">
                  <h2 className="text-2xl font-bold"><span>PAYMENT</span></h2>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white p-6 shadow-md rounded-md mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <div className="accountdetails">
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Bank Name:</label>
                      <div className="ml-4 text-gray-900">Bank of Maharashtra</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Number:</label>
                      <div className="ml-4 text-gray-900">1234 1234 1234 1234</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">PAN Card Number:</label>
                      <div className="ml-4 text-gray-900">AAAAA7777A</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">GST No.:</label>
                      <div className="ml-4 text-gray-900">07AAACP0165G2ZQ</div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="accountdetails">
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Type:</label>
                      <div className="ml-4 text-gray-900">Savings account</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Holder Name:</label>
                      <div className="ml-4 text-gray-900">Brijesh Yadav</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">IFSC Code:</label>
                      <div className="ml-4 text-gray-900">PUNB0733600</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Remark:</label>
                      <div className="ml-4 text-gray-900">
                        Is it possible to reverse funds transferred to the wrong account..
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default FBPayment;
