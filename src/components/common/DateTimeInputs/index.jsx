import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { useField, useFormikContext } from 'formik';
import { CalendarIcon, ClockIcon } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * DateTimePickerInput component for selecting both date and time.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the field for Formik.
 * @param {string} props.labelName - The label for the input field.
 * @param {Date} [props.value] - The current value of the date/time picker.
 * @param {Date} [props.defaultValue] - The default value if none is provided.
 * @param {function} [props.callback] - Callback function triggered on date change.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.isRequired] - Indicates if the field is required.
 * @param {boolean} [props.disabled=false] - Disables the input if true.
 * @param {Date} [props.minDate] - Minimum selectable date.
 * @param {Date} [props.maxDate] - Maximum selectable date.
 * @param {string} [props.dateFormat] - Format for displaying the date.
 * @param {boolean} [props.useFormik=true] - Use Formik for handling form state.
 * @param {..Object} props.props - Additional props for the component.
 *
 * @example
 * <DateTimePickerInput
 *   name="eventDateTime"
 *   labelName="Event Date and Time"
 *   placeholder="Select date and time"
 *   isRequired
 *   minDate={new Date()}
 *   callback={(date) => console.log(date)}
 * />
 */
export const DateTimePickerInput = ({
  name,
  labelName,
  value,
  defaultValue,
  onChange,
  placeholder,
  isRequired,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'd MMMM, yyyy HH:mm',
  useFormik = true,
  className,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = useFormik ? useField(name) : [{ value }, {}];
  const [startDate, setStartDate] = useState(() => {
    const initialDate = value || defaultValue || field.value;
    return initialDate ? new Date(initialDate) : null;
  });
  const datePickerRef = useRef(null);

  useEffect(() => {
    const initialDate = value || defaultValue || field.value;
    const parsedDate = initialDate ? new Date(initialDate) : null;
    if (parsedDate && !isNaN(parsedDate.getTime())) {
      setStartDate(parsedDate);
      if (useFormik && formikContext) {
        formikContext.setFieldValue(name, parsedDate);
      }
    }
  }, [value, defaultValue, field.value, name, formikContext, useFormik]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (useFormik && formikContext) {
      formikContext.setFieldValue(name, date);
    }
    if (onChange) onChange(date);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div {...props} className={cn('flex flex-col gap-1 w-full', className)}>
      {labelName && (
        <label className="to-label c-black v-center">
          {labelName} {isRequired && <span className="text-red-500">*</span>}
        </label>
      )}
      <div
        className={cn('flex items-center border rounded-md h-8', {
          'border-red-500': meta.error && meta.touched,
          'border-border-primary': !(meta.error && meta.touched),
          'opacity-50 cursor-not-allowed': disabled,
        })}
      >
        <div className="p-1 px-2 cursor-pointer" onClick={openDatePicker}>
          <CalendarIcon className="w-4 h-4 text-gray-400" />
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
          className="w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium"
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

/**
 * TimePickerInput component for selecting time.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the field for Formik.
 * @param {string} props.labelName - The label for the input field.
 * @param {Date} [props.value] - The current value of the time picker.
 * @param {function} [props.callback] - Callback function triggered on time change.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.isRequired] - Indicates if the field is required.
 * @param {boolean} [props.disabled=false] - Disables the input if true.
 * @param {Date} [props.minDate] - Minimum selectable date.
 * @param {Date} [props.maxDate] - Maximum selectable date.
 * @param {string} [props.dateFormat] - Format for displaying the time.
 * @param {boolean} [props.useFormik=true] - Use Formik for handling form state.
 * @param {..Object} props.props - Additional props for the component.
 *
 * @example
 * <TimePickerInput
 *   name="eventTime"
 *   labelName="Event Time"
 *   placeholder="Select time"
 *   isRequired
 *   callback={(time) => console.log(time)}
 * />
 */
export const TimePickerInput = ({
  name,
  labelName,
  value,
  onChange,
  placeholder,
  isRequired,
  disabled = false,
  dateFormat = 'HH:mm',
  useFormik = true,
  defaultValue,
  className,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : null;
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [field, meta] = useFormik ? useField(name) : [{ value }, {}];
  const [startTime, setStartTime] = useState(() => {
    const initialTime = value || defaultValue || field.value;
    return initialTime ? new Date(initialTime) : null;
  });
  const datePickerRef = useRef(null);

  useEffect(() => {
    const initialTime = value || defaultValue || field.value;
    const parsedTime = initialTime ? new Date(initialTime) : null;
    if (parsedTime && !isNaN(parsedTime.getTime())) {
      setStartTime(parsedTime);
      if (useFormik && formikContext) {
        formikContext.setFieldValue(name, parsedTime);
      }
    }
  }, [value, defaultValue, field.value, name, formikContext, useFormik]);

  const handleTimeChange = (time) => {
    setStartTime(time);
    if (useFormik && formikContext) {
      formikContext.setFieldValue(name, time);
    }
    if (onChange) onChange(time);
  };

  const openTimePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div {...props} className={cn('flex flex-col gap-1 w-full', className)}>
      {labelName && (
        <Label>
          {labelName} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div
        className={cn('flex items-center border rounded-md h-8', {
          'border-red-500': meta.error && meta.touched,
          'border-border-primary': !(meta.error && meta.touched),
          'opacity-50 cursor-not-allowed': disabled,
        })}
      >
        <div className="p-1 px-2 cursor-pointer" onClick={openTimePicker}>
          <ClockIcon className="w-4 h-4 text-gray-400" />
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
          dateFormat={dateFormat}
          className="w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium"
          placeholderText={placeholder}
          disabled={disabled}
        />
      </div>
      {useFormik && meta.error && meta.touched && !disabled && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};

/**
 * DatePickerInput component for selecting a date.
 *
 * @param {Object} props - The props for the component.
 * @param {string} props.name - The name of the field for Formik.
 * @param {string} props.labelName - The label for the input field.
 * @param {Date} [props.value] - The current value of the date picker.
 * @param {Date} [props.defaultValue] - The default value if none is provided.
 * @param {function} [props.callback] - Callback function triggered on date change.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {boolean} [props.isRequired] - Indicates if the field is required.
 * @param {boolean} [props.disabled=false] - Disables the input if true.
 * @param {Date} [props.minDate] - Minimum selectable date.
 * @param {Date} [props.maxDate] - Maximum selectable date.
 * @param {string} [props.dateFormat] - Format for displaying the date.
 * @param {boolean} [props.useFormik=true] - Use Formik for handling form state.
 * @param {..Object} props.props - Additional props for the component.
 *
 * @example
 * <DatePickerInput
 *   name="eventDate"
 *   labelName="Event Date"
 *   placeholder="Select date"
 *   isRequired
 *   callback={(date) => console.log(date)}
 * />
 */
export const DatePickerInput = ({
  name,
  labelName,
  value,
  defaultValue,
  onChange,
  placeholder,
  isRequired,
  error,
  touched,
  disabled = false,
  minDate,
  maxDate,
  dateFormat = 'd MMM yyyy',
  useFormik = true,
  className,
  ...props
}) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formikContext = useFormik ? useFormikContext() : null;
  const [field, meta, helpers] = useFormik
    ? // eslint-disable-next-line react-hooks/rules-of-hooks
      useField(name)
    : [{ value }, {}, {}];
  const [startDate, setStartDate] = useState(
    value || defaultValue || field.value || null
  );
  const datePickerRef = useRef(null);

  useEffect(() => {
    const initialDate = value || defaultValue || field.value;
    setStartDate(initialDate);
  }, [value, defaultValue, field.value]);

  const handleDateChange = (date) => {
    setStartDate(date);
    if (useFormik && formikContext) {
      helpers.setValue(date);
    }
    if (onChange) onChange(date);
  };

  const openDatePicker = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setOpen(true);
    }
  };

  return (
    <div {...props} 
    className="to-input-field"
    // className={cn('flex flex-col  w-full', className)} 
    >
      {labelName && (
        <Label 
        
        className={cn('c-black mb-1', className)}
        >
          {labelName} {isRequired && <span className="text-red-500">*</span>}
        </Label>
      )}
      <div
        className={cn('flex items-center border rounded-md h-8', {
          'border-red-500': error && touched,
          'border-border-primary': !(error && touched),
          'opacity-50 cursor-not-allowed': disabled,
        })}
      >
        <div className="p-1 px-2 cursor-pointer" onClick={openDatePicker}>
          <CalendarIcon className="w-4 h-4 text-gray-400" />
        </div>
        <DatePicker
          ref={datePickerRef}
          selected={startDate}
          onChange={handleDateChange}
          dateFormat={dateFormat}
          minDate={minDate}
          maxDate={maxDate}
          className="w-full p-2 border-none focus:outline-none rounded-md text-xs font-medium h-7 placeholder:text-xs placeholder:font-medium"
          placeholderText={placeholder}
          disabled={disabled}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
        />
      </div>
      {useFormik && meta.error && meta.touched && !disabled && (
        <div className="text-red-500 text-xs mt-1">{meta.error}</div>
      )}
    </div>
  );
};
