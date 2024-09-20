
import TextDetailsTooltip from '@/components/common/TextDetails/TextDetailsTooltip';
import { useEffect, useState } from 'react';
import '@cyntler/react-doc-viewer/dist/index.css';
import { Badge } from 'lucide-react';
import './userPreveiw.css'
import { formatDate } from '@/utils/dateHelper';

import AvatarIcon from '/assets/images/user.png';
const UserPreview = ({ response }) => {
  const title1 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Mapping</span>
    </div>
  );
  const title2 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Personal Information
      </span>
    </div>
  );
  const title3 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Service Information
      </span>
    </div>
  );
  const title4 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Identity Information
      </span>
    </div>
  );
  const title5 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Present Address</span>
    </div>
  );
  const title6 = (
    <div className=" flex justify-between text-lg font-semibold text-[#002850] ">
      <span>Permanent Address</span>
    </div>
  );

  const [details1, setDetails1] = useState([
    { title: 'State', name: response?.stateId.name.english?response?.stateId?.name?.english+'['+response?.stateId?.name?.hindi+']':'---' },
    { title: 'Region', name: response?.regionId?response?.regionId.map((region) => (
      <Badge key={region._id} variant="outlined" color="primary">
        {region.name.english}
      </Badge>
    )):'---' },
    { title: 'Depot', name: response?.depotId?response?.depotId.map((region) => (
      <Badge key={region._id} variant="outlined" color="primary">
        {region.name.english}
      </Badge>
    )):'---' },
    { title: 'User (Roles & Permissions)', name: response?.roleType?response?.roleType:'---' }
  ]);
  const [details2, setDetails2] = useState([
    { title: 'Employee ID', name: response?.employeeId?response?.employeeId:'---' },
    { title: 'Name [En]', name: response?.name.english?response?.name.english:'---' },
    { title: 'Name [Hi]', name: response?.name.hindi?response?.name.hindi:'---' },
    { title: 'Email', name: response?.loginEmail?response?.loginEmail:'---' },
    { title: 'Mobile No.', name: response?.loginMobile?response?.loginMobile:'---' },
    { title: 'Emergency No.', name: response?.emergencyNumber?response?.emergencyNumber:'---' },
    { title: 'DOB', name: response?.dob? formatDate(response?.dob, 'date') :'---' },
    { title: 'Blood Group', name: response?.bloodGroup?response?.bloodGroup:'---' },
    
    { title: 'Fathers Name [En]', name: response?.fatherName.english?response?.fatherName.english:'---' },
    { title: 'Fathers Name [Hi]', name: response?.fatherName.hindi?response?.fatherName.hindi:'---' },
    { title: 'Profile Image', name: response?.profileImage.name?response?.profileImage.name:'---' }
  ]);
  
  const [details3, setDetails3] = useState([
    { title: 'Designation', name: response?.designation?response?.designation:'---' },
    { title: 'Service Period Start Date', name: response?.servicePeriod?.startDate?formatDate(response?.servicePeriod?.startDate, 'date'):'---' },
    { title: 'Service Period End Date', name: response?.servicePeriod?.endDate?formatDate(response?.servicePeriod?.endDate, 'date'):'---' },
    { title: 'Payroll ID', name: response?.payRollId?response?.payRollId:'---' }
  ]);
  const [details4, setDetails4] = useState([
    { title: 'Govt. Issued Card', name: response?.govtIssuedCard?response?.govtIssuedCard:'---' },
    { title: 'Card No.', name: response?.cardNumber?response?.cardNumber:'---' },
    { title: 'Govt. Issued Card Image', name: response?.govImage[0]?.name?response?.govImage[0]?.name:'---' },
  ]);
  
  const [details5, setDetails5] = useState([
    {
      title: 'Pin Code',
      name: response?.presentAddress.pinCode
        ? response?.presentAddress.pinCode
        : '---',
    },
    {
      title: 'Country',
      name: response?.presentAddress?.country.name?.english
        ? response?.presentAddress?.country.name?.english
        : '---',
    },
    {
      title: 'State',
      name: response?.presentAddress?.stateId?.name?.english
        ? response?.presentAddress?.stateId?.name?.english +
          ' [' +
          response?.presentAddress?.stateId?.name?.hindi +
          ']'
        : '---',
    },
    {
      title: 'District',
      name: response?.presentAddress?.districtId?.name?.english
        ? response?.presentAddress?.districtId?.name?.english +
          ' [' +
          response?.presentAddress?.districtId?.name?.hindi +
          ']'
        : '---',
    },

    {
      title: 'Address 1',
      name: response?.presentAddress?.address1
        ? response?.presentAddress?.address1
        : '---',
    },

    {
      title: 'Address 2',
      name: response?.presentAddress?.address2
        ? response?.presentAddress?.address2
        : '---',
    },
  ]);
  const [details6, setDetails6] = useState([
    {
      title: 'Pin Code',
      name: response?.permanentAddress.pinCode
        ? response?.permanentAddress.pinCode
        : '---',
    },
    {
      title: 'Country',
      name: response?.permanentAddress?.country?.name?.english
        ? response?.permanentAddress?.country?.name?.english
        : '---',
    },
    {
      title: 'State',
      name: response?.permanentAddress?.stateId?.name?.english
        ? response?.permanentAddress?.stateId?.name?.english +
          ' [' +
          response?.presentAddress?.stateId?.name?.hindi +
          ']'
        : '---',
    },
    {
      title: 'District',
      name: response?.permanentAddress?.districtId?.name?.english
        ? response?.permanentAddress?.districtId?.name?.english +
          ' [' +
          response?.presentAddress?.districtId?.name?.hindi +
          ']'
        : '---',
    },

    {
      title: 'Address 1',
      name: response?.permanentAddress?.address1
        ? response?.permanentAddress?.address1
        : '---',
    },

    {
      title: 'Address 2',
      name: response?.permanentAddress?.address2
        ? response?.permanentAddress?.address2
        : '---',
    },
  ]);
    
  const extractAndConcatenateEnglishNames = (obj) => {
    let result = '';

    if (obj?.name && obj?.name.english) {
      result += obj.name.english + ' ';
    }

    for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        if (Array.isArray(obj[key])) {
          obj[key].forEach(item => {
            result += extractAndConcatenateEnglishNames(item);
          });
        } else {
          result += extractAndConcatenateEnglishNames(obj[key]);
        }
      }
    }

    return result;
  };

  useEffect(() => {
    setDetails1([
      { title: 'State', name: response?.stateId.name.english?response?.stateId?.name?.english+'('+response?.stateId?.name?.hindi+')':'---' },
      
      { title: 'Region', name: extractAndConcatenateEnglishNames(response?.regionId)},
      
      
      { title: 'Depot', name: extractAndConcatenateEnglishNames(response?.depotId)},
      { title: 'User (Roles & Permissions)', name: response?.roleType?response?.roleType:'---' }
    ]);
    setDetails2([
      { title: 'Employee ID', name: response?.employeeId?response?.employeeId:'---' },
      { title: 'Name', name: response?.name.english?response?.name.english+(response?.name.hindi?' ('+ response?.name.hindi+' )':'') :'---' },
      // { title: 'Name [Hi]', name: response?.name.hindi?response?.name.hindi:'---' },
      { title: 'Email', name: response?.loginEmail?response?.loginEmail:'---' },
      { title: 'Mobile No.', name: response?.loginMobile?response?.loginMobile:'---' },
      { title: 'Emergency No.', name: response?.emergencyNumber?response?.emergencyNumber:'---' },
      { title: 'DOB', name: response?.dob?formatDate(response?.dob, 'date'):'---' },
      { title: 'Blood Group', name: response?.bloodGroup?response?.bloodGroup:'---' },
      
      { title: 'Fathers Name ', name: response?.fatherName?.english?response?.fatherName?.english+(response?.fatherName.hindi?" ("+response?.fatherName.hindi+" )":''):'---' },
      ]);
    
    setDetails3([
      { title: 'Designation', name: response?.designation?response?.designation:'---' },
      { title: 'Service Period Start Date', name: response?.servicePeriod?.startDate?formatDate(response?.servicePeriod?.startDate, 'date'):'---' },
      { title: 'Service Period End Date', name: response?.servicePeriod?.endDate?formatDate(response?.servicePeriod?.endDate, 'date'):'---' },
      { title: 'Payroll ID', name: response?.payRollId?response?.payRollId:'---' }
    ]);
    setDetails4([
      { title: 'Govt. Issued Card', name: response?.govtIssuedCard?response?.govtIssuedCard:'---' },
      { title: 'Card No.', name: response?.cardNumber?response?.cardNumber:'---' },
      { title: 'Govt. Issued Card Image', name: response?.govImage[0]?.url?<img
        style={{ width: '100%', height: '100%' }}
        src={response?.govImage[0]?.url|| AvatarIcon}
        alt=""
      />:'---' },
    ]);
    
    setDetails5([
      {
        title: 'Pin Code',
        name: response?.presentAddress.pinCode
          ? response?.presentAddress.pinCode
          : '---',
      },
      {
        title: 'Country',
        name: response?.presentAddress?.country?.name?.english
          ? response?.presentAddress?.country?.name?.english
          : '---',
      },
      {
        title: 'State',
        name: response?.presentAddress?.stateId?.name?.english
          ? response?.presentAddress?.stateId?.name?.english +
            ' (' +
            response?.presentAddress?.stateId?.name?.hindi +
            ')'
          : '---',
      },
      {
        title: 'District',
        name: response?.presentAddress?.districtId?.name?.english
          ? response?.presentAddress?.districtId?.name?.english +
            ' (' +
            response?.presentAddress?.districtId?.name?.hindi +
            ')'
          : '---',
      },

      {
        title: 'Address 1',
        name: response?.presentAddress?.address1
          ? response?.presentAddress?.address1
          : '---',
      },

      {
        title: 'Address 2',
        name: response?.presentAddress?.address2
          ? response?.presentAddress?.address2
          : '---',
      },
    ]);
    setDetails6([
      {
        title: 'Pin Code',
        name: response?.permanentAddress.pinCode
          ? response?.permanentAddress.pinCode
          : '---',
      },
      {
        title: 'Country',
        name: response?.permanentAddress?.country?.name?.english
          ? response?.permanentAddress?.country?.name?.english
          : '---',
      },
      {
        title: 'State',
        name: response?.permanentAddress?.stateId?.name?.english
          ? response?.permanentAddress?.stateId?.name?.english +
            ' (' +
            response?.presentAddress?.stateId?.name?.hindi +
            ')'
          : '---',
      },
      {
        title: 'District',
        name: response?.permanentAddress?.districtId?.name?.english
          ? response?.permanentAddress?.districtId?.name?.english +
            ' (' +
            response?.presentAddress?.districtId?.name?.hindi +
            ')'
          : '---',
      },

      {
        title: 'Address 1',
        name: response?.permanentAddress?.address1
          ? response?.permanentAddress?.address1
          : '---',
      },

      {
        title: 'Address 2',
        name: response?.permanentAddress?.address2
          ? response?.permanentAddress?.address2
          : '---',
      },
    ]);
  
  }, [response]);
  
  return (
    <div className="overview-main-container">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
        <div className="overview-inner-container-left">
        <div className='section-shadow'><TextDetailsTooltip details={details2} title={title2} maxLength='25'/></div>
        <div className='section-shadow'><TextDetailsTooltip details={details1} title={title1} maxLength='25'/></div>
        <div className='section-shadow'><TextDetailsTooltip details={details3} title={title3} maxLength='25'/></div>
        </div>
        <div className="overview-inner-container-right">
        <div className='section-shadow'><TextDetailsTooltip details={details4} title={title4} maxLength='25'/></div>
        <div className='section-shadow'>
        <TextDetailsTooltip details={details5} title={title5} maxLength='25'/>
        </div>
        <div className='section-shadow'>
          
        <TextDetailsTooltip details={details6} title={title6} maxLength='25'/></div></div>
      </div>
    </div>
  );
};

export default UserPreview;
