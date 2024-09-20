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
  vehicleMakeId: "",
};

const schema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  vehicleMakeId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditVehicleModel = () => {
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
      getApi(APIS.VEHICLE_MODEL, id)
        .then((res) => {
          const editData = res?.data?.vehicleModel;
          setData((prev) => ({
            ...prev,
            englishName: editData?.name?.english,
            hindiName: editData?.name?.hindi,
            shortName: {
              english: editData?.shortName?.english,
              hindi: editData?.shortName?.hindi,
            },
            isActive: editData?.isActive,
            vehicleMakeId: editData?.vehicleMakeId,
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
      shortName: {
        english: values.shortName.english,
        hindi: values.shortName.hindi,
      },
      vehicleMakeId: values.vehicleMakeId,
    };
    if (id) {
      payload._id = id;
      patchApi(APIS.VEHICLE_MODEL, id, payload).then(() => {
        toast.success("Data updated successfully");
        navigate(-1);
      });
    } else {
      postApi(APIS.VEHICLE_MODEL, payload)
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
                      boldItem={"Vehicle Model"}
                    />
                    <Heading>{id ? "Edit" : "Add"} Vehicle Model</Heading>
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
                      title={`Add Vehicle Model (En)`}
                      description={`Enter Vehicle Model Detail`}
                    />
                    <InputsContainer>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Vehicle Model Name"
                            placeholder="Enter Vehicle Model Name"
                            name="englishName"
                            isRequired={true}
                          />
                        </div>
                        <div className=" pb-4 md:w-1/3">
                          <FormikAsyncDropdown
                            key="vehicleMakeId"
                            label="Select Vehicle Make"
                            name="vehicleMakeId"
                            placeholder="Select Vehicle Make"
                            id="vehicleMake"
                            limit={5}
                            defaultValue={values?.vehicleMakeId}
                            isRequired={true}
                          />
                        </div>
                      </div>
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Vehicle Model Short Name"
                            placeholder="Enter Vehicle Model Short Name"
                            name="shortName.english"
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                    </InputsContainer>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Vehicle Model (Hi)`}
                      description={`Enter Vehicle Model Detail`}
                    />

                    <InputsContainer>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Vehicle Model Name"
                          placeholder="Enter Vehicle Model Name"
                          name="hindiName"
                        />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Vehicle Model Short Name"
                          placeholder="Enter Vehicle Model Short Name"
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

export default AddEditVehicleModel;
