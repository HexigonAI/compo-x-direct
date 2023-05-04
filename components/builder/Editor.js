import { useEffect, useState } from 'react';
import grapesjs from 'grapesjs';
import gsNewsLetter from 'grapesjs-preset-newsletter';
import axios from 'axios';
import 'grapesjs/dist/css/grapes.min.css';
import exportPlugin from 'grapesjs-plugin-export';
import { Allotment } from 'allotment';
import 'allotment/dist/style.css';
import prettier from 'prettier/standalone';
import htmlParser from 'prettier/parser-html';
import cssParser from 'prettier/parser-postcss';
import { CodeView } from './CodeView';
import getIcons from './EditorIcons';

const Editor = ({
  token,
  id,
  projectEndpoint,
  handleSetResponseCss,
  handleSetEditor,
}) => {
  const [arrayOfPages, setArrayOfPages] = useState();
  const [stateEditor, setEditor] = useState();
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

    getIcons(editor);
  }, []);

  useEffect(() => {
    function removeDefaultCSS(cssString) {
      const defaultCSS = `* { box-sizing: border-box; } body {margin: 0;}`;
      return cssString.replace(defaultCSS, '');
    }
    //watches for updates to the editor
    if (stateEditor) {
      stateEditor.on('update', () => {
        const htmlContent = stateEditor.getHtml();
        const cssString = stateEditor.getCss();
        const cssStringWithoutDefault = removeDefaultCSS(cssString);
        setHtmlContent(format(htmlContent, 'html'));
        setCssContent(format(cssStringWithoutDefault, 'css'));
      });
      //On component mount, populate the codeview with the current html and css of the canvas
      //Lives after the if statement because it will check to see if the editor exists
      const htmlContent = stateEditor.getHtml();
      const cssString = stateEditor.getCss();
      const cssStringWithoutDefault = removeDefaultCSS(cssString);
      setHtmlContent(format(htmlContent, 'html'));
      setCssContent(format(cssStringWithoutDefault, 'css'));
      // const jsContent = stateEditor.getJs();
      // setJsContent(format(jsContent, 'babel'))
    }
  }, [stateEditor, arrayOfPages]);

  const format = (htmlString, type) => {
    const formattedHtml = prettier.format(htmlString, {
      parser: type,
      plugins: [htmlParser, cssParser],
    });
    return formattedHtml;
  };

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
          <CodeView
            title={'HTML'}
            mode={'html'}
            Content={htmlContent}
            handleOnChange={handleHtmlChange}
            Editor={stateEditor}
          />
          <CodeView
            title={'CSS'}
            mode={'css'}
            Content={cssContent}
            handleOnClick={handleCssSave}
            buttonText={'Run'}
            handleOnChange={handleCssChange}
            Editor={stateEditor}
          />
        </Allotment>
      </div>
    </div>
  );
};

export default Editor;
