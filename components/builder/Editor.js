import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import navPlugin from 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';
import { icon, pagesSelect, publishSelect } from './Panels';
import pluginTooltip from 'grapesjs-tooltip';
import pluginCountdown from 'grapesjs-component-countdown';
import modalImage from '../../images/tayler-profile-p-1080.png'
// import symbols from "@silexlabs/grapesjs-symbols"
import exportPlugin from 'grapesjs-plugin-export';
import WelcomeModal from '../global/WelcomeModal';

const Editor = ({
  token,
  id,
  projectEndpoint,
  promptData,
  handleSetEditor,
  pm,
  setPm,
  fetchPromptData
}) => {

  const [pageManager, setPageManager] = useState('');
  const [arrayOfPages, setArrayOfPages] = useState();
  const [pages, setPages] = useState([]);
  const [stateEditor, setEditor] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    const welcomeShown = localStorage.getItem('welcomeShown');
    if (!welcomeShown) {
      setShowWelcome(true);
      localStorage.setItem('welcomeShown', true);
    }
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      plugins: [gsWebpage, gsCustome, gsNewsLetter, navPlugin,gjsForms, pluginTooltip, pluginCountdown, exportPlugin ],
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
      pageManager: {
        pages: [
          
        ],
      },
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '99%',
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

    setEditor(editor)
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
        const pages = JSON.parse(builder_string)
        setArrayOfPages(pages.pages)
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
    setPages(pm.getAll());
    setPm(editor.Pages);
    editor.on('page', () => {
      setPages(pm.getAll());
    });
  
    editor.Panels.addPanel(icon);
    // editor.Panels.addPanel(pagesSelect);
    editor.Panels.addPanel(publishSelect);
 

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
  }, [refresh]);

  async function save() {
    const projectData = stateEditor.getProjectData();
    const sentData = JSON.stringify(projectData);
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
  }
 
  const selectPage = (pageId) => {
    if(pageId =="add-page" )
    { 
      const newPage = pm.add({
        id: `page-${((arrayOfPages.length) + 1)}`, // without an explicit ID, a random one will be created
        styles: `.my-class { color: red }`, // or a JSON of styles
        component: '<div class="my-class">My element</div>', // or a JSON of components
      })

      setArrayOfPages(prevState => [...prevState, {id: 'page-'+((arrayOfPages.length) + 1)}]);
      save()
      setRefresh(!refresh);
      
    }
    return pm.select(pageId);
  };

  useEffect(() => { 
    if(stateEditor ){
      const panelManager = stateEditor.Panels;
      var newButton = panelManager.addButton('pages-select',{
        id: 'myNewButton',
        className: 'someClass',
        command: 'someCommand',
        attributes: { title: 'Some title'},
        active: false,
      });
      if(arrayOfPages){
        const data = arrayOfPages;
        stateEditor.Panels.addPanel({
          id: 'pages-select',
          visible: true,
          buttons: [
            {
              id: 'visibility',
              label: `
                <select ${(onchange = (e) => { selectPage(e.target.value);
                })} class=" bg-transparent pages-select font-family-league-spartan" name="pages" id="pages">
                  ${arrayOfPages.map((page) => { return `<option value=${page.id}> ${ page.id} </option> 
                  <button>--</button>
                      `;}).join('')}
                    <option value="add-page" class="add-page-option">Add Page</option>
                    </select> `,
            },
          ],
        });
      }
    }
  }, [stateEditor, arrayOfPages])

  return (
 <div>
  {showWelcome ? 
   <WelcomeModal
   setShowWelcome={setShowWelcome}
   fetchPromptData={fetchPromptData}
   /> : ""}
      
 
<div id='gjs'> </div>

</div>)
}
export default Editor;
