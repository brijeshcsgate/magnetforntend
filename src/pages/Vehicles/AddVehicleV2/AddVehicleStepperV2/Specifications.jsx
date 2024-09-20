import { SidePanel } from "@/components/AddFormLayout/AddFormLayout";
import { CustomSelectById } from "@/components/common/CustomSelect";
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Field } from "formik";
import { useState } from "react";
const Specifications = ({ values, setFieldValue }) => {
  const [scale, setScale] = useState(1.0);

  const handleZoomIn = () => setScale(scale + 0.2);
  const handleZoomOut = () => setScale(scale > 0.2 ? scale - 0.2 : 0.1);
  const handleResetZoom = () => setScale(1.0);
  const remark = values?.specification?.transmission?.description || '';
  const [charCount, setCharCount] = useState(remark.length);

  return (
    <div className="form-content-container">
      <div className="border-v add-v-form-section w100 add-edit-user-card ">
        <SidePanel title={`Dimensions`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Width"
                    placeholder="Enter Width"
                    name="specification.dimensions.width"
                    suffix="mm"
                    type="number"
                  />
                </div>
                <div className="veh-just-child">

                  <FormikTextField
                    label="Height"
                    placeholder="Enter Height"
                    name="specification.dimensions.height"
                    suffix="mm"
                    type="number"
                  />
                </div>
                <div className="veh-just-child">

                  <FormikTextField
                    label="Length"
                    placeholder="Enter Length"
                    name="specification.dimensions.length"
                    suffix="mm"
                    type="number"
                  />
                </div>

              </div>
            </div>
            <div className="group-type-3-equal">

              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Interior Volume"
                    placeholder="Enter Interior Volume"
                    name="specification.dimensions.interiorVolume"
                    suffix=<>mm<sup>3</sup></>
                    type="number"
                  />
                </div>

                <div className="veh-just-child">              <FormikTextField
                  label="Passenger Volume"
                  placeholder="Enter Passenger Volume"
                  name="specification.dimensions.passengerVolume"
                  suffix=<>mm<sup>3</sup></>
                  type="number"
                />
                </div>

                <div className="veh-just-child">
                  <FormikTextField
                    label="Cargo Volume"
                    placeholder="Enter Cargo Volume"
                    name="specification.dimensions.cargoVolume"
                    suffix=<>mm<sup>3</sup></>
                    type="number"
                  />
                </div>
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Ground Clearance"
                  placeholder="Enter Ground Clearance"
                  name="specification.dimensions.groundClearance"
                  suffix="mm"
                  type="number"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Bed Length"
                  placeholder="Enter Bed Length"
                  name="specification.dimensions.bedLength"
                  suffix="mm"
                  type="number"
                />

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel title={`Weight`} />

        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Curb Weight"
                  placeholder="Enter Curb Weight"
                  name="specification.weight.curb"
                  suffix="kg"
                  type="number"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Gross Vehicle Weight Rating"
                  placeholder="Enter Vehicle Weight"
                  name="specification.weight.grossVehicle"
                  suffix="kg"
                /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel title={`Performance`} />

        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">

              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Towing Capacity"
                  placeholder="Enter Towing Capacity"
                  name="specification.performance.towingCapacity"
                  suffix="kg"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Max Payload"
                  type="number"
                  placeholder="Enter Max Payload"
                  name="specification.performance.maxPayload"
                  suffix="kg"
                /></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel title={`Fuel`} />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Mileage (City)"
                  placeholder="Enter Mileage (City)"
                  name="specification.mileage.city"
                  suffix="kmpl"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Mileage (Highway)"
                  placeholder="Enter Mileage (Highway)"
                  name="specification.mileage.highway"
                  suffix="kmpl"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Capacity (Tank 1)"
                  placeholder="Enter Capacity(Tank 1)"
                  name="specification.capacities.fuelTank1"
                  suffix="ltr"
                />
              </div>
            </div>
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Capacity(Tank 2)"
                  placeholder="Enter Capacity(Tank 2)"
                  name="specification.capacities.fuelTank2"
                  suffix="ltr"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="CNG Capacity"
                  placeholder="Enter CNG Capacity"
                  name="specification.capacities.cng"
                  suffix="kg"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Battery Capacity"
                  placeholder="Enter Battery Capacity"
                  name="specification.capacities.battery"
                  suffix="Ah"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel title={`Oil`} />

        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="Oil Capacity"
                  placeholder="Enter Oil Capacity"
                  name="specification.capacities.oil"
                  suffix="ltr"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Engine`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  type="text"
                  label="Engine Summary"
                  placeholder="Enter Engine Summary"
                  name="specification.engine.summary"
                />
              </div>
              <div className="flex-1 w-100">
                <CustomSelectById
                  id="engineBrand"
                  isMulti={false}
                  useFormik={true}
                  name="specification?.engine?.brand"
                  onChange={(e) => {
                    setFieldValue('specification?.engine?.brand', e.value);
                  }}
                  label="Engine Brand"
                  showLabel={true}
                  defaultValue={values?.specification?.engine?.brand}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true
                  }}
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Compression"
                  placeholder="Enter Compression"
                  name="specification.engine.compression"
                />
              </div>
            </div>
            <div className="group-type-3-equal">


              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Cylinders"
                    placeholder="Enter Cylinders"
                    name="specification.engine.cylinders"
                  />
                </div></div>
              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Displacement"
                    placeholder="Enter Displacement"
                    name="specification.engine.displacement"
                  />
                </div></div>
              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Fuel Induction"
                    placeholder="Enter Fuel Induction"
                    name="specification.engine.fuelInduction"
                  /></div></div>
            </div>
            <div className="group-type-3-equal">

              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Max HP"
                    placeholder="Enter Max HP"
                    name="specification.engine.maxHp"
                  />
                </div></div>
              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Max Torque"
                    placeholder="Enter Max Torque"
                    name="specification.engine.maxTorque"
                  />
                </div></div>
              <div className="veh-just">
                <div className="veh-just-child">
                  <FormikTextField
                    label="Valves"
                    placeholder="Enter Valves"
                    name="specification.engine.valves"
                  /></div></div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Transmission`}
        />

        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="transmissionType"
                  isMulti={false}
                  useFormik={true}
                  name="specification.transmission.typeId"
                  onChange={(e) => {
                    setFieldValue('specification?.transmission?.typeId', e.value);
                  }}
                  label="Transmission Type"
                  showLabel={true}
                  defaultValue={values?.specification?.transmission?.typeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Transmission Gears"
                  placeholder="Enter Transmission Gears"
                  name="specification.transmission.gear"
                />
              </div>
            </div>
            <div className="group-type-1">
              <div className="to-input-field">
                <Label >Transmission Description</Label>
                <Textarea
                  className="to-label c-black"
                  charCount={charCount}
                  // as="textarea"
                  id="transmissionDescription"
                  name="specification.transmission.description"
                  rows={6}
                  maxLength={500}
                  value={charCount > 0 ? values?.specification?.transmission?.description : ''}
                  onChange={(e) => {
                    setFieldValue('specification.transmission.description', e.target.value);
                    setCharCount(e.target.value.length)
                  }}
                  placeholder="Enter Transmission Gears"
                  style={{
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                    padding: "8px",
                    width: "100%",
                    transition: "border-color 0.2s ease-in-out",
                    outline: "none",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Wheels & Tires`}
        />

        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">


                <CustomSelectById
                  id="vehicleDriveType"
                  isMulti={false}
                  useFormik={true}
                  name="specification.wheelsAndTyres.driveTypeId"
                  onChange={(e) => {
                    setFieldValue('specification.wheelsAndTyres.driveTypeId', e.value);
                  }}
                  label="Drive Type"
                  showLabel={true}
                  defaultValue={values?.specification?.wheelsAndTyres?.driveTypeId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="brakingSystem"
                  isMulti={false}
                  useFormik={true}
                  name="specification.wheelsAndTyres.brakingSystemId"
                  onChange={(e) => {
                    setFieldValue('specification.wheelsAndTyres.brakingSystemId', e.value);
                  }}
                  label="Braking System"
                  showLabel={true}
                  defaultValue={values?.specification?.wheelsAndTyres?.brakingSystemId}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true,
                  }}
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Valves"
                  placeholder="Enter Valves"
                  name="specification.engine.valves"
                />
              </div>
            </div>
          </div>
        </div>
      </div>


      <div className={`border-v add-v-form-section w100 add-edit-user-card pt-43`}>
        <div className="add-v-form-left-section">
        </div>
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <div className="heading-600-16 c-blue1 ">
                  {"Front Tyre"}
                </div>
                <div className="heading-400-12 c-gray2">
                  {"Vehicle Front Tyre Information"}
                </div>

                <div className="group-type-3-equal">
                  <div className="flex-1 w-100">
                    <FormikTextField
                      type="number"
                      label="Track Width"
                      placeholder="Enter"
                      name="specification.frontTyre.trackWidth"
                    />
                  </div>
                  <div className="flex-1 w-100">
                    <FormikTextField
                      type="number"
                      label="Wheel Diameter"
                      placeholder="Enter"
                      name="specification.frontTyre.wheelDiameter"
                    />
                  </div>
                </div>
                <div className="group-type-3-equal">
                  <div className="flex-1 w-100">
                    <FormikTextField
                      label="Tyre Type"
                      placeholder="Enter"
                      name="specification.frontTyre.type"
                    />
                  </div>
                  <div className="flex-1 w-100">
                    <FormikTextField
                      label="Tyre PSI"
                      placeholder="Enter"
                      name="specification.frontTyre.pressure"
                    />
                  </div>
                </div>
                <div className="heading-600-16 c-blue1 mt-4">
                  {"Rear Tyre"}
                </div>
                <div className="heading-400-12 c-gray2">
                  {"Vehicle Rear Tyre Information"}
                </div>
                <div className="group-type-2-equal">
                  <div className="flex-1 w-100">
                    <FormikTextField
                      type="number"
                      label="Track Width"
                      placeholder="Enter"
                      name="specification.rearTyre.trackWidth"
                    />
                  </div>
                  <div className="flex-1 w-100">
                    <FormikTextField
                      type="number"
                      label="Wheel Diameter"
                      placeholder="Enter"
                      name="specification.rearTyre.wheelDiameter"
                    />
                  </div>
                </div>
                <div className="group-type-2-equal">
                  <div className="flex-1 w-100">
                    <FormikTextField
                      label="Tyre Type"
                      placeholder="Enter"
                      name="specification.rearTyre.type"
                    />
                  </div>
                  <div className="flex-1 w-100">
                    <FormikTextField
                      label="Tyre PSI"
                      placeholder="Enter"
                      name="specification.rearTyre.pressure"
                    />
                  </div>
                </div>
              </div>
              <div className="flex-1 w-100">
                <div className="specification-imgdiv-text">
                  Dimension Preview
                </div>

                <div className="specification-imgdiv">
                  <img
                    className="bus-img"
                    src="/assets/BusPreview.svg"
                    alt="Bus Preview"
                    style={{ transform: `scale(${scale})` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Specifications;
