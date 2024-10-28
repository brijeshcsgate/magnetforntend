import { resizeImage } from '@/pages/ProfilePages/resizeImage';
import { Button } from '@mui/material';
import React from 'react';

const FBPayment = ({bankAccountDetails,paymentDetails}) => {
  return (
            <section id="" className="fbmainbody pt-2 pb-2 mn-pad">
      {/* container */}

      <div className=" mx-auto px-3 ">
        <div className="flex flex-wrap">
          <div className=" lg:w-1/3">
            <div className="fbheader-section mb-2 px-2">
              <h2 className="text-3xl font-semibold">
              Payment <span className="text-blue-500">Methods</span>
              </h2>
            </div>
          </div>
        </div>

        <section id="PAYMENT" className='pt-3'>
          <div className=" fbbg-white" >
            {/* UPI Image and Account Info */}
            <div className=" p-4 rounded-md fbpaymentcard" >
              <label htmlFor="upiImage" className="block text-gray-700 font-medium">UPI Image</label>
              <div className="flex  my-2">
                <img src={paymentDetails?.image} alt="QR Code" style={resizeImage(90, 90)}className=" object-cover" />
              </div>
              <div className=" text-lg font-semibold lt-sp">
                <p>{bankAccountDetails?.accountNumber}</p>
                
                {paymentDetails?.paymentGatewayLink?
                        <div className='text-lg font-semibold lt-sp'>{`Payment Gateway Link: `} &nbsp;&nbsp;<Button variant="contained" size='small' color="success" onClick={(e) => { window.open(paymentDetails?.paymentGatewayLink, '_blank') }}>
                              Click Here
                            </Button></div>
                            :<></>}
              </div>
              <div className=" mt-4">
                <label htmlFor="accountName" className="block text-gray-700 font-medium">ACCOUNT NAME</label>
                <p className="text-lg font-semibold">{bankAccountDetails?.accountName}</p>
              </div>
            </div>

            {/* Payment Details */}
            <div className="fbbg-white p-6 shadow-md rounded-md mt-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 ">
                {/* Left Column */}
                <div>
                  <div className="fbaccountdetails">
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Bank Name:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.bankName}</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Number:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.accountNumber}</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">PAN Card Number:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.pan}</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">GST No.:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.gst}</div>
                    </div>
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="fbaccountdetails">
                    {/* <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Type:</label>
                      <div className="ml-4 text-gray-900">Savings account</div>
                    </div> */}
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">Account Holder Name:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.accountName}</div>
                    </div>
                    <div className="mb-4 flex items-center">
                      <label className="font-medium text-gray-700 w-40">IFSC Code:</label>
                      <div className="ml-4 text-gray-900">{bankAccountDetails?.ifsc}</div>
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
    {/* </div>
    </div> */}
    </section>
  );
};

export default FBPayment;
