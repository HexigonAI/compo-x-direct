import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import NavBar from '@/components/global/NavBar';
import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const SingleProjectPage = ({ project, token, user }) => {
  const router = useRouter();
  const [editor, setEditor] = useState("");
  const { projectpage } = router.query;
  const projectEndpoint = `https://compo.directus.app/items/projects/${project.id}`;
  
  useEffect(() => {
    
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      plugins: [gsWebpage, gsCustome, gsNewsLetter],
      storageManager: {
        id: 'gjs-',
        type: 'remote',
        options: {
          remote: {
            urlLoad: projectEndpoint,
            urlStore: projectEndpoint,
            fetchOptions: opts => (opts.method === 'POST' ?  { method: 'PATCH' } : {}),
            onStore: "",
            onLoad: (result) => (result),
          }
        },
        autoload: true,
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '',
          },
          {
            id: 'tablet',
            name: 'Tablet',
            width: '768px',
            widthMedia: '992px',
          },
          {
            id: 'mobilePortrait',
            name: 'Mobile portrait',
            width: '320px',
            widthMedia: '575px',
          },
        ],
      },
      pluginsOpts: {
        gsWebpage: {
           blocksBasicOpts: {
             blocks: ['column1', 'column2', 'column3', 'column3-7', 'text', 'link', 'image', 'video'],
             flexGrid: 1,
           },
           blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
    });
    
     editor.Storage.add('remote', { 
      async load(options = {}) {
        const fetchData = await axios.get(`https://compo.directus.app/items/projects/${project.id}`);
        const builder_data = fetchData.data.data.builder_data;
        const builder_string = builder_data.substring(1, builder_data.length-1);
        return (JSON.parse(builder_string));},
      async store(data) {
        const sentData = JSON.stringify(data)
        try {
          axios.patch(`https://compo.directus.app/items/projects/${project.id}`, {
            "builder_data": `"${sentData}"`
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        } catch (error) {
          console.error('Error:', error.message);
          throw error;
        }
      }
    });

    // Get current project data
    const projectData = editor.getProjectData();
    // ...
    // Load project data
    editor.loadProjectData(projectData);
    setEditor(editor)
  }, []);

  async function save() {
    const projectData = editor.getProjectData();
    const sentData = JSON.stringify(projectData)
        try {
          axios.patch(`https://compo.directus.app/items/projects/${project.id}`, {
            "builder_data": `"${sentData}"`
          }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
          toast("Your Save was Successful");
        } catch (error) {
          console.error('Error:', error.message);
          toast("Error, Save was Not Successful");
          throw error;
        }
      }

  const renderProject = () => {
    if (project && project) {
      return (
        <div>
          <h1>{project.title}</h1>
          <h5>{}</h5>
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
      <NavBar user={user} token={token} />
      <div className="  justify-between px-6 flex bg-slate-600 text-white items-center">
        <div className="flex items-center">
        {renderedProject}
      <Link href={`/servers/${projectpage}`}>
        <button className="ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">Back to Projects</button>
      </Link>
        </div>
      <div className="">
      <button className=" w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        PDF
        </button>
      <button onClick={save} className=" w-20 ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow">
        Save
        </button>
        <ToastContainer />
      </div>
      </div>
      <div id='gjs'></div>
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
