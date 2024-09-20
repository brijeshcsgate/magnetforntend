import {
  ButtonContainer,
  Container,
  Content,
  Header,
  Heading,
  InputsContainer,
  Section,
  SidePanel,
} from "@/components/AddFormLayout/AddFormLayout";
import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import Button from "@/components/common/Button/Button";
import FormikAsyncDropdown from "@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown";
import FormikSwitch from "@/components/inputs/formik/FormikSwitch";
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { APIS } from "@/constants/api.constant";
import { BUTTON_TYPES, COMMON_SCHEMA } from "@/constants/common.constant";
import { ROUTES } from "@/constants/route.constant";
import { getApi, patchApi, postApi } from "@/services/method";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

const initialValues = {
  englishName: "",
  hindiName: "",
  isActive: true,
  shortName: {
    english: "",
    hindi: "",
  },
  countryOfOrigin: "",
};

const StateSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditState = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.STATE, id)
        .then((res) => {
          const editData = res?.data?.state;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            isActive: editData?.isActive,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            countryOfOrigin: editData?.countryOfOrigin,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const payload = {
      name: {
        english: values.englishName,
        hindi: values.hindiName,
      },
      shortName: {
        english: values?.shortName?.english,
        hindi: values?.shortName?.hindi,
      },
      countryOfOrigin: values.countryOfOrigin,
      isActive: values.isActive,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.STATE, id, payload).then(() => {
        toast.success("Data updated successfully");
        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
        } else {
          navigate(-1);
        }
      });
    } else {
      postApi(APIS.STATE, payload)
        .then(() => {
          toast.success("Data saved successfully");
          navigate(-1);
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={StateSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit: formikSubmit, values, errors }) => (
        <Container>
          <div className="">
            {loading ? (
              <div>Loading...</div>
            ) : (
              <>
                <Header>
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(-1)}
                      breadCrumbs={[{ name: "Master", path: ROUTES.MASTERS }]}
                      boldItem={"State"}
                    />
                    <Heading>{id ? "Edit" : "Add"} State</Heading>
                  </div>
                  <ButtonContainer>
                    <Button
                      type={BUTTON_TYPES.SECONDARY}
                      onClick={() => navigate(-1)}
                      disabled={isSubmitting}
                    >
                      Cancel
                    </Button>
                    {!id && (
                      <Button
                        type={BUTTON_TYPES.SECONDARY}
                        onClick={() => {
                          values.saveAndNew = true;
                          formikSubmit();
                        }}
                        disabled={isSubmitting && values?.saveAndNew === true}
                      >
                        Save & Add New
                      </Button>
                    )}
                    <Button
                      type={BUTTON_TYPES.PRIMARY}
                      onClick={formikSubmit}
                      loading={isSubmitting && !values?.saveAndNew}
                    >
                      {id ? "Update" : "Save"}
                    </Button>
                  </ButtonContainer>
                </Header>

                <Content>
                  <Section>
                    <SidePanel
                      title={`Add State (En)`}
                      description={`Enter State detail`}
                    />

                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="State Name"
                            placeholder="Enter State Name"
                            name="englishName"
                            isRequired={true}
                          />
                        </div>{" "}
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="State Short Name"
                            placeholder="Enter State Short Name"
                            name="shortName.english"
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikAsyncDropdown
                            label="Select Country"
                            placeholder="Select Country"
                            name="countryOfOrigin"
                            id="country"
                            limit={5}
                            defaultValue={data?.countryOfOrigin}
                            isRequired={false}
                          />
                        </div>
                      </div>
                    </InputsContainer>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add State (Hi)`}
                      description={`Enter State detail`}
                    />

                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="State Name"
                          placeholder="Enter State Name"
                          name="hindiName"
                        />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="State Short Name"
                          placeholder="Enter State Short Name"
                          name="shortName.hindi"
                        />
                      </div>
                    </InputsContainer>
                  </Section>
                </Content>
              </>
            )}
          </div>
        </Container>
      )}
    </Formik>
  );
};

export default AddEditState;
