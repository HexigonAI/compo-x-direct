import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsWebpage from 'grapesjs-preset-webpage';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import gsCustome from 'grapesjs-custom-code';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import navPlugin from 'grapesjs-navbar';
import gjsForms from 'grapesjs-plugin-forms';
import pluginTooltip from 'grapesjs-tooltip';
import pluginCountdown from 'grapesjs-component-countdown';
// import symbols from "@silexlabs/grapesjs-symbols"
// import tabs from "grapesjs-tabs"
import exportPlugin from 'grapesjs-plugin-export';
import WelcomeModal from '../global/WelcomeModal';
import { icon, publishSelect } from './Panels';
 
const postcss = require('postcss');

const Editor = ({
  token,
  id,
  projectEndpoint,
  handleSetResponseCss,
  handleSetEditor,
  pm,
  setPm,
  fetchPromptData,
  save
}) => {
  const [arrayOfPages, setArrayOfPages] = useState();
  const [pages, setPages] = useState([]);
  const [stateEditor, setEditor] = useState();
  const [refresh, setRefresh] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
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
      plugins: [gsWebpage, gsCustome, gsNewsLetter, navPlugin,gjsForms, pluginTooltip, pluginCountdown, exportPlugin, '@silexlabs/grapesjs-symbols' ],
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
      pages: [
        {
          id: 'page-id',
          styles: `.my-class { color: red }`, // or a JSON of styles
          component: '<div class="my-class">My element</div>', // or a JSON of components
        }
     ],
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
          '@silexlabs/grapesjs-symbols': {
            appendTo: '.gjs-pn-views-container',
          },
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

    setEditor(editor);
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
        const savedProject = JSON.parse(builder_string);
        console.log( [{id: "page-1"}])
        setArrayOfPages(savedProject.pages ? [{id: "page-1"}]: [{id: "page-1"}])
        console.log(
          'this is the loaded in object from Directus:',
          savedProject
        );
        handleSetResponseCss(savedProject.styles);
        return savedProject;
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

    const parseCss = (css) => {
      const result = [];
      // Parse the CSS using PostCSS
      const processedCss = postcss().process(css).css;
      // Convert the processed CSS into an array of rules
      const rules = processedCss
        .split('}')
        .filter((rule) => rule !== '')
        .map((rule) => rule + '}');
      // Process each rule and extract the selectors and style declarations
      rules.forEach((rule) => {
        const selectors = rule.match(/(.+){/);
        const style = rule.match(/{(.*)}/);
        if (selectors && selectors[1] && style && style[1]) {
          const styleDeclarations = style[1]
            .trim()
            .split(';')
            .reduce((acc, decl) => {
              const [prop, value] = decl.split(':');
              if (prop && value) {
                acc[prop.trim()] = value.trim();
              }
              return acc;
            }, {});
          // Add the rule to the result array
          result.push({
            selectors: [selectors[1].trim()],
            style: styleDeclarations,
          });
        }
      });
      return result;
    };
    //Add the css import button to the 'options' panel
    editor.Panels.addButton('options', {
      id: 'parse-css',
      className: 'fa fa-book',
      command: 'parse-css',
      attributes: {
        title: 'Parse CSS',
      },
    });
    //Add the command to the button 'parse-css'
    editor.Commands.add('parse-css', {
      run: (editor) => {
        const css = prompt('Enter CSS');
        console.log('inputted css is:', css);
        const rules = parseCss(css);
        console.log('Parsed CSS:', rules);
        // Apply the parsed rules to the relevant elements
        rules.forEach(({ selectors, style }) => {
          editor.getSelected(selectors);
          editor.setStyle(style);
          console.log('this is the class css is talking to: ', selectors);
          console.log('this is the css being set to the editor: ', style);
        });
        // Refresh the canvas to apply the changes
        editor.runCommand('sw-visibility');
        editor.stopCommand('sw-visibility');
      },
    });

    editor.Panels.addPanel(icon);
    editor.Panels.addPanel(publishSelect);

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
    window.grapesjs = window.GrapesJS = grapesjs;
  }, [refresh]);

  const selectPage = (pageId) => {
    if(pageId =="add-page" )
    { 
      pm.add({
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
      console.log('test1')
      if(arrayOfPages){
        console.log(arrayOfPages)
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
