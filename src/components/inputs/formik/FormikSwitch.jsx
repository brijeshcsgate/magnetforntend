import { useField } from 'formik';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const FormikSwitch = ({ label, name, onChange, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const { setValue } = helpers;

  const handleCheckedChange = (checked) => {
    // Update the value in Formik
    setValue(checked);

    // Call the provided onChange handler if available
    if (onChange) {
      onChange(checked);
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch
        id={name}
        {...props}
        checked={field.value} // Use Formik's field value
        onCheckedChange={handleCheckedChange}
      />
      <Label htmlFor={name}>{label}</Label>
      {meta.touched && meta.error ? (
        <div className="text-red-500 text-sm mt-1">{meta.error}</div>
      ) : null}
    </div>
  );
};

export default FormikSwitch;
