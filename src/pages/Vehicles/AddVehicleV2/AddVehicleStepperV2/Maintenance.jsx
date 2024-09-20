import { SidePanel } from "@/components/AddFormLayout/AddFormLayout";
import { Checkbox } from "@/components/ui/checkbox";

const Maintenance = ({ values,

  setFieldValue,
}) => {
  const maintenanceData = [
    {
      left: {
        title: "Maintenance",
        para: "Vehicle Maintenance Schedule Settings",
      },
      right: {
        title: "Choose a Vehicle Service Program",
        para: "Service Programs automatically manage Service Reminders for Vehicles that share common preventative maintenance needs.",
        fields: [
          {
            block_type: "field-type-one",
            input_type: "textFieldField",
            labelName: "In-Service Date",
            name: "lifeCycle.inService.date",
            placeholder: "Enter In-Service Date",
          },
          {
            block_type: "field-type-one",
            input_type: "textFieldField",
            labelName: "In-Service Odometer",
            name: "lifeCycle.inService.odometer",
            placeholder: "Enter In-Service Odometer",
          },
        ],
      },
    },
  ];

  return maintenanceData?.map((items, index) => (
    <div key={index} className={`border-v add-v-form-section w100 add-edit-user-card ${index > 0 ? "pt-104" : ""}`}>
      <SidePanel
        title={`Maintenance`}
      />
      <div className="flex flex-col w-full">
        <div className="heading-600-16 c-gray2">
          Choose a Vehicle Service Program
        </div>
        <div className="heading-400-12 c-gray2">
          Service Programs automatically manage Service Reminders for Vehicles
          that share common preventative maintenance needs.
        </div>
        <div className="maintenance-drop">
          <div style={{ display: "flex" }} className="aeu-flex-js">
            <Checkbox
              id="vehicleServiceProgram1"
              name="vehicleServiceProgram1"
              checked={values?.vehicleServiceProgram1}
              onCheckedChange={(checked) => {
                setFieldValue('vehicleServiceProgram1', checked);

              }
              }
              className="w-5 h-5"
            />

            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Service Program 1
            </label>
            <span
              style={{
                color: "#F68723",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              13 Point Inspection
            </span>
          </div>
          <div>
            Select Frequency <span>{">"}</span>
          </div>
        </div>
        <div className="maintenance-drop">
          <div style={{ display: "flex" }} className="aeu-flex-js">
            <Checkbox
              id="vehicleServiceProgram2"
              name="vehicleServiceProgram2"
              checked={values?.vehicleServiceProgram2}
              onCheckedChange={(checked) => {
                setFieldValue('vehicleServiceProgram2', checked);

              }
              }
              className="w-5 h-5"
            />

            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Service Program 2
            </label>
            <span
              style={{
                color: "#F68723",
                fontWeight: "bold",
                marginLeft: "10px",
              }}
            >
              31 Point Inspection
            </span>
          </div>
          <div>
            Select Frequency <span>{">"}</span>
          </div>
        </div>
      </div>
    </div>
  ));
};

export default Maintenance;
