import { useField } from 'formik';

const FormikRadioGroupWithDescription = ({ options, ...props }) => {
  const [field] = useField(props);

  return (
    <>
      {options.map((option) => (
        <label
          key={option.value}
          style={{
            display: 'flex',
            gap: '10px',
            border: `1px solid #E0E0E0`,
            padding: '10px',
            cursor: 'pointer',
          }}
        >
          <input type='radio' {...field} {...props} value={option.value} checked={field.value === option.value} />
          <div>
            {option.label}
            <br />
            <span style={{ fontSize: '12px', color: '#A6A6A6' }}>{option.description}</span>
          </div>
        </label>
      ))}
    </>
  );
};

export default FormikRadioGroupWithDescription;
