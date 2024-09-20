import * as Yup from 'yup';
export const OFFICE_TYPES_DROPDOWN = [
  {
    label: 'HO',
    value: 'HO',
    id: 'ho',
  },
  {
    label: 'RO',
    value: 'RO',
    id: 'region',
  },
  {
    label: 'Depot',
    value: 'Depot',
    id: 'depot',
  },
  {
    label: 'Bus Stop',
    value: 'Bus Stop',
    id: 'busStop',
  },
  {
    label: 'Bus Station',
    value: 'Bus Station',
    id: 'busStop',
  },
  {
    label: 'Workshop',
    value: 'Workshop',
    id: 'workshop',
  },
  {
    label: 'Dhaba',
    value: 'Dhaba',
    id: 'dhaba',
  },
];
export const PREMISESTYP_DROPDOWN = [
  { label: 'Owned', value: 'Owned', id: 'Owned' },
  { label: 'Rented', value: 'Rented', id: 'Rented' },
];

export const initialValues = {
  officeId: '',
  officeType: '',
  alias: '',
  busCategory: null,
  address: '',
  premisesType: '',
  area: '',
  lat: '',
  long: '',
  stateId: '',
  regionId: '',
  districtId: '',
  facilities: [],
  date: {
    from: '',
    to: '',
  },
  nodalOfficer: null,
  image: [],
  name: {
    english: '',
    id: '',
    hindi: '',
  },
  districtPopulation: '',
  cityPopulation: '',
  newdepot: '',
  fuel: {
    diesel: false,
    cng: false,
    chargingStation: false,
    dieselVendor: '',
    cngVender: '',
    chargingStationVendor: '',
  },
  isActive: true,
};

export const schema = Yup.object().shape({
  officeId: Yup.string().trim().required('Office ID is required'),
  // newdepot:Yup.string().trim().required("new value required"),
  officeType: Yup.string().trim().required('Office Type is required'),
  alias: Yup.string().trim().max(40),
  // busCategory: Yup.string(),
  facilities: Yup.array().nullable(),
  premisesType: Yup.string().required('Premises is required'),
  date: Yup.object().shape({
    from: Yup.date().max(
      new Date(),
      "Service Posting Date can't be in the future"
    ),
    // .required("Service Posting Start Date is required"),
    to: Yup.date().min(
      new Date(),
      "Service Posting Date can't be in the past "
    ),
    // .required("Service Posting end Date is required"),
  }),

  address: Yup.string().max(256).trim().required('Office Address is required'),
  lat: Yup.number().required('Latitude is required'),
  long: Yup.number().required('Longitude is required'),
  stateId: Yup.string().nullable().trim(),
  regionId: Yup.string().nullable().trim(),
  districtId: Yup.string().nullable().trim(),
  nodalOfficer: Yup.string().nullable().trim(),
  officeImages: Yup.array().of(Yup.mixed().required('Image is required')),
  name: Yup.object().shape({
    english: Yup.string().trim().required('Office Name is required'),
    id: Yup.string().trim().required('Office Name is required'),
    hindi: Yup.string().trim(),
  }),
});
