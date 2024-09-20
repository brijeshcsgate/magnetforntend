import TextField from '@/components/inputs/formik/TextField/TextField';
import { useField } from 'formik';

const FormikColorPicker = ({ label, name, isRequired }) => {
  const [field, meta] = useField(name);

  return (
    <div className="to-input-field flex">
      <label htmlFor={name} className="to-label c-black">
        {label} {isRequired && <span style={{ color: 'red' }}>*</span>}
      </label>
      <div className="flex h-10">
        <input
          {...field}
          type="color"
          id={name}
          className={`to-input-colour flex ${
            meta.touched && meta.error ? 'is-invalid' : ''
          }`}
        />
        <TextField
          {...field}
          type="text"
          id={name}
          inputClassName="bg-[#fff] border-0 "
          // className={`to-input-all bg-gray-600 ${
          //   meta.touched && meta.error ? "is-invalid" : ""
          // }`}
          disabled={true}
          // readOnly={true}
        />
      </div>

      {meta.touched && meta.error ? (
        <div className="error-message">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikColorPicker;
