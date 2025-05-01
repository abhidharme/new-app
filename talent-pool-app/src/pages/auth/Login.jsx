import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import ExternLabsIcon from '../../assets/extern_labs_icon.png';
import LinkedinArrow from '../../assets/linkedin_arrow.png';
import LinkedinLogo from '../../assets/linkedin_logo.png';
import { signInAdmin } from '../../redux/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || 'jobseeker';

  console.log("role==>", role)

  const [showPassword, setShowPassword] = useState(false);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().required('Required'),
  });

  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };

    dispatch(signInAdmin(payload)).then((res) => {
      if (res?.payload?.data?.access_token) {
        navigate('/admin/explore');
      }
    });
  };

  console.log("window.location.origin", window.location.origin)

  const handleLinkedInLogin = () => {
    window.location.href = `${`https://api.externtalent.com`}/login/linkedin?origin=${encodeURIComponent(window.location.origin)}`;
    // ?origin=${encodeURIComponent(window.location.origin)}`;

    // window.location.href = `https://api.externtalent.com/login/linkedin`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-4">
      <Card className="w-[472px] py-9 px-4 rounded-[6px] border border-[#DEE4ED] bg-white shadow-md">
        <div className="flex justify-center">
          <img src={ExternLabsIcon} alt="Extern Labs" className="w-20 h-18" />
        </div>

        <CardHeader className="text-center">
          <div className="flex justify-center">
            <div className="w-10 h-10 p-2 rounded-full bg-[#F6F8FB] flex items-center justify-center mb-4">
              <img src={LinkedinArrow} alt="LinkedIn Arrow" className="w-6 h-6" />
            </div>
          </div>

          <CardTitle className="text-2xl font-bold text-gray-800 mb-4">
            {role === 'admin' ? 'Log in with your Email' : 'Log in with your Linkedin'}
          </CardTitle>

          <p className="text-[#788BA5] text-sm font-normal text-center leading-[19.99px] mb-8">
            {role === 'admin'
              ? 'Sign in to your admin dashboard'
              : 'Use your work email to log in to Talent workspace.'}
          </p>
        </CardHeader>

        <CardContent className="mt-4 space-y-4">
          {role === 'admin' ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="space-y-5">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="yourname@company.com"
                      as={Input}
                    />
                    <ErrorMessage name="email" component="div" className="text-sm text-red-500" />
                  </div>

                  <div className="relative">
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Password</label>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      as={Input}
                      className="pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-[38px] right-3 text-gray-500 focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="w-5 h-5" />
                      ) : (
                        <EyeIcon className="w-5 h-5" />
                      )}
                    </button>
                    <ErrorMessage name="password" component="div" className="text-sm text-red-500" />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#239852] text-white hover:bg-green-700 mt-4"
                  >
                    Log in
                  </Button>
                </Form>
              )}
            </Formik>
          ) : (
            <Button
              onClick={handleLinkedInLogin}
              variant="outline"
              className="w-full border border-[#DEE4ED] text-[#0A0A0A] font-normal text-sm leading-none font-inter flex items-center justify-center"
            >
              <img src={LinkedinLogo} alt="LinkedIn" width={18} height={18} className="mr-2" />
              Log in with LinkedIn
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
