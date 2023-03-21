import { useRouter } from 'next/router';
import { getSession } from 'next-auth/react';

const ProjectDetailsPage = () => {
  const router = useRouter();
  const projectId = router.query;

  console.log(projectId);

  //fetch some data from a backend with the id of route

  return <div>Project Details</div>;
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
  return {
    props: { session },
  };
};

export default ProjectDetailsPage;
