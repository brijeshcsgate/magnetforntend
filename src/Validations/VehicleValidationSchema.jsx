import * as Yup from "yup";
import moment from "moment";

const positiveNumberMessage = "This field must be greater than 0";

export const vehicleValidationSchema = Yup.object().shape({
  identification: Yup.object().shape({
    registrationNumber: Yup.string().required(
      "Vehicle Registration Number / License Plate is required"
    ),
    chassisNumber: Yup.string()
      .required("Chassis Number is required")
      .length(17, "Chassis number must be 17 characters long"),
    // .min(10, "Chassis Number must be at least 10 characters long")
    // .max(17, "Chassis Number must be at most 17 characters long"),
    engineNumber: Yup.string()
      .required("Engine Number is required")
      .min(10, "Engine Number must be at least 10 characters long")
      .max(17, "Engine Number must be at most 17 characters long"),
  }),
  seatingConfiguration: Yup.object().shape({
    totalSeats: Yup.number()
      .typeError("This field must be a number") // Custom error message for invalid number type

      .positive("This field  must be a positive number")
      .min(1, "This field must be greater than zero"),
    semiSleeper: Yup.number()
      .typeError("This field must be a number") // Custom error message for invalid number type

      .positive("This field  must be a positive number")
      .min(1, "This field  must be greater than zero"),
    sleeper: Yup.number()
      .typeError("This field must be a number") // Custom error message for invalid number type

      .positive("This field  must be a positive number")
      .min(1, "This field  must be greater than zero"),
  }),
  specification: Yup.object().shape({
    dimensions: Yup.object().shape({
      width: Yup.number().positive(positiveNumberMessage),
      height: Yup.number().positive(positiveNumberMessage),
      length: Yup.number().positive(positiveNumberMessage),
      interiorVolume: Yup.number().positive(positiveNumberMessage),
      passengerVolume: Yup.number().positive(positiveNumberMessage),
      cargoVolume: Yup.number().positive(positiveNumberMessage),
      groundClearance: Yup.number().positive(positiveNumberMessage),
      bedLength: Yup.number().positive(positiveNumberMessage),
    }),
    weight: Yup.object().shape({
      curb: Yup.number().positive(positiveNumberMessage),
      grossVehicle: Yup.number().positive(positiveNumberMessage),
    }),
    performance: Yup.object().shape({
      towingCapacity: Yup.number().positive(positiveNumberMessage),
      maxPayload: Yup.number().positive(positiveNumberMessage),
    }),
    mileage: Yup.object().shape({
      city: Yup.number().positive(positiveNumberMessage),
      highway: Yup.number().positive(positiveNumberMessage),
    }),
    capacities: Yup.object().shape({
      fuelTank1: Yup.number().positive(positiveNumberMessage),
      fuelTank2: Yup.number().positive(positiveNumberMessage),
      cng: Yup.number().positive(positiveNumberMessage),
      battery: Yup.number().positive(positiveNumberMessage),
      oil: Yup.number().positive(positiveNumberMessage),
    }),
    frontTyre: Yup.object().shape({
      trackWidth: Yup.number().positive(positiveNumberMessage),
      wheelDiameter: Yup.number().positive(positiveNumberMessage),
      pressure: Yup.number().positive(positiveNumberMessage),
    }),
    rearTyre: Yup.object().shape({
      trackWidth: Yup.number().positive(positiveNumberMessage),
      wheelDiameter: Yup.number().positive(positiveNumberMessage),
      pressure: Yup.number().positive(positiveNumberMessage),
    }),
  }),
  devices: Yup.array().of(
    Yup.object().shape({
      deviceId: Yup.string(),
      from: Yup.string()
        .required("From date is required")
        .test("is-valid-date", "Invalid date format", (value) =>
          moment(value, "YYYY-MM-DD", true).isValid()
        ),
      to: Yup.string()
        .required("To date is required")
        .test(
          "is-after-from-date",
          "To date must be the same or after the From date",
          function (value) {
            const { from } = this.parent;
            return moment(value).isSameOrAfter(moment(from), "day");
          }
        ),
      images: Yup.array().of(Yup.string()),
      remark: Yup.string(),
      subscription: Yup.string(),
      type: Yup.string(),
      vendor: Yup.string(),
    })
  ),
  
  
  financial: Yup.object({
    purchaseDetail: Yup.object({
      price: Yup.number()
        .typeError("This field must be a number")
        .min(1, "The price must be greater than 0")
    }),
  }),
  financial: Yup.object({
    leaseDetail: Yup.object({
      downPayment: Yup.number()
        .typeError("This field must be a number")
        .min(1, "Down Payment must be greater than 0")
    }),
  }),
  financial: Yup.object({
    leaseDetail: Yup.object({
      monthlyPayment: Yup.number()
        .typeError("This field must be a number")
        .min(1, "Monthly Payment must be greater than 0")
    }),
  }),
  financingDetail: Yup.object({
    loanDetail: Yup.object({
      amountOfLoan: Yup.number()
        .typeError("This field must be a number")
        .min(1, "Amount of Loan must be greater than 0")
    }),
  }),
  financingDetail: Yup.object({
    loanDetail: Yup.object({
      annualRateOfInterest: Yup.number()
        .typeError("This field must be a number")
        .min(0.1, "Annual Rate of Interest must be greater than 0")
        .max(100, "Annual Rate of Interest must be less than or equal to 100")
    }),
  }),
  financingDetail: Yup.object({
    loanDetail: Yup.object({
      downPayment: Yup.number()
        .typeError("This field must be a number")
        .min(1, "Down Payment must be greater than 0")
    }),
  }),
});
