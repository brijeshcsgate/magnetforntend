import React from "react";
import { useLocation} from "react-router-dom";
import IndicatoreSlider from "@/components/common/Sliders/Sliders";
import VerifyOtpForm from "./verifyOtp.form";
const forgetContainer = {
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
};

const VerifyOtp = () => {
  const location = useLocation();
  const isTitlePara={
    title: "OTP",
    para1: "We have sent a 6-digit OTP to ",
    para2: location?.state?.email,
  };

  return (
    <div className="to-login-row">
      <div className="to-login-col-left">
        <IndicatoreSlider />
      </div>
      <div className="to-login-col-right">
        <div className="login-right-section">
          <div className="overflow-container">
            <div className="login-form">
              <div className="login-form-container">
                <div style={forgetContainer}>
                  <div className="login-top">
                    <div className="logo-section">
                      <div className="logo-img-div">
                        <img
                          className="w-100"
                          src="/assets/images/loginHeaderLogo.svg"
                          alt="logo.svg"
                        />
                      </div>
                    </div>

                    <div className={`wel-alignment heading-600-26`}>
                      {isTitlePara.title}
                    </div>
                    <div className="sign-alignment heading-400-16">
                      {isTitlePara.para1}{" "}
                      <span className="heading-600-16">
                        {isTitlePara.para2}
                      </span>
                    </div>
                  </div>

                  <VerifyOtpForm/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
