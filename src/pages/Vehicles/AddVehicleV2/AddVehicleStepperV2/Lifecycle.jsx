import { SidePanel } from "@/components/AddFormLayout/AddFormLayout";
import { DatePickerInput } from "@/components/common/DateTimeInputs";
import FormikDateField from "@/components/inputs/formik/FormikDateField";
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import { Checkbox } from "@/components/ui/checkbox";

const Lifecycle = ({ values, setFieldValue }) => {
  return (
    <div className="form-content-container">
      <div className="border-v add-v-form-section w100 add-edit-user-card">
        <SidePanel
          title={`In-Service`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">

            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <DatePickerInput
                  name="lifeCycle.inService.date"
                  labelName="In-Service Date"
                  placeholder="DD MM YYYY "
                  helpertext="Date when vehicle entered active fleet service"

                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  type="number"
                  label="In-Service Odometer"
                  placeholder="Enter In-Service Odometer"
                  name="lifeCycle.inService.odometer"
                  helpertext="Odometer reading on in-service date"
                  suffix="km"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Life Estimation`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Estimated service Life (Months)"
                  placeholder="Enter Estimated service Life (Months)"
                  name="lifeCycle.lifeEstimation.months"
                  helpertext="Number of months vehicle is expected to be in active fleet service"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Estimated service Life (Odometer)"
                  placeholder="Enter Estimated service Life (Odometer)"
                  name="lifeCycle.lifeEstimation.odometer"
                  helpertext="Primary meter value vehicle is expected to use/run before retiring from fleet service"
                />
              </div>
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Estimated Resale Value"
                  placeholder="Enter Estimated Resale Value"
                  name="lifeCycle.lifeEstimation.resaleValue"
                  helpertext="Amount expected to be obtained after retirement and sale/disposal (less any associated costs)"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="border-v add-v-form-section w100 add-edit-user-card pt-43">
        <SidePanel
          title={`Out-of-Service`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">

            <div className="flex items-center space-x-2">
              <Checkbox
                id="outOfService.out"
                name="outOfService.out"
                checked={values?.outOfService?.out}
                onCheckedChange={(checked) => {
                  console.log('object------', checked)
                  setFieldValue('outOfService.out', checked)
                }}
                className="w-5 h-5"
              />
              <label
                htmlFor="outOfService.out"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Mark Out of Service
              </label>
            </div>


            {values?.outOfService?.out && (
              <>

                <div className="group-type-3-equal">
                  <div className="flex-1 w-100">
                    <DatePickerInput
                      name="outOfService.date"
                      labelName="Out-of-Service Date"
                      placeholder="DD MM YYYY "
                      helpertext="Date vehicle was retired from fleet service"
                    />
                  </div>
                  <div className="flex-1 w-100">  <FormikTextField
                    label="Out-of-Service Odometer"
                    placeholder="Enter Out-of-Service Odometer"
                    name="outOfService.odometer"
                    helpertext="Final odometer reading on out-of-service date"
                    suffix="km"
                  />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lifecycle;
