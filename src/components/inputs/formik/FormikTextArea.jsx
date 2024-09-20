import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useField } from 'formik';

const FormikTextArea = ({
  label,
  placeholder,
  rows,
  helpertext,
  isRequired,
  ...props
}) => {
  const [field, meta] = useField(props);
  return (
    <TextAreaField
      labelName={label}
      placeholder={placeholder}
      {...field}
      {...props}
      helpertext={helpertext}
      error={meta.touched && meta.error ? meta.error : ''}
      isRequired={isRequired}
      touched={meta.touched}
    />
  );
};

const TextAreaField = ({
  labelName,
  name,
  value,
  onChange,
  placeholder,
  onBlur,
  helpertext,
  isRequired,
  suffix,
  key,
  labelClassName,
}) => {
  const handleInputChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <div className="to-input-field" key={key}>
        <Label htmlFor={name} className={cn('c-black', labelClassName)}>
          {labelName} {isRequired && <span style={{ color: 'red' }}>*</span>}
        </Label>

        <Textarea
          id={name}
          name={name}
          onBlur={onBlur}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          maxLength={500}
        />

        {suffix ? <div className="rightText">{suffix}</div> : null}
      </div>
      {helpertext && <div className="bottom-lable">{helpertext}</div>}
    </>
  );
};

export default FormikTextArea;
