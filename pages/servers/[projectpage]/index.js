import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { requireAuth } from '@/helpers/requireAuth';
import { getProjects } from '@/queries/queries';
import { useSession } from 'next-auth/react';
import Link from 'next/link';

import NavBar from '@/components/NavBar';
import ProjectCard from '@/components/dashboard/ProjectCard';


const ServerProjectsPage = () => {
  const router = useRouter();
  const { projectpage } = router.query;
  const session = useSession();
  const token = session.data.user.accessToken;
  
  //TODO this fetch will still not work if you set the Public role to have all access to directus_users
  const { data: projects, isSuccess } = useQuery(
    'projects',
    async () => await getProjects(token)
  );

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
      <div class="array-projects" style={{ marginTop: '2rem'}}>

      {isSuccess &&
        projects.map((project) => (
          <Link
            href={{
              pathname: '/servers/[projectpage]/[projectid]',
              query: { projectpage: projectpage, projectid: project.id },
            }}
          >
            <ProjectCard
              key={project.id}
              projectTitle={project.title}
              id={project.id}
            />
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

export const getServerSideProps = async (context) => {
  return requireAuth(context, ({ session }) => {
    return {
      props: { session },
    };
  });
};

export default ServerProjectsPage;
