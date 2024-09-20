import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import { useField, useFormikContext } from 'formik';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import 'react-datepicker/dist/react-datepicker.css';
import { Label } from '@/components/ui/label';
import '../../../../components/common/DateTimeInputs/datetime.styles.css';

export const DateTimeInput = ({
  name,
  labelName,
  value,
  defaultValue,
  callback,
  placeholder,
  isRequired,
  error,
  touched,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'd MMMM, yyyy HH:mm',
  useFormik = true,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = useFormik ? useField(name) : [{ value: value }, {}];
  const [startDate, setStartDate] = useState(
    value || defaultValue || field.value || null
  );
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setStartDate(value);
      if (useFormik) formikContext.setFieldValue(name, value);
    } else if (defaultValue) {
      setStartDate(new Date(defaultValue));
      if (useFormik) formikContext.setFieldValue(name, defaultValue);
    } else if (useFormik) {
      formikContext.setFieldValue(name, field.value);
      setStartDate(field.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, value, defaultValue]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (useFormik) formikContext.setFieldValue(name, date);
    if (callback) callback(date);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-0.5 w-full', props.className)}
    >
      <Label>
        {labelName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center border border-border-primary rounded-md focus-within:ring-1 focus-within:ring-blue-500 h-8">
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
          selected={startDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={dateFormat}
          className={`w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'
          } ${error && touched ? 'border-red-500' : 'border-border-primary'}`}
          placeholderText={placeholder}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      {useFormik && meta.error && meta.touched && !disabled ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export const TimePickerInput = ({
  name,
  labelName,
  value,
  callback,
  placeholder,
  isRequired,
  disabled = false,
  minDate,
  maxDate,
  dateFormat,
  useFormik = true,
  defaultValue,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = useFormik ? useField(name) : [{ value: value }, {}];
  const [startTime, setStartTime] = useState(
    defaultValue || value || field.value
  );
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      const parsedValue = new Date(value);
      if (!isNaN(parsedValue)) {
        setStartTime(parsedValue);
        if (useFormik) formikContext.setFieldValue(name, parsedValue);
      }
    } else if (useFormik && field.value) {
      const parsedFieldValue = new Date(field.value);
      if (!isNaN(parsedFieldValue)) {
        setStartTime(parsedFieldValue);
        formikContext.setFieldValue(name, parsedFieldValue);
      }
    } else if (defaultValue) {
      const parsedDefaultValue = new Date(defaultValue);
      if (!isNaN(parsedDefaultValue)) {
        setStartTime(parsedDefaultValue);
        if (useFormik) formikContext.setFieldValue(name, parsedDefaultValue);
      }
    }
  }, [value, field.value, defaultValue]);

  const handleTimeChange = (time) => {
    setStartTime(time);
    if (useFormik) formikContext.setFieldValue(name, time);
    callback(time);
  };

  const openTimePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div className="flex flex-col gap-0.5 w-full" {...props}>
      <Label>
        {labelName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center border border-border-primary rounded-md focus-within:ring-1 focus-within:ring-blue-500 h-8">
        <div className="p-1 px-2 cursor-pointer" onClick={openTimePicker}>
          <ClockIcon
            className={cn(
              'w-4 h-4 text-gray-400',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          />
        </div>
        <DatePicker
          ref={datePickerRef}
          selected={startTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeFormat="HH:mm"
          timeIntervals={15}
          timeCaption="Time"
          dateFormat={dateFormat || 'HH:mm'}
          className={`w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'
          } ${
            meta.error && meta.touched && !disabled
              ? 'border-red-500'
              : 'border-border-primary'
          }`}
          placeholderText={placeholder}
          disabled={disabled}
          minDate={minDate}
          maxDate={maxDate}
        />
      </div>
      {useFormik && meta.error && meta.touched && !disabled && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

export const DateInput = ({
  name,
  labelName,
  value,
  defaultValue,
  callback,
  placeholder,
  isRequired,
  error,
  touched,
  disabled = false,
  minDate,
  maxDate,
  dateFormat,
  useFormik = true,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : {};
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = useFormik ? useField(name) : [{ value: value }, {}];
  const [startDate, setStartDate] = useState(
    value || defaultValue || field.value || null
  );
  const datePickerRef = useRef(null);

  useEffect(() => {
    if (value) {
      setStartDate(value);
      if (useFormik) formikContext.setFieldValue(name, value);
    } else if (defaultValue) {
      setStartDate(defaultValue);
      if (useFormik) formikContext.setFieldValue(name, defaultValue);
    } else if (useFormik) {
      formikContext.setFieldValue(name, field.value);
      setStartDate(field.value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value, value, defaultValue]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (useFormik) formikContext.setFieldValue(name, date);
    if (callback) callback(date);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div
      {...props}
      className={cn('flex flex-col gap-0.5 w-full', props.className)}
    >
      <Label>
        {labelName} {isRequired && <span className="text-red-500">*</span>}
      </Label>
      <div className="flex items-center border border-border-primary rounded-md focus-within:ring-1 bg-white focus-within:ring-blue-500 h-8">
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
          selected={startDate}
          onChange={handleDateChange}
          dateFormat={dateFormat || 'd MMMM, yyyy'}
          minDate={minDate}
          maxDate={maxDate}
          className={`w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'bg-white'
          } ${error && touched ? 'border-red-500' : 'border-border-primary'}`}
          placeholderText={placeholder}
          disabled={disabled}
        />
      </div>
      {useFormik && meta.error && meta.touched && !disabled ? (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};
