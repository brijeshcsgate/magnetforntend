import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useLocation, useNavigate } from 'react-router-dom';
import { ButtonLoadingIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { EyeOffIcon, EyeIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import * as Yup from 'yup';
import { postWithoutAuthApi } from '@/services/method';
import { APIS } from '@/constants/api.constant';
import { toast } from 'sonner';

const loginInitialValues = {
  password: '',
  passwordConfirmation: '',
};

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
const ResetPasswordForm = () => {
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const [showConfPassword, setShowConfPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const { values, errors, handleBlur, touched, handleChange, handleSubmit } =
    useFormik({
      initialValues: loginInitialValues,
      validationSchema: loginSchema,
      onSubmit: (value) => {
        if (value?.password) {
          const data = {
            token: location?.state.token,
            newPassword: value?.password

          };
          onReset(data);
        }
      },
    });
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
      postWithoutAuthApi(APIS?.RESET_PASSWORD, data)

        .then((res) => {

          setIsLoading(true);
          if (res?.status === true) {

            setIsLoading(false);
            toast.success('Password has been reset successfully');
          } else {

            setIsLoading(false);
            toast.error('Something went wrong!!!');
          }
        })
        .catch((error) => {
          console.log('error', error)

        });
      navigate('/');
    } else {
      handleSubmit();
    }
  };
  return (
    <>

      <div className="login-middle">
        <>


          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.password}

                key={'reset_new_password'}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 mr-3 inline-block -translate-y-1/2 transform text-muted-foreground transition duration-100 hover:scale-110"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeIcon className="h-4 w-4 text-blue-primary-200" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-blue-primary-200" />
                )}
              </button>
            </div>
            {touched.password && errors.password ? (
              <div className="text-red-500 text-xs">{errors.password}</div>
            ) : null}
          </div>
          <div className="confirm-password">
            <Label htmlFor="password">Confirm Password</Label>
            <div className="relative">
              <Input
                id="passwordConfirmation"
                name="passwordConfirmation"
                type={showConfPassword ? 'text' : 'password'}
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.passwordConfirmation}
                className="pr-10"
              />
              <button
                type="button"
                className="absolute right-2 top-1/2 mr-3 inline-block -translate-y-1/2 transform text-muted-foreground transition duration-100 hover:scale-110"
                onClick={() => setShowConfPassword(!showConfPassword)}
              >
                {showConfPassword ? (
                  <EyeIcon className="h-4 w-4 text-blue-primary-200" />
                ) : (
                  <EyeOffIcon className="h-4 w-4 text-blue-primary-200" />
                )}
              </button>
            </div>
            {touched.passwordConfirmation && errors.passwordConfirmation ? (
              <div className="text-red-500 text-xs">{errors.passwordConfirmation}</div>
            ) : null}
          </div>
        </>
      </div>
      <Button type="submit" disabled={isLoading} onClick={onRestHandler}>
        {isLoading ? <ButtonLoadingIcon className=" h-8 w-8" /> : 'RESET PASSWORD'}
      </Button>
    </>
  )
}

export default ResetPasswordForm
