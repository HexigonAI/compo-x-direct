import { useRouter } from 'next/router';
import Link from 'next/link';

import { fetchData } from '@/helpers/fetchData/fetchData';
import NavBar from '@/components/global/NavBar';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { getSession } from 'next-auth/react';
import { getCurrentUser, getUserProjects } from '@/queries/Users';
import { createProject } from '@/helpers/setData/createProject';
import Head from 'next/head';
import { fetchUser } from '@/helpers/fetchData/fetchUser';

const ServerProjectsPage = ({ projects, server, token, user }) => {
  const router = useRouter();
  const { projectpage } = router.query;

  const handleCreateProject = async (token, projectpage) => {
    const newProjectID = await createProject(token, projectpage);
    router.push(`/servers/${projectpage}/${newProjectID}`);
  };

  return (
    <>
      <Head>
        <title>Compo-X Projects</title>
        <meta
          property='og:projects'
          content='list of projects'
          key='projects page'
        />
      </Head>
      <NavBar user={user} token={token} />
      <div className='page-header-2 page-header__sticky'>
        <div className='grid-2'>
          <div className='col-12'>
            <div className='flex oustide'>
              <div>
                <h2 className='page-header__title-2'>Projects</h2>
                <div className='flex-server-top'>
                  <div className='avatar-3'>
                    {/* TODO: load in uploaded avatar from user object */}
                    {/* <img
                      src='../../images/compo-logo.svg'
                      alt=''
                      className='org-avatar'
                    /> */}
                  </div>
                  <div>
                    <div className='account-name'>{server.title}</div>
                    <div className='account-detail'>4 Published Sites</div>
                  </div>
                </div>
              </div>
              <div className='page-nav'>
                <div className='side-wrapper right'>
                  <button
                    onClick={(e) => handleCreateProject(token, projectpage)}
                    className='button'
                    data-ix='open-modal'
                  >
                    New Project
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='array-projects' style={{ marginTop: '2rem' }}>
        {typeof projects !== 'undefined' &&
          Array.isArray(projects) &&
          projects.map((project) => (
            <Link
              href={{
                pathname: '/servers/[projectpage]/[projectid]',
                query: { projectpage: projectpage, projectid: project.id },
              }}
              key={project.id}
            >
              <ProjectCard projectTitle={project.title} id={project.id} />
            </Link>
          ))}
      </div>
      <div className='page-inside'>
        <div className='open-state'>
          <button className='button-2 add w-button' data-ix='open-modal'>
            Start a New Project
          </button>
        </div>
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

  const { projectpage } = context.params;
  const token = session.user.accessToken;

  const { servers } = await fetchData(token, getUserProjects);
  const mappedProjects = servers.map((project) => project);
  
  const getFilteredProjects = (mappedProjects) => {
    const { projects } =  mappedProjects.find(
      (project) => project.id === projectpage
      );
    return projects;
  }
  const getCurrentServer = (mappedProjects) => {
    const server = mappedProjects.find((server) => server.id === projectpage);
    return server;
  }
  
  const projects = getFilteredProjects(mappedProjects);
  const server = getCurrentServer(mappedProjects);
  const user = await fetchUser(getCurrentUser, token, {});
  
  
  return {
    props: {
      projects,
      server,
      projectpage,
      token,
      user,
    },
  };
}

export default ServerProjectsPage;
