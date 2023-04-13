import React, { useState, useRef } from 'react';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { getCsrfToken, signIn } from 'next-auth/react';
import setData from '../helpers/setData';
import Link from 'next/link';

import { createNewUser } from '@/queries/Users';
import Head from 'next/head';

const CreateAccountPage = ({ csrfToken }) => {
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [createSuccessful, setCreateSuccessful] = useState(false);
  const [error, setError] = useState(false);

  const emailRef = useRef();
  const passwordRef = useRef();

  const router = useRouter();

  const signUpMutation = useMutation((newUser) => {
    setData(createNewUser, { data: newUser }, '/system')
      .then((response) => {
        console.log(response);
        setCreateSuccessful(false);
        setEmailExists(false);
        if (response.create_users_item == null) {
          setEmailExists(true);
          setCreateSuccessful(false);
        } else {
          setCreateSuccessful(true);

          const email = newUser.email;
          const password = newUser.password;
          signIn('credentials', {
            redirect: false,
            email,
            password,
            callbackUrl: `/servers`,
          }).then((res) => {
            if (res?.error) {
              setError(true);
            } else {
              router.push('/servers');
            }
          });
        }
      });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.email.value || !e.target.email.value.includes('@')) {
      setInvalidEmail(true);
      return;
    } else {
      setInvalidEmail(false);
    }

    if (!e.target.password.value || e.target.password.value.trim().length < 8) {
      setInvalidPassword(true);
      return;
    } else {
      setInvalidPassword(false);
    }

    signUpMutation.mutate({
      first_name: e.target.name.value.split(' ').slice(0, -1).join(' '),
      last_name: e.target.name.value.split(' ').slice(-1).join(' '),
      company: e.target.company.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      role: '953d6a4f-06e6-4c75-8ab6-5edf7eb01255',
      status: 'active',
      provider: 'default',
    });

  };

  return (
    <div>
      <Head>
        <title>Create Account</title>
        <meta
          property='og:Create Account'
          content='Create Account page'
          key='Create Account page'
        />
      </Head>
      <div className='account-section-dark'>
        <div className='bg-animation'>
          <div className='preloader'>
            <img
              src='images/Union-1.svg'
              width='50'
              height='Auto'
              alt=''
              className='preloader-logo'
            />
          </div>
          <div className='section-foundation-header header-gradient-01 wf-section'>
            <div>
              <div className='changelog-header-padding'>
                <div className='flighing-shape-wrapper'>
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b424025d'
                    className='flighing-shape _07'
                  />
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b424025e'
                    className='flighing-shape _06'
                  />
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b424025f'
                    className='flighing-shape _05'
                  />
                  <div className='flighing-shape _04'></div>
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b4240261'
                    className='flighing-shape _03'
                  />
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b4240262'
                    className='flighing-shape _02'
                  />
                  <div
                    data-w-id='d853071b-b591-b511-84ab-8026b4240263'
                    className='flighing-shape'
                  />
                </div>
              </div>
            </div>
            <div className='blurs'>
              <div
                data-w-id='d853071b-b591-b511-84ab-8026b4240265'
                className='gradient-orange'
              />
              <div
                data-w-id='d853071b-b591-b511-84ab-8026b4240266'
                className='gradient-red'
              />
              <div className='gradient-yellow-2' />
              <div className='gradient-red-2' />
              <div className='gradient-red-2' />
              <div className='gradient-red-2' />
            </div>
          </div>
        </div>
        <div className='account-wrapper-dark'>
          <div className='account-card-dark'>
            <div>
              <div className='account-header-wrapper'>
                <h2 className='account-heading'>Get Started</h2>
                <p>We are excited to have you!</p>
                <p className='paragraph-regular text-weight-medium'>
                  Already have an account?{' '}
                  <Link href={'/login-page'} className='account-link'>
                    Login
                  </Link>
                </p>
              </div>
              <div className='w-form'>
                <form noValidate onSubmit={(e) => handleSubmit(e)}>
                  <div className='w-layout-grid grid-one-column'>
                    <div className='account-wrapper'>
                      <div className='account-field-label'>
                        Enter your Name, Company, Email and Password
                      </div>
                      <div className='account-icon-wrapper'>
                        <input
                          id='full-name'
                          name='name'
                          type='text'
                          autoComplete='name'
                          required
                          placeholder='Full Name'
                          className='account-text-field w-input'
                          maxLength='256'
                        />
                      </div>
                      <div className='account-icon-wrapper'>
                        <input
                          id='company-name'
                          name='company'
                          type='text'
                          className='account-text-field w-input'
                          maxLength='256'
                          data-name='Account Company'
                          placeholder='Enter your company'
                        />
                      </div>
                      <div className='account-icon-wrapper'>
                        <input
                          ref={emailRef}
                          id='email-address'
                          name='email'
                          type='email'
                          autoComplete='email'
                          required
                          placeholder='Email address'
                          className='account-text-field w-input'
                          maxLength='256'
                        />
                      </div>
                      {invalidEmail ? (
                        <div className='bg-red-600 p-2 text-white rounded'>
                          Please enter a valid email
                        </div>
                      ) : null}
                      {emailExists ? (
                        <div className='bg-red-600 p-2 text-white rounded'>
                          Email already in use
                        </div>
                      ) : null}

                      <div className='account-icon-wrapper'>
                        <input
                          ref={passwordRef}
                          className='account-text-field w-input'
                          id='password'
                          name='password'
                          type='password'
                          autoComplete='current-password'
                          required
                          placeholder='Password'
                        />
                        <input
                          type='submit'
                          value=''
                          data-wait='Please wait...'
                          className='account-submit w-button'
                        />
                        <div className='account-arrow w-embed'>
                          <svg
                            width='40'
                            height='40'
                            viewBox='0 0 40 40'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                          >
                            <rect
                              width='40'
                              height='40'
                              rx='20'
                              fill='#211f2c'
                            ></rect>
                            <path
                              d='M18.0762 24.6281L22.7242 20.0001L18.0762 15.3721'
                              stroke='white'
                              strokeWidth='1.5'
                              strokeLinecap='round'
                              strokeLinejoin='round'
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                  {invalidPassword ? (
                    <div className='bg-red-600 p-2 text-white rounded'>
                      Password must be at least 8 characters long
                    </div>
                  ) : null}
                  {createSuccessful ? (
                    <div className='bg-indigo-500 p-2 text-white rounded'>
                      Account created! Logging in...
                    </div>
                  ) : null}
                  {/* TODO add Google Auth logic to this HTML which is the login with Google option  */}

                  {/* <div className='account-seperator'>
                    <div className='account-line'></div>
                    <div className='text-block'>OR</div>
                    <div className='account-line'></div>
                  </div> */}
                  {/* <div className='w-layout-grid account-social-grid'>
                    <div className='account-icon-wrapper'>
                      <a
                        id='w-node-_6f815b0a-4b68-50a5-cd24-17d76333bbc8-6c243ac4'
                        href='#'
                        className='account-social-button w-inline-block'
                      >
                        <div>Continue with Google</div>
                      </a>
                      <div className='account-logo w-embed'>
                        <svg
                          width='32'
                          height='32'
                          viewBox='0 0 32 32'
                          fill='none'
                          xmlns='http://www.w3.org/2000/svg'
                        >
                          <path
                            d='M30.0014 16.3109C30.0014 15.1598 29.9061 14.3198 29.6998 13.4487H16.2871V18.6442H24.1601C24.0014 19.9354 23.1442 21.8798 21.2394 23.1864L21.2127 23.3604L25.4536 26.58L25.7474 26.6087C28.4458 24.1665 30.0014 20.5731 30.0014 16.3109Z'
                            fill='#4285F4'
                          ></path>
                          <path
                            d='M16.2853 30C20.1424 30 23.3804 28.7555 25.7456 26.6089L21.2377 23.1865C20.0313 24.011 18.4123 24.5866 16.2853 24.5866C12.5076 24.5866 9.30128 22.1444 8.15832 18.7688L7.99078 18.7827L3.58111 22.1272L3.52344 22.2843C5.87261 26.8577 10.698 30 16.2853 30Z'
                            fill='#34A853'
                          ></path>
                          <path
                            d='M8.16061 18.7688C7.85903 17.8977 7.6845 16.9643 7.6845 15.9999C7.6845 15.0354 7.85903 14.1021 8.14475 13.231L8.13676 13.0455L3.67181 9.64734L3.52572 9.71544C2.55751 11.6132 2.00195 13.7444 2.00195 15.9999C2.00195 18.2555 2.55751 20.3865 3.52572 22.2843L8.16061 18.7688Z'
                            fill='#FBBC05'
                          ></path>
                          <path
                            d='M16.2854 7.4133C18.9679 7.4133 20.7774 8.54885 21.8092 9.4978L25.8409 5.64C23.3648 3.38445 20.1425 2 16.2854 2C10.698 2 5.87262 5.1422 3.52344 9.71549L8.14247 13.2311C9.30131 9.85555 12.5076 7.4133 16.2854 7.4133Z'
                            fill='#EB4335'
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </div> */}
                </form>
                <div className='contact-success-message w-form-done'>
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className='w-form-fail'>
                  <div>
                    Oops! Something went wrong while submitting the form.
                  </div>
                </div>
              </div>
              <div className='account-caption'>
                This site is protected by reCAPTCHA and the Hexigon&#x27;s{' '}
                <a href='#' className='account-link-small'>
                  Privacy Policy
                </a>{' '}
                and Terms of Service apply as an Hexigon AI, Inc. Product.
              </div>
            </div>
          </div>
          <div className='div-block-9'>
            <img
              src='images/hexigon-ai-logo.svg'
              loading='lazy'
              width='100'
              alt=''
              className='hexigon-ai-logo'
            />
            <div className='account-link-row'>
              <Link href={'http://hexigon.ai'} className='account-link-side'>
                Go to Hexigon.ai
              </Link>
              <div className='account-dot'></div>
              <Link
                href={'https://www.hexigon.ai/support'}
                className='account-link-side'
              >
                Compo Support
              </Link>
              <div className='account-dot'></div>
              <Link
                href={'https://www.hexigon.ai/terms-and-conditions'}
                className='account-link-side'
              >
                Terms
              </Link>
              <div className='account-dot'></div>
              <Link
                href={'https://www.hexigon.ai/privacy'}
                className='account-link-side'
              >
                Privacy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      csrfToken: await getCsrfToken(context),
    },
  };
}

export default CreateAccountPage;
