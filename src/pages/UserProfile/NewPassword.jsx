import { Formik } from 'formik';
import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@/components/inputs/formik/TextField/TextField';
import { plusIcon } from '@/assets/Icons';
import { postApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { toast } from 'react-toastify';
const InitialValues = {
  oldPassword: '',
  newPassword: '',
  newPasswordConfirmation: '',
};
const loginSchema = Yup.object({
  oldPassword: Yup.string().required('Old password is required'),
  newPassword: Yup.string().required('New password is required'),
  newPasswordConfirmation: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm password is required'),
});
const NewPassword = ({ onHide, email }) => {
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: InitialValues,
      validationSchema: loginSchema,
      onSubmit: (value) => {
        if (value?.newPassword) {
          const data = {
            loginEmail: email,
            oldpwd: values?.oldPassword,
            newpwd: values?.newPassword,
          };

          onNewPassword(data);
        }
      },
    });
  const onNewPassword = (data) => {
    postApi(APIS?.CHANGE_PASSWORD, data)
      .then((res) => {
        if (res?.status) {
          toast.success('Password updated successfully');
          setTimeout(() => {
            window.location.href = '/';
          }, 3000);
        } else {
          toast.error('Something went wrong');
        }
      })
      .catch((err) => {
        toast.error(err);
      });

    // onHide(false)
  };
  const onRestHandler = () => {
    handleSubmit();
  };

  return (
    <div className="upsrtc-model">
      <div className="upsrtc-model-container">
        <div className="d-flex justify-between">
          <div className="heading-600-24 c-blue1 v-center">
            Set New Password
          </div>
          <button onClick={() => onHide(false)} className="close-btn">
            {plusIcon({ width: '14px', height: '14px' })}
          </button>
        </div>
        <div className="new-password-container">
          <div>
            <TextField
              labelName={'Old Password'}
              type={'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              name="oldPassword"
              value={values?.oldPassword}
              // key={"reset_old_password"}
              placeholder={'Old Password'}
            />
            {errors.oldPassword && (
              <div className="error-message">{errors.oldPassword}</div>
            )}
          </div>
          <div>
            <TextField
              labelName={'New Password'}
              type={'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPassword"
              value={values.newPassword}
              // key={"reset_new_password"}
              placeholder={'New Password'}
            />
            {errors.newPassword && (
              <div className="error-message">{errors.newPassword}</div>
            )}
          </div>
          <div className="confirm-password">
            <TextField
              labelName={'Confirm Password'}
              type={'password'}
              onChange={handleChange}
              onBlur={handleBlur}
              name="newPasswordConfirmation"
              value={values?.newPasswordConfirmation}
              placeholder={'Confirm Password'}
            />
            {errors.newPasswordConfirmation && (
              <div className="error-message">
                {errors.newPasswordConfirmation}
              </div>
            )}
          </div>
          <div className="new-pwd-btn-wrap">
            <button
              className="button outline-btn"
              onClick={() => onHide(false)}
            >
              Cancel
            </button>
            <button
              className="button outline-btn"
              type="submit"
              onClick={onRestHandler}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPassword;
