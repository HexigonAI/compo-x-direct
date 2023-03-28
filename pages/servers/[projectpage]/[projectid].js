import NavBar from '@/components/NavBar';
import { getSession } from 'next-auth/react';
import { fetchProjectById } from '@/helpers/fetchProjectById';

const SingleProjectPage = ({ project }) => {

  const renderedProject = () => {
    if (project && project) {
      return (
        <div>
          <h1>{project.title}</h1>
          <h5>{project.id}</h5>
        </div>
      );
    }
  }

  return (
    <>
    <NavBar />
      {renderedProject()}
    </>
  );
};

export const getServerSideProps = async (context) => {
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
  const {params} = context;
  const {projectid} = params;

  try {
    const project = await fetchProjectById(token, projectid);

    return {
      props: {
        project,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {},
    };
  }
};

export default SingleProjectPage;
