import {
  detailsIcon,
  financialIcon,
  lifeCycle,
  maintanceIcon,
  specifications,
  settingIcon,
} from "@/assets/Icons";
import {
  ButtonContainer,
  Heading,
} from "@/components/AddFormLayout/AddFormLayout";
import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import Button from "@/components/common/Button/Button";
import { BUTTON_TYPES } from "@/constants/common.constant";
import { VehicleService } from "@/services/VehicleService";
import { Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Financial from "./AddVehicleStepperV2/Financial/Financial";
import Lifecycle from "./AddVehicleStepperV2/Lifecycle";
import Maintenance from "./AddVehicleStepperV2/Maintenance";
import Device from "./AddVehicleStepperV2/Device";
import Specifications from "./AddVehicleStepperV2/Specifications";
import VehicleDetails from "./AddVehicleStepperV2/VehicleDetails";
import { vehicleValidationSchema } from "@/Validations/VehicleValidationSchema";

import "./AddVehicles.css";
import { ResizedTabsWithIcons } from "@/components/common/Tabs/Tabs";
import { CounterContext } from "@/components/Layout/commonLayout/TitleOfPageProvider";
import { ROUTES } from "@/constants/route.constant";
const detailsCss = {
  height: "calc(100vh)",
  overflowY: "scroll",
  paddingBottom: "20px",
};

const AddVehicleV2 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("Details");
  const [isActiveTabs, setIsActiveTab] = useState("Details");
  const [initialValues, setInitialValues] = useState({
    identification: {
      chassisNumber: "",
      engineNumber: "",
      registrationNumber: "",
    },
  });
  const { setCount } = useContext(CounterContext);

  useEffect(() => {
    setCount('Vehicles');
  }, []);

  const tabs = [
    { icon: detailsIcon({ width: 11, height: 12 }), tabName: "Details" },
    {
      icon: specifications({ width: 11, height: 12 }),
      tabName: "Specifications",
    },
    { icon: lifeCycle({ width: 11, height: 12 }), tabName: "Lifecycle" },
    { icon: financialIcon({ width: 11, height: 12 }), tabName: "Financial" },
    { icon: maintanceIcon({ width: 11, height: 12 }), tabName: "Maintenance" },
    { icon: settingIcon({ width: 11, height: 12 }), tabName: "Device" },
  ];

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
    setIsActiveTab(tabName);
  };


  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    if (!id) {
      VehicleService.createVehicle(values, () => {
        toast.success("Vehicle added successfully");
        if (values?.saveAndNew) {
          resetForm();
          setData(initialValues);
        } else {
          navigate(-1);
        }
      });
    } else {
      VehicleService.updateVehicleById(id, values, handleUpdateVehicleSuccess);
    }
    setSubmitting(false);
  };



  const handleUpdateVehicleSuccess = () => {
    toast.success("Vehicle updated successfully");
    navigate(-1);
  };

  useEffect(() => {
    if (id) getVehicleData();
  }, [id]);

  const getVehicleData = () => {
    VehicleService.getVehicleById(
      id,
      { populate: "false" },
      handleGetVehicleSuccess
    );
  };

  const handleGetVehicleSuccess = ({ data }) => {
    const formattedData = data.data.vehicle;

    setInitialValues(formattedData);
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={vehicleValidationSchema}
      onSubmit={handleSubmit}

      
    >
      {({
        isSubmitting,
        values,
        errors,
        setFieldValue,
        handleSubmit: formikSubmit,

        
      }) => (
        <div className="add-v-main-container w-full h-full bg-white shadow-lg overflow-auto">
          <div className="add-v-form-container">
            <div className="add-v-form-top-section">
              <div className="top-upper-section d-h-between">
                <div>

                  <BreadCrumbs
                    backNavi={() => navigate("/vehicles")}
                    breadCrumbs={[{
                      name: 'Vehicles',
                      path: ROUTES.VEHICLES,
                    },]}
                    boldItem={"Add Vehicles"}
                  />
                  <Heading>{id ? "Edit" : "Add"} Vehicle</Heading>
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
                    onClick={() => {
                      values.saveAndNew = false;
                      formikSubmit();
                    }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Saving..." : id ? "Update" : "Save"}
                  </Button>
                </ButtonContainer>
              </div>

              <div className="top-bottom-section">
                <div className="tabs ">
                  {tabs.map((item, index) => (
                    <div
                      className={` tab ${isActiveTabs === item.tabName ? "tab-active" : ""
                        }`}
                      key={index}
                      onClick={() => handleTabClick(item.tabName)}
                    >
                      <div
                        className={`v-center ${isActiveTabs === item.tabName ? "activetabIcon" : ""
                          }`}
                      >
                        {item.icon}
                      </div>
                      <div
                        className={` ${isActiveTabs === item.tabName
                          ? "heading-600-16 c-blue2 "
                          : "heading-400-16 c-gray"
                          } v-center`}
                      >
                        {" "}
                        {item.tabName}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="width100  ">
              <div className="add-v-form-bottom-section  ">
                <div style={detailsCss} className="">
                  {activeTab === "Details" && (
                    <VehicleDetails
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {activeTab === "Specifications" && (
                    <Specifications
                      values={values}
                      setFieldValue={setFieldValue}
                    />
                  )}
                  {activeTab === "Lifecycle" && (
                    <Lifecycle values={values} setFieldValue={setFieldValue} />
                  )}
                  {activeTab === "Financial" && (
                    <Financial values={values} setFieldValue={setFieldValue} />
                  )}
                  {activeTab === "Maintenance" && (
                    <Maintenance values={values} setFieldValue={setFieldValue} />
                  )}
                  {activeTab === "Device" && (
                    <Device values={values} setFieldValue={setFieldValue} errors={errors}/>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default AddVehicleV2;
