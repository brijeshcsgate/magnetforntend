import React, { useState } from 'react';
import { openEye, password } from '@/assets/Icons';
import { cn } from '@/lib/utils';
import { Label } from '../../../ui/label';
import { Input } from '../../../ui/input';
import { Tooltip } from '@mui/material';






const TextField = ({
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
  disabled,
  maxLength = 130,
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
      <div className="to-input-field" key={key}>
        <Label
          className={cn('c-black mb-1', labelClassName)} // Adjusting label styling with cn
          htmlFor={name} // Updated to use `name` as `htmlFor` to match input id
        >
          {labelName} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </Label>
        <div className="relative">
          {' '}
          {/* Wrapper to position prefix, suffix, and input correctly */}
          {prefix && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
              {prefix}
            </div>
          )}
          <Input
            className={cn(
              prefix ? 'pl-10' : '', // Adjust padding if prefix is present
              suffix ? 'pr-10' : '', // Adjust padding if suffix is present
              inputClassName,
              disabled
                ? 'opacity-50 cursor-not-allowed'
                : 'border-border-primary bg-white'
            )}
            id={name}
            name={name}
            onBlur={onBlur}
            type={isShowPassword ? 'text' : type}
            value={value}
            onChange={handleInputChange}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readOnly}
            maxLength={maxLength}
          />
          {suffix && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 fnt-14">
              {suffix}
            </div>
          )}
        </div>
        {type === 'password' && (
          <div className="password" onClick={handlePasswordChange}>
            {isShowPassword
              ? openEye({ width: 20, height: 20 })
              : password({ width: 20, height: 20 })}
          </div>
        )}
        {/* {touched && error && <div className="error-message">{error}
          </div>} */}
        {touched && error && (
          <div className="error-message">
            {error.charAt(0).toUpperCase() + error.slice(1).toLowerCase()}
          </div>
        )}
      </div>

      <Tooltip title={helpertext}>

        {helpertext && <div className="bottom-label fnt-12">
          {/* {helpertext} */}
          {helpertext.length > 55 ? `${helpertext.substring(0, 55)}...` : helpertext}
        </div>}
      </Tooltip>

    </>
  );
};

export default TextField;
