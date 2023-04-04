import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';

import NavBar from '@/components/global/NavBar';
import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';

const SingleProjectPage = ({ project, token, user }) => {
  const [pluginLoaded, setPluginLoaded] = useState(false);
  const [editor, setEditor] = useState(null);
  useEffect(() => {
    grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      plugins: [gsWebpage, gsCustome, gsNewsLetter],
      storageManager: {
        id: 'gjs-',
        type: 'local',
        autosave: true,
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
          //  blocksBasicOpts: {
          //    blocks: ['column1', 'column2', 'column3', 'column3-7', 'text',     'link', 'image', 'video'],
          //    flexGrid: 1,
          //  },
          //  blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
    });
  }, []);

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
      <NavBar user={user} token={token} />
      {renderedProject}
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
