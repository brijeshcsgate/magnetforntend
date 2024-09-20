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
import FormikSwitch from "@/components/inputs/formik/FormikSwitch";
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { APIS } from "@/constants/api.constant";
import { BUTTON_TYPES } from "@/constants/common.constant";
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
  shortName: "",
};

const schema = Yup.object().shape({
  englishName: Yup.string().trim().required("Vendor english name is required"),
  hindiName: Yup.string().trim().required("Vendor hindi name is required"),
});

const AddEditVendor = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setData] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const {setCount } = useContext(CounterContext);

  useEffect(() => { 
    setCount('Masters');
  }, []);

  useEffect(() => {
    if (id) {
      setLoading(true);
      getApi(APIS.VENDOR, id)
        .then((res) => {
          const editData = res?.data?.depot;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: editData?.shortName,
            isActive: editData?.isActive,
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
      isActive: values.isActive,
      shortName: values.shortName,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.VENDOR, id, payload).then(() => {
        toast.success("Data updated successfully");
        navigate(-1);
      });
    } else {
      postApi(APIS.VENDOR, payload)
        .then(() => {
          toast.success("Data saved successfully");
          if (values?.saveAndNew) {
            resetForm();
            setData(initialValues);
          } else {
            navigate(-1);
          }
        })
        .finally(() => {
          setSubmitting(false);
        });
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={data}
      validationSchema={schema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, handleSubmit: formikSubmit, values }) => (
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
                      boldItem={"Vendor"}
                    />
                    <Heading>{id ? "Edit" : "Add"} Vendor</Heading>
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
                        disabled={values?.saveAndNew === true}
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
                      title={`Add Vendor (En)`}
                      description={`Enter Vendor Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Vendor Name"
                            placeholder="Enter Vendor Name"
                            name="englishName"
                            isRequired={true}
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Vendor Short Name"
                          placeholder="Enter Vendor Short Name"
                          name="shortName"
                        />
                      </div>
                    </InputsContainer>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Vendor (Hi)`}
                      description={`Enter Vendor Detail`}
                    />

                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Vendor Name"
                          placeholder="Enter Vendor Name"
                          name="hindiName"
                        />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Vendor Short Name"
                          placeholder="Enter Vendor Short Name"
                          name="shortName"
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

export default AddEditVendor;
