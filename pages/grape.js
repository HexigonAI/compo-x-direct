import { useEffect, useState } from "react";
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import gsWebpage from "grapesjs-preset-webpage";
import gsNewsLetter from "grapesjs-preset-newsletter"
import gsCustome from "grapesjs-custom-code";
// import gsTap from "grapesjs-tabs";

function grape() {
    const [pluginLoaded, setPluginLoaded] = useState(false);
    const [editor, setEditor] = useState(null);
 useEffect(() => {
   grapesjs.init({
     container: '#gjs',
     height: '100vh',
     width: 'auto',
     plugins: [gsWebpage, gsCustome, gsNewsLetter],
     storageManager: {
       id: 'gjs-',
       type: 'local',
       autosave: true,
       storeComponents: true,
       storeStyles: true,
       storeHtml: true,
       storeCss: true,
     },
     deviceManager: {
       devices:
       [
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
       ]
     },
     pluginsOpts: {
        gsWebpage: {
        //  blocksBasicOpts: {
        //    blocks: ['column1', 'column2', 'column3', 'column3-7', 'text',     'link', 'image', 'video'],
        //    flexGrid: 1,
        //  },
        //  blocks: ['link-block', 'quote', 'text-basic'],
       },
     }
   })
 },[])

 return (
   <div id="gjs"></div>
 );
}
export default grape;