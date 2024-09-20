import { CustomSelectById } from '@/components/common/CustomSelect';
import { DatePickerInput } from '@/components/common/DateTimeInputs';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTodaysDate } from '@/utils/dateHelper';
import { IndianRupeeIcon } from 'lucide-react';
import { useState } from 'react';
const Lease = ({ values, setFieldValue }) => {
  const remark = values?.financial?.leaseDetail?.description || '';
  const [charCount, setCharCount] = useState(remark.length);
  return (
    <>
      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <CustomSelectById
            id="vendor"
            isMulti={false}
            useFormik={true}
            name="financial.leaseDetail.vendor"
            onChange={(e) => {
              setFieldValue('financial.leaseDetail.vendor', e.value);
            }}
            label="Vendor"
            showLabel={true}
            defaultValue={values?.financial?.leaseDetail?.vendor}
            selectProps={{
              placeholder: 'Select',
              isClearable: true,
            }}
          />
        </div>
        <div className="flex-1 w-100">
          <DatePickerInput
            name="financial.leaseDetail.date"
            labelName="Date of Lease"
            placeholder="DD MM YYYY "
            
            maxDate={getTodaysDate()}
          />
        </div><div className="flex-1 w-100">
          <FormikTextField label='Capitalized Cost' placeholder='Enter Capitalized Cost' name='financial.leaseDetail.capitalizedCost'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>
      </div>

      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <FormikTextField label='Down Payment' placeholder='Enter Down Payment Amount' name='financial.leaseDetail.downPayment'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>
        <div className="flex-1 w-100">
          <DatePickerInput
            name="financial.leaseDetail.firstPaymentDate"
            labelName="First Payment Date"
            placeholder="DD MM YYYY "
          />
        </div><div className="flex-1 w-100">
          <FormikTextField label='Monthly Payment' placeholder='Enter Monthly Payment' name='financial.leaseDetail.monthlyPayment'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>
      </div>
      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <FormikTextField
            label='Number of Payments / Instalments'
            placeholder='Enter Number of Payments'
            name='financial.leaseDetail.numberOfPayments'
          />
        </div>
        <div className="flex-1 w-100">
          <DatePickerInput
            name="financial.leaseDetail.leaseEndDate"
            labelName="Lease End Date"
            placeholder="DD MM YYYY "
          />
        </div>
        <div className="flex-1 w-100">
          <FormikTextField label='Residual Value' placeholder='Enter Residual Value' name='financial.leaseDetail.residualValue' />
        </div>
      </div>
      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <FormikTextField
            label='Contract Mileage Limit'
            placeholder='Enter Contract Mileage Limit'
            name='financial.leaseDetail.contractMileageLimit'
          />
        </div>
        <div className="flex-1 w-100">
          <FormikTextField label='Excess Mileage Charge' placeholder='Enter Excess Mileage Charge' name='financial.leaseDetail.excessMileageCharge' />
        </div>
        <div className="flex-1 w-100">
          <FormikTextField label='Lease Number' placeholder='Enter Lease Number' name='financial.leaseDetail.leaseNumber' />
        </div></div>

      <div className='group-type-1'>
        <div className='to-input-field'>
          <Label>Notes</Label>
          <Textarea
            className='to-label c-black'
            charCount={charCount}
            id='lease'
            name='financial.leaseDetail.description'
            rows={5}
            value={charCount > 0 ? values?.financial?.leaseDetail?.description : ''}
            onChange={(e) => {
              setFieldValue('financial.leaseDetail.description', e.target.value);
              setCharCount(e.target.value.length)
            }}
            maxLength={500}
            placeholder='Enter Notes'
            style={{
              border: '1px solid #ccc',
              borderRadius: '4px',
              padding: '8px',
              width: '100%',
              transition: 'border-color 0.2s ease-in-out',
              outline: 'none',
            }}
          />
        </div>
      </div>

      <div className="aeu-flex-js">
        <Checkbox
          id="loanGenerateExpenses"
          name="loanGenerateExpenses"
          checked={values?.loanGenerateExpenses}
          onCheckedChange={(checked) => {
            setFieldValue('loanGenerateExpenses', checked);

          }
          }
          className="w-5 h-5"
        />
        <p>
          <span style={{ fontWeight: 'bold' }}>Generate Expenses</span>
          <br />
          Automatically generate expenses entries for payment for this loan/lease.
        </p>
      </div>
    </>
  );
};

export default Lease;
