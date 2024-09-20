import React, { useState, useEffect, useMemo } from "react";
import { getApi, postApi } from "@/services/method";
import { APIS } from "@/constants/api.constant";
import { useParams, useLocation } from "react-router-dom";
import { ROUTES } from "@/constants/route.constant";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import IndicatoreSlider from "@/components/common/Sliders/Sliders";
import TextField from "../dms/TimeTable/AddEditTimeTable/TextField";
import axios from "axios";
const EmailTemplate = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpReset, setIsOtpReset] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [otpError, setOtpError] = useState("");
  const [isTitlePara, setIsTitlePara] = useState({
    title: "OTP",
    para1: "We have sent a 6-digit OTP to ",
    para2: location?.state?.email,
  });
  const [otpRequired, setOtpRequired] = useState(false);
   const query = new URLSearchParams(location.search);
   const token = query.get("token");
  let errorHandled = false;
  useEffect(() => {
   
    if (token) {
      console.log('TOOOKKK>>', token);
      const url = `${APIS.VERIFY_EMAIL}?token=${encodeURIComponent(token)}`;
    console.log("UUUUU>>",url)
      getApi(url)
        .then((res) => {
           const { verificationTokenExpires } = res.data;
           console.log('verificationTokenExpires>>', verificationTokenExpires);
           const tokenExpiryTimestamp = new Date(
             verificationTokenExpires
           ).getTime();
           const currentTimestamp = Date.now();
           console.log('currentTimestamp>>',currentTimestamp);
           console.log('Date (toString):', currentTimestamp.toString()); // Full date and time
           console.log(
             'Date (toLocaleString):',
             currentTimestamp.toLocaleString()
           ); // Local date and time
           console.log('Date (toISOString):', currentTimestamp.toISOString());  
           // Check if the token has expired
           
        if (currentTimestamp > tokenExpiryTimestamp) {
          console.log('Token expired, navigating...');
          toast.error('Link expired. Please request a new verification link.');
          navigate('/'); // Redirect to the home page or specified route
          return; // Return to avoid executing the next lines
        }

          setMessage("Email verified successfully!");
          // You can handle any additional logic here if needed
        })
        .catch((error) => {
         if (error.status == 400 && !errorHandled) {
           toast.error('Link Expired. Please request a new verification link.');
           errorHandled = true;
           navigate('/');
         }    
        });
    }
  }, [location.search]);
  const navigate = useNavigate();
  const onVerfyHandler = () => {
    const data = {
      verificationToken:token,
      otp: otp,
    };

    if (otp === "") {
      setOtpRequired(true);
      return;
    }

    postApi(APIS.VERIFY_USER_OTP, data)
      .then((res) => {
    
        if (res.message === 'OTP verified successfully.') {
          toast.success('OTP verified');
          navigate(ROUTES.SET_PASSWORD, {
            state: {
              verificationToken: token,
            },
          });
        } else {
          setOtpError('Invalid OTP. Please try again.');
        }
      })
      .catch((error) => {
    
        setOtpError("Invalid OTP. Please try again.");
      });
  };

  const onCancleHandler = () => {
    navigate("/");
  };
  const onRestHandler = () => {
    setIsOtpReset(true);
    const data = {
      loginEmail: location?.state?.email,
    };
    postApi(APIS.FORGET_PASSWORD, data)
      .then((res) => {
      
        // navigate(ROUTES.VERIFY_OTP, { state: { email: email } });
        toast.success("Please check your mail");
      })
      .catch((error) => {
     
        toast.error("Something went wrong!!!");
      });
    setSeconds(30);
  };
  useMemo(() => {
    if (otp) {
      setOtpRequired(false);
    }
  }, [otp]);
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setSeconds((prevSeconds) => (prevSeconds > 0 ? prevSeconds - 1 : 0));
    }, 1000);
    setIsOtpReset(false);
    return () => {
      clearInterval(timerInterval);
    };
  }, [isOtpReset]);
  return (
    <div className="troo-login-row">
      <div className="troo-login-col-left">
        <IndicatoreSlider />
      </div>
      <div className="troo-login-col-right">
        <div className="login-right-section">
          <div className="overflow-container">
            <div className="login-form">
              <div className="login-form-container">
              
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
                 
                  </div>
                  <div className="sign-alignment heading-400-16">
             
                    <span className="heading-600-16">
                 
                    </span>
                  </div>
                </div>

                <div className="login-middle">
                  <div className="otp-section">
                    <label className="heading-400-16 otp-section-lable">
                      OTP
                    </label>
                    <OtpInput
                      className="otp-main"
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      isInputNum={true}
                      shouldAutoFocus={true}
                      renderSeparator={<span style={{ width: "15px" }}> </span>}
                      renderInput={(props, index) => (
                        <input
                          {...props}
                          className="otp-input"
                          placeholder="0" // Add placeholder '0'
                      
                          onKeyPress={(e) => {
                            if (!/[0-9]/.test(e.key)) {
                              e.preventDefault();
                            }
                          }}
                        />
                      )}
                    />

                    {otpRequired && (
                      <div className="error-message">OTP is required</div>
                    )}
                  </div>
                  <div className="otp-bottom-section">
                    <div>
                      <p className="heading-400-16 c-black">
                        00:{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    </div>
                    <div>
                      <p className="heading-400-16 text-end c-black">
                        Didn’t receive an OTP?
                        <span
                          className={`heading-500-16 c-blue`}
                          onClick={seconds === 0 ? onRestHandler : null}
                        >
                          {" "}
                          Resend OTP
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="login-bottom">
                  <button
                    className="big-btn heading-500-18"
                    onClick={onVerfyHandler}
                  >
                    VERIFY
                  </button>
                  <button
                    className="big-btn-outline heading-500-18"
                    style={{ marginTop: "15px" }}
                    onClick={onCancleHandler}
                  >
                    {" "}
                    CANCEL
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default EmailTemplate;
