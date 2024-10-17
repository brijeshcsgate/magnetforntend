import React from 'react';

const FBPayment = ({profileImage}) => {
  return (
    <section className="mt-9" id="">
    <div className="container mx-auto px-5">

    <div className="container p-4">
      <div className="">
        
            {/* Payment Title */}
            <div className="row mt-8">
              <div className=" ">
                <div className="header-section">
                <h2 className="text-3xl font-semibold">
               Payment <span className="text-blue-500">Methods</span>
              </h2>
             </div>
              </div>
            </div>

        <section id="PAYMENT">
          <div className="container">
            {/* UPI Image and Account Info */}
            <div className=" p-4 rounded-md paymentcard" >
              <label htmlFor="upiImage" className="block text-gray-700 font-medium">UPI Image</label>
              <div className="flex  my-2">
                <img src={profileImage} alt="QR Code" className="w-32 h-32 object-cover" />
              </div>
              <div className=" text-lg font-semibold lt-sp">
                <p>1234 1234 1234 1234</p>
              </div>
              <div className=" mt-4">
                <label htmlFor="accountName" className="block text-gray-700 font-medium">ACCOUNT NAME</label>
                <p className="text-lg font-semibold">BRIJESH YADAV</p>
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
                    {/* <div className="mb-4 flex items-center" style={{width:'100%'}}>
                      <label className="accountdetails font-medium text-gray-700 w-40" style={{width:'54%'}}>Remark:</label>
                      <div className="ml-4 text-gray-900">
                        Is it possible to reverse funds transferred to the wrong account..
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
    </section>
  );
};

export default FBPayment;
