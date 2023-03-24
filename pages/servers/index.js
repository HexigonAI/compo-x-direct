import Link from 'next/link';

import { getCurrentUser, getServers } from '@/queries/queries';
import RoutingCard from '@/components/dashboard/RoutingCard';
import ServerCard from '@/components/dashboard/ServerCard';
import NavBar from '@/components/NavBar';
import { requireAuth } from '@/helpers/requireAuth';

// TODO: replace all of these props with dynamic data coming from the respective users' Directus database.
const projectCardProps = {
  title: 'Compo X Components',
  icon: 'images/compo-logo.svg',
};

const newServerProps = {
  title: 'Start a New Server',
  remainingProjects: 3,
  icon: 'images/energy-usage-window.svg',
};

const Servers = ({ servers, user }) => {
  //removed useQuery because server side rendering with getServerSideProps is faster in this use case

  return (
    <>
      <NavBar />
      <div class='page-wrapper-dark'>
        <div class='global-styles w-embed'></div>
        <main>
          <div class='center-instance'>
            <div class='server-inside'>
              <div class='top-admin'>
                <a href='#' class='w-inline-block'>
                  {/* TODO add profileImage prop here fetched from Directus */}
                  <img
                    src='images/tayler-profile.png'
                    width='47'
                    sizes='(max-width: 479px) 20vw, (max-width: 767px) 59.993812561035156px, (max-width: 1279px) 53.99907302856445px, (max-width: 1439px) 4vw, 53.99907302856445px'
                    srcset='images/tayler-profile-p-500.png 500w, images/tayler-profile-p-800.png 800w, images/tayler-profile-p-1080.png 1080w, images/tayler-profile.png 1318w'
                    alt=''
                    class='avatar'
                  />
                  <h3 className='db-header'>
                    {/* TODO add in firstName prop here from Directus */}
                    Welcome Back, <span class='user_name'>Tayler</span>
                  </h3>
                </a>
              </div>
              <div class='label-4'>Your Servers</div>

              <ServerCard
                serverTitle={projectCardProps.title}
                icon={projectCardProps.icon}
              />

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

              <RoutingCard
                title={newServerProps.title}
                icon={newServerProps.icon}
                remainingProjects={newServerProps.remainingProjects}
              />
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export async function getServerSideProps(context) {
  const fetchServers = async ({ session }) => {
    const token = session.user.accessToken;

    try {
      const servers = await getServers(token);
      //get user here to pass as props
      return {
        props: {
          servers,
        },
      };
    } catch (error) {
      console.error(error);
      return {
        props: {
          servers: [],
        },
      };
    }
  };

  return requireAuth(context, ({ session }) => {
    return fetchServers({ session });
  });
}

export default Servers;
