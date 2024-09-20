import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import IndicatoreSlider from '@/components/common/Sliders/Sliders';
import { alertIcon1 } from '@/assets/Icons';
import * as Yup from 'yup';
import TextField from '@/components/inputs/formik/TextField/TextField';
import { postApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { toast } from 'sonner';
const forgetContainer = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
};
const loginInitialValues = {
  password: '',
  passwordConfirmation: '',
};
// validationSchema:
// const loginSchema = Yup.object({
//   password: Yup.string().min(4).required("Please Enter New Password"),
//   passwordConfirmation: Yup.string()
//     .min(4)
//     .required("Please Enter Confirm Password"),
// });

const loginSchema = Yup.object({
  password: Yup.string()
    .required(' New password is required')
    .min(
      8,
      'Password must be contains  8 characters at least 1 number,  1 uppercase letter, 1 lowercase letter,and 1 symbol.'
    )
    .test(
      'password-strength',
      'Password must be contains  8 characters at least 1 number,  1 uppercase letter, 1 lowercase letter,and 1 symbol.',
      (value) =>
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/.test(
          value
        )
    ),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
const SetPassword = () => {
  const location = useLocation();

  const [isTitlePara] = useState({
    title: 'Set Password',
    para1: 'Set up a strong password to secure your account',
  });

  const [InitialValues, setIsInitialValues] = useState(loginInitialValues);
  const navigate = useNavigate();
  //  formik Validation code start

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: InitialValues,
      validationSchema: loginSchema,
      onSubmit: (value) => {
        if (value?.password) {
          const data = {
            verificationToken: location?.state?.verificationToken,
            newpwd: value?.password,
          };

          onReset(data);
        }
      },
    });
  // formik validation code end
  const onRestHandler = () => {
    if (
      /\d/.test(values.password) &&
      /[A-Z]/.test(values.password) &&
      /[a-z]/.test(values.password) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(values.password) &&
      values.password.length > 6
    ) {
      handleSubmit();
    } else {
      toast.error(
        'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter and 1 special character'
      );
    }
  };
  const onReset = (data) => {
    if (values?.password === values?.passwordConfirmation) {
      postApi(APIS?.SET_PASSWORD, data)
        .then((res) => {
          if (res?.status === true) {
            toast.success('Password has been set successfully');
          } else {
            toast.error('Something went wrong!!!');
          }
        })
        .catch((error) => {});
      navigate('/');
    } else {
      handleSubmit();
    }
  };

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

                    <div className={`wel-alignment heading-600-26 c-blue1`}>
                      {isTitlePara.title}
                    </div>
                    <div className="sign-alignment heading-400-16">
                      {isTitlePara.para1}{' '}
                    </div>
                  </div>

                  <div className="login-middle">
                    <>
                      <div>
                        <TextField
                          labelName={'New Password'}
                          type={'password'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="password"
                          value={values.password}
                          key={'reset_new_password'}
                          placeholder={'New Password'}
                        />
                        {errors.password && (
                          <div className="error-message">{errors.password}</div>
                        )}
                      </div>
                      <div className="confirm-password">
                        <TextField
                          labelName={'Confirm Password'}
                          type={'password'}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          name="passwordConfirmation"
                          value={values.passwordConfirmation}
                          placeholder={'Confirm Password'}
                        />
                        {errors.passwordConfirmation && (
                          <div className="error-message">
                            {errors.passwordConfirmation}
                          </div>
                        )}
                      </div>
                    </>
                  </div>

                  <div className="login-bottom">
                    <button
                      className="big-btn heading-500-18"
                      onClick={onRestHandler}
                      type="submit"
                    >
                      SET PASSWORD
                    </button>
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

export default SetPassword;
