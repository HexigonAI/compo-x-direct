import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { requireAuth } from '@/helpers/requireAuth';
import { getProjectByID } from '@/queries/collections';
import NavBar from '@/components/NavBar';

const SingleProjectPage = () => {
  const router = useRouter();
  const { projectid } = router.query;

  // fetch some data from a backend with the id of route:
  const { data: projects_by_id, isSuccess } = useQuery(
    'projects',
    async () => await getProjectByID(projectid)
  );
  // render the project
  const renderedProject = () => {
    if (isSuccess && projects_by_id) {
      return (
        <div>
          <h1>{projects_by_id.title}</h1>
          <h5>{projects_by_id.id}</h5>
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
  return requireAuth(context, ({ session }) => {
    return {
      props: { session },
    };
  });
};

export default SingleProjectPage;
