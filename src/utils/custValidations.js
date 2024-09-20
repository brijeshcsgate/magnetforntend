import * as Yup from "yup";
export const customEmailValidation = Yup.string().test(
  "is-valid-email",
  "Invalid email",
  (value) => {
    if (!value) return true; // if no value is provided, fail validation
    const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(value);
  }
);
