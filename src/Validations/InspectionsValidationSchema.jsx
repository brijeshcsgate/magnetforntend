
import * as Yup from "yup";
export const InspectionsValidationSchema = Yup.object().shape({
  title: Yup.string()
  .required(
    "Title is required"
  ),
  // template: Yup.string()
  //   .trim(),
  enableLocationExceptionTracking: Yup.boolean(),
  allowStoredPhotos: Yup.boolean(),
  description: Yup.string(),
});
