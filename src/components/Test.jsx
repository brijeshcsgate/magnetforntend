import { Container, Content } from "@/components/AddFormLayout/AddFormLayout";
import FormikAsyncDropdown from "@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown";
import { Formik } from "formik";

const mastersData = [
  { label: "Braking System", routeId: "brakingSystem" },
  { label: "Group In Depot", routeId: "group-in-depot" },
  { label: "Bus Ownership", routeId: "busOwnership" },
  { label: "Type of Service", routeId: "typeOfService" },
  { label: "Chassis Type", routeId: "chassisType" },
  { label: "Country", routeId: "country" },
  { label: "Depot", routeId: "depot" },
  { label: "Organisation Structure", routeId: "organisation-structure" },
  { label: "Organisation ", routeId: "organisation" },
  { label: "Roles Permission ", routeId: "userole" },
  { label: "Operator ", routeId: "operator" },
  { label: "User Role ", routeId: "userRole" },
  { label: "Type Of Road ", routeId: "typeOfRoad" },
  { label: "Device Type", routeId: "deviceType" },
  { label: "District", routeId: "district" },
  { label: "Vehicle Drive Type", routeId: "vehicleDriveType" },
  { label: "Engine Brand", routeId: "engineBrand" },
  { label: "Fabricator", routeId: "fabricator" },
  { label: "Fuel Type", routeId: "fuelType" },
  { label: "Model Euro", routeId: "modelEuro" },
  { label: "Region", routeId: "region" },
  { label: "State", routeId: "state" },
  { label: "Transmission Type", routeId: "transmissionType" },
  { label: "Tyre Type", routeId: "tyreType" },
  { label: "Vendor", routeId: "vendor" },
  { label: "Vehicle Group", routeId: "vehicleGroup" },
  { label: "Vehicle Make", routeId: "vehicleMake" },
  { label: "Vehicle Model", routeId: "vehicleModel" },
  { label: "Vehicle Trim", routeId: "vehicleTrim" },
  { label: "Vehicle Type", routeId: "vehicleType" },
  { label: "Village", routeId: "village" },
  { label: "Workshop", routeId: "workshop" },
];

const Test = () => {
  return (
    <Formik enableReinitialize initialValues={{}} onSubmit={()=>{}}>
      {() => (
        <Container>
          <>
            <Content>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto auto auto",
                  gap: "15px",
                }}
              >
            
                {mastersData.map((item) => (
                  <FormikAsyncDropdown
                    key={item.label}
                    label={item.label}
                    placeholder={item.label}
                    name={item.routeId}
                    id={item.routeId}
                    limit={5}
                  />
                ))}
              </div>
            </Content>
          </>
        </Container>
      )}
    </Formik>
  );
};

export default Test;
