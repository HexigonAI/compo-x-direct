import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';

import { icon, pagesSelect, publishSelect } from './Panels';
import { promptButton } from './ModalButton';

const Editor = ({
  token,
  id,
  projectEndpoint,
  promptData,
  handleSetEditor,
  pm,
  setPm
}) => {
  const [pageManager, setPageManager] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState([]);
  const [pages, setPages] = useState([]);


  const addPage = () => {
    const newPage = pm.add({
      id: 'new-page-id', // without an explicit ID, a random one will be created
      styles: `.my-class { color: red }`, // or a JSON of styles
      component: '<div class="my-class">My element</div>', // or a JSON of components
     });
  }

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
      pageManager: true,
      //TODO: needs dynamic page id
      //TODO: need ability to add new page
      pageManager: {
        pages: [
         
        ],
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
      modal: {},
    });

    const projectData = editor.getProjectData();

    editor.loadProjectData(projectData);
    handleSetEditor(editor);

    editor.Storage.add('remote', {
      // Load data from the server
      async load(options = {}) {
        const fetchData = await axios.get(
          `https://compo.directus.app/items/projects/${id}`
        );
        const builder_data = fetchData.data.data.builder_data;
        const builder_string = builder_data.substring(
          1,
          builder_data.length - 1
        );
        return JSON.parse(builder_string);
      },
      // Store data on the server
      async store(data) {
        const sentData = JSON.stringify(data);
        try {
          axios.patch(
            `https://compo.directus.app/items/projects/${id}`,
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

    const pm = editor.Pages;
    console.log(pm)
    const aa = pm.all.models
    console.log(pm.all.models)
    console.log(pm.getAll())
    console.log(pages)
    setPages(pm.getAll());
    setPm(editor.Pages);
    editor.on('page', () => {
      setPages(pm.getAll());
    });

    const selectPage = (pageId) => {
      return pm.select(pageId);
    };
 
    editor.Panels.addPanel(icon);
    editor.Panels.addPanel(pagesSelect);
    editor.Panels.addPanel(publishSelect);
    editor.Panels.addPanel({
      id: 'pages-select',
      visible: true,
      buttons: [
        {
          id: 'visibility',
          label: `
            <select ${(onchange = (e) => {
              selectPage(e.target.value);
            })} class=" bg-transparent pages-select font-family-league-spartan" name="pages" id="pages">
              ${pages
                .map((page) => {
                  console.log(pages)
                  return `<option value=${page.id}> ${
                    page.get('name') || page.id
                  } </option>`;
                })
                .join('')}
            </select>
          `,
        },
      ],
    });
    editor.Panels.addButton('options', promptButton);

    const modal = editor.Modal;
    const modalContent = document.createElement('div');
    const promptMessage = 'Enter your prompt:';
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.style.width = '100%';
    inputField.style.color = 'black';
    inputField.style.fontSize = '2rem';

    editor.Commands.add('prompt-btn-command', {
      run(editor) {
        modal.setTitle('Custom Modal');
        modal.setContent(modalContent);
        modal.setContent(promptMessage);
        modal.setContent(inputField);
        modal.open();
      },
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
  }, []);

  return <div id='gjs'></div>;
};

export default Editor;
