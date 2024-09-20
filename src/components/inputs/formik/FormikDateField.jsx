import { cn } from '@/lib/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useField, useFormikContext } from 'formik';
import DatePicker from 'react-datepicker';
import { CalendarIcon } from 'lucide-react';

const FormikDateField = ({
  label,
  placeholder,
  helpertext,
  isRequired,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <DateField
      isRequired={isRequired}
      labelName={label}
      placeholder={placeholder}
      {...field}
      {...props}
      helpertext={helpertext}
      error={meta.touched && meta.error ? meta.error : ''}
      touched={meta.touched}
    />
  );
};

export const DateField = ({
  labelName,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  helpertext,
  isRequired,
  key,
  error,
  touched,
  is18,
  disabled,
  useFormik = true,
  minDate,
  maxDate,
  dateFormat,
  ...props
}) => {
  // const ref = useRef();
  const datePickerRef = useRef(null);
  // const [maxDate, setMaxDate] = useState("");
  // const [isCalenderOpen, setIsCalenderOpen] = useState(false);
  const [field, meta] = useFormik ? useField(name) : [{ value: value }, {}];
  const [startDate, setStartDate] = useState(value || field.value || null);

  // const [inputType, setInputType] = useState("Date");
  // const handleInputChange = (e) => {
  //   onChange(e);
  // };
  const formikContext = useFormik ? useFormikContext() : {};
  const handleDateChange = (date) => {
    setStartDate(date);
    if (useFormik) formikContext.setFieldValue(name, date);
    if (callback) callback(date);
  };

  const is18Handler = () => {
    const today = new Date();
    const year = today.getFullYear() - 18;
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  useEffect(() => {
    if (value) {
      setStartDate(value);
      if (useFormik) formikContext.setFieldValue(name, value);
    } else if (useFormik) {
      formikContext.setFieldValue(name, field.value);
      setStartDate(field.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, value]);
  useMemo(() => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(false);
    }
  }, [startDate]);
  return (
    <>
      <div className="to-input-field" key={key}>
        <label className="to-label c-black" htmlFor="date">
          {labelName} {isRequired && <span style={{ color: 'red' }}> *</span>}
        </label>

        <div className="flex items-center border border-border-primary rounded-md focus-within:shadow-custom-focus focus-within:border-custom-focus h-9">
          <div className="p-1 px-2 cursor-pointer" onClick={openDatePicker}>
            <CalendarIcon
              className={cn(
                'w-4 h-4 text-gray-400',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
          </div>
          <DatePicker
            ref={datePickerRef}
            id={name}
            selected={startDate}
            onChange={handleDateChange}
            dateFormat={dateFormat || 'd MMMM, yyyy'}
            minDate={minDate}
            maxDate={is18 ? is18Handler() : maxDate}
            className={`w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium ${
              disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'
            } ${error && touched ? 'border-red-500' : 'border-border-primary'}`}
            placeholderText={'DD MMM, YYYY'}
            disabled={disabled}
          />
        </div>
      </div>
      {helpertext && <div className="bottom-lable">{helpertext}</div>}
      {touched && error && <div className="error-message">{error}</div>}
    </>
  );
};

export default FormikDateField;
