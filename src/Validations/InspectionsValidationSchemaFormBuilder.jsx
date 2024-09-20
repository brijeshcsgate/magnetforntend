import * as Yup from "yup";
export const InspectionsValidationSchemaFormBuilder = Yup.object().shape({
  components: Yup.array().of(
    Yup.object().shape({
      category: Yup.string()
        .required('Category is required'),
      component: Yup.string(),
      description: Yup.string(),
      choices: Yup.array().of(
        Yup.object().shape({
          title: Yup.string(),
          issueCreated: Yup.boolean()
        })
      )
    })
  )
});

