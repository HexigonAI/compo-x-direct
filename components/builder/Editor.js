import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';


import { icon, pagesSelect, publishSelect } from './Panels';

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
  const [arrayOfPages, setArrayOfPages] = useState();
  const [pages, setPages] = useState([]);
  const [stateEditor, setEditor] = useState();

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
        setArrayOfPages(JSON.parse(builder_string))
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
    let trashIcon = editor.Panels.getButton('options','canvas-clear');
    trashIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22" height="22" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M20 9l-1.995 11.346A2 2 0 0116.035 22h-8.07a2 2 0 01-1.97-1.654L4 9M21 6h-5.625M3 6h5.625m0 0V4a2 2 0 012-2h2.75a2 2 0 012 2v2m-6.75 0h6.75" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let viewComponentIcon = editor.Panels.getButton('options',"sw-visibility");
    viewComponentIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 21V3.6a.6.6 0 01.6-.6H21" stroke="white" stroke-width="1.5"></path><path d="M17 21h3.4a.6.6 0 00.6-.6V17M21 7v2M21 12v2M7 21h2M12 21h2" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 4a1 1 0 100-2 1 1 0 000 2zM3 22a1 1 0 100-2 1 1 0 000 2zM21 4a1 1 0 100-2 1 1 0 000 2z" fill="#000000" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let eyeIcon = editor.Panels.getButton('options',"preview");
    eyeIcon.attributes.label = `
    <?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 14a2 2 0 100-4 2 2 0 000 4z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 12c-1.889 2.991-5.282 6-9 6s-7.111-3.009-9-6c2.299-2.842 4.992-6 9-6s6.701 3.158 9 6z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let fullScreenIcon = editor.Panels.getButton('options',"fullscreen");
    fullScreenIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M11 13.6V21H3.6a.6.6 0 01-.6-.6V13h7.4a.6.6 0 01.6.6zM11 21h3M3 13v-3M6 3H3.6a.6.6 0 00-.6.6V6M14 3h-4M21 10v4M18 3h2.4a.6.6 0 01.6.6V6M18 21h2.4a.6.6 0 00.6-.6V18M11 10h3v3" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let codeIcon = editor.Panels.getButton('options',"export-template");
    codeIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M13.5 6L10 18.5M6.5 8.5L3 12l3.5 3.5M17.5 8.5L21 12l-3.5 3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let downloadIcon = editor.Panels.getButton('options',"gjs-open-import-template");
    downloadIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M6 18h12M12 6v8m0 0l3.5-3.5M12 14l-3.5-3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 20.4V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6v16.8a.6.6 0 01-.6.6H3.6a.6.6 0 01-.6-.6z" stroke="white" stroke-width="1.5"></path></svg>`;

    let imageIcon = editor.Panels.getButton('options',"gjs-toggle-images");
    imageIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 16l7-3 4 1.818M16 10a2 2 0 110-4 2 2 0 010 4zM16.879 21.121L19 19m2.121-2.121L19 19m0 0l-2.121-2.121M19 19l2.121 2.121" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M13 21H3.6a.6.6 0 01-.6-.6V3.6a.6.6 0 01.6-.6h16.8a.6.6 0 01.6.6V13" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    
    let undoIcon = editor.Panels.getButton('options', "undo");
    undoIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M4.5 8H15s0 0 0 0 5 0 5 4.706C20 18 15 18 15 18H6.286" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M7.5 11.5L4 8l3.5-3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

    let redoIcon = editor.Panels.getButton('options',"redo");
    redoIcon.attributes.label = `<?xml version="1.0" encoding="UTF-8"?><svg width="22px" height="22px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M19.5 8H9s0 0 0 0-5 0-5 4.706C4 18 9 18 9 18h8.714" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.5 11.5L20 8l-3.5-3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;

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


  useEffect(() => { 
    setTimeout(() => {
      let elementClass = document.getElementsByClassName("gjs-block gjs-one-bg gjs-four-color-h");
      let elementBlockMedia = document.getElementsByClassName("gjs-block__media");
      // let test = elementClass;
      // console.log("isi ",elementClass[0])
      elementClass[0].classList.add("bg-purple-basics");
      elementClass[1].classList.add("bg-purple-basics");
      elementClass[2].classList.add("bg-purple-basics");
      elementClass[3].classList.add("bg-green-extra");
      elementClass[4].classList.add("bg-green-extra");
      elementClass[5].classList.add("bg-green-extra");
      elementBlockMedia[0].classList.add("gjs-block__media-basic");
      elementBlockMedia[1].classList.add("gjs-block__media-basic");
      elementBlockMedia[2].classList.add("gjs-block__media-basic");
      elementBlockMedia[3].classList.add("gjs-block__media-extra");

      elementBlockMedia[0].innerHTML = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M14 11.998C14 9.506 11.683 7 8.857 7H7.143C4.303 7 2 9.238 2 11.998c0 2.378 1.71 4.368 4 4.873a5.3 5.3 0 001.143.124" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11.998c0 2.491 2.317 4.997 5.143 4.997h1.714c2.84 0 5.143-2.237 5.143-4.997 0-2.379-1.71-4.37-4-4.874A5.304 5.304 0 0016.857 7" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
      elementBlockMedia[1].innerHTML = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M10 12H5a1 1 0 01-1-1V7.5a1 1 0 011-1h4a1 1 0 011 1V12zm0 0c0 2.5-1 4-4 5.5M20 12h-5a1 1 0 01-1-1V7.5a1 1 0 011-1h4a1 1 0 011 1V12zm0 0c0 2.5-1 4-4 5.5" stroke="white" stroke-width="1.5" stroke-linecap="round"></path></svg>`;
      elementBlockMedia[2].innerHTML = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" viewBox="0 0 24 24" stroke-width="1.5" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M12 8v8m0-8H8m4 0h4" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M21 13.5V19a2 2 0 01-2 2H5a2 2 0 01-2-2v-5.5m18-3V5a2 2 0 00-2-2H5a2 2 0 00-2 2v5.5M19.5 13.5v-3h3v3h-3zM1.5 13.5v-3h3v3h-3z" stroke="white" stroke-width="1.5" stroke-linejoin="round"></path></svg>`;
      elementBlockMedia[3].innerHTML = `<?xml version="1.0" encoding="UTF-8"?><svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M13.5 6L10 18.5M6.5 8.5L3 12l3.5 3.5M17.5 8.5L21 12l-3.5 3.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>`;
    },3000)

    const selectPage = (pageId) => {
      return pm.select(pageId);
    };

    if(stateEditor ){
      if(arrayOfPages){
      const data = arrayOfPages.pages;
        stateEditor.Panels.addPanel({
          id: 'pages-select',
          visible: true,
          buttons: [
            {
              id: 'visibility',
              label: `
                <select ${(onchange = (e) => {
                  selectPage(e.target.value);
                })} class=" bg-transparent pages-select font-family-league-spartan" name="pages" id="pages">
                  ${data
                    .map((page) => {
                      console.log(pages)
                      return `<option value=${page.id}> ${
                        page.id
                      } </option>`;
                    })
                    .join('')}
                </select> 
              `,
            },
          ],
        });
  }
}
  }, [stateEditor, arrayOfPages])

  return <div id='gjs'></div>;
};

export default Editor;
