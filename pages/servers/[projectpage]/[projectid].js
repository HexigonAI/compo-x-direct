import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/global/NavBar';
import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';
import { updateProject } from '@/helpers/setData/updateProject';
import InlineEdit from '@/components/global/InlineEdit';
import Editor from '@/components/builder/Editor';
import InputModal from '@/components/global/InputModal';

const SingleProjectPage = ({ project, token, user }) => {
  const router = useRouter();
  const [editor, setEditor] = useState('');
  const [currentTitle, setCurrentTitle] = useState(project.title);
  const [showModal, setShowModal] = useState(false);
  const { projectpage } = router.query;
  const projectEndpoint = `https://compo.directus.app/items/projects/${project.id}`;

  async function save() {
    const projectData = editor.getProjectData();
    const sentData = JSON.stringify(projectData);
    try {
      axios.patch(
        `https://compo.directus.app/items/projects/${project.id}`,
        {
          builder_data: `"${sentData}"`,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast('Your Save was Successful');
    } catch (error) {
      console.error('Error:', error.message);
      toast('Error, Save was Not Successful');
      throw error;
    }
  }

  const handleUpdateTitle = (newTitle) => {
    updateProject(token, project.id, newTitle);
    setCurrentTitle(newTitle);
  };

  const fetchPromptData = async (e, promptString) => {
    let htmlWithCss = editor.runCommand('gjs-get-inlined-html');
    e.preventDefault();
    setShowModal(false);
    const response = await fetch("https://unlockedx.awunda.com/webhook/compox", {
      method: "POST",
      body: promptString,
    });
    const data = await response.json();
    const html = data.html;
    const css = data.css;
    editor.setComponents(htmlWithCss + html);
    editor.setStyle(css);
  };

  return (
    <>
      <Head>
        <title>{project.title}</title>
        <meta
          property='og:project'
          content='editing project'
          key='single project page'
        />
      </Head>
      {showModal && (
        <>
          <div className='modal-container'>
            <InputModal
              closeModal={setShowModal}
              handleSubmit={fetchPromptData}
              isOpen={showModal}
              header={"Enter a Prompt"}
              labelOne={null}
              labelTwo={null}
              buttonText={"Generate Prompt"}
            />
          </div>
        </>
      )}
      <NavBar user={user} token={token} />
      <div className='justify-between px-6 flex bg-black text-white items-center'>
        <div className='flex items-center'>
          <InlineEdit value={currentTitle} setValue={handleUpdateTitle} />
        </div>
        <div className=''>
          <Link href={`/servers/${projectpage}`}>
            <button className='ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
              Back to Projects
            </button>
          </Link>
          <button  onClick={e => setShowModal(true)} className=' w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
            Prompt
          </button>
          <button className=' w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
            PDF
          </button>
          <button
            onClick={save}
            className=' w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          >
            Save
          </button>
          <ToastContainer />
        </div>
      </div>

      <Editor
        token={token}
        id={project.id}
        projectEndpoint={projectEndpoint}
        handleSetEditor={setEditor}
      />
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
    const user = await fetchUser(getCurrentUser, token, {});

    return {
      props: {
        project,
        token,
        user,
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
