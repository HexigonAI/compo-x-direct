import NavBar from '@/components/global/NavBar';
import { getSession } from 'next-auth/react';
import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import Head from 'next/head';
const SingleProjectPage = ({ project, token }) => {
  const renderProject = () => {
    if (project && project) {
      return (
        <div>
          <h1>{project.title}</h1>
          <h5>{project.id}</h5>
        </div>
      );
    }
  };

  const renderedProject = renderProject();

  return (
    <>
      <Head>
        <title>{renderedProject.props.children[0].props.children}</title>
        <meta
          property='og:project'
          content='editing project'
          key='single project page'
        />
      </Head>
      <NavBar />
      {renderedProject}
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
  const { params } = context;
  const { projectid } = params;

  try {
    const project = await fetchProjectById(token, projectid);

    return {
      props: {
        project,
        token,
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
