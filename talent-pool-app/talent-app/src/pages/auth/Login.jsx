import "../../styles/Login.css"
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import Cookies from 'js-cookie';
import ExternLabsIcon from '../../assets/extern_labs_icon.png';
import LinkedinArrow from '../../assets/linkedin_arrow.png';
import LinkedinLogo from '../../assets/linkedin_logo.png';
import { signInAdmin } from '../../redux/slices/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const role = searchParams.get('role') || Cookies.get('role') || localStorage.getItem('role');
  const token = Cookies.get('token') || localStorage.getItem('token');

  console.log("role==>", role)


  useEffect(() => {
    if (token && role) {
      if (role === 'jobseeker') {
        navigate('/profile');
      } else if (role === 'admin') {
        navigate('/admin/explore');
      }
    }
  }, [navigate]);

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
    <div className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img src={ExternLabsIcon} alt="Extern Labs" className="logo" />
        </div>

        <div className="header">
          <div className="icon-container">
            <div className="icon-circle">
              <img src={LinkedinArrow} alt="LinkedIn Arrow" className="linkedin-icon" />
            </div>
          </div>

          {role !== 'admin' && <h2 className="title">
            {'Log in with your Linkedin'}
          </h2>}

          {role !== 'admin' && <p className="description">
            {'Use your work email to log in to Talent workspace.'}
          </p>}
        </div>

        <div className="form-container">
          {role === 'admin' ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form className="form">
                  <div>
                    <label className="label">Email</label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="yourname@company.com"
                      className="input"
                    />
                    <ErrorMessage name="email" component="div" className="error-message" />
                  </div>

                  <div className="password-field">
                    <label className="label">Password</label>
                    <Field
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter your password"
                      className="input password-input"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="password-toggle"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="eye-icon" />
                      ) : (
                        <EyeIcon className="eye-icon" />
                      )}
                    </button>
                    <ErrorMessage name="password" component="div" className="error-message" />
                  </div>

                  <button type="submit" className="submit-btn">
                    Log in
                  </button>
                </Form>
              )}
            </Formik>
          ) : (
            <button
              onClick={handleLinkedInLogin}
              className="linkedin-btn"
            >
              <img src={LinkedinLogo} alt="LinkedIn" className="linkedin-logo" />
              {"Log in with LinkedIn"}
            </button>
          )}
        </div>
      </div>
    </div >
  );
}
