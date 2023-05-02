import styles from "./Content.module.css";
import dynamic from "next/dynamic";
import { useDebounce } from "../../helpers/util";

const Ace  = dynamic(
  async () => {
    const ace = await import('react-ace');
    await import('ace-builds/src-noconflict/mode-javascript');
    await import('ace-builds/src-noconflict/mode-html');
    await import ("ace-builds/src-noconflict/mode-css");
    await import ("ace-builds/src-noconflict/theme-monokai");
    return ace;
  },
  {

    ssr: false,
  },
);


export const Content = ({ mode, title, Content, Editor }) => {
  return (
    <div className={styles.editorContainer}>
      {/* {console.log(stateEditor)} */}
      <div className={styles.editorTitle}>{title}</div>
      <Ace
        mode={mode}
        theme="monokai"
        name={title}
        fontSize={14}
        value={Content}
        onChange={(val) => Editor.setComponents(val)}        
        width={"100%"}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        tabSize={2}
        setOptions={{
          enableBasicAutocompletion: false,
          enableLiveAutocompletion: false,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};




