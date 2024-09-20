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
  shortName: {
    english: "",
    hindi: "",
  },
  isActive: true,
  countryOfOrigin: null,
  stateId: null,
  districtId: null,
};

const villageSchema = Yup.object().shape({
  englishName: Yup.string().trim().required(COMMON_SCHEMA),
  countryOfOrigin: Yup.string().trim().required(COMMON_SCHEMA),
  stateId: Yup.string().trim().required(COMMON_SCHEMA),
  districtId: Yup.string().trim().required(COMMON_SCHEMA),
});

const AddEditVillage = () => {
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
      getApi(APIS.VILLAGE, id)
        .then((res) => {
          const editData = res?.data?.village;
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
            stateId: editData?.stateId,
            districtId: editData?.districtId,
          }));
        })
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    const { englishName, hindiName, ...rest } = values;
    const payload = {
      name: {
        english: englishName,
        hindi: hindiName,
      },
      ...rest,
    };
 
    if (id) {
      payload._id = id;
      patchApi(APIS.VILLAGE, id, payload).then(() => {
        toast.success("Data updated successfully");
        navigate(-1);
      });
    } else {
      postApi(APIS.VILLAGE, payload)
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
      validationSchema={villageSchema}
      onSubmit={handleSubmit}
    >
      {({
        isSubmitting,
        handleSubmit: formikSubmit,
        values,
        errors,
        setFieldValue,
      }) => (
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
                      boldItem={"Village"}
                    />
                    <Heading>{id ? "Edit" : "Add"} Village</Heading>
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
                      title={`Add Village (En)`}
                      description={`Enter Village Detail Here`}
                    />
                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Village Name"
                            placeholder="Enter Village Name"
                            name="englishName"
                            isRequired={true}
                          />
                        </div>
                        <FormikSwitch label="Is Active?" name="isActive" />
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Village Short Name"
                          placeholder="Enter Village Short Name"
                          name="shortName.english"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3 md:w-2/3 ">
                        <FormikAsyncDropdown
                          key="country"
                          label="Country"
                          name="countryOfOrigin"
                          placeholder="Select Country"
                          id="country"
                          limit={5}
                          defaultValue={values?.countryOfOrigin}
                          callback={() => {
                            setFieldValue("stateId", "");
                            setFieldValue("districtId", "");
                          }}
                          isRequired={true}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.countryOfOrigin}
                          key="state"
                          label="State"
                          name="stateId"
                          placeholder="Select State"
                          id="state"
                          limit={5}
                          defaultValue={values?.stateId}
                          callback={() => {
                            setFieldValue("districtId", "");
                          }}
                          otherFilters={{
                            countryOfOrigin: values?.countryOfOrigin,
                          }}
                          isRequired={true}
                        />
                        <FormikAsyncDropdown
                          isDisabled={!values.stateId}
                          key="district"
                          label="District"
                          name="districtId"
                          placeholder="Select District"
                          id="district"
                          limit={5}
                          defaultValue={values?.districtId}
                          otherFilters={{ stateId: values?.stateId }}
                          isRequired={true}
                        />
                      </div>
                    </div>
                  </Section>

                  <Section>
                    <SidePanel
                      title={`Add Village (Hi)`}
                      description={`Enter Village Detail Here`}
                    />

                    <div className="flex flex-col w-full">
                      <div className="flex gap-8">
                        <div className=" pb-4 md:w-1/3">
                          <FormikTextField
                            label="Village Name"
                            placeholder="Enter Village Name"
                            name="hindiName"
                          />
                        </div>
                      </div>
                      <div className=" pb-4 md:w-1/3">
                        <FormikTextField
                          label="Village Short Name"
                          placeholder="Enter Village Short Name"
                          name="shortName.hindi"
                        />
                      </div>
                    </div>
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

export default AddEditVillage;
