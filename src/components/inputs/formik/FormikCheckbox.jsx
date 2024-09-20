import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useField } from 'formik';

const FormikCheckbox = ({ onChange, ...props }) => {
  const [field, , { setValue }] = useField(props);

  return (
    <div className="v-center">
      <Checkbox
        checked={field.value || false}
        id={props.id}
        {...field}
        {...props}
        onCheckedChange={(checked) => {
          console.log('Checkbox changed:', checked); // Debug
          setValue(checked); // Update Formik field value
          if (onChange) onChange(checked); // Pass the `checked` value to `onChange`
        }}
      />
      <Label htmlFor={props.id}>{props.label}</Label>
    </div>
  );
};

export default FormikCheckbox;
