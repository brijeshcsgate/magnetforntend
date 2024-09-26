import { useState } from 'react';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeOffIcon, EyeIcon, FacebookIcon } from 'lucide-react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { APIS } from '@/constants/api.constant';
import { postWithoutAuthApi } from '@/services/method';
import { toast } from 'sonner';
import { ButtonLoadingIcon } from '@/components/icons';
import useAppStore from '@/store';

const customEmailValidation = Yup.string()
  .email('Invalid email')
  .test('is-valid-email', 'Invalid email', (value) => {
    if (!value) return false; // if no value is provided, fail validation
    const emailRegex = /^[^\s@]{2,}@[^\s@]{2,}\.[^\s@]{2,}$/;
    return emailRegex.test(value);
  })
  .required('This field is required');

const validationSchema = Yup.object({
  email: customEmailValidation,
  password: Yup.string().required('This field is required'),
});

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [isReCaptcha, setIsReCaptcha] = useState(false);
  const RECAPTCHA_KEY = import.meta.env.VITE_RECAPTCHA_KEY;
  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useAppStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!isReCaptcha) {
        toast.error('Verify the captcha that you are not a robot');
        return;
      }

      setIsLoading(true);
      postWithoutAuthApi(APIS.LOGIN, {
        email: values.email.toLowerCase(),
        password: values.password,
      })
        .then((res) => {
          console.log('res',res)
          toast.success(res.message);
          setIsAuthenticated(true);
          setUser(res?.data?.user);
          setIsLoading(false);
        })
        .catch((err) => {
          toast.error(err.response.data?.message || 'Invalid credentials');
          setIsLoading(false);
        });
    },
  });

  const handleCaptchaChange = (token) => {
    setIsReCaptcha(!!token);
  };

  const handleCaptchaExpire = () => {
    setIsReCaptcha(false);
    toast.warning('Captcha expired, please verify again.');
  };

  return (
    <form onSubmit={formik.handleSubmit} className="">
      <div className="grid gap-4">
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            disabled={isLoading}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-red-500 text-xs">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="grid w-full items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              disabled={isLoading}
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
          {formik.touched.password && formik.errors.password ? (
            <div className="text-red-500 text-xs">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              name="rememberMe"
              checked={formik.values.rememberMe}
              onCheckedChange={(checked) =>
                formik.setFieldValue('rememberMe', checked)
              }
              className="w-5 h-5"
            />
            <label
              htmlFor="remember"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Remember Me
            </label>
          </div>
          <Link
            to="/forgot-password"
            className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-fit')}
          >
            Forgot Password?
          </Link>
        </div>
        <ReCAPTCHA
          sitekey={RECAPTCHA_KEY}
          onChange={handleCaptchaChange}
          onExpired={handleCaptchaExpire}
        />
        <Button type="submit" disabled={isLoading} className=''>
          {isLoading ? <ButtonLoadingIcon className=" h-8 w-8" /> : 'LOGIN'}
        </Button>


        <div className="col-md-12 mt-4">
              <p>
                Don't have an account?{' '}
                <span>
                  <Link
                  
            to="/terms-conditions"
            className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-fit')}
                  >Request Invite</Link>
                  
                </span>
              </p>
            </div>
            <div className="col -md-12 mt-4" style={{display:'flex',flexDirection:'row', gap:'8px', justifyContent:'center'}}>
             <div className='hover-text'> <img src='/assets/images/login-img/facebook.png' alt="" /></div>
              <div className='hover-text'><img src="/assets/images/login-img/instagram.png" alt="" /></div>
              <div className='hover-text'><img src="/assets/images/login-img/twitter.png" alt="" /></div>
              <div className='hover-text'><img src="/assets/images/login-img/youtube.png" alt="" /></div>
            </div>
         
        <div className="flex items-center justify-center gap-1 text-center text-xs ">
          <Link
            to="/privacy-policy"
            className=''
          >
            Privacy Policy
          </Link>
          |
          <Link
            to="/terms-conditions"
            className={cn(buttonVariants({ variant: 'link' }), 'p-0 h-fit')}
          >
            Terms of Use
          </Link>
        </div>
      </div>
    </form>
  );
}
