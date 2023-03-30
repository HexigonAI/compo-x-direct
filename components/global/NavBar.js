import { signOut } from 'next-auth/react';

import Link from 'next/link';

const profileImage = '../../images/tayler-profile.png';

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
          {token && (
            <Link href={'/servers'}>
              <div className='dashabord-logo w-nav-brand'>
                <img
                  src='../../images/Compo---Logo.svg'
                  width='90'
                  alt=''
                  className='logo'
                />
              </div>
            </Link>
          )}
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

              <img
                    src={`https://compo.directus.app/assets/${
                      user ? user.avatar.id : ''
                    }?access_token=${token}`}
                    width='47'
                    sizes='(max-width: 479px) 20vw, (max-width: 767px) 59.993812561035156px, (max-width: 1279px) 53.99907302856445px, (max-width: 1439px) 4vw, 53.99907302856445px'
                    alt=''
                    className='avatar'
                  />
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
