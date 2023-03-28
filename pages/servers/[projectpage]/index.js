import { useRouter } from 'next/router';
import Link from 'next/link';

import { getProjects } from '../../../helpers/fetchData';
import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { getSession } from 'next-auth/react';

const ServerProjectsPage = ({ projects }) => {
  const router = useRouter();
  const { projectpage } = router.query;

  return (
    <>
      <NavBar />
      <div class='page-header-2 page-header__sticky'>
        <div class='grid-2'>
          <div class='col-12'>
            <div class='flex oustide'>
              <div>
                <h2 class='page-header__title-2'>Projects</h2>
                <div class='flex-server-top'>
                  <div class='avatar-3'>
                    <img
                      src='images/compo-logo.svg'
                      alt=''
                      class='org-avatar'
                    />
                  </div>
                  <div>
                    <div class='account-name'>Compo Component Server</div>
                    <div class='account-detail'>4 Published Sites</div>
                  </div>
                </div>
              </div>
              <div class='page-nav'>
                <div class='side-wrapper right'>
                  <a
                    href='#'
                    class='button-2 add w-button'
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
      <div class='array-projects' style={{ marginTop: '2rem' }}>
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
      <div class='page-inside'>
        <div class='open-state'>
          <img
            src='images/Grid.svg'
            loading='lazy'
            alt=''
            class='open-state-image'
          />
          <a href='#' class='button-2 add w-button' data-ix='open-modal'>
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

  const token = session.user.accessToken;
  const projects = await getProjects(token);

  return {
    props: {
      projects: projects.projects
    },
  };
}

export default ServerProjectsPage;
