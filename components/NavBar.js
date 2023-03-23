import { signOut } from 'next-auth/react';
import Link from 'next/link';

const profileImage = '../../images/tayler-profile.png';

const NavBar = () => {
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
            <img
              src='../../images/Compo---Logo.svg'
              width='90'
              alt=''
              class='logo'
            />
          </a>
          <div class='site-nav-search'></div>
          <nav role='navigation' class='nav-menu w-nav-menu'>
            <div class='nav-mobile'>
              <p
                className='nav-link last w-nav-link'
                style={{ cursor: 'pointer' }}
                onClick={handleLogout}
              >
                Logout
              </p>

              <img src={profileImage} className='avatar' />
            </div>
          </nav>
          <Link href={'/servers'}>
            <nav role='navigation' class='nav-menu w-nav-menu'>
              <p
                className='nav-link last w-nav-link'
                style={{ cursor: 'pointer' }}
              >
                Servers
              </p>
            </nav>
          </Link>
          <div class='menu-button w-nav-button'>
            <div class='w-icon-nav-menu'></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
