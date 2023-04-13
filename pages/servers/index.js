import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';
import Link from 'next/link';
import Head from 'next/head';
import Cookies from 'js-cookie';

import RoutingCard from '@/components/dashboard/RoutingCard';
import ServerCard from '@/components/dashboard/ServerCard';
import NavBar from '@/components/global/NavBar';
import { fetchData } from '../../helpers/fetchData/fetchData';
import { fetchUser } from '../../helpers/fetchData/fetchUser';
import { getUserServers, getCurrentUser } from '@/queries/Users';
import InputModal from '@/components/global/InputModal';
import { createServer } from '@/helpers/setData/createServer';

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
  const [renderedServers, setRenderedServers] = useState(servers);
  const [isFirstTime, setIsFirstTime] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = Cookies.get('hasVisitedBefore');
    if (!hasVisitedBefore) {
      setIsFirstTime(true);
      Cookies.set('hasVisitedBefore', 'true');
      alert('This is the first time the user has visited the site');
    }

  }, [renderedServers]);

  const closeModal = () => {
    setShowModal(false);
  };

  const handleCreateServer = async (inputOne, inputTwo) => {
    if (inputOne === '') {
      alert('Please enter a server name');
      return;
    }
    createServer(token, inputOne, inputTwo)
      .then(() => {
        setTimeout(() => {
          fetchData(token, getUserServers)
            .then((response) => {
              const newServers = response.servers;
              setRenderedServers(newServers);
              setShowModal(false);
            })
            .catch((error) => {
              console.error('Error fetching server list:', error);
            });
        }, 300);
      })
      .catch((error) => {
        console.error('Error creating server:', error);
      });
  };

  return (
    <>
      <Head>
        <title>Compo-X Servers</title>
        <meta
          property='og:servers'
          content='list of servers'
          key='servers page'
        />
      </Head>

      <NavBar token={token} user={user} />
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
                <div className='w-inline-block'>
                  <img
                    src={`https://compo.directus.app/assets/${
                      user ? '28b315a9-d72c-489e-9d7b-a3d0c2e89877.png' : ''
                    }?access_token=${token}`}
                    alt=''
                    className='avatar'
                  />
                  <h3 className='db-header'>
                    Welcome Back,{' '}
                    <span className='user_name'>
                      {user ? user.first_name : ''}
                    </span>
                  </h3>
                </div>
              </div>
              <div className='label-4'>Your Servers</div>

              {renderedServers &&
                renderedServers.map((server) => (
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
    props: { servers: servers.servers, token, user },
  };
}

export default Servers;
