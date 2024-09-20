import BreadCrumbs from "@/components/common/BreadCrumbs/BreadCrumbs";
import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import FormikTextField from "@/components/inputs/formik/FormikTextField";
import FormikAsyncDropdown from "@/components/inputs/formik/FormikAsyncDropdown/FormikAsyncDropdown";
import "./style.css";
import NewPassword from "./NewPassword";
import { useNavigate } from "react-router-dom";
import { getApi, postApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
const detailsCss = {
  height: "calc(100vh - 220px)",
  overflowY: "scroll",
  paddingBottom: "20px",
};

const initialValues = {
  userName: "",
  userEmail: "",
  phoneNumber: "",
  employeeId: "",
  departmant: "",
};
const UserProfile = () => {
  const [newPassword, setNewPassword] = useState(false);
  const [userProfileDetails, setUserDetailsProfile] = useState(initialValues);
  const [isDisable, setIsDisable] = useState(true);
  const navigate = useNavigate();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
  
    setIsDisable(!isDisable);
  };
  useEffect(() => {
    getApi(APIS?.USER_PROFILE).then((res) => {
    
      setUserDetailsProfile((prev) => ({
        ...prev,
        userName: res?.userDetails?.name?.english,
        userEmail: res?.userDetails?.loginEmail,
        phoneNumber: res?.userDetails?.loginMobile,
        employeeId: res?.userDetails?._id,
        departmant: "",
      }));
    });
  }, []);

  return (
    <>
      {newPassword && (
        <NewPassword
          onHide={setNewPassword}
          email={userProfileDetails?.userEmail}
        />
      )}
      <Formik
        enableReinitialize
        initialValues={userProfileDetails}
      
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleSubmit: formikSubmit, values }) => (
          <div className="add-v-main-container">

            <div className="add-v-form-container">
              <div className="add-v-form-top-section">
                <div className="top-upper-section d-h-between">
                  <div>
                    <BreadCrumbs
                      backNavi={() => navigate(-1)}
                      breadCrumbs={[]}
                      boldItem={"User Profile"}
                    />
                    <div className="heading-600-24 c-blue1 v-center pt-7x">
                      User Profile
                    </div>
                  </div>
                  <div className="d-flex gap-3">
                    <button
                      className="button outline-btn"
                      type="submit"
                      onClick={() => formikSubmit()}
                    >
                      {isDisable ? "Edit" : "Update Profile"}
                    </button>
                    <button
                      className="button outline-btn bg-blue"
                      onClick={() => setNewPassword(true)}
                    >
                      Change password
                    </button>
                  </div>
                </div>
              </div>
              <div className="add-v-form-bottom-section">
                <div style={detailsCss}>
                  <div className="user-details">
                    <div className="group-type-2-equal">
                      <div className="w-100">
                        <FormikTextField
                          label="Name"
                          type="name"
                          placeholder="Enter Name"
                          name="userName"
                          isRequired
                          isDisabled={isDisable}
                        />
                      </div>
                      <div className="w-100">
                        <FormikTextField
                          label="Email"
                          type="name"
                          placeholder="Enter Email"
                          name="userEmail"
                          isRequired
                          isDisabled={true}
                        />
                      </div>
                    </div>
                    <div className="group-type-2-equal">
                      <div className="w-100">
                        <FormikTextField
                          label="Phone Number"
                          type="number"
                          placeholder="Enter Phone Number"
                          name="phoneNumber"
                          isRequired
                          isDisabled={true}
                        />
                      </div>
                      <div className="w-100">
                        <FormikTextField
                          label="Employee ID"
                          type="number"
                          placeholder="Enter Employee ID"
                          name="employeeId"
                          isRequired
                          isDisabled={true}
                        />
                      </div>
                    </div>
                    <div className="group-type-2-equal">
                      <div className="w-100">
                        <FormikAsyncDropdown
                          label="Departmant"
                          name="departmant"
                          placeholder="Select Departmant"
                          isDisabled={isDisable}
                        />
                      </div>
                      <div className="w-100">
                       
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default UserProfile;
