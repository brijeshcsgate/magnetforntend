import TextDetailsOne from '@/components/common/TextDetails/TextDetails';
import { useEffect, useState } from 'react';
import './Specifications.css';

const Specifications = ({ response, id }) => {
  const title1 = 'Dimensions';
  const title2 = 'Weight';
  const title3 = 'Performance';
  const title4 = 'Fuel';
  const title5 = 'Oil';
  const title6 = 'Engine';
  const title7 = 'Transmission';
  const title8 = 'Wheels & Tires';

  
  const [details1, setDetails1] = useState([
    { title: 'Width', name: '---' },
    { title: 'Height', name: '---' },
    { title: 'Length', name: '---' },
    { title: 'Interior Volumne', name: '---' },
    {
      title: 'Passenger Volumne',
      name: '---',
    },
    { title: 'Cargo Volume', name: '---' },
    {
      title: 'Ground Clearance',
      name: '---',
    },
    {
      title: 'Bed Length',
      name: '---',
    },
  ]);

  const [details2, setDetails2] = useState([
    { title: 'Curb Weight', name: '---' },
    {
      title: 'Gross Vehicle Weight Rating',
      name: '---',
    },
  ]);
  const [details3, setDetails3] = useState([
    { title: 'Towing Capacity', name: '---' },
    { title: 'Max Payload', name: '---' },
  ]);
  const [details4, setDetails4] = useState([
    { title: 'Milage(City)', name: '---' },
    { title: 'Milage(Higway)', name: '---' },
    { title: 'Capacity Tank 1', name: `---` },
    { title: 'Capacity Tank 2', name: `---` },
    { title: 'CNG Capacity', name: `---` },
    { title: 'Battery Capacity', name: `---` },
  ]);
  const [details5, setDetails5] = useState([
    {
      title: 'Oil Capacity',
      name: `---`,
    },
  ]);
  const [details6, setDetails6] = useState([
    {
      title: 'Engine Summary',
      name: '---',
    },
    {
      title: 'Engine Brand',
      name: '---',
    },
    {
      title: 'Compression',
      name: '---',
    },
    {
      title: 'Displacement',
      name: '---',
    },
    {
      title: 'Fuel Induction',
      name: '---',
    },
    {
      title: 'Max HP',
      name: '---',
    },
    {
      title: 'Max Torque',
      name: '---',
    },
    {
      title: 'Valves',
      name: '---',
    },
  ]);
  const [details7, setDetails7] = useState([
    {
      title: 'Transmission Description',
      name: `---`,
    },
    { title: 'Transmission Type', name: `---` },
    { title: 'Transmission Gears', name: `---` },
  ]);
  const [details8, setDetails8] = useState([
    { title: 'Driver Type', name: '---' },
    { title: 'Braking System', name: '---' },
    { title: 'Front Track Width', name: '---' },
    { title: 'Rear Track Width', name: '---' },
    { title: 'Wheelbase', name: '---' },
    { title: 'Front Wheel Diameter', name: '---' },
    { title: 'Rear Wheel Diameter', name: '---' },
    { title: 'Rear Axle', name: '---' },
    { title: 'Front Tire Type', name: '---' },
    { title: 'Front Tire PSI', name: '---' },
    { title: 'Rear Tire Type', name: '---' },
    { title: 'Rear Tire PSI', name: '---' },
  ]);

  useEffect(() => {
    const updatedDetails1 = [
      {
        title: 'Width',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.width
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.width} mm`
            : '---'
        }`,
      },
      {
        title: 'Height',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.height
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.height} mm`
            : '---'
        }`,
      },
      {
        title: 'Length',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.length
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.length} mm`
            : '---'
        }`,
      },
      {
        title: 'Interior Volumne',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.interiorVolume
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.interiorVolume} mm3`
            : '---'
        }`,
      },
      {
        title: 'Passenger Volumne',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.passengerVolume
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.passengerVolume} mm3`
            : '---'
        }`,
      },
      {
        title: 'Cargo Volume',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.cargoVolume
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.cargoVolume} mm3`
            : '---'
        }`,
      },
      {
        title: 'Ground Clearance',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.groundClearance
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.groundClearance} mm`
            : '---'
        }`,
      },
      {
        title: 'Bed Length',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.dimensions?.bedLength
            ? `${response?.data?.data?.vehicle?.specification?.dimensions?.bedLength} mm`
            : '---'
        }`,
      },
    ];
    const updatedDetails2 = [
      {
        title: 'Curb Weight',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.weight?.curb ? `${response?.data?.data?.vehicle?.specification?.weight?.curb} kg` : '---'
        }`,
      },
      {
        title: 'Gross Vehicle Weight Rating',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.weight?.grossVehicle
            ? `${response?.data?.data?.vehicle?.specification?.weight?.grossVehicle} kg`
            : '---'
        }`,
      },
    ];
    const updatedDetails3 = [
      {
        title: 'Towing Capacity',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.performance?.towingCapacity
            ? `${response?.data?.data?.vehicle?.specification?.performance?.towingCapacity} kg`
            : '---'
        }`,
      },
      {
        title: 'Max Payload',
        name: `${
          response?.data?.data?.vehicle?.specification?.performance?.maxPayload
            ? `${response?.data?.data?.vehicle?.specification?.performance?.maxPayload} kg`
            : '---'
        }`,
      },
    ];
    const updatedDetails4 = [
      {
        title: 'Milage(City)',
        name: `${
          response?.data?.data?.vehicle?.specification?.mileage?.city ? `${response?.data?.data?.vehicle?.specification?.mileage?.city} kmph` : '---'
        }`,
      },
      {
        title: 'Milage(Higway)',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.mileage?.highway
            ? `${response?.data?.data?.vehicle?.specification?.mileage?.highway} kmph`
            : '---'
        }`,
      },
      {
        title: 'Capacity Tank 1',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.capacities?.fuelTank1
            ? `${response?.data?.data?.vehicle?.specification?.capacities?.fuelTank1} L`
            : '---'
        }`,
      },
      {
        title: 'Capacity Tank 2',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.capacities?.fuelTank2
            ? `${response?.data?.data?.vehicle?.specification?.capacities?.fuelTank2} L`
            : '---'
        }`,
      },
      {
        title: 'CNG Capacity',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.capacities?.cng ? `${response?.data?.data?.vehicle?.specification?.capacities?.cng} L` : '---'
        }`,
      },
      {
        title: 'Battery Capacity',
        name: ` ${
          response?.data?.data?.vehicle?.specification?.capacities?.battery
            ? `${response?.data?.data?.vehicle?.specification?.capacities?.battery} kg`
            : '---'
        }`,
      },
    ];
    const updatedDetails5 = [
      {
        title: 'Oil Capacity',
        name: `${
          response?.data?.data?.vehicle?.specification?.capacities?.oil ? `${response?.data?.data?.vehicle?.specification?.capacities?.oil} L` : '---'
        }`,
      },
    ];
    const updateDetails6 = [
      {
        title: 'Engine Summary',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.summary ? `${response?.data?.data?.vehicle?.specification?.engine?.summary} ` : '---'
        }`,
      },
      {
        title: 'Engine Brand',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.brand ? `${response?.data?.data?.vehicle?.specification?.engine?.brand} ` : '---'
        }`,
      },
      {
        title: 'Compression',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.compression
            ? `${response?.data?.data?.vehicle?.specification?.engine?.compression} `
            : '---'
        }`,
      },
      {
        title: 'Displacement',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.displacement
            ? `${response?.data?.data?.vehicle?.specification?.engine?.displacement} `
            : '---'
        }`,
      },
      {
        title: 'Fuel Induction',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.fuelInduction
            ? `${response?.data?.data?.vehicle?.specification?.engine?.fuelInduction} `
            : '---'
        }`,
      },
      {
        title: 'Max HP',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.maxHp ? `${response?.data?.data?.vehicle?.specification?.engine?.maxHp} ` : '---'
        }`,
      },
      {
        title: 'Max Torque',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.maxTorque
            ? `${response?.data?.data?.vehicle?.specification?.engine?.maxTorque} `
            : '---'
        }`,
      },
      {
        title: 'Valves',
        name: `${
          response?.data?.data?.vehicle?.specification?.engine?.valves ? `${response?.data?.data?.vehicle?.specification?.engine?.valves} ` : '---'
        }`,
      },
    ];
    const updateDetails7 = [
      {
        title: 'Transmission Description',
        name: `${
          response?.data?.data?.vehicle?.specification?.transmission?.description
            ? `${response?.data?.data?.vehicle?.specification?.transmission?.description} `
            : '---'
        }`,
      },
      {
        title: 'Transmission Type',
        name: `${
          response?.data?.data?.vehicle?.specification?.transmission?.gear
            ? `${response?.data?.data?.vehicle?.specification?.transmission?.gear} `
            : '---'
        }`,
      },
      {
        title: 'Transmission Gears',
        name: `${
          response?.data?.data?.vehicle?.specification?.transmission?.typeId?.name?.english
            ? `${response?.data?.data?.vehicle?.specification?.transmission?.typeId?.name?.english} `
            : '---'
        }`,
      },
    ];
    const updateDetails8 = [
      {
        title: 'Driver Type',
        name: `${
          response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.driveTypeId?.name?.english
            ? `${response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.driveTypeId?.name?.english} `
            : '---'
        }`,
      },
      {
        title: 'Braking System',
        name: `${
          response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.brakingSystemId?.name?.english
            ? `${response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.brakingSystemId?.name?.english} `
            : '---'
        }`,
      },
      {
        title: 'Front Track Width',
        name: `${
          response?.data?.data?.vehicle?.specification?.frontTyre?.trackWidth
            ? `${response?.data?.data?.vehicle?.specification?.frontTyre?.trackWidth} `
            : '---'
        }`,
      },
      {
        title: 'Rear Track Width',
        name: `${
          response?.data?.data?.vehicle?.specification?.rearTyre?.trackWidth
            ? `${response?.data?.data?.vehicle?.specification?.rearTyre?.trackWidth} `
            : '---'
        }`,
      },
      {
        title: 'Wheelbase',
        name: `${
          response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.wheelBase
            ? `${response?.data?.data?.vehicle?.specification?.wheelsAndTyres?.wheelBase} `
            : '---'
        }`,
      },
      {
        title: 'Front Wheel Diameter',
        name: `${
          response?.data?.data?.vehicle?.specification?.frontTyre?.wheelDiameter
            ? `${response?.data?.data?.vehicle?.specification?.frontTyre?.wheelDiameter} `
            : '---'
        }`,
      },
      {
        title: 'Rear Wheel Diameter',
        name: `${
          response?.data?.data?.vehicle?.specification?.rearTyre?.wheelDiameter
            ? `${response?.data?.data?.vehicle?.specification?.rearTyre?.wheelDiameter} `
            : '---'
        }`,
      },
      { title: 'Rear Axle', name: '---' },
      {
        title: 'Front Tire Type',
        name: `${
          response?.data?.data?.vehicle?.specification?.frontTyre?.type ? `${response?.data?.data?.vehicle?.specification?.frontTyre?.type} ` : '---'
        }`,
      },
      {
        title: 'Front Tire PSI',
        name: `${
          response?.data?.data?.vehicle?.specification?.frontTyre?.pressure
            ? `${response?.data?.data?.vehicle?.specification?.frontTyre?.pressure} `
            : '---'
        }`,
      },
      {
        title: 'Rear Tire Type',
        name: `${
          response?.data?.data?.vehicle?.specification?.rearTyre?.type ? `${response?.data?.data?.vehicle?.specification?.rearTyre?.type} ` : '---'
        }`,
      },
      {
        title: 'Rear Tire PSI',
        name: `${
          response?.data?.data?.vehicle?.specification?.rearTyre?.pressure
            ? `${response?.data?.data?.vehicle?.specification?.rearTyre?.pressure} `
            : '---'
        }`,
      },
    ];
    setDetails1(() => updatedDetails1);
    setDetails2(() => updatedDetails2);
    setDetails3(() => updatedDetails3);
    setDetails4(() => updatedDetails4);
    setDetails5(() => updatedDetails5);
    setDetails6(() => updateDetails6);
    setDetails7(() => updateDetails7);
    setDetails8(() => updateDetails8);
  }, [response]);
  return (
    <div className='specifications-main-container'>
      <div className='specifications-inner-container'>
        <div className='specifications-inner-container-left'>
          <TextDetailsOne details={details1} title={title1} />
          <TextDetailsOne details={details2} title={title2} />
          <TextDetailsOne details={details3} title={title3} />
          <TextDetailsOne details={details4} title={title4} />
          <TextDetailsOne details={details5} title={title5} />
        </div>
        <div className='specifications-inner-container-right'>
          <TextDetailsOne details={details6} title={title6} />
          <TextDetailsOne details={details7} title={title7} />
          <TextDetailsOne details={details8} title={title8} />
        </div>
      </div>
    </div>
  );
};
export default Specifications;
