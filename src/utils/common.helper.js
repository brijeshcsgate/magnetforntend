// Your data array with 12630 items
const bloodGroup = [
  {
    label: 'A+',
    value: 'A+',
  },
  {
    label: 'A-',
    value: 'A-',
  },
  {
    label: 'B+',
    value: 'B+',
  },
  {
    label: 'B-',
    value: 'B-',
  },
  {
    label: 'AB+',
    value: 'AB+',
  },
  {
    label: 'AB-',
    value: 'AB-',
  },
  {
    label: 'O+',
    value: 'O+',
  },
  {
    label: 'O-',
    value: 'O-',
  },
  // {
  //   label: "A2+",
  //   value: "A2+",
  // },
  // {
  //   label: "A2-",
  //   value: "A2-",
  // },
  // {
  //   label: "A2B+",
  //   value: "A2B+",
  // },
  // {
  //   label: "A2B-",
  //   value: "A2B-",
  // },
  // {
  //   label: "Bombay Blood Group",
  //   value: "Bombay Blood Group",
  // },
  // {
  //   label: "Rh-null",
  //   value: "Rh-null",
  // },
];
const frequency = [
  {
    label: 'Daily',
    value: 'Daily',
  },
  { label: 'Weekly', value: 'Weekly' },
  { label: 'Monthly', value: 'Monthly' },
  { label: 'Yearly', value: 'Yearly' },
];
const vehicleStatus = [
  {
    label: 'Active',
    value: 'Active',
  },
  { label: 'Inactive', value: 'Inactive' },
  { label: 'In Shop', value: 'In Shop' },
  { label: 'Out Of Service', value: 'Out Of Service' },
  { label: 'Sold', value: 'Sold' },
];
const items = [
  {
    label: 'Mirror',
    value: 'Mirror',
  },
  { label: 'Paint', value: 'Paint' },
  { label: 'Bus Body', value: 'Bus Body' },
  { label: 'Seats', value: 'Seats' },
];
const assetType = [
  {
    label: 'Vehicles',
    value: 'Vehicles',
  },
  {
    label: 'Amenities',
    value: 'Amenities',
  },
];
const busStationArea = [
  {
    label: 'Plain',
    value: 'Plain',
  },
  {
    label: 'Rural',
    value: 'Rural',
  },
  {
    label: 'Hill',
    value: 'Hill',
  },
];
const dhabaCatergory = [
  {
    label: 'AC',
    value: 'AC',
  },
  {
    label: 'AC + Non-AC',
    value: 'AC + Non-AC',
  },
  {
    label: 'Non-AC',
    value: 'Non-AC',
  },
];
const licenceType = [
  {
    label: 'MC 50cc',
    value: 'MC 50cc',
  },
  {
    label: 'LMV-NT',
    value: 'LMV-NT',
  },
  {
    label: 'FVG',
    value: 'FVG',
  },
  {
    label: 'MCWG',
    value: 'MCWG',
  },
  {
    label: 'HGMV',
    value: 'HGMV',
  },
  {
    label: 'HPMV',
    value: 'HPMV',
  },
];
const governmentIssueCards = [
  { label: 'Adhaar Card', value: 'Adhaar Card' },
  { label: 'Driving License', value: 'Driving License' },
  { label: 'Voter ID Card', value: 'Voter ID Card' },
  {
    label: 'PAN',
    value: 'PAN',
  },

  { label: 'Passport', value: 'passport' },
];
// Function to process a chunk of data
const processChunk = async (chunk) => {
  // Simulate an API call or data processing

  await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
};

// Function to process data in chunks
const processDataInChunks = async (count, callback, toast, handleMoreClose) => {
  const data = new Array(count).fill().map((_, index) => ({ id: index + 1 }));
  const chunkSize = 500;
  const intervals = [5000, 8000, 10000]; // intervals in milliseconds
  let currentIndex = 0;

  const getRandomInterval = () => {
    const randomIndex = Math.floor(Math.random() * intervals.length);
    return intervals[randomIndex];
  };

  const processChunk = async () => {
    if (currentIndex < data.length) {
      const chunk = data.slice(currentIndex, currentIndex + chunkSize);
      await callback(chunk);
      currentIndex += chunkSize;
      setTimeout(processChunk, getRandomInterval());
    } else {
      toast.success('Uploading process completed successfully');
      handleMoreClose();
    }
  };

  processChunk(); // start processing chunks
};

const capitalization = (value) => {
  if (value.charAt(0) === ' ') {
    value = value.slice(1);
  }
  return value;

  // let words = value.split(" ");
  // let capitalizedWords = words.map((word) => {
  //   if (word.length > 0) {
  //     return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  //   }
  //   return "";
  // });
  // let capitalizedString = capitalizedWords.join(" ");
  // return capitalizedString;
};
const startSpcaeRemover = (value) => {
  if (value.charAt(0) === ' ') {
    return (value = value.slice(1));
  }
  return value;
};

// const validateAlphabetsfortitle = (e, setFieldValue, name) => {
//   let value = e.target.value;

//   // Remove spaces from the input
//   value = value.replace(/\s+/g, '');

//   return setFieldValue(name, value); // Set the cleaned value
// };
const validateAlphabetsfortitle = (e, setFieldValue, name) => {
  let value = e.target.value;

  // Remove spaces from the start of the input (but allow spaces elsewhere)
  value = value.replace(/^\s+/, '');

  return setFieldValue(name, value); // Set the cleaned value
};

const validateAlphabets = (e, setFieldValue, name) => {
  let value = e.target.value;
  if (value.charAt(0) === ' ') {
    return (value = value.slice(1));
  }
  const alphabetRegex = /[^A-Za-z\s]/g;
  return setFieldValue(name, value.replace(alphabetRegex, ''));
};
const validateNumbers = (e, setFieldValue, name) => {
  let value = e.target.value;
  const numberRegex = /[^0-9]/g;
  return setFieldValue(name, value.replace(numberRegex, ''));
};
const validateNumberswiothoutzero = (e, setFieldValue, name) => {
  let value = e.target.value;
  const numberRegex = /[^0-9]/g;

  // Replace any non-numeric characters
  value = value.replace(numberRegex, '');

  // Prevent setting the value to "0" only
  if (value === '0') {
    setFieldValue(name, '');
  } else {
    setFieldValue(name, value);
  }
};

const validateMobileNumber = (e, setFieldValue, name) => {
  let value = e.target.value;
  const mobileNumberRegex = /^[0-9]\d{0,9}$/;
  if (value.length > 10) return;

  if (mobileNumberRegex.test(value)) {
    return setFieldValue(name, value);
  } else {
    setFieldValue(name, '');
  }
};

const validatePincode = (e, setFieldValue, name) => {
  const pincodeRegex = /^[1-9]\d{0,9}$/;
  let value = e.target.value;

  if (value.length > 6) return;

  if (pincodeRegex.test(value)) {
    return setFieldValue(name, value);
  } else {
    setFieldValue(name, '');
  }
};

const validatequantity = (e, setFieldValue, name) => {
  const pincodeRegex = /^[1-9]\d{0,9}$/;
  let value = e.target.value;

  if (value.length > 3) return;

  if (pincodeRegex.test(value)) {
    return setFieldValue(name, value);
  } else {
    setFieldValue(name, '');
  }
};
const validateHindi = (e, setFieldValue, name) => {
  let value = e.target.value;
  if (value.charAt(0) === ' ') {
    return setFieldValue(name, '');
  }
  const hindiRegex = /^[\u0900-\u097F\s]+$/;
  if (hindiRegex.test(value)) {
    return setFieldValue(name, value);
  } else {
    if (value.charAt(0) === '') {
      return setFieldValue(name, '');
    }
    return;
  }
};


const tempratur_scale = [
  {
    label: '1',
    value: '1',
  },
  { label: '2', value: '2' },
  { label: '3', value: '3' },
  { label: '4', value: '4' },
  { label: '5', value: '5' },

];


export {
  processDataInChunks,
  capitalization,
  startSpcaeRemover,
  bloodGroup,
  governmentIssueCards,
  licenceType,
  assetType,
  frequency,
  busStationArea,
  dhabaCatergory,
  validateAlphabets,
  validateNumbers,
  validateMobileNumber,
  validatePincode,
  validateHindi,
  vehicleStatus,
  validateNumberswiothoutzero,
  items,
  validatequantity,
  validateAlphabetsfortitle,


  tempratur_scale
};
