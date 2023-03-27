import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getCurrentUser, getServers } from '@/queries/collections';
import RoutingCard from '@/components/dashboard/RoutingCard';
import ServerCard from '@/components/dashboard/ServerCard';
import NavBar from '@/components/NavBar';
import { requireAuth } from '@/helpers/requireAuth';
import { fetchData } from 'next-auth/client/_utils';
import { useSession } from 'next-auth/react';
import {fetchUser, fetchProjects} from '../../helpers/fetchData'
import { getProjects } from '@/queries/collections';
import { useQuery } from 'react-query';


// TODO: replace all of these props with dynamic data coming from the respective users' Directus database.
const projectCardProps = {
  title: 'Compo X Components',
  icon: 'images/compo-logo.svg',
};

const assetsUrl = process.env.NEXT_ACCOUNT_AVATAR_URL

const newServerProps = {
  title: 'Start a New Server',
  remainingProjects: 3,
  icon: 'images/energy-usage-window.svg',
};




const Servers = ({ servers, user }) => {
   const data = fetchUser();
   const projects =  fetchProjects();
   console.log(projects)
  //  console.log(data)

  //removed useQuery because server side rendering with getServerSideProps is faster in this use case


  return (
    
    <>
      <NavBar />
      <div className='page-wrapper-dark'>
        <div className='global-styles w-embed'></div>
        <main>
          <div className='center-instance'>
            <div className='server-inside'>
              <div className='top-admin'>
                <a href='#' className='w-inline-block'>
                  {/* TODO add profileImage prop here fetched from Directus */}
                  <img
                    src={`${assetsUrl}/be58c0a0-3315-42b2-ac49-64c477958ef7`}
                    width='47'
                    sizes='(max-width: 479px) 20vw, (max-width: 767px) 59.993812561035156px, (max-width: 1279px) 53.99907302856445px, (max-width: 1439px) 4vw, 53.99907302856445px'
                    alt=''
                    className='avatar'
                  />
                  <h3 className='db-header'>
                    {/* TODO add in firstName prop here from Directus */}
                    Welcome Back, <span className='user_name'>{ data ? data.first_name : ""}</span>
                  </h3>
                </a>
              </div>
              <div className='label-4'>Your Servers</div>

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
