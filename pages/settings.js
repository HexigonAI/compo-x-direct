import { useState } from 'react';
import NavBar from '@/components/NavBar';

const settings = () => {
  
  return (
  <div>
    <NavBar />
  <body className="body dash">
  <div className="page-wrapper-dark w-clearfix">
    <div className="global-styles w-embed">
    </div>
    <div className="sidebar-section ">
    <div className="sidebar-items">
      <div className="header-items">
        <h3 className="heading-2">John Doe</h3>
        <h6>Apple Inc.</h6>
        <div className="role">Role: Admin</div>
      </div>
    </div>
    <div className="sidebar-items ">
      <div data-delay="0" data-hover="false" className="dropdown w-dropdown">
        <div className="deploy-button w-clearfix w-dropdown-toggle">
          <div className="drop-text1">View &amp; Luanch</div><img src="https://uploads-ssl.webflow.com/5d0aeb182ab90c74adf19052/5d0c73800dc5c60c88242c2e_icon-caret-down-light.svg" alt="" className="dropdown-icon"/>
        </div>
        <nav className="dropdown-list dropdown-list-top dropdown-list-large w-dropdown-list">
          <a href="#" className="dropdown-link dropdown-link-block w-inline-block">
            <h6 className="h6-small dropdown-heading">Compo Component Server</h6>
            <div className="text-small dropdown-subtitle">http://compo.app/compo-company/...</div>
          </a>
          <a href="mailto:support@hexigon.ai?subject=You%20have%20a%20compo%20site%20down" className="dropdown-link dropdown-link-block w-inline-block">
            <h6 className="h6-small dropdown-heading">Apple Inc. Server</h6>
            <div className="text-small dropdown-subtitle">http://compo.app/apple-inc/...</div>
          </a>
          <div className="dropdown-list-footer">
            <a href="#" className="dropdown-link dropdown-link-block w-inline-block">
              <div className="dropdown-link-pair dropdown-link-block-pair">
                <h6 className="h6-small dropdown-heading">Need Assistance?</h6>
                <div className="badge badge-small bg-primary-2">Get Help</div>
              </div>
              <div className="text-small dropdown-subtitle">Don&#x27;t find your site in here or need help getting one up and running?</div>
            </a>
          </div>
        </nav>
      </div>
      <div className="site-links">
        <div>
          <a href="../super-admin/admin.html" className="sidebar-link1 w-inline-block"><img src="../images/app-window_1.svg" loading="lazy" alt="" className="sideb-icon"/>
            <div>Dashboard</div>
          </a>
          <a href="../super-admin/settings.html" aria-current="page" className="sidebar-link1 w-inline-block w--current"><img src="../images/wrench.svg" loading="lazy" alt="" className="sideb-icon"/>
            <div>Account Settings</div>
          </a>
          <a href="http://compo.ai/support" className="sidebar-link1 w-inline-block"><img src="../images/page.svg" loading="lazy" alt="" className="sideb-icon"/>
            <div>Support &amp; Docs</div>
          </a>
          <a href="#" className="sidebar-link1 disable w-inline-block"><img src="../images/3d-three-pts-box.svg" loading="lazy" alt="" className="sideb-icon"/>
            <div>Component Library</div>
          </a>
          <a href="#" className="sidebar-link1 disable w-inline-block"><img src="../images/credit-cards-1.svg" loading="lazy" alt="" className="sideb-icon"/>
            <div>Account Billing</div>
          </a>
        </div>
      </div>
    </div>
  </div>
  <main className="main-wrapper page-wrapper-dark w-clearfix">
    <section id="projects">
      <div className="instance larger">
        <div className="page-padding">
          <div className="right-align-title-area no-padding">
            <h3>Settings</h3>
            <div className="flex-server-top">
              <div className="avatar-2"><img src="../images/compo-logo.svg" alt="" className="org-avatar"/></div>
              <div>
                <div className="account-name">Compo Component Server</div>
                <div className="account-detail">No Publishes Sites</div>
              </div>
            </div>
          </div>
          <div>
            <div className="section-3">
              <div className="flex w-row">
                <div className="col-3 w-col w-col-6">
                  <div className="card-dark">
                    <div className="card-heading-small">
                      <h4>Subscription</h4>
                    </div>
                    <div className="input-group">
                      <div className="input-group-item-left">
                        <div className="label-2 primary-text">Free</div>
                      </div>
                      <a href="#" className="button w-button">Change</a>
                    </div>
                    <div className="input-group">
                      <div className="input-group-item-left">
                        <div className="label-2">No Team Members</div>
                      </div>
                      <a href="#" className="button w-button">Manage</a>
                    </div>
                  </div>
                </div>
                <div className="col-3 w-col w-col-6">
                  <div className="card-dark">
                    <div className="card-heading-small">
                      <h4>Delete account</h4>
                      <p>Before deleting you account, you must cancel your subscription.</p>
                    </div>
                    <a href="#" className="button outline w-button">Delete account</a>
                    <div className="modal">
                      <div className="modal-mask"></div>
                      <div className="modal-container">
                        <a href="#" className="modal-close w-inline-block"></a>
                        <div className="modal-title">
                          <h4 className="text-center">Delete account</h4>
                          <p className="text-center">Are you sure you want to delete the account?</p>
                        </div>
                        <div>
                          <a data-w-id="f0079a81-182d-34b2-183b-c69b1c21ec8d" href="#" className="button-block button button-primary w-button">Cancel</a>
                          <a href="#" className="button-block button button-outline w-button">Delete account</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="section-3">
              <div className="flex w-row">
                <div className="col-3 w-col w-col-6">
                  <div className="card-dark">
                    <h4 className="card-heading-small">Personal settings</h4>
                    <div className="input-group">
                      <div className="input-group-item-left">
                        <div className="label-2">Email</div>
                        <div className="account-login-text">markroster@gmail.com</div>
                      </div>
                      <a href="#" className="button-3 button-small button-growth-none modal-action w-button">Change</a>
                      <div className="modal">
                        <div className="modal-mask"></div>
                        <div className="modal-container">
                          <a href="#" className="modal-close w-inline-block"></a>
                          <h4 className="modal-title text-center">Change email</h4>
                          <div className="w-form">
                            <form id="email-form" name="email-form" data-name="Email Form" method="get">
                              <div className="form-group"><label for="name-5" className="label-2">Email</label><input type="email" className="input w-input" maxlength="256" name="name-3" data-name="Name 3" placeholder="Enter your new email" id="name-3"/>
                              </div>
                              <div className="form-group"><label for="name-5" className="label-2">Password</label>
                              <input type="password" className="input w-input" maxlength="256" name="name-4" data-name="Name 4" placeholder="Enter current password" id="name-4"/>
                                </div>
                              <input type="submit" value="Update password" data-wait="Please wait..." className="button-3 button-primary button-block w-button"/>
                            </form>
                            <div className="success-message w-form-done">
                              <div>Thank you! Your submission has been received!</div>
                            </div>
                            <div className="error-message w-form-fail">
                              <div>Oops! Something went wrong while submitting the form.</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" method="get">
                        <div className="form-group"><label for="username-2" className="label-2">Username</label>
                        <input type="text" className="form-text-field w-input" maxlength="256" name="username-2" data-name="Username 2" placeholder="markroster" id="username-2"/>
                      </div>
                        <div className="form-group"><label for="name-5" className="label-2">Language</label><select id="field-2" name="field-2" data-name="Field 2" className="input w-select">
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                          </select></div>
                        <div className="form-group"><label className="w-checkbox">
                          <input type="checkbox" id="checkbox-2" name="checkbox-2" data-name="Checkbox 2" className="w-checkbox-input"/>
                          <span className="hint w-form-label" for="checkbox-2">Subscribe to newsletters</span></label></div>
                        <div className="button-group">
                          <input type="submit" value="Save" data-wait="Please wait..." className="button w-button"/>
                          </div>
                      </form>
                      <div className="success-message w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="error-message w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-3 w-col w-col-6">
                  <div className="card-dark">
                    <div className="card-heading vertical">
                      <h4>Change password</h4>
                      <div className="heading-text">
                        <p className="hint inline">Forgot your password? <em><br/></em></p>
                        <a href="#" className="hint modal-action">Reset password</a>
                        <div className="modal">
                          <div className="modal-mask"></div>
                          <div className="modal-container">
                            <a href="#" className="modal-close w-inline-block"></a>
                            <div className="modal-title">
                              <h4 className="text-center">Reset password</h4>
                              <p className="text-center">Enter your email and we&#x27;ll send you instructions on how to reset your password.</p>
                            </div>
                            <div className="w-form">
                              <form id="email-form" name="email-form" data-name="Email Form" method="get">
                                <div className="form-group"><label for="name-5" className="label-2">Email</label>
                                <input type="email" className="input w-input" maxlength="256" name="name-3" data-name="Name 3" placeholder="Enter your email" id="name-3"/>
                                  </div>
                                <input type="submit" value="Reset password" data-wait="Please wait..." className="button-3 button-primary button-block w-button"/>
                              </form>
                              <div className="success-message w-form-done">
                                <div>Thank you! Your submission has been received!</div>
                              </div>
                              <div className="error-message w-form-fail">
                                <div>Oops! Something went wrong while submitting the form.</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-form">
                      <form id="email-form" name="email-form" data-name="Email Form" method="get">
                        <div className="form-group"><label for="name-5" className="label-2">Current password</label>
                        <input type="password" className="form-text-field w-input" maxlength="256" name="name-4" data-name="Name 4" placeholder="" id="name-4"/></div>
                        <div className="form-group"><label for="name-5" className="label-2">New password</label>
                        <input type="password" className="form-text-field w-input" maxlength="256" name="name-3" data-name="Name 3" placeholder="" id="name-3"/></div>
                        <div className="form-group"><label for="name-5" className="label-2">Repeat password</label><input type="password" className="form-text-field w-input" maxlength="256" name="name-2" data-name="Name 2" placeholder="" id="name-2"/>
                        </div>
                        <input type="submit" value="Update password" data-wait="Please wait..." className="button primary w-button"/>
                      </form>
                      <div className="success-message w-form-done">
                        <div>Thank you! Your submission has been received!</div>
                      </div>
                      <div className="error-message w-form-fail">
                        <div>Oops! Something went wrong while submitting the form.</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</div>
</body>
</div>


  )
}

export default settings