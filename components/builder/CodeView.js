import styles from './CodeView.module.css';
import dynamic from 'next/dynamic';
import { useDebounce } from '../../helpers/util';

const Ace = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-javascript');
    await import('ace-builds/src-noconflict/mode-html');
    await import('ace-builds/src-noconflict/mode-css');
    await import('ace-builds/src-noconflict/theme-monokai');
    return ace;
  },
  {
    ssr: false,
  }
);

export const CodeView = ({ mode, title, Content, handleOnChange, Editor }) => {
  return (
    <div className={styles.editorContainer}>
      {/* {console.log(stateEditor)} */}
      <div className={styles.editorTitle}>{title}</div>
      <Ace
        mode={mode}
        theme='monokai'
        name={title}
        fontSize={14}
        value={Content}
        onChange={handleOnChange}
        width={'100%'}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        tabSize={2}
        setOptions={{
          // enableBasicAutocompletion: false,
          // enableLiveAutocompletion: false,
          // enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};
