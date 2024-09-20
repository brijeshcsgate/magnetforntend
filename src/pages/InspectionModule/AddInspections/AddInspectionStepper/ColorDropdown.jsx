import React, { useState } from "react";
import { useField } from "formik";
import "./ColorDropdown.css";

const ColorDropdown = ({
  name,
  label,
  id,
  helpertext,
  isRequired,
  defaultValue,
  callback = () => {},
  options = [],
  isDisabled,
  ...props
}) => {
  const [meta] = useField(name);
  const [color, setColor] = useState("#ff0000");

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  return (
    <div className="w-100">
      <label className="to-label c-black" htmlFor={id}>
        {label}
        {isRequired && <span style={{ color: "red" }}> *</span>}
      </label>
      <input
        type="color"
        id="favcolor"
        name="favcolor"
        value={color}
        onChange={handleColorChange}
        style={{ marginRight: "10px" }}
      />
      {helpertext && <div className="bottom-label">{helpertext}</div>}
      {meta.error ? <div className="error-message">{meta.error}</div> : null}
    </div>
  );
};

export default ColorDropdown;
