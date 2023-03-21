import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { requireAuth } from '@/helpers/requireAuth';
import { getProjectByID } from '@/queries/queries';

const ProjectDetailsPage = () => {
  const router = useRouter();
  const { projectId } = router.query;

  //fetch some data from a backend with the id of route:
  const { data: projects_by_id, isSuccess } = useQuery(
    'projects',
    async () => await getProjectByID(projectId)
  );
  //render the project
  const renderedProject = () => {
    if (isSuccess && projects_by_id) {
      return <div>{projects_by_id.title}</div>;
    }
  };

  return (
    <>
      {renderedProject()}
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

export default ProjectDetailsPage;
