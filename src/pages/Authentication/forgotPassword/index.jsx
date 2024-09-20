import './style.css';
import React from 'react';
import IndicatoreSlider from '@/components/common/Sliders/Sliders';
import ForgotPassForm from './forgotPassword.form';
const forgetContainer = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};

const ForgotPassword = () => {
  const isTitlePara = {
    title: 'Forgot Password?',
    para1: 'Enter registered email to reset password',
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

                    <div className={`wel-alignment heading-600-26 `}>
                      {isTitlePara.title}
                    </div>
                    <div className="sign-alignment heading-400-16">
                      {isTitlePara.para1}{' '}
                    </div>
                  </div>

                  <div className="login-middle">

                    <ForgotPassForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
