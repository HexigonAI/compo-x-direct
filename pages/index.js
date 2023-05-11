import Head from 'next/head';
import { useEffect, useState } from 'react';

import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import InlineEdit from '@/components/global/InlineEdit';
import Editor from '@/components/builder/Editor';
import WelcomeFooter from '@/components/builder/WelcomeFooter';
import LoadingIcon from '@/components/global/LoadingIcon';
import WelcomeModal from '@/components/global/WelcomeModal';

const saveIcon = '../../../images/save-icon.svg';
const logo = '../../../images/Compo---Logo.svg';

const SingleProjectPage = () => {
  const [editor, setEditor] = useState('');
  const [currentTitle, setCurrentTitle] = useState('Untitled');
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

  const handleUpdateTitle = (newTitle) => {
    setCurrentTitle(newTitle);
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
    //TODO: handle the use case of prompting the API for a new response. I think that the API shuold be used to generate a fleshed out component and the user can adjust it from there manually. But we'll keep this code here for now.
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
  };

  function handleSave() {
    return toast('your save was successful');
  }

  return (
    <>
      <Head>
        <title>{currentTitle}</title>
        <meta
          property='og:project'
          content='editing project'
          key='single project page'
        />
        <script src='https://unpkg.com/grapesjs'></script>
        <script src='https://unpkg.com/@silexlabs/grapesjs-symbols'></script>
      </Head>
      {showWelcome && (
        <WelcomeModal
          fetchPromptData={fetchPromptData}
          setShowWelcome={setShowWelcome}
        />
      )}
      <div className='justify-start px-6 flex bg-black text-white items-center'>
        <div className='dashabord-logo w-nav-brand pr-8'>
          <img src={logo} width='90' alt='' className='logo' />
        </div>
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
          <a
            style={{ cursor: 'pointer', marginLeft: '1rem' }}
            onClick={handleSave}
          >
            <img src={saveIcon} />
          </a>
          <ToastContainer />
        </div>
      </div>
      <Editor handleSetEditor={setEditor} />
      {showFooter && <WelcomeFooter />}
    </>
  );
};

export default SingleProjectPage;
