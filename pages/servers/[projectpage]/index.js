import { useRouter } from 'next/router';
import Link from 'next/link';

import { fetchData } from '../../../helpers/fetchData';
import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { getSession } from 'next-auth/react';
import { getUserProjects } from '@/queries/Users';

const ServerProjectsPage = ({ projects }) => {
  const router = useRouter();
  const { projectpage } = router.query;

  return (
    <>
      <NavBar />
      <div className='page-header-2 page-header__sticky'>
        <div className='grid-2'>
          <div className='col-12'>
            <div className='flex oustide'>
              <div>
                <h2 className='page-header__title-2'>Projects</h2>
                <div className='flex-server-top'>
                  <div className='avatar-3'>
                    <img
                      src='images/compo-logo.svg'
                      alt=''
                      className='org-avatar'
                    />
                  </div>
                  <div>
                    <div className='account-name'>Compo Component Server</div>
                    <div className='account-detail'>4 Published Sites</div>
                  </div>
                </div>
              </div>
              <div className='page-nav'>
                <div className='side-wrapper right'>
                  <a
                    href='#'
                    className='button-2 add w-button'
                    data-ix='open-modal'
                  >
                    New Project
                  </a>
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
          <img
            src='images/Grid.svg'
            loading='lazy'
            alt=''
            className='open-state-image'
          />
          <a href='#' className='button-2 add w-button' data-ix='open-modal'>
            Start a New Project
          </a>
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

  const { params } = context;
  const { projectpage } = params;
  const token = session.user.accessToken;
  const query = getUserProjects;

  const { servers } = await fetchData(token, query);
  const mappedProjects = servers.map((project) => project);
  const { projects } = mappedProjects.find(
    (project) => project.id === projectpage
  );

  return {
    props: {
      projects,
      projectpage: projectpage,
    },
  };
}

export default ServerProjectsPage;
