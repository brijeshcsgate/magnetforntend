/* eslint-disable no-unused-vars */
const colourStyles = {
  control: (styles, { isDisabled }) => {
    return {
      background: isDisabled ? "#e0e0e0" : "white",
      display: "flex",
      marginTop: "0.51vw",
      borderRadius: "6px",
      height: "100%",
      border: "1px solid #e0e0e0",
      color: "#000",
      fontSize: "12px",
      fontStyle: "normal",
      fontWeight: "500",
      lineHeight: "22px",
      letterSpacing: "0.28px",
    };
  },
  menu: () => {
    return {
      fontSize: "12px",
      backgroundColor: "white",
      border: "1px solid #ccc",
      boxShadow: "0 1px 0 rgb(0 0 0 / 6%)",
      boxSizing: "border-box",
      overflowY: "auto",
      position: "absolute",
      width: "100%",
      borderRadius: "0.5vw",
      zIndex: "1",
    };
  },
  menuList: (styles) => {
    return {
      ...styles,
      maxHeight: "10vw !important",
      overflowY: "auto !important",
    };
  },
  option: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      fontSize: "12px",
      backgroundColor: isSelected ? "#f2f9fc" : "#fff",
      cursor: "pointer",
      color: "#333",
      padding: "0.51vw 1vw",
    };
  },
  multiValue: (styles, { isDisabled, isFocused, isSelected }) => {
    return {
      padding: "0",
    };
  },
  indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
};

import { useField, useFormikContext } from "formik";
import Select from "react-select";

const FormikDropdown = ({
  name,
  label,
  id,
  helpertext,
  isRequired,
  defaultValue,
  callback = () => { },
  options = [],
  isDisabled,
  ...props
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (selectedOption) => {
    if (props.isMulti) {
      const ids = selectedOption.map((option) => option.value);
      setFieldValue(name, ids);
      callback(selectedOption);
      return;
    }
    setFieldValue(name, selectedOption?.value || null);
    callback(selectedOption);
  };

  const selectedValue = props.isMulti
    ? options.filter(({ value }) => field.value.includes(value))
    : options.find(({ value }) => value.toString() === field.value?.toString());

  if (name === "identification.manufacturingYear")
    (function () { return { val: field.value } })()
  return (
    <div className="w-100">
      <label className="to-label c-black" htmlFor={id}>
        {label}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <Select
        {...props}
        id={id}
        classNamePrefix="my-async-select"
        name={name}
        value={selectedValue}
        options={options}
        defaultValue={defaultValue}
        onChange={handleChange}
        isClearable
        isLoading={meta.touched && meta.isLoading}
        isDisabled={meta.isSubmitting || isDisabled}
        styles={colourStyles}
      />
      {helpertext && <div className="bottom-lable">{helpertext}</div>}
      {meta.error ? <div className="error-message">{meta.error}</div> : null}
    </div>
  );
};

export default FormikDropdown;
