import { useField } from 'formik';
import './FormikCheckboxWithHelperText.css'
const FormikCheckboxWithHelperText = ({ ...props }) => {
  const [field] = useField(props);

  return (
    <div className='v-center'>
      <input type='checkbox' checked={field.value} id={name} {...field} {...props} style={{ borderRadius: '4px' }} />
      <div className='fcwht-flex'>
      <label htmlFor={name} style={{ marginLeft: '10px', fontSize: '12px', fontWeight: '500' }}>
        {props.label}
      </label>
      <div className='fcwht-helpertext fcwht-mt9-mb-9'>{props.helpertext}</div>
      </div>
   
    </div>
  );
};

export default FormikCheckboxWithHelperText;
