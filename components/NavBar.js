import React from 'react';
import { signOut } from 'next-auth/react';

const NavBar = ({ userAvatar }) => {

  const handleLogout = () => {
    signOut();
  };

  return (
    <div class='nav wf-section'>
      <div
        data-collapse='medium'
        data-animation='default'
        data-duration='400'
        data-easing='ease'
        data-easing2='ease'
        role='banner'
        class='navbar w-nav'
      >
        <div class='container-full w-container'>
          <a href='#' class='dashabord-logo w-nav-brand'>
            <img src='images/Compo---Logo.svg' width='90' alt='' class='logo' />
          </a>
          <div class='site-nav-search'></div>
          <nav role='navigation' class='nav-menu w-nav-menu'>
            <div class='nav-mobile'>
              <p
                href='http://hexigon.ai/support'
                className='nav-link last w-nav-link'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </p>

              <img src={userAvatar} className='avatar' />
            </div>
          </nav>
          <div class='menu-button w-nav-button'>
            <div class='w-icon-nav-menu'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
