import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import exportPlugin from 'grapesjs-plugin-export';
import WelcomeModal from '../global/WelcomeModal';
import {
  icon,
  publishSelect,
  saveBlock,
  trashIconLabel,
  viewComponentsIconLabel,
  eyeIconLabel,
  fullScreenIconLabel,
  codeIconLabel,
  downloadIconLabel,
  imageIconLabel,
  undoIconLabel,
  redoIconLabel,
} from './IconSvgs';
// import ReactDOM from "react-dom";
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import prettier from "prettier/standalone";
import htmlParser from "prettier/parser-html";
import cssParser from "prettier/parser-postcss";
import babelParser from "prettier/parser-babel";
import { CodeView } from './CodeView';
const postcss = require('postcss');

const Editor = ({
  token,
  id,
  projectEndpoint,
  handleSetResponseCss,
  handleSave,
  handleSetEditor,
  pm,
  setPm,
  fetchPromptData,
  save,
}) => {
  const [arrayOfPages, setArrayOfPages] = useState();
  const [pages, setPages] = useState([]);
  const [stateEditor, setEditor] = useState();
  const [refresh, setRefresh] = useState(false);
  const [htmlContent, setHtmlContent] = useState();
  const [cssContent, setCssContent] = useState();
  const [jsContent, setJsContent] = useState();

  useEffect(() => {
    const editor = grapesjs.init({
      container: '#gjs',
      height: '100vh',
      width: 'auto',
      plugins: [gsNewsLetter, exportPlugin],

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
      panels: { defaults: '' },
      pageManager: true,
      pages: [],
      deviceManager: {
        devices: [
          {
            id: 'desktop',
            name: 'Desktop',
            width: '100%',
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
        gsWebpage: {},
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
        console.log(
          'this is the loaded in object from Directus:',
          savedProject
        );
        setArrayOfPages(savedProject.pages);
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
        if (!css) return;
        console.log('inputted css is:', css);
        const rules = parseCss(css);
        console.log('Parsed CSS:', rules);
        console.log(editor.getCss());
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
    // editor.on('update', () =>  console.log("test"));
    editor.Panels.addPanel(icon);
    editor.Panels.addPanel(publishSelect);

    let trashIcon = editor.Panels.getButton('options', 'canvas-clear');
    trashIcon.attributes.label = trashIconLabel;

    let viewComponentIcon = editor.Panels.getButton('options', 'sw-visibility');
    viewComponentIcon.attributes.label = viewComponentsIconLabel;

    let eyeIcon = editor.Panels.getButton('options', 'preview');
    eyeIcon.attributes.label = eyeIconLabel;

    let fullScreenIcon = editor.Panels.getButton('options', 'fullscreen');
    fullScreenIcon.attributes.label = fullScreenIconLabel;

    let codeIcon = editor.Panels.getButton('options', 'export-template');
    codeIcon.attributes.label = codeIconLabel;

    let downloadIcon = editor.Panels.getButton(
      'options',
      'gjs-open-import-template'
    );
    downloadIcon.attributes.label = downloadIconLabel;

    let imageIcon = editor.Panels.getButton('options', 'gjs-toggle-images');
    imageIcon.attributes.label = imageIconLabel;

    let undoIcon = editor.Panels.getButton('options', 'undo');
    undoIcon.attributes.label = undoIconLabel;

    let redoIcon = editor.Panels.getButton('options', 'redo');
    redoIcon.attributes.label = redoIconLabel;

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
  }, [refresh]);

  const selectPage = (pageId) => {
    if (pageId == 'add-page') {
      const newPage = pm.add({
        id: `page-${arrayOfPages.length + 1}`, // without an explicit ID, a random one will be created
        styles: `.my-class { color: red }`, // or a JSON of styles
        component: '<div class="my-class">My element</div>', // or a JSON of components
      });

      setArrayOfPages((prevState) => [
        ...prevState,
        { id: 'page-' + (arrayOfPages.length + 1) },
      ]);
      handleSave();
      setRefresh(!refresh);
    }
    return pm.select(pageId);
  };

  const format = (htmlString, type) => {
    const formattedHtml = prettier.format(htmlString, {
      parser: type,
      plugins: [htmlParser, cssParser],
    });
    return formattedHtml;
  }
  

  useEffect(() => {

    if (stateEditor) {
      stateEditor.on('update', () =>  {
        const htmlContent = stateEditor.getHtml();
        const cssContent = stateEditor.getCss();
        setHtmlContent(format(htmlContent, "html"))
        //this line allows for upstream changes, but not downstream changes
        setCssContent(format(cssContent, "css"))
      });

      const htmlContent = stateEditor.getHtml();
      const cssContent = stateEditor.getCss();
      // const jsContent = stateEditor.getJs();
     
      setHtmlContent(format(htmlContent, "html"))
      setCssContent(format(cssContent, "css"))
      // setJsContent(format(jsContent, 'babel'))
      if (arrayOfPages) {
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
                  ${arrayOfPages
                    .map((page) => {
                      return `<option value=${page.id}> ${page.id} </option> 
                  <button>--</button>
                      `;
                    })
                    .join('')}
                    <option value="add-page" class="add-page-option">Add Page</option>
                    </select> `,
            }]});}
    }
  }, [stateEditor, arrayOfPages]);

  const handleHtmlChange = (val) => {
    return stateEditor.setComponents(val);
  };

  const handleCssChange = (val) => {
    return setCssContent(val);
  };
  
  const handleCssSave = () => {
    return stateEditor.setStyle(cssContent);
  };

  return (
    <div>
      <div id='gjs'> </div>

      <div className='w-full h-80'>
        <Allotment>
          <CodeView title={'HTML'} mode={'html'} Content={htmlContent} handleOnChange={handleHtmlChange} Editor={stateEditor}/>
          <CodeView title={'CSS'} mode={'css'} Content={cssContent} handleOnClick={handleCssSave} buttonText={'Run'} handleOnChange={handleCssChange} Editor={stateEditor}/>
        </Allotment>
      </div>
    </div>
  );
};

export default Editor;
