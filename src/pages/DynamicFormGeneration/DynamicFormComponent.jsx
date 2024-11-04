import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Grid,
  TextField,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Paper,
  Typography
} from '@/components/ui/material';

// Field types enum for type safety
const FieldTypes = {
  TEXT: 'text',
  TEXTAREA: 'textarea',
  EMAIL: 'email',
  SELECT: 'select',
  RADIO: 'radio',
  CHECKBOX: 'checkbox'
};

// Generate Yup validation schema dynamically
const generateValidationSchema = (fields) => {
  const schemaObject = {};
  
  fields.forEach(field => {
    let validator = Yup.string();
    
    if (field.required) {
      validator = validator.required(`${field.label} is required`);
    }
    
    if (field.type === FieldTypes.EMAIL) {
      validator = validator.email('Invalid email format');
    }
    
    if (field.minLength) {
      validator = validator.min(field.minLength, `Minimum ${field.minLength} characters required`);
    }
    
    if (field.type === FieldTypes.CHECKBOX) {
      validator = Yup.boolean().oneOf([true], `${field.label} must be checked`);
    }
    
    schemaObject[field.name] = validator;
  });
  
  return Yup.object(schemaObject);
};

// Generate initial values dynamically
const generateInitialValues = (fields) => {
  const initialValues = {};
  fields.forEach(field => {
    initialValues[field.name] = field.type === FieldTypes.CHECKBOX ? false : '';
  });
  return initialValues;
};

const DynamicForm = ({ 
  formTitle = 'Dynamic Form',
  fields = [],
  onSubmit = (values) => console.log('Form values:', values),
  gridSpacing = 3,
  maxWidth = '3xl'
}) => {
  const validationSchema = generateValidationSchema(fields);
  const initialValues = generateInitialValues(fields);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  const renderField = (field) => {
    const commonProps = {
      fullWidth: true,
      id: field.name,
      name: field.name,
      label: field.label,
      value: formik.values[field.name],
      onChange: formik.handleChange,
      error: formik.touched[field.name] && Boolean(formik.errors[field.name]),
      helperText: formik.touched[field.name] && formik.errors[field.name],
      ...field.props // Additional custom props
    };

    switch (field.type) {
      case FieldTypes.TEXTAREA:
        return (
          <TextField
            {...commonProps}
            multiline
            rows={field.rows || 4}
          />
        );

      case FieldTypes.SELECT:
        return (
          <TextField
            {...commonProps}
            select
          >
            {field.options?.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        );

      case FieldTypes.RADIO:
        return (
          <FormControl component="fieldset" error={commonProps.error}>
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup
              name={field.name}
              value={formik.values[field.name]}
              onChange={formik.handleChange}
            >
              {field.options?.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {commonProps.error && (
              <Typography color="error" variant="caption">
                {commonProps.helperText}
              </Typography>
            )}
          </FormControl>
        );

      case FieldTypes.CHECKBOX:
        return (
          <FormControl error={commonProps.error}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values[field.name]}
                  onChange={formik.handleChange}
                  name={field.name}
                />
              }
              label={field.label}
            />
            {commonProps.error && (
              <Typography color="error" variant="caption">
                {commonProps.helperText}
              </Typography>
            )}
          </FormControl>
        );

      default: // Text and Email fields
        return <TextField {...commonProps} type={field.type} />;
    }
  };

  return (
    <Paper className={`p-6 max-w-${maxWidth} mx-auto mt-8`}>
      <Typography variant="h5" className="mb-4">
        {formTitle}
      </Typography>
      
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={gridSpacing}>
          {fields.map((field) => (
            <Grid 
              item 
              key={field.name}
              xs={field.xs || 12}
              sm={field.sm}
              md={field.md}
              lg={field.lg}
            >
              {renderField(field)}
            </Grid>
          ))}
          
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
              className="w-full sm:w-auto"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
};

export default DynamicForm;
