import { useParams } from 'react-router-dom';
import AddEditCountry from './AddEditCountry';
import AddEditState from './AddEditState';
import AddEditBrakingSystem from './AddEditBrakingSystem';
import AddEditTyreType from './AddEditTyreType';
import AddEditDriveType from './AddEditDriveType';
import AddEditEngineBrand from './AddEditEngineBrand';
import AddEditBusCategory from './AddEditBusCategory';
import AddEditBusOwnership from './AddEditBusOwnership';
import AddEditBusServiceType from './AddEditBusServiceType';
import AddEditChassisBodyType from './AddEditChassisBodyType';
import AddEditFuelType from './AddEditFuelType';
import AddEditTransmissionType from './AddEditTransmissionType';
import AddEditVehicleType from './AddEditVehicleType';
import AddEditDepot from './AddEditDepot';
import AddEditFabricator from './AddEditFabricator';
import AddEditOrganisationStructure from './AddEditOrganisationStructure';
import AddEditDistrict from './AddEditDistrict';
import AddEditModelEuro from './AddEditModelEuro';
import AddEditRegion from './AddEditRegion';
import AddEditVillage from './AddEditVillage';
import AddEditVehicleTrim from './AddEditVehicleTrim';
import AddEditVehicleMake from './AddEditVehicleMake';
import AddEditVehicleGroup from './AddEditVehicleGroup';
import AddEditVehicleColour from './AddEditVehicleColour';
import AddEditVehicleModel from './AddEditVehicleModel';
import AddEditFoodCourt from './AddEditFoodCourt';
import AddEditSeatingConfiguration from './AddEditSeatingConfiguration';
import AddEditRouteCategory from './AddEditRouteCategory';
import AddEditRouteType from './AddEditRouteType';
import AddEditToll from './AddEditToll';
import AddEditPriority from './AddEditPriority';
import AddEditIssueCategory from './AddEditIssueCategory';
import AddEditIssueSubCategory from './AddEditIssueSubCategory';
import AddEditRoadType from './AddEditRoadType';
import AddEditBusStop from './AddEditBusStop';
import AddEditUserRole from './AddEditUserRole';
import AddEditContractor from './AddEditContractor';
import AddEditOffice from './AddEditOffice';
import AddEditOfficeFacility from './AddEditOfficeFacility';
import AddEditOrganisation from './AddEditOrganisation';
import AddEditDeviceType from './AddEditDeviceType';
import AddEditOperator from './AddEditOperator';
import AddEditVendor from './AddEditVendor';
import AddEditWorkshop from './AddEditWorkshop';
import AddEditDeviceVendor from './AddEditDeviceVendor';
import AddEditRolePermission from './AddEditRolePermission';
import AddEditFuelVender from './AddEditFuelVender';
import AddEditNewOffice from './AddEditNewOffice';
// import AddEditVehicleModel from "@/pages/Masters/VehicleModel/AddEditVehicleModel";

const componentMap = (key, props) => {
  switch (key) {
    case 'brakingSystem':
      return <AddEditBrakingSystem {...props} />;
    case 'typeOfService':
      return <AddEditBusServiceType {...props} />;
    case 'busOwnership':
      return <AddEditBusOwnership {...props} />;
    case 'group-in-depot':
      return <AddEditBusCategory {...props} />;
    case 'busStop':
      return <AddEditBusStop {...props} />;
    case 'chassisType':
      return <AddEditChassisBodyType {...props} />;
    case 'contractor':
      return <AddEditContractor {...props} />;
    case 'country':
      return <AddEditCountry {...props} />;
    case 'depot':
      return <AddEditDepot {...props} />;
    case 'organisation-structure':
      return <AddEditOrganisationStructure {...props} />;
    case 'organisation':
      return <AddEditOrganisation {...props} />;
    case 'deviceType':
      return <AddEditDeviceType {...props} />;
    case 'district':
      return <AddEditDistrict {...props} />;
    case 'vehicleDriveType':
      return <AddEditDriveType {...props} />;
    case 'engineBrand':
      return <AddEditEngineBrand {...props} />;
    case 'fuelType':
      return <AddEditFuelType {...props} />;
    case 'fabricator':
      return <AddEditFabricator {...props} />;
    case 'dhaba':
      return <AddEditFoodCourt {...props} />;
    case 'issueCategory':
      return <AddEditIssueCategory {...props} />;
    case 'issueSubCategory':
      return <AddEditIssueSubCategory {...props} />;
    case 'office':
      return <AddEditOffice {...props} />;
    case 'newoffice':
      return <AddEditNewOffice {...props} />;
    case 'officeFacility':
      return <AddEditOfficeFacility {...props} />;
    case 'route':
    case 'modelEuro':
      return <AddEditModelEuro {...props} />;
    case 'priority':
      return <AddEditPriority {...props} />;
    case 'region':
      return <AddEditRegion {...props} />;
    case 'routeType':
      return <AddEditRouteType {...props} />;
    case 'routeCategory':
      return <AddEditRouteCategory {...props} />;
    case 'typeOfRoad':
      return <AddEditRoadType {...props} />;
    case 'state':
      return <AddEditState {...props} />;
    case 'seatingConfiguration':
      return <AddEditSeatingConfiguration {...props} />;
    case 'toll':
      return <AddEditToll {...props} />;
    case 'tyreType':
      return <AddEditTyreType {...props} />;
    case 'transmissionType':
      return <AddEditTransmissionType {...props} />;
    case 'userRole':
      return <AddEditRolePermission {...props} />;
    case 'vendor':
      return <AddEditVendor {...props} />;

    case 'fuelVendors':
      return <AddEditFuelVender {...props} />;

    case 'vehicleColour':
      return <AddEditVehicleColour {...props} />;
    case 'vehicleGroup':
      return <AddEditVehicleGroup {...props} />;
    case 'vehicleMake':
      return <AddEditVehicleMake {...props} />;
    case 'vehicleModel':
      return <AddEditVehicleModel {...props} />;
    case 'vehicleTrim':
      return <AddEditVehicleTrim {...props} />;
    case 'vehicleType':
      return <AddEditVehicleType {...props} />;
    case 'village':
      return <AddEditVillage {...props} />;
    case 'operator':
      return <AddEditOperator {...props} />;
    case 'workshop':
      return <AddEditWorkshop {...props} />;
    case 'deviceVendor':
      return <AddEditDeviceVendor {...props} />;

    default:
      return <div>No Add Page To Render</div>;
  }
};

const AddEditMasters = () => {
  const { routeId } = useParams();

  return componentMap(routeId);
};
export default AddEditMasters;
