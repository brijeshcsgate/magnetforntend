import { CustomSelectById } from '@/components/common/CustomSelect';
import { DatePickerInput } from '@/components/common/DateTimeInputs';
import FormikTextField from '@/components/inputs/formik/FormikTextField';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { getTodaysDate } from '@/utils/dateHelper';
import { IndianRupeeIcon } from 'lucide-react';
import { useState } from 'react';
const Loan = ({ values, setFieldValue }) => {
  const remark = values?.specification?.transmission?.description || '';

  const [charCount, setCharCount] = useState(remark.length);

  return (
    <>
      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <CustomSelectById
            id="vendor"
            isMulti={false}
            useFormik={true}
            name="financingDetail.loanDetail.lender"
            onChange={(e) => {
              setFieldValue('financingDetail.loanDetail.lender', e.value);
            }}
            label="Lender"
            showLabel={true}
            defaultValue={values?.financingDetail?.loanDetail?.lender}
            selectProps={{
              placeholder: 'Select',
              isClearable: true,
            }}
          />
        </div>
        <div className='flex-1 w-100'>
          <DatePickerInput
            name="financingDetail.loanDetail.date"
            labelName="Date of Loan"
            placeholder="DD MM YYYY "
            maxDate={getTodaysDate()}
          />
        </div>
        <div className='flex-1 w-100'>
          <FormikTextField label='Amount of Loan' placeholder='Enter Amount of Loan' name='financingDetail.loanDetail.amountOfLoan'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>
      </div>

      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <FormikTextField
            label='Annual Rate Of Interest(ROI)'
            placeholder='Enter Annual Rate of Interest'
            name='financingDetail.loanDetail.annualRateOfInterest'
          />
        </div>
        <div className="flex-1 w-100">
          <FormikTextField label='Down Payment' placeholder='Enter Down Payment Amount' name='financingDetail.loanDetail.downPayment'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>

        <div className="flex-1 w-100">
          <DatePickerInput
            name="financingDetail.loanDetail.firstPaymentDate"
            labelName="First Payment Date"
            placeholder="DD MM YYYY "
          />
        </div>
      </div>

      <div className="group-type-3-equal">
        <div className="flex-1 w-100">
          <FormikTextField label='Monthly Payment' placeholder='Enter Monthly Payment' name='financingDetail.loanDetail.monthlyPayment'
            suffix=<IndianRupeeIcon width='12' />
          />
        </div>

        <div className="flex-1 w-100">
          <FormikTextField label='Number of Payments' placeholder='Enter Number of Payments' name='financingDetail.loanDetail.numberOfPayments' />
        </div>

        <div className="flex-1 w-100">
          <DatePickerInput
            name="financingDetail.loanDetail.loanEndDate"
            labelName="Loan End Date"
            placeholder="Select "
          />
        </div>
      </div>
      <div className='group-type-1'>
        <FormikTextField label='Account Number' name='financingDetail.loanDetail.accountNumber' placeholder='Enter Account Number' />
      </div>
      <div className='group-type-1'>
        <div className='to-input-field'>
          <Label>Notes</Label>
          <Textarea
            className='to-label c-black'
            charCount={charCount}
            value={charCount > 0 ? values?.specification?.transmission?.description : ''}
            onChange={(e) => {
              setFieldValue('specification.transmission.description', e.target.value);
              setCharCount(e.target.value.length)
            }}

            id='transmissionDescription'
            maxLength={500}

            name='specification.transmission.description'
            rows={5}
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

export default Loan;
