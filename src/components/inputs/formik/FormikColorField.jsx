import { useField } from 'formik';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const FormikColorField = ({
  label,
  placeholder,
  isRequired,
  helpertext,
  isDisabled,
  // onChange,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <ColorField
      // labelName={label}
      placeholder={placeholder}
      {...field}
      {...props}
      helpertext={helpertext}
      error={meta.touched && meta.error}
      isRequired={isRequired}
      touched={meta.touched}
      disabled={isDisabled === true ? true : false}
    />
  );
};

const ColorField = ({
  labelName,
  name,
  type,
  value,
  onChange,
  placeholder,
  onBlur,
  helpertext,
  isRequired,
  prefix,
  suffix,
  readOnly,
  key,
  inputClassName,
  error,
  touched,
  labelClassName,
  disabled, // new prop for disabled state
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInputChange = (e) => {
    onChange(e);
  };

  const handlePasswordChange = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <>
      <div className="to-input-field-color" key={key}>
        <label
          className={cn('to-label c-black', labelClassName)}
          htmlFor={type}
        >
          {labelName} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </label>

        <input
          className={`to-input-colorselect`}
          // style={{border:'1px solid #e0e0e0',borderRadius:'6px',backgroundColor:'white',zIndex:'4',padding:'3px'}}
          id={name}
          name={name}
          onBlur={onBlur}
          type="color"
          value={value || '#FFFFFF'} // Default to white (#FFFFFF)

          // value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          style={{ height: '35px' }}
        />

        {touched && error && <div className="error-message">{error}</div>}
      </div>
      {helpertext && <div className="bottom-lable">{helpertext}</div>}
    </>
  );
};

export default FormikColorField;
