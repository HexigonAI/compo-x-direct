//COMMENT: Code for the page manager. This is not currently being used.
//COMMENT: initialize the state.
// const [pages, setPages] = useState([]);
//COMMENT: grab the page manager from the editor.
// const pm = editor.Pages;
// setPages(pm.getAll());
// setPm(editor.Pages);
// editor.on('page', () => {
//   setPages(pm.getAll());
// });
// const selectPage = (pageId) => {
//   if (pageId == 'add-page') {
//     const newPage = pm.add({
//       id: `page-${arrayOfPages.length + 1}`, // without an explicit ID, a random one will be created
//       styles: `.my-class { color: red }`, // or a JSON of styles
//       component: '<div class="my-class">My element</div>', // or a JSON of components
//     });

//     setArrayOfPages((prevState) => [
//       ...prevState,
//       { id: 'page-' + (arrayOfPages.length + 1) },
//     ]);
//     handleSave();
//     setRefresh(!refresh);
//   }
//   return pm.select(pageId);
// };
// COMMENT: This belongs in a useEffect hook
// if (arrayOfPages) {
//   stateEditor.Panels.addPanel({
//     id: 'pages-select',
//     visible: true,
//     buttons: [
//       {
//         id: 'visibility',
//         label: `
//           <select ${(onchange = (e) => {
//             selectPage(e.target.value);
//           })} class=" bg-transparent pages-select font-family-league-spartan" name="pages" id="pages">
//             ${arrayOfPages
//               .map((page) => {
//                 return `<option value=${page.id}> ${page.id} </option>
//             <button>--</button>
//                 `;
//               })
//               .join('')}
//               <option value="add-page" class="add-page-option">Add Page</option>
//               </select> `,
//       },
//     ],
//   });
// }
