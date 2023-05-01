import styles from "./Content.module.css";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-monokai";

export const Content = ({mode, title}) => (
  <div className={styles.editorContainer  }>
    <div className={styles.editorTitle}>{title}</div>
    <AceEditor
        mode={mode}
        theme="monokai"
        name={title}
        setOptions={{ useWorker: false }}    
      />
  </div>
);
