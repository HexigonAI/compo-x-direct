import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getCsrfToken, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Directus } from '@directus/sdk';

const forgotPassword = ({ csrfToken }) => {
const directus = new Directus('https://compo.directus.app');


const [error, setError] = useState(false);
const router = useRouter();

const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
    //   const todos = (await directus.items('directus_users').readMany()).data;
    //   setTodos(todos);
    // const publicData = await directus.items('posts').readByQuery({ sort: ['id'] });
	// console.log(publicData.data);
    const token = await directus.auth.token;
    console.log(token)
    try{
        await directus.auth.password.request(
            'sammykanda101@gmail.com',
            'http://localhost:3000/forgot-password'
        );
        } catch (e) {
            console.log(e.message)
        }
    };

    fetchTodos();
  }, [directus]);

  const handleSubmit = async (e) => {
    e.preventDefault();
   
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
                    <h2 className='account-heading'>Forgot Password</h2>
                  </div>
                  <div className='w-form'>
                    <form
                      id='email-form'
                      name='email-form'
                      data-name='Email Form'
                      method='get'
                      onSubmit={handleSubmit}
                    >
                      <input
                        name='csrfToken'
                        type='hidden'
                        defaultValue={csrfToken}
                      />
                      <div className='w-layout-grid grid-one-column'>
                        <div className='account-wrapper'>
                          <div className='account-field-label'>
                            Enter you Email
                          </div>
                          <div className='account-icon-wrapper'>
                          </div>
                          <div className='account-icon-wrapper'>
                            <input
                              id="email-address"
                              name="email"
                              type="email"
                              autoComplete="email"
                              required
                              className='account-text-field w-input'
                              placeholder='Enter your email'
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
                      <div className='w-layout-grid account-social-grid'>
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
export default forgotPassword