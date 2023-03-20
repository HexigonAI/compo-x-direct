import { useState } from 'react';
import Link from 'next/link';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';

const LoginPage = ({ csrfToken }) => {
  const [error, setError] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await signIn('credentials', {
      redirect: false,
      email: e.target.email.value,
      password: e.target.password.value,
      callbackUrl: `/dashboard`,
    });

    if (res?.error) {
      setError(true);
    } else {
      router.push('/dashboard');
    }

  }

  return (
    <div>
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
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1de'
                    className='flighing-shape _07'
                  ></div>
                  <div
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1df'
                    className='flighing-shape _06'
                  ></div>
                  <div
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1e0'
                    className='flighing-shape _05'
                  ></div>
                  <div className='flighing-shape _04'></div>
                  <div
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1e2'
                    className='flighing-shape _03'
                  ></div>
                  <div
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1e3'
                    className='flighing-shape _02'
                  ></div>
                  <div
                    data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1e4'
                    className='flighing-shape'
                  ></div>
                </div>
              </div>
            </div>
            <div className='blurs'>
              <div
                data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1ea'
                className='gradient-orange'
              ></div>
              <div
                data-w-id='1df99637-cdda-67a4-3ff4-cd53b648b1ec'
                className='gradient-red'
              ></div>
              <div className='gradient-yellow-2'></div>
              <div className='gradient-red-2'></div>
              <div className='gradient-red-2'></div>
              <div className='gradient-red-2'></div>
            </div>
          </div>
        </div>
        <div className='account-wrapper-dark'>
          <div className='account-card-dark'>
            <div>
              <div className='account-header-wrapper'>
                <h2 className='account-heading'>Welcome Back</h2>
                <p>Please sign in to your account to continue.</p>
                <p className='paragraph-regular text-weight-medium'>
                  Don't have an account?{' '}
                  <Link href={'/'} className='account-link'>
                    Create account
                  </Link>
                </p>
              </div>
              <div className='w-form'>
                <form
                  id='email-form'
                  name='email-form'
                  data-name='Email Form'
                  method='get'
                  onSubmit={handleLogin}
                >
                  <input
                    name='csrfToken'
                    type='hidden'
                    defaultValue={csrfToken}
                  />
                  <div className='w-layout-grid grid-one-column'>
                    <div className='account-wrapper'>
                      <div className='account-field-label'>
                        Enter you Email and Password
                      </div>
                      <div className='account-icon-wrapper'>
                        <input
                          id="email-address"
                          name="email"
                          type="email"
                          autoComplete="email"
                          required
                          className='account-text-field w-input'
                          maxLength='256'
                          placeholder='Enter your email'
                        />
                      </div>
                      <div className='account-icon-wrapper'>
                        <input
                          id="password"
                          name="password"
                          type="password"
                          autoComplete="current-password"
                          required
                          className='account-text-field w-input'
                          placeholder='Enter your password'
                        />
                        <button
                          type='submit'
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
                  {error && (
                    <div className='bg-red-300 p-2 text-white rounded'>
                      Wrong email or password
                    </div>
                  )}
                  <div className='account-seperator'>
                    <div className='account-line'></div>
                    <div className='text-block'>OR</div>
                    <div className='account-line'></div>
                  </div>
                  <div className='w-layout-grid account-social-grid'>
                    <div className='account-icon-wrapper'>
                      <a
                        id='w-node-_6f815b0a-4b68-50a5-cd24-17d76333bbc8-5c243ab6'
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
                  </div>
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
              <a href='http://hexigon.ai' className='account-link-side'>
                Go to Hexigon.ai
              </a>
              <div className='account-dot'></div>
              <a href='http://hexigon.ai/support' className='account-link-side'>
                Compo Support
              </a>
              <div className='account-dot'></div>
              <a href='http://hexigon.ai/terms' className='account-link-side'>
                Terms
              </a>
              <div className='account-dot'></div>
              <a href='http://hexigon.ai/privacy' className='account-link-side'>
                Privacy
              </a>
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

export default LoginPage;
