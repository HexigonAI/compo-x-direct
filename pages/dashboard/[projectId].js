import { useRouter } from 'next/router';
import { requireAuth } from '@/helpers/requireAuth';

const ProjectDetailsPage = () => {
  const router = useRouter();
  const projectId = router.query;

  console.log(projectId);

  //fetch some data from a backend with the id of route

  return <div>Project Details</div>;
};

export const getServerSideProps = async (context) => {
  return requireAuth(context, ({ session }) => {
    return {
      props: { session },
    };
  });
};

export default ProjectDetailsPage;
