

import { Field, ErrorMessage } from 'formik';

const TimeDropdown = ({ name }) => {
  // Generate time options
  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour === 12 ? 12 : hour % 12;
        const time = `${displayHour}:${minute === 0 ? '00' : minute} ${ampm}`;
        times.push(time);
      }
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700">Select Time</label>
      <Field as="select" name={name} id={name} className="block w-full mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        <option value="">Select a time</option>
        {timeOptions.map((time, index) => (
          <option key={index} value={time}>
            {time}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component="div" className="text-red-600 text-sm mt-2" />
    </div>
  );
};

export default TimeDropdown;
