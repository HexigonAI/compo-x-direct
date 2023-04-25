import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';
import { updateProject } from '@/helpers/setData/updateProject';
import InlineEdit from '@/components/global/InlineEdit';
import Editor from '@/components/builder/Editor';
import WelcomeFooter from '@/components/builder/WelcomeFooter';
import Cookies from 'js-cookie';

const logo = '../../../images/Compo---Logo.svg';

const SingleProjectPage = ({ project, token, user }) => {
  const router = useRouter();
  const [editor, setEditor] = useState('');
  const [currentTitle, setCurrentTitle] = useState(project.title);
  const [responseCss, setResponseCss] = useState();
  const [pm, setPm] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = Cookies.get('hasVisitedBuilderBefore');
    if (!hasVisitedBefore) {
      Cookies.set('hasVisitedBuilderBefore', 'true');
      setShowFooter(true);
    }
  }, []);

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
      console.log(projectData);
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

  const convertCssToJSON = (css) => {
    const regex = /\.([\w-]+)\s*\{([^}]+)\}/g;

    let cssClasses = [];
    let match;

    while ((match = regex.exec(css)) !== null) {
      const className = match[1];
      const styles = match[2]
        .trim()
        .split(';')
        .filter((style) => style.trim() !== '')
        .reduce((acc, style) => {
          const [property, value] = style.trim().split(':');
          acc[property.trim()] = value.trim();
          return acc;
        }, {});

      cssClasses.push({
        class: className,
        styles: styles,
      });
    }
    return cssClasses;
  };

  const fetchPromptData = async (e, promptString) => {
    let htmlWithCss = editor.runCommand('gjs-get-inlined-html');
    e.preventDefault();
    setPromptText('');
    const response = await fetch(
      'https://unlockedx.awunda.com/webhook/compox',
      {
        method: 'POST',
        body: promptString,
      }
    );
    const data = await response.json();
    const html = data.html;
    const css = data.css;
    setResponseCss(css);
    editor.setComponents(htmlWithCss + html);
    editor.setStyle(responseCss + css);
  };

  const addPage = () => {
    const newPage = pm.add({
      id: 'new-page-id', // without an explicit ID, a random one will be created
      styles: `.my-class { color: red }`, // or a JSON of styles
      component: '<div class="my-class">My element</div>', // or a JSON of components
    });
    console.log(newPage);
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
      {/* <NavBar user={user} token={token} /> */}
      <div className='justify-between px-6 flex bg-black text-white items-center'>
      <Link href={'/servers'}>
        <div className='dashabord-logo w-nav-brand pr-8'>
          <img src={logo} width='90' alt='' className='logo' />
        </div>
      </Link>
        <div className='text-xs'>
          <InlineEdit value={currentTitle} setValue={handleUpdateTitle}/>
        </div>
        <div className='w-3/6'>
          <form onSubmit={(e) => fetchPromptData(e, promptText)}>
            <input
              type='text'
              value={promptText}
              placeholder='Enter your prompt...'
              className='w-10/12 h-11 pl-2 text-black text-xl placeholder:italic placeholder:text-indigo-200 border-none rounded-md black focus:border-purple-500 focus:ring-2 focus:ring-purple-500'
              onChange={(e) => setPromptText(e.target.value)}
            />
          </form>
        </div>
        <div className=''>
          <Link href={`/servers/${projectpage}`}>
            <button className='ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
              Back to Projects
            </button>
          </Link>
          <button
            onClick={save}
            className=' w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          >
            Save
          </button>
          <button
            onClick={addPage}
            className=' w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'
          >
            addPage
          </button>
          <ToastContainer />
        </div>
      </div>

      <Editor
        token={token}
        id={project.id}
        projectEndpoint={projectEndpoint}
        handleSetEditor={setEditor}
        pm={pm}
        setPm={setPm}
      />
      {showFooter && <WelcomeFooter/>}
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
