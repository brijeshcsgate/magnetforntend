import TextField from '@/components/inputs/formik/TextField/TextField';
import { useField } from 'formik';

const FormikTextFieldColor = ({
  label,
  placeholder,
  isRequired,
  helpertext,
  isDisabled,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <TextField
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

export default FormikTextFieldColor;
