import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';
import { updateProject } from '@/helpers/setData/updateProject';
import InlineEdit from '@/components/global/InlineEdit';
import Editor from '@/components/builder/Editor';
import WelcomeFooter from '@/components/builder/WelcomeFooter';
import LoadingIcon from '@/components/global/LoadingIcon';
import WelcomeModal from '@/components/global/WelcomeModal';

const addIcon = '../../../images/add-icon.svg';
const backIcon = '../../../images/back-icon.svg';
const saveIcon = '../../../images/save-icon.svg';
const logo = '../../../images/Compo---Logo.svg';

const SingleProjectPage = ({ project, token, user }) => {
  const router = useRouter();
  const [editor, setEditor] = useState('');
  const [currentTitle, setCurrentTitle] = useState(project.title);
  const [responseCss, setResponseCss] = useState();
  const [pm, setPm] = useState(null);
  const [promptText, setPromptText] = useState('');
  const [showFooter, setShowFooter] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const hasVisitedBefore = Cookies.get('hasVisitedBuilderBefore');
    if (!hasVisitedBefore) {
      Cookies.set('hasVisitedBuilderBefore', 'true');
      setShowFooter(true);
      setShowWelcome(true);
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
    setIsLoading(true);
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
    console.log(data);
    if (!responseCss) {
      setResponseCss({ ...responseCss, css });
      editor.setComponents(htmlWithCss + html);
      editor.setStyle(responseCss + css);
      setIsLoading(false);
    } else {
      setResponseCss((responseCss) => ({
        ...responseCss,
        css: responseCss.css + css,
      }));
      editor.setComponents(htmlWithCss + html);
      editor.setStyle(responseCss.css + css);
      setIsLoading(false);
    }
    console.log('this is the editors CSS object: ', editor.getCss());
    console.log('this is the responseCss state object:', responseCss);
    console.log('this is the responses css:', css);
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
        <script src='https://unpkg.com/grapesjs'></script>
        <script src='https://unpkg.com/@silexlabs/grapesjs-symbols'></script>
      </Head>
      {showWelcome && <WelcomeModal fetchPromptData={fetchPromptData} setShowWelcome={setShowWelcome
      }/>}
      <div className='justify-start px-6 flex bg-black text-white items-center'>
        <Link href={'/servers'}>
          <div className='dashabord-logo w-nav-brand pr-8'>
            <img src={logo} width='90' alt='' className='logo' />
          </div>
        </Link>
        <div className='text-xs'>
          <InlineEdit value={currentTitle} setValue={handleUpdateTitle} />
        </div>
        <div className='w-3/6'>
          <form
            style={{ display: 'flex' }}
            onSubmit={(e) => fetchPromptData(e, promptText)}
          >
            <input
              type='text'
              value={promptText}
              placeholder='Write something like, "Make a hero section for e-commerce"...'
              className='ai-prompt-input'
              onChange={(e) => setPromptText(e.target.value)}
            />
            {isLoading && <LoadingIcon />}
          </form>
        </div>
        <div className='flex'>
          <Link href={`/servers/${projectpage}`}>
            <img src={backIcon} />
          </Link>
          <a style={{ cursor: 'pointer', marginLeft: '1rem' }} onClick={save}>
            <img src={saveIcon} />
          </a>
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
        handleSave={save}
        fetchPromptData={fetchPromptData}
        handleSetResponseCss={setResponseCss}
      />
      {showFooter && <WelcomeFooter />}
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
