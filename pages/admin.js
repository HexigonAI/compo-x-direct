import React from 'react';
// import styles from '../styles/nav.module.css'; 

const admin = () => {
  return (
    
    <div className="body dash">
  <div className="nav wf-section">
    <div data-collapse="medium" data-animation="default" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav">
      <div className="container-full w-container">
        <a href="../super-admin/admin.html" aria-current="page" className="dashabord-logo w-nav-brand w--current"><img src="../images/Compo---Logo.svg" width="90" alt="" className="logo"/></a>
        <div className="site-nav-search">
          <a href="#" className="blue-button-wrapper padding-custom1 button-start w-inline-block"><img src="../images/Group-1000003969.svg" loading="lazy" alt="" className="webflow-logo"/>
            <div className="blue-button-text">Start a New Search</div>
          </a>
        </div>
        <nav role="navigation" className="nav-menu w-nav-menu">
          <a href="../super-admin/servers.html" className="nav-link w-nav-link">Servers</a>
          <a href="../site-dashboard/organization-grid.html" className="nav-link w-nav-link">Projects</a>
          <a href="http://hexigon.ai/documentation" className="nav-link w-nav-link">Updates &amp; Releases</a>
          <a href="http://hexigon.ai/support" className="nav-link last w-nav-link">Support</a>
          <a href="../site-dashboard/new-project.html" className="button button-round button-new w-inline-block"><img src="../images/new-tab.svg" alt=""/></a>
          <a href="../super-admin/settings.html" className="button button-round red-error w-inline-block">
            <h3 className="user-avatar">TF</h3>
          </a>
        </nav>
        <div className="w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  </div>
  <div className="page-wrapper-dark w-clearfix">
    <div className="global-styles w-embed">

    </div>
    <div className="sidebar-section">
      <div className="sidebar-items">
        <div className="header-items">
          <h3 className="heading-2">John Doe</h3>
          <h6>Apple Inc.</h6>
          <div className="role">Role: Admin</div>
        </div>
      </div>
      <div className="sidebar-items">
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
            <a href="../super-admin/admin.html" aria-current="page" className="sidebar-link1 w-inline-block w--current"><img src="../images/app-window_1.svg" loading="lazy" alt="" className="sideb-icon"/>
              <div>Dashboard</div>
            </a>
            <a href="../super-admin/settings.html" className="sidebar-link1 w-inline-block"><img src="../images/wrench.svg" loading="lazy" alt="" className="sideb-icon"/>
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
    <main className="main-wrapper">
      <div className="top-padding">
        <div className="page-padding">
          <div>
            <div className="component-instance">
              <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a46d-63435444" className="welcome-column">
                <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a46e-63435444" className="card-dark">
                  <div className="card-grid-2rem">
                    <div className="label-4">Your Servers</div>
                    <div className="welcome-profile-header">
                      <h1 className="hero-header-h1">Hello <span className="username">Tristan</span> <span className="heading-color-grey">- Welcome Back</span></h1>
                    </div>
                    <div>
                      <div>
                        <div><img width="14" src="../images/terminal-tag.svg" alt="" className="icon-help"/></div>
                        <div><strong>Your Servers</strong></div>
                      </div>
                      <div>
                        <div className="w-richtext">
                          <h4>Install a New Servers to manage multiple hosted AI-Projects</h4>
                          <ul role="list">
                            <li>Servers are like folders, companies or micro-organizations that hold multiple projects.</li>
                            <li>Currently we only offer automatic server installs with multiple projects for marketing-specific purposes only (E-Commerce and memberships are coming!)</li>
                          </ul>
                        </div>
                        <a href="../super-admin/new-server.html" className="button primary margin-right margin-top w-button">Start an New Server</a>
                      </div>
                      <div data-ix="show-config-panel" className="server-card">
                        <div className="flex-server-top">
                          <div className="avatar-2"><img src="../images/compo-logo.svg" alt="" className="org-avatar"/></div>
                          <div>
                            <div className="account-name">Compo Component Server</div>
                            <div className="account-detail">No Publishes Sites</div>
                          </div>
                        </div>
                        <div>
                          <div className="account-state">Account Connected and running</div>
                          <div className="account-state blue">Free</div>
                          <div>
                            <a href="../site-dashboard/organization-grid.html" className="button primary w-button">Access Projects</a>
                          </div>
                        </div>
                        <div className="focus-item-account"></div>
                      </div>
                      <div data-ix="show-config-panel" className="server-card w-clearfix">
                        <div className="flex-server-top">
                          <div className="avatar-2"><img src="../images/puty-fav2.png" alt="" className="org-avatar"/></div>
                          <div>
                            <div className="account-name">Apple Inc.</div>
                            <div className="account-detail">http://myfirstsite.com</div>
                          </div>
                        </div>
                        <div className="cont-txt">
                          <div className="account-state off">Account not Connected, Compo server is in error </div>
                          <div>
                            <a href="mailto:support@hexigon.ai?subject=Compo%20Server%20is%20Down" className="button error margin-top w-button">Contact Support</a>
                          </div>
                        </div>
                        <div className="focus-item-account"></div>
                      </div>
                    </div>
                    <div className="welcome-socials-wrapper"></div>
                  </div>
                </div>
                <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a480-63435444" className="card-dark">
                  <div className="label-4">Send us a follow</div>
                  <div className="w-layout-grid links_social-list">
                    <a href="https://twitter.com/hexigonai" className="footer_social-link w-inline-block"><img src="../images/Social-Media-Twitter-by-Streamlinehq.svg" loading="lazy" alt="" className="icon-1x1-xsmall"/></a>
                    <a href="https://dribbble.com/hexigonai" className="footer_social-link w-inline-block"><img src="../images/Designer-Community-Dribbble-by-Streamlinehq.svg" loading="lazy" alt="" className="icon-xsmall"/></a>
                    <a href="https://www.linkedin.com/company/82424571/admin/" className="footer_social-link w-inline-block"><img src="../images/Professional-Network-Linkedin-by-Streamlinehq.svg" loading="lazy" alt="" className="icon-xsmall"/></a>
                  </div>
                  <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a48a-63435444" className="tweet-embed w-embed w-script">
                    <blockquote className="twitter-tweet" data-theme="dark">
                      <p lang="en" dir="ltr">Still tweaking, but super pleased with this <a href="https://twitter.com/webflow?ref_src=twsrc%5Etfw">@webflow</a> design and build for legal recruitments specialists, Sonder Consultants. <a href="https://t.co/vLfcIwhME0">pic.twitter.com/vLfcIwhME0</a>
                      </p>&mdash; Trist (@trist_adlington) <a href="https://twitter.com/trist_adlington/status/1557391270905090048?ref_src=twsrc%5Etfw">August 10, 2022</a>
                    </blockquote>
                  </div>
                </div>
              </div>
              <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a48b-63435444" className="welcome-column">
                <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a48c-63435444" className="card-dark">
                  <div className="margin-bottom margin-medium">
                    <div className="div-block-24">
                      <div className="label-4">More Compo</div>
                      <div className="highlight">1.2k+ Ai-Based Searches</div>
                    </div>
                  </div>
                  <div className="links-grid-1rem">
                    <a id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a494-63435444" href="../site-dashboard/organization-grid.html" target="_blank" className="button-7 resource-button w-inline-block">
                      <div className="div-block-23">
                        <div className="icon-xxsmall w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <defs></defs>
                            <title>tool-box</title>
                            <line x1="0.5" y1="13.501" x2="10.5" y2="13.501" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="13.5" y1="13.501" x2="23.5" y2="13.501" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></line>
                            <rect x="0.5" y="8.501" width="23" height="14" rx="1" ry="1" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></rect>
                            <path d="M13.5,15a1.5,1.5,0,0,1-3,0V12.5h3Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M8,8.5a4,4,0,0,1,8,0" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg></div>
                        <div>Your Projects</div>
                      </div>
                      <div className="price-2">Free</div>
                    </a>
                    <a id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a49b-63435444" href="#" target="_blank" className="button-7 resource-button w-inline-block">
                      <div className="div-block-23">
                        <div className="icon-xxsmall w-embed"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g>
                              <path d="M22.5,1.25,10.7,15.88A1,1,0,0,1,9.21,16L5,11.75" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                              <path d="M19.5,11.25v10.5a1,1,0,0,1-1,1H2.5a1,1,0,0,1-1-1v-16a1,1,0,0,1,1-1H14" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"></path>
                            </g>
                          </svg></div>
                        <div>Download the Compo Chrome Extension</div>
                      </div>
                      <div className="price-2">Free</div>
                    </a>
                    <a id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a4a2-63435444" href="#" target="_blank" className="button-7 resource-button w-inline-block">
                      <div className="div-block-23">
                        <div className="icon-xxsmall w-embed"><svg width="currentWidth" height="currentHeight" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M110 146.92C100.024 151.391 89.1755 153.575 78.2471 153.312C67.3187 153.05 56.5872 150.347 46.8378 145.402C37.0885 140.458 28.5679 133.396 21.8996 124.734C15.2312 116.072 10.5837 106.029 8.29719 95.3388C6.01067 84.6491 6.14293 73.5834 8.68431 62.9513C11.2257 52.3192 16.1119 42.3899 22.9854 33.8896C29.8589 25.3894 38.5458 18.5334 48.4106 13.8232C58.2753 9.113 69.0683 6.66783 79.9999 6.66656" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M124.56 21.7465C126.2 22.9932 127.78 24.3199 129.307 25.6999C130.833 27.0799 132.3 28.5399 133.7 30.0465" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M145 46.0333C145.956 47.86 146.831 49.7244 147.627 51.6267C148.422 53.5289 149.138 55.46 149.773 57.42" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M153.26 76.6666C153.353 78.7243 153.353 80.7843 153.26 82.8466C153.173 84.8999 153.007 86.9599 152.753 88.9999" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M147.793 107.953C147.007 109.86 146.14 111.729 145.193 113.56C144.247 115.391 143.229 117.182 142.14 118.933" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M101.907 10C104.045 10.6667 106.14 11.4289 108.193 12.2867" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M131.5 132.193C129.92 133.753 128.267 135.247 126.547 136.653" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M79.9998 26.6666C90.5482 26.6666 100.86 29.7945 109.63 35.6549C118.401 41.5152 125.237 49.8447 129.273 59.5901C133.31 69.3355 134.366 80.0591 132.308 90.4047C130.251 100.75 125.171 110.253 117.712 117.712C110.253 125.171 100.75 130.251 90.4047 132.308C80.059 134.366 69.3355 133.31 59.5901 129.273C49.8447 125.237 41.5151 118.401 35.6548 109.63C29.7945 100.86 26.6665 90.5482 26.6665 79.9999" stroke="white" strokeWidth="6.66667" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg></div>
                        <div>Your Search History &amp; Saved Prompts</div>
                      </div>
                      <div className="price-2">free</div>
                    </a>
                  </div>
                </div>
                <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a4a9-63435444" className="card-dark">
                  <div className="card-grid-2rem">
                    <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a4ab-63435444" className="margin-bottom">
                      <div className="label-4">Compo Search</div>
                      <h5>Compo Search is an AI-based Component search and generator for Webflow. With a single prompt, browse over thousands of components for the number one no-code platform.</h5>
                    </div>
                    <div id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a4b0-63435444" style={{paddingTop:"56.17021276595745%"}} className="w-embed-youtubevideo"><iframe src="https://www.youtube.com/embed/q2irPUCvknQ?rel=0&amp;controls=1&amp;autoplay=1&amp;mute=0&amp;start=0" frameBorder="0" style={{position:"absolute", left:"0", top:"0" , width:"100%" ,height:"100" ,  pointerEvents:"auto"}} allow="autoplay; encrypted-media" allowFullScreen="" title="Introducing Compo Search"></iframe></div>
                    <a id="w-node-d1ba6f9c-1319-4fa3-2a74-95585e38a4b1-63435444" href="mailto:hello@hexigon.ai?subject=You%20have%20a%20message%20from%20compo%20dashboard" className="button-7 w-button">Have questions or need help?</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
    </div>
  )
}

export default admin