import React from 'react';

const FBFooter = () => {
  return (
    <div className="bg-gray-100 py-4">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <div className="space-x-4">
            <button 
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
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FBFooter;
