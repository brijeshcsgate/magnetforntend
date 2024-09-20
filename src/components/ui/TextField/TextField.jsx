import { useState } from "react";
import { openEye, password } from "@/assets/Icons";
import { cn } from "@/utils";

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
      <div className="to-input-field" key={key}>
        <label
          className={cn("to-label c-black", labelClassName)}
          htmlFor={type}
        >
          {labelName} {isRequired && <span style={{ color: "red" }}>*</span>}
        </label>
        {
          <>
            {!readOnly ? (
              <input
                className={` ${prefix ? "pre-placeholder" : ""} ${
                  inputClassName && inputClassName
                } ${
                  disabled
                    ? "opacity-50 bg-gray-500 cursor-not-allowed to-input-all-disabled"
                    : "to-input-all"
                }`}
                id={name}
                name={name}
                onBlur={onBlur}
                type={isShowPassword ? "text" : type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                disabled={disabled}
                maxLength={130}
              />
            ) : (
              <input
                className={`to-input-all ${
                  type === "date" ? "type-data" : ""
                } ${inputClassName} ${
                  disabled
                    ? "opacity-100 cursor-not-allowed to-input-all-disabled"
                    : "to-input-all"
                }`}
                id={name}
                name={name}
                onBlur={onBlur}
                type={isShowPassword ? "text" : type}
                value={value}
                onChange={handleInputChange}
                placeholder={placeholder}
                readOnly
                disabled={disabled}
                maxLength={130}
              />
            )}
            {suffix ? <div className="rightText">{suffix}</div> : null}
            {prefix ? <div className="leftText">{prefix}</div> : null}
          </>
        }
        {type === "password" && (
          <div className="password" onClick={handlePasswordChange}>
            {isShowPassword
              ? openEye({ width: 20, height: 20 })
              : password({ width: 20, height: 20 })}
          </div>
        )}
        {touched && error && <div className="error-message">{error}</div>}
      </div>
      {helpertext && <div className="bottom-lable">{helpertext}</div>}
    </>
  );
};

export default TextField;
