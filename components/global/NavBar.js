import { signOut } from 'next-auth/react';

import Link from 'next/link';

const logo = '../../images/Compo---Logo.svg';

const NavBar = ({ token, user }) => {
  const handleLogout = () => {
    signOut();
  };

  return (
    <div className='nav wf-section'>
      <div
        data-collapse='medium'
        data-animation='default'
        data-duration='400'
        data-easing='ease'
        data-easing2='ease'
        role='banner'
        className='navbar w-nav'
      >
        <div className='container-full w-container'>
          <Link href={'/servers'}>
            <div className='dashabord-logo w-nav-brand'>
              <img src={logo} width='90' alt='' className='logo' />
            </div>
          </Link>

          <div className='site-nav-search'></div>
          <nav role='navigation' className='nav-menu w-nav-menu'>
            <div className='nav-mobile'>
              <p
                className='nav-link last w-nav-link'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </p>
              {/* This is where we would dynamically load in the user avatar */}
              {/* <img
                src={`https://compo.directus.app/assets/${
                  user ? '28b315a9-d72c-489e-9d7b-a3d0c2e89877.png' : ''
                }?access_token=${token}`}
                width='47'
                sizes='(max-width: 479px) 20vw, (max-width: 767px) 59.993812561035156px, (max-width: 1279px) 53.99907302856445px, (max-width: 1439px) 4vw, 53.99907302856445px'
                alt=''
                className='avatar'
              /> */}
              <img src={'../images/user-avatar.svg'}></img>
            </div>
          </nav>
          <Link href={'/servers'}>
            <nav role='navigation' className='nav-menu w-nav-menu'>
              <p
                className='nav-link last w-nav-link'
                style={{ cursor: 'pointer' }}
              >
                Servers
              </p>
            </nav>
          </Link>
          <div className='menu-button w-nav-button'>
            <div className='w-icon-nav-menu'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NavBar;
