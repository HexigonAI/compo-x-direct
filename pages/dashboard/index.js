import { getSession } from 'next-auth/react';
import { useQuery } from 'react-query';

import { getProjects } from '@/queries/queries';
import RoutingCard from '@/components/dashboard/RoutingCard';
import ProjectCard from '@/components/dashboard/ProjectCard';
import NavBar from '@/components/NavBar';

// TODO: replace all of these props with dynamic data coming from the respective users' Directus database.
const projectCardProps = {
  title: 'Compo X Components',
  icon: 'images/compo-logo.svg',
};

const newProjectProps = {
  title: 'Start a New Project',
  remainingProjects: 2,
  icon: 'images/Vector.svg',
};

const newServerProps = {
  title: 'Start a New Server',
  remainingProjects: 3,
  icon: 'images/energy-usage-window.svg',
};

const navBarProps = {
  avatar: 'images/tayler-profile.png',
};

const Dashboard = () => {

  const { data: projects, isSuccess } = useQuery(
    'projects',
    async () => await getProjects()
  );

  const renderedProjects = () => {
    if (isSuccess && projects) {
      return projects.map((project) => (
        <ProjectCard
          key={project.id}
          projectTitle={project.title}
          owner={project.owner}
        />
      ));
    }
  };

  return (
    <>
      <NavBar userAvatar={navBarProps.avatar} />
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

              <ProjectCard
                projectTitle={projectCardProps.title}
                icon={projectCardProps.icon}
              />

              {renderedProjects()}
              
              <RoutingCard
                title={newProjectProps.title}
                icon={newProjectProps.icon}
                remainingProjects={newProjectProps.remainingProjects}
              />
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

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  console.log(context)
    if (!session) {
      return {
        redirect: {
          destination: '/login-page',
          permanent: false,
        }
      }
    }
    return {
      props: {session}
    }
}

export default Dashboard;
