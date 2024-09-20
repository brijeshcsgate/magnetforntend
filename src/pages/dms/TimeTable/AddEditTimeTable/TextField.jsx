import { useState } from "react";
import { openEye, password } from "@/assets/Icons";

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
  disabled,
}) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  const handleInputChange = (e) => {
    onChange(e);
  };

  const handlePasswordChange = () => {
    setIsShowPassword(!isShowPassword);
  };

  return (
    <div className="flex flex-col gap-0.5 w-full" key={key}>
      <label className="to-label c-black v-center" htmlFor={name}>
        {labelName} {isRequired && <span className="text-red-500">*</span>}
      </label>
      <div className="relative h-8">
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {prefix}
          </div>
        )}
        <input
          className={`${prefix ? "pl-10" : ""} ${
            suffix ? "pr-10" : ""
          } ${inputClassName} ${
            disabled ? "opacity-50 bg-gray-500 cursor-not-allowed" : ""
          } ${
            readOnly
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-white"
          } border border-border-primary rounded-md py-1 h-8 px-4 block w-full leading-5 focus:outline-none focus:ring-1 focus:ring-blue-500 text-xs font-medium `}
          id={name}
          name={name}
          onBlur={onBlur}
          type={isShowPassword ? "text" : type}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
        />
        {suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-auto">
            {suffix}
          </div>
        )}
        {type === "password" && (
          <div
            className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
            onClick={handlePasswordChange}
          >
            {isShowPassword
              ? openEye({ width: 20, height: 20 })
              : password({ width: 20, height: 20 })}
          </div>
        )}
      </div>
      {touched && error && <div className="text-red-500 mt-1">{error}</div>}
      {helpertext && <div className="text-gray-500">{helpertext}</div>}
    </div>
  );
};

export default TextField;
