
import { SidePanel } from "@/components/AddFormLayout/AddFormLayout";
import FormikRadioGroupWithDescription from "@/components/inputs/formik/FormikRadioGroupWithDescription";
import FormikTextField from "@/components/inputs/formik/FormikTextField";

import Lease from "./Lease";
import Loan from "./Loan";
import { CustomSelectById } from "@/components/common/CustomSelect";
import { DatePickerInput } from "@/components/common/DateTimeInputs";
import { Textarea } from "@/components/ui/textarea";
import { IndianRupeeIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { getTodaysDate } from "@/utils/dateHelper";

const Financial = ({ values, setFieldValue, handleBlur, handleChange }) => {
  const financingOptions = [
    {
      label: "Loan",
      value: "loan",
      description: "This Vehicle Associated with the loan",
    },
    {
      label: "Lease",
      value: "lease",
      description: "This Vehicle Associated with the lease",
    },
    {
      label: "No Financing",
      value: "notFinanced",
      description: "This Vehicle has no financing",
    },
  ];
  const remark = values?.specification?.transmission?.description || '';
  const [charCount, setCharCount] = useState(remark.length);

  return (
    <div className="form-content-container">
      <div className="border-v add-v-form-section w100 add-edit-user-card">
        <SidePanel
          title={`Purchase Detail`}
        />
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div className="group-type-3-equal">
              <div className="flex-1 w-100">

                <CustomSelectById
                  id="vendor"
                  isMulti={false}
                  useFormik={true}
                  name="financial.purchaseDetail.vendor"
                  onChange={(e) => {
                    setFieldValue('financial.purchaseDetail.vendor', e.value);
                  }}
                  label="Purchase Vendor"
                  showLabel={true}
                  defaultValue={values?.financial?.purchaseDetail?.vendor}
                  selectProps={{
                    placeholder: 'Select',
                    isClearable: true
                  }}
                />
              </div>

              <div className="flex-1 w-100">
                <DatePickerInput
                  name="financial.purchaseDetail.date"
                  labelName="Purchase Date"
                  placeholder="DD MM YYYY "
                  minDate={getTodaysDate()}
                
                />
              </div>
            </div>

            <div className="group-type-3-equal">
              <div className="flex-1 w-100">
                <FormikTextField
                  label="Purchase Price"
                   type="number"
                  placeholder="Enter Purchase Price"
                  name="financial.purchaseDetail.price"
                  suffix=<IndianRupeeIcon width='12' />
                />
              </div>
              <div className="flex-1 w-100 ">
                <FormikTextField
                  type="number"
                  label="Odometer"
                  placeholder="Enter Odometer"
                  name="financial.purchaseDetail.odometer"
                  suffix="km"
                />
              </div>
            </div>
            <div className="group-type-1">
              <div className="to-input-field">
                <Label> Notes</Label>
                <Textarea
                  className="to-label c-black"
                  charCount={charCount}
                  id="transmissionDescription"
                  name="specification.transmission.description"
                  rows={5}
                  maxLength={500}
                  value={charCount > 0 ? values?.specification?.transmission?.description : ''}
                  onChange={(e) => {
                    setFieldValue('specification.transmission.description', e.target.value);

                    setCharCount(e.target.value.length)
                  }}

                  placeholder="Enter Notes"
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

      <div className={`border-v add-v-form-section w100 add-edit-user-card pt-43`}>
        <div className="add-v-form-left-section">
          <div className="heading-600-16 c-blue1">Financing Details</div>

        </div>
        <div className="add-v-form-right-section">
          <div className="add-v-form-section">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                width: "100%",
                borderRadius: "5px",
                border: `1px solid #E0E0E0`,
              }}
            >
              <FormikRadioGroupWithDescription
                label="Financing Options"
                name="financial.financingDetail"
                options={financingOptions}
              />
            </div>
            {values?.financial?.financingDetail === "loan" && <Loan values={values} setFieldValue={setFieldValue} />}
            {values?.financial?.financingDetail === "lease" && <Lease values={values} setFieldValue={setFieldValue} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financial;
