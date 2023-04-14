import Head from 'next/head';
import { getSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import grapesjs, { Editor } from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import NavBar from '@/components/global/NavBar';
import { fetchProjectById } from '@/helpers/fetchData/fetchProjectById';
import { getCurrentUser } from '@/queries/Users';
import { fetchUser } from '@/helpers/fetchData/fetchUser';

import 'grapesjs/dist/css/grapes.min.css';
import 'grapesjs/dist/css/grapes.min.css';
import { updateProject } from '@/helpers/setData/updateProject';
import InlineEdit from '@/components/global/InlineEdit';

const SingleProjectPage = ({ project, token, user }) => {
  const router = useRouter();
  const [editor, setEditor] = useState('');
  const [currentTitle, setCurrentTitle] = useState(project.title);

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
            fetchOptions: (opts) =>
              opts.method === 'POST' ? { method: 'PATCH' } : {},
            onStore: '',
            onLoad: (result) => result,
          },
        },
        autoload: true,
        stepsBeforeSave: 3,
        contentTypeJson: true,
        storeComponents: true,
        storeStyles: true,
        storeHtml: true,
        storeCss: true,
      },
      panels: { defaults: null },
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
            blocks: [
              'column1',
              'column2',
              'column3',
              'column3-7',
              'text',
              'link',
              'image',
              'video',
            ],
            flexGrid: 1,
          },
          blocks: ['link-block', 'quote', 'text-basic'],
        },
      },
    });

    editor.Panels.addPanel({
      id: 'icon',
      visible: true,
      buttons: [
        {
          id: 'visibility',
          label: `
                          <svg width="22" height="22" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M16.438 27.9726L23.6402 31.0593V21.5432L16.438 18.457V27.9726Z" fill="url(#paint0_linear_373_8636)"/>
                          <path d="M24.1452 14.8346L17.1919 17.8147L24.078 20.7655L31.0313 17.7854L24.1452 14.8346Z" fill="url(#paint1_linear_373_8636)"/>
                          <path d="M24.5161 21.543V31.0586L31.5754 28.0331C31.662 27.9957 31.7183 27.9103 31.7183 27.8149V18.4564L24.5161 21.543Z" fill="url(#paint2_linear_373_8636)"/>
                          <path d="M0.28125 27.8155C0.28125 27.911 0.336992 27.9969 0.423591 28.0337L7.48292 31.0593V21.5437L0.28125 18.457V27.8155Z" fill="url(#paint3_linear_373_8636)"/>
                          <path d="M7.85389 14.8346L0.968262 17.7859L7.92158 20.7655L14.8077 17.8147L7.85389 14.8346Z" fill="url(#paint4_linear_373_8636)"/>
                          <path d="M8.35986 31.0593L15.5625 27.9726V18.457L8.35986 21.5432V31.0593Z" fill="url(#paint5_linear_373_8636)"/>
                          <path d="M8.35986 14.0283L15.5625 17.1155V7.65698L8.35986 4.57031V14.0283Z" fill="url(#paint6_linear_373_8636)"/>
                          <path d="M16.0903 0.959175C16.0326 0.934425 15.9664 0.934425 15.9081 0.959175L9.0459 3.90038L15.9992 6.88047L22.9515 3.90088L16.0898 0.95968L16.0903 0.959175Z" fill="url(#paint7_linear_373_8636)"/>
                          <path d="M16.438 17.1155L23.6402 14.0283V4.57031L16.438 7.65698V17.1155Z" fill="url(#paint8_linear_373_8636)"/>
                          <defs>
                          <linearGradient id="paint0_linear_373_8636" x1="20.0391" y1="18.457" x2="20.0391" y2="31.0593" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#7976F0"/>
                          <stop offset="1" stop-color="#99B0FF"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_373_8636" x1="21.3909" y1="17.146" x2="26.2951" y2="20.5576" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#B1A3ED"/>
                          <stop offset="1" stop-color="#7C9FFB"/>
                          </linearGradient>
                          <linearGradient id="paint2_linear_373_8636" x1="28.1172" y1="18.4564" x2="28.1172" y2="31.0586" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#14EFE2"/>
                          <stop offset="1" stop-color="#8CD4FD"/>
                          </linearGradient>
                          <linearGradient id="paint3_linear_373_8636" x1="3.88208" y1="18.457" x2="3.88208" y2="31.0593" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#8E65E6"/>
                          <stop offset="1" stop-color="#5E90F0"/>
                          </linearGradient>
                          <linearGradient id="paint4_linear_373_8636" x1="7.88798" y1="14.8346" x2="7.88798" y2="20.7655" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#8E65E6"/>
                          <stop offset="1" stop-color="#5E90F0"/>
                          </linearGradient>
                          <linearGradient id="paint5_linear_373_8636" x1="11.9612" y1="18.457" x2="11.9612" y2="31.0593" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#D1C1FD"/>
                          <stop offset="1" stop-color="#A17FFF"/>
                          </linearGradient>
                          <linearGradient id="paint6_linear_373_8636" x1="11.9612" y1="4.57031" x2="11.9612" y2="17.1155" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#14EFE2"/>
                          <stop offset="1" stop-color="#8CD4FD"/>
                          </linearGradient>
                          <linearGradient id="paint7_linear_373_8636" x1="15.9987" y1="0.940613" x2="15.9987" y2="6.88047" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#8E65E6"/>
                          <stop offset="1" stop-color="#5E90F0"/>
                          </linearGradient>
                          <linearGradient id="paint8_linear_373_8636" x1="20.0391" y1="4.57031" x2="20.0391" y2="17.1155" gradientUnits="userSpaceOnUse">
                          <stop offset="0.294802" stop-color="#DBCFFA"/>
                          <stop offset="0.935447" stop-color="#BEA6FF"/>
                          </linearGradient>
                          </defs>
                          </svg>
                          `,
        },
      ],
    });
    editor.Panels.addPanel({
      id: 'pages-select',
      visible: true,
      buttons: [
        {
          id: 'visibility',
          label: `<select class="pages-select font-family-league-spartan" name="cars" id="cars">
                  <option value="volvo">Pages</option>
                  <option value="saab">Saab</option>
                  <option value="mercedes">Mercedes</option>
                  <option value="audi">Audi</option>
                  </select>`,
        },
      ],
    });

    editor.Panels.addPanel({
      id: 'publish-select-saved',
      visible: true,
      buttons: [
        {
          id: 'text-saved',
          label: `<span class="font-family-league-spartan" style="font-size: 12px;">Saved: 8:02PM</span>`,
        },
        {
          id: 'visibility',
          label: `<select class="pages-select font-family-league-spartan" name="cars" id="cars">
          <option value="volvo">Publish</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
          </select>`,
        },
      ],
    });

    editor.Panels.addButton('options', {
      id: 'prompt-btn',
      label: `
      <svg width="22" height="22" viewBox="0 0 22 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_374_7425)">
      <path d="M11.2798 5.84778C11.4194 6.65247 11.559 7.4578 11.6998 8.26249C11.9352 9.60813 12.1494 10.9576 12.4125 12.2981C12.6582 13.5505 13.4745 14.3468 14.6857 14.5932C16.8283 15.03 18.9928 15.3586 21.1586 15.7735C20.8389 15.8353 20.5205 15.9028 20.2002 15.9581C18.4229 16.2656 16.6463 16.5744 14.8677 16.8741C13.5607 17.0941 12.5733 18.0956 12.3443 19.4451C11.9996 21.4764 11.6516 23.5071 11.3029 25.5378C11.2946 25.5867 11.2676 25.633 11.2251 25.7417C10.9697 24.2758 10.7253 22.8748 10.4815 21.4745C10.3458 20.6968 10.2448 19.9108 10.0679 19.1428C9.82157 18.0705 8.95642 17.0426 7.29109 16.7982C5.37039 16.5165 3.46127 16.1505 1.54765 15.8192C1.47625 15.807 1.40678 15.7806 1.2627 15.7407C3.36607 15.3805 5.3929 15.0229 7.42424 14.689C8.95449 14.4375 9.91549 13.4611 10.1663 11.9283C10.4757 10.0327 10.8231 8.14284 11.1537 6.25045C11.1769 6.11665 11.1949 5.98158 11.2155 5.8465C11.2367 5.8465 11.2579 5.8465 11.2798 5.84714V5.84778Z" fill="#F9FAFD"/>
      <path d="M4.264 14.307C4.10705 13.4238 3.94882 12.5413 3.7938 11.6581C3.67223 10.9654 3.26506 10.5756 2.57422 10.4649C1.73866 10.3311 0.905674 10.1813 0.0720423 10.0372C0.0578911 10.0346 0.0463129 10.0172 0 9.97929C0.463129 9.89889 0.898599 9.82235 1.33407 9.74709C1.77211 9.67119 2.21208 9.60815 2.64691 9.51874C3.38534 9.36694 3.71339 8.96684 3.84268 8.14543C3.97004 7.3356 4.12056 6.52899 4.30517 5.71722C4.37335 6.10059 4.44218 6.48332 4.50907 6.86668C4.59977 7.38899 4.68017 7.91323 4.77923 8.4336C4.89759 9.05368 5.35171 9.43448 6.03354 9.54318C6.87618 9.67762 7.7156 9.83135 8.56338 10.0198C8.42123 10.0481 8.27907 10.0796 8.13563 10.1041C7.39398 10.2314 6.6504 10.3472 5.91068 10.4855C5.18383 10.6212 4.85192 11.0336 4.71555 11.8897C4.58626 12.6982 4.43896 13.5042 4.30002 14.3115C4.2878 14.3102 4.27622 14.3089 4.264 14.3076V14.307Z" fill="#F9FAFD"/>
      <path d="M8.55987 5.71765C8.49554 5.35165 8.43251 4.98565 8.36625 4.61965C8.3193 4.35914 8.28327 4.09606 8.21702 3.84069C8.11861 3.46118 7.85102 3.26114 7.46958 3.19874C6.93891 3.11126 6.40825 3.01992 5.87822 2.92794C5.83191 2.91958 5.78817 2.89514 5.70776 2.86426C6.3124 2.76263 6.87652 2.67001 7.43999 2.57288C7.98288 2.47896 8.20995 2.19272 8.31351 1.50189C8.3804 1.0542 8.45952 0.608439 8.53542 0.162034C8.54185 0.12344 8.56179 0.0867756 8.59267 -6.10352e-05C8.7091 0.654108 8.81073 1.25553 8.92522 1.85438C8.99662 2.22682 9.2269 2.46417 9.60126 2.53621C10.2027 2.65264 10.8067 2.75556 11.4152 2.89835C11.0588 2.96332 10.7031 3.03022 10.3468 3.09261C10.1113 3.13378 9.87271 3.15886 9.63921 3.20775C9.2269 3.29394 8.97539 3.55831 8.89885 3.96612C8.79014 4.54503 8.70331 5.12716 8.60747 5.70864C8.59138 5.71186 8.57595 5.71508 8.55987 5.71829V5.71765Z" fill="#F9FAFD"/>
      </g>
      <defs>
      <clipPath id="clip0_374_7425">
      <rect width="21.1592" height="25.7422" fill="white"/>
      </clipPath>
      </defs>
      </svg>
      `,
    });
    let arrButton = editor.Panels.getPanel('options').attributes.buttons.models;
    let elementPrompt = arrButton[arrButton.length - 1];
    arrButton.splice(arrButton.length - 1, 1);
    arrButton.splice(0, 0, elementPrompt);
    editor.Panels.removePanel('options');
    editor.Panels.addPanel({
      id: 'options',
      visible: true,
      buttons: arrButton,
    });
    let copySettings = editor.Panels.getButton('views', 'open-tm');
    copySettings.attributes.label = 'Settings';
    copySettings.attributes.className = 'button-view-style';
    editor.Panels.removeButton('views', 'open-tm');
    editor.Panels.addButton('views', copySettings);

    let layers = editor.Panels.getButton('views', 'open-layers');
    layers.attributes.label = 'Layers';
    layers.attributes.className = 'button-view-style';
    editor.Panels.removeButton('views', 'open-layers');
    editor.Panels.addButton('views', layers);

    let design = editor.Panels.getButton('views', 'open-sm');
    design.attributes.className = 'button-view-style';
    design.attributes.label = 'Design';

    let blocks = editor.Panels.getButton('views', 'open-blocks');
    blocks.attributes.className = 'button-view-style';
    blocks.attributes.label = 'Blocks';

    editor.Storage.add('remote', {
      async load(options = {}) {
        const fetchData = await axios.get(
          `https://compo.directus.app/items/projects/${project.id}`
        );
        const builder_data = fetchData.data.data.builder_data;
        const builder_string = builder_data.substring(
          1,
          builder_data.length - 1
        );
        return JSON.parse(builder_string);
      },
      async store(data) {
        const sentData = JSON.stringify(data);
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
        } catch (error) {
          console.error('Error:', error.message);
          throw error;
        }
      },
    });

    // Get current project data
    const projectData = editor.getProjectData();
    // ...
    // Load project data
    editor.loadProjectData(projectData);
    setEditor(editor);
  }, []);

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
      <NavBar user={user} token={token} />
      <div className='justify-between px-6 flex bg-black text-white items-center'>
        <div className='flex items-center'>
          <InlineEdit value={currentTitle} setValue={handleUpdateTitle} />
          <Link href={`/servers/${projectpage}`}>
            <button className='ml-6 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow'>
              Back to Projects
            </button>
          </Link>
        </div>
        <div className=''>
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
