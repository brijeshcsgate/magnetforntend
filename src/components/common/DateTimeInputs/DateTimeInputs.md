## DateTimePickerInput

The `DateTimePickerInput` component allows users to select both date and time using a date picker. It integrates with Formik for form handling.

### Props

| Prop           | Type                | Default               | Description                                                                                     |
|----------------|---------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| `name`         | `string`            | -                     | The name of the field in Formik.                                                               |
| `labelName`    | `string`            | -                     | The label displayed above the input field.                                                     |
| `value`        | `Date`              | -                     | The current value of the input.                                                                 |
| `defaultValue` | `Date`              | -                     | The default value of the input if `value` is not provided.                                     |
| `callback`     | `function`          | -                     | A function to call with the selected date.                                                     |
| `placeholder`   | `string`            | -                     | Placeholder text for the input.                                                                |
| `isRequired`   | `boolean`           | `false`               | Indicates if the input is required.                                                             |
| `error`        | `string`            | -                     | Error message to display when there is a validation error.                                     |
| `touched`      | `boolean`           | -                     | Indicates if the field has been touched.                                                        |
| `disabled`     | `boolean`           | `false`               | If `true`, the input will be disabled.                                                          |
| `minDate`      | `Date`              | -                     | The minimum selectable date.                                                                     |
| `maxDate`      | `Date`              | -                     | The maximum selectable date.                                                                     |
| `dateFormat`   | `string`            | `'d MMMM, yyyy HH:mm'` | The format for displaying the date and time.                                                   |
| `useFormik`    | `boolean`           | `true`                | If `true`, integrates with Formik for form handling.                                           |

### Example Usage

```jsx
import { Formik, Form } from 'formik';
import { DateTimePickerInput } from './DateTimePickerInput';

const MyForm = () => {
  return (
    <Formik
      initialValues={{ dateTime: new Date() }}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <DateTimePickerInput
            name="dateTime"
            labelName="Select Date and Time"
            isRequired
            placeholder="Select a date and time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
```

---

## TimePickerInput

The `TimePickerInput` component allows users to select a time using a time picker. It also integrates with Formik for form handling.

### Props

| Prop           | Type                | Default               | Description                                                                                     |
|----------------|---------------------|-----------------------|-------------------------------------------------------------------------------------------------|
| `name`         | `string`            | -                     | The name of the field in Formik.                                                               |
| `labelName`    | `string`            | -                     | The label displayed above the input field.                                                     |
| `value`        | `Date`              | -                     | The current value of the input.                                                                 |
| `callback`     | `function`          | -                     | A function to call with the selected time.                                                    |
| `placeholder`   | `string`            | -                     | Placeholder text for the input.                                                                |
| `isRequired`   | `boolean`           | `false`               | Indicates if the input is required.                                                             |
| `disabled`     | `boolean`           | `false`               | If `true`, the input will be disabled.                                                          |
| `minDate`      | `Date`              | -                     | The minimum selectable time.                                                                    |
| `maxDate`      | `Date`              | -                     | The maximum selectable time.                                                                    |
| `dateFormat`   | `string`            | -                     | The format for displaying the time.                                                             |
| `useFormik`    | `boolean`           | `true`                | If `true`, integrates with Formik for form handling.                                           |

### Example Usage

```jsx
import { Formik, Form } from 'formik';
import { TimePickerInput } from './TimePickerInput';

const MyForm = () => {
  return (
    <Formik
      initialValues={{ time: new Date() }}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <TimePickerInput
            name="time"
            labelName="Select Time"
            isRequired
            placeholder="Select a time"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
```

---

## DatePickerInput

The `DatePickerInput` component allows users to select a date using a date picker. It integrates with Formik for form handling.

### Props

| Prop           | Type                | Default                | Description                                                                                     |
|----------------|---------------------|------------------------|-------------------------------------------------------------------------------------------------|
| `name`         | `string`            | -                      | The name of the field in Formik.                                                               |
| `labelName`    | `string`            | -                      | The label displayed above the input field.                                                     |
| `value`        | `Date`              | -                      | The current value of the input.                                                                 |
| `defaultValue` | `Date`              | -                      | The default value of the input if `value` is not provided.                                     |
| `callback`     | `function`          | -                      | A function to call with the selected date.                                                     |
| `placeholder`   | `string`            | -                      | Placeholder text for the input.                                                                |
| `isRequired`   | `boolean`           | `false`                | Indicates if the input is required.                                                             |
| `error`        | `string`            | -                      | Error message to display when there is a validation error.                                     |
| `touched`      | `boolean`           | -                      | Indicates if the field has been touched.                                                        |
| `disabled`     | `boolean`           | `false`                | If `true`, the input will be disabled.                                                          |
| `minDate`      | `Date`              | -                      | The minimum selectable date.                                                                     |
| `maxDate`      | `Date`              | -                      | The maximum selectable date.                                                                     |
| `dateFormat`   | `string`            | `'d MMMM, yyyy'`      | The format for displaying the date.                                                             |
| `useFormik`    | `boolean`           | `true`                 | If `true`, integrates with Formik for form handling.                                           |

### Example Usage

```jsx
import { Formik, Form } from 'formik';
import { DatePickerInput } from './DatePickerInput';

const MyForm = () => {
  return (
    <Formik
      initialValues={{ date: new Date() }}
      onSubmit={(values) => {
        console.log('Form values:', values);
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <DatePickerInput
            name="date"
            labelName="Select Date"
            isRequired
            placeholder="Select a date"
          />
          <button type="submit">Submit</button>
        </Form>
      )}
    </Formik>
  );
};
```

---