import React, { useState } from 'react';
import moment from 'moment';
import FormikTextField from '../inputs/formik/FormikTextField';
import FormikDateField from '../inputs/formik/FormikDateField';
import { Field } from 'formik';
import { getTodaysDate } from '@/utils/dateHelper';
import FormikAsyncDropdown from '../inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown';
import FormikDocumentUploader from '../inputs/formik/FormikDocumentUploader/FormikDocumentUploader';
import './style.css';
import { CustomSelectById } from '../common/CustomSelect';
import { generateRandomString } from '@/lib/utils';
import { DatePickerInput } from '../common/DateTimeInputs';
import { Textarea } from '../ui/textarea';
import { Label } from '../ui/label';

const DeviceCard = ({
  values = { device: [] },
  counter,
  onDelete,
  setFieldValue,
  errors,
}) => {
  const deviceValues =
    values.device && values.device[counter] ? values.device[counter] : {};
  const remark = values?.device?.[counter]?.remark || '';
  const [charCount, setCharCount] = useState(remark.length);

  const handleDelete = () => {
    onDelete(counter); // Call the onDelete prop with the counter value to delete this card
  };
  const handleFromDateChange = (e) => {
    const { value } = e.target;
    setFieldValue(`device[${counter}].from`, value);
    // Reset the to date when from date changes
    setFieldValue(`device[${counter}].to`, '');
  };
  return (
    <div className="deviceCardContainer">
      <div style={{ position: 'relative' }}>
        <div className="delCard" onClick={handleDelete}>
          +
        </div>
      </div>
      <FormikTextField
        label="Device ID"
        placeholder="Enter Device ID"
        name={`device[${counter}].deviceId`}
      />
      <div className="grid grid-cols-2 gap-4">


        <CustomSelectById
          id="deviceType"
          isMulti={false}

          refetch={`values?.device[${counter}]?.type` && generateRandomString()}
          useFormik={true}
          name={`device[${counter}].type`}
          onChange={(e) => {
            setFieldValue(
              `device[${counter}].type`, e.value
            );
          }}
          label="Device Type"
          showLabel={true}
          filters={{
          }}
          defaultValue={values?.device?.[counter]?.type || ''}
          selectProps={{
            placeholder: 'Select',
            isClearable: true,
            isRequired: true,
          }}
        />
     
        <CustomSelectById
          id="deviceVendor"
          isMulti={false}

          refetch={`values?.device[${counter}].vendor` && generateRandomString()}
          useFormik={true}
          name={`device[${counter}].vendor`}
          onChange={(e) => {
            setFieldValue(
              `device[${counter}].vendor`, e.value
            );
          }}
          label="Device Vendor"
          showLabel={true}
          filters={{
            devices: deviceValues?.type,
          }}
          defaultValue={values?.device?.[counter]?.vendor || ''}
          selectProps={{
            placeholder: 'Select',
            isClearable: true,
            isRequired: true,
            isDisabled: !deviceValues?.type
          }}
        />






      </div>
      <div>
        
        <DatePickerInput
          name={`device[${counter}].subscription`}
          labelName="Installation Date"
          placeholder="DD MM YYYY"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        

        <DatePickerInput
          name={`device[${counter}].from`}
          labelName="From"
          placeholder="DD MM YYYY"
          onChange={handleFromDateChange}
          maxDate={getTodaysDate()}
        />
        

        <DatePickerInput
          name={`device[${counter}].to`}
          labelName="To"
          placeholder="DD MM YYYY"
          minDate={deviceValues.from
            ? moment(deviceValues.from).add(1, 'days').format('YYYY-MM-DD')
            : getTodaysDate()}
          disabled={!deviceValues.from}
        />
      </div>

      <div className="grid grid-cols- gap-4">
        <div className="to-input-field">
          <Label>Remark</Label>
       
          <Textarea
            className="to-label c-black"
            charCount={charCount}
            name={`device[${counter}].remark`}
            maxLength={500}
            rows={6}
            value={charCount > 0 ? values?.device[counter]?.remark : ''}

            onChange={(e) => {
              setFieldValue(`device[${counter}].remark`, e.target.value);
              setCharCount(e.target.value.length)
            }}

            placeholder="Enter Remark"
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

      <div className="group-type-1"></div>
      <div className="image-uploder-block" key={`img${counter}`}>
        <FormikDocumentUploader
          name={`device[${counter}].images`}
          id={`device-images-${counter}`}
          title="Upload Multiple Device Images"
          message="or drag & drop device image files here"
          btnText="BROWSE FILE"
          bottomMessage="Supported File Format: jpeg, png (upto 1 MB)"
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default DeviceCard;
