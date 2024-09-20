
import './style.css';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/route.constant';
import { postWithoutAuthApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import * as Yup from 'yup';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ButtonLoadingIcon } from '@/components/icons';
import { toast } from 'sonner';

const forgetPasswordInitialValues = {
  forgetEmail: '',
};
const customEmailValidation = Yup.string().test(
  'is-valid-email',
  'Please enter valid email',
  (value) => {
    if (!value) return false;
    const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(value);
  }
);
const forgotPasswordSchema = Yup.object({
  forgetEmail: customEmailValidation.max(320).required('Please enter email'),
});

const ForgotPassForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: forgetPasswordInitialValues,
      validationSchema: forgotPasswordSchema,
      onSubmit: (value) => {
        if (value.forgetEmail) {
          onForgotPasswordHandler(value?.forgetEmail);

          setIsLoading(true);
        }
      },
    });

  const onForgotPasswordHandler = (email) => {
    const data = {
      loginEmail: email,
    };
    postWithoutAuthApi(APIS.FORGET_PASSWORD, data)
      .then((res) => {
        toast.success(res.message)
        setIsLoading(false)
        navigate(ROUTES.VERIFY_OTP, { state: { email: email } })

      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || "Invalid credentials");
        setIsLoading(false)
      });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Label htmlFor={'forgetEmail'}>Email</Label>
        <Input
          type="text"
          id={'forgetEmail'}
          name={'forgetEmail'}
          onChange={handleChange}
          onBlur={handleBlur}
          value={values?.forgetEmail}
          disabled={isLoading}
        />


        {errors.forgetEmail && touched.forgetEmail && (
          <div className="error-message">
            {errors.forgetEmail}
          </div>
        )}
        <Button type="submit" className={`big-btn mt-16px ${errors.forgetEmail ? 'disable-login-btn' : ''
          }`}>
          {isLoading ? <ButtonLoadingIcon className=" h-8 w-8" /> : 'CONTINUE'}
        </Button>
        <div className="line-16px"></div>
        <div className=" text-center heading-400-16 c-gray3">
          Know your password?{' '}
          <span
            className="c-blue4 curser-pointer"
            onClick={() => navigate('/')}
          >
            Login
          </span>
        </div>
      </form>
    </>
  )
}

export default ForgotPassForm
