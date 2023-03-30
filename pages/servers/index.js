import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';

import RoutingCard from '@/components/dashboard/RoutingCard';
import ServerCard from '@/components/dashboard/ServerCard';
import NavBar from '@/components/global/NavBar';
import { fetchData } from '../../helpers/fetchData/fetchData';
import { fetchUser } from '../../helpers/fetchUser';
import { getUserServers, getCurrentUser } from '@/queries/Users';
import InputModal from '@/components/global/InputModal';
import { createServer } from '@/helpers/createServer';

const newServerProps = {
  title: 'Start a New Server',
  remainingProjects: 3,
  icon: 'images/energy-usage-window.svg',
};

const modalProps = {
  header: 'Enter Server Information',
  labelOne: 'Server Name',
  labelTwo: 'Server Description',
  buttonText: 'Create Server',
};

const Servers = ({ servers, user, token }) => {
  const [showModal, setShowModal] = useState(false);
  const [server, setServer] = useState(servers);

  useEffect(() => {
    //detect for a change in the browser and update the browser accordingly
  }, [server]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateServer = (inputOne, inputTwo) => {
    if (inputOne === '') {
      alert('Please enter a server name');
      return;
    } else {
      createServer(token, inputOne, inputTwo);
      setShowModal(false);
    }
  };

  return (
    <>
      <NavBar token={token} user={user}/>
      {showModal && (
        <>
          <div className='modal-container'>
            <InputModal
              closeModal={closeModal}
              handleSubmit={handleCreateServer}
              isOpen={showModal}
              header={modalProps.header}
              labelOne={modalProps.labelOne}
              labelTwo={modalProps.labelTwo}
              buttonText={modalProps.buttonText}
            />
          </div>
        </>
      )}
      <div className='page-wrapper-dark'>
        <div className='global-styles w-embed'></div>
        <main>
          <div className='center-instance'>
            <div className='server-inside'>
              <div className='top-admin'>
                <a href='#' className='w-inline-block'>
                  <img
                    src={`https://compo.directus.app/assets/${
                      user ? user.avatar.id : ''
                    }?access_token=${token}`}
                    width='47'
                    sizes='(max-width: 479px) 20vw, (max-width: 767px) 59.993812561035156px, (max-width: 1279px) 53.99907302856445px, (max-width: 1439px) 4vw, 53.99907302856445px'
                    alt=''
                    className='avatar'
                  />
                  <h3 className='db-header'>
                    Welcome Back,{' '}
                    <span className='user_name'>
                      {user ? user.first_name : ''}
                    </span>
                  </h3>
                </a>
              </div>
              <div className='label-4'>Your Servers</div>

              {servers &&
                servers.map((server) => (
                  <Link
                    href={{
                      pathname: '/servers/[projectpage]',
                      query: { projectpage: server.id },
                    }}
                    key={server.id}
                  >
                    <ServerCard
                      serverTitle={server.title}
                      description={server.description}
                      id={server.id}
                    />
                  </Link>
                ))}
              <div onClick={(e) => setShowModal(true)}>
                <RoutingCard
                  title={newServerProps.title}
                  icon={newServerProps.icon}
                  remainingProjects={newServerProps.remainingProjects}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/login-page',
        permanent: false,
      },
    };
  }
  const token = session.user.accessToken;

  const servers = await fetchData(token, getUserServers);
  const user = await fetchUser(getCurrentUser, token, {});

  return {
    props: { servers: servers.servers, token, user, revalidate: 1 },
  };
}

export default Servers;
