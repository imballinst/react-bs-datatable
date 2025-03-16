"use strict";(self.webpackChunkreact_bs_datatable=self.webpackChunkreact_bs_datatable||[]).push([[527],{"./src/__stories__/00-Uncontrolled.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{ComposedTable:()=>ComposedTable,CustomCellStyle:()=>CustomCellStyle,CustomLabels:()=>CustomLabels,CustomRowStyleProps:()=>CustomRowStyleProps,CustomTableHeaderProps:()=>CustomTableHeaderProps,FilterSortPagination:()=>FilterSortPagination,MutatingTableState:()=>MutatingTableState,NestedObjectTable:()=>NestedObjectTable,RowOnClick:()=>RowOnClick,__namedExportsOrder:()=>__namedExportsOrder,default:()=>_00_Uncontrolled_stories});var defineProperty=__webpack_require__("./node_modules/@babel/runtime/helpers/esm/defineProperty.js"),Row=(__webpack_require__("./node_modules/react/index.js"),__webpack_require__("./node_modules/react-bootstrap/esm/Row.js")),Col=__webpack_require__("./node_modules/react-bootstrap/esm/Col.js"),Table=__webpack_require__("./node_modules/react-bootstrap/esm/Table.js"),DatatableWrapper=__webpack_require__("./src/components/DatatableWrapper.tsx"),Filter=__webpack_require__("./src/components/Filter.tsx"),PaginationOptions=__webpack_require__("./src/components/PaginationOptions.tsx"),TableBody=__webpack_require__("./src/components/TableBody.tsx"),TableHeader=__webpack_require__("./src/components/TableHeader.tsx"),Pagination=__webpack_require__("./src/components/Pagination.tsx"),parse=__webpack_require__("./node_modules/date-fns/esm/parse/index.js"),story_data=__webpack_require__("./src/__stories__/resources/story-data.json"),hooks=__webpack_require__("./src/helpers/hooks.ts"),jsx_runtime=__webpack_require__("./node_modules/react/jsx-runtime.js");function BulkCheckboxControl(_ref){var rendered,classes=_ref.classes,_useDatatableWrapper=(0,DatatableWrapper.O)(),checkboxStateContext=_useDatatableWrapper.checkboxState,onCheckboxChangeContext=_useDatatableWrapper.onCheckboxChange,filteredDataLengthContext=_useDatatableWrapper.filteredDataLength,previouslyModifiedCheckboxContext=_useDatatableWrapper.previouslyModifiedCheckbox,data=_useDatatableWrapper.data,checkboxState=checkboxStateContext,filteredDataLength=filteredDataLengthContext,previouslyModifiedCheckbox=checkboxState[previouslyModifiedCheckboxContext.current.checkboxProp],onCheckboxChange=onCheckboxChangeContext,state=previouslyModifiedCheckbox?.state,onClick=(0,(0,hooks.v)({checkboxState,data,filteredDataLength,onCheckboxChange}).createBulkCheckboxClickHandler)(),buttonClassName=classes?.selectRemoveAllText||"text-primary p-0 border-0 bg-transparent";if("all-selected"===state)rendered=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:["All ",filteredDataLength," ",pluralize("row",filteredDataLength)," ","selected.",(0,jsx_runtime.jsx)("button",{type:"button",tabIndex:0,onClick,className:buttonClassName,children:"Deselect all rows"})]});else if("some-selected"===state){var selectedSize=previouslyModifiedCheckbox?.selected.size;rendered=(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[selectedSize," ",pluralize("row",selectedSize)," selected."," ",(0,jsx_runtime.jsx)("button",{type:"button",tabIndex:0,onClick,className:buttonClassName,children:"Select all rows"})]})}else rendered=(0,jsx_runtime.jsx)("span",{children:"​"});return(0,jsx_runtime.jsx)("div",{className:void 0===rendered?"invisible":void 0,children:rendered})}function pluralize(word,length){return 1===length?word:"".concat(word,"s")}function ownKeys(e,r){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);r&&(o=o.filter((function(r){return Object.getOwnPropertyDescriptor(e,r).enumerable}))),t.push.apply(t,o)}return t}function _objectSpread(e){for(var r=1;r<arguments.length;r++){var t=null!=arguments[r]?arguments[r]:{};r%2?ownKeys(Object(t),!0).forEach((function(r){(0,defineProperty.Z)(e,r,t[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ownKeys(Object(t)).forEach((function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(t,r))}))}return e}function FilterSortPaginationStoryComponent(_ref){var sortProps=_ref.sortProps,_ref$paginationRange=_ref.paginationRange,paginationRange=void 0===_ref$paginationRange?3:_ref$paginationRange,_ref$rowsPerPage=_ref.rowsPerPage,rowsPerPage=void 0===_ref$rowsPerPage?10:_ref$rowsPerPage,_ref$rowsPerPageOptio=_ref.rowsPerPageOption,rowsPerPageOption=void 0===_ref$rowsPerPageOptio?[5,10,15,20]:_ref$rowsPerPageOptio,alwaysShowPagination=_ref.alwaysShowPagination,headers=_ref.customHeaders??[{prop:"name",title:"Name",isSortable:!0,isFilterable:!0},{prop:"username",title:"Username",isSortable:!0,isFilterable:!0},{prop:"location",title:"Location"},{prop:"date",title:"Last Update",isSortable:!0,isFilterable:!0},{prop:"score",title:"Score",isSortable:!0,isFilterable:!0},{prop:"checkbox",checkbox:{idProp:"name",className:"table-checkbox"},alignment:{horizontal:"center"}}];return(0,jsx_runtime.jsxs)(DatatableWrapper.s,{body:story_data,headers,sortProps:_objectSpread({sortValueObj:{date:function date(_date){return(0,parse.Z)("".concat(_date),"MMMM dd, yyyy",new Date).getTime()}}},sortProps),paginationOptionsProps:{initialState:{rowsPerPage,options:rowsPerPageOption}},children:[(0,jsx_runtime.jsxs)(Row.Z,{className:"mb-4",children:[(0,jsx_runtime.jsx)(Col.Z,{xs:12,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Filter.w,{})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0",children:(0,jsx_runtime.jsx)(PaginationOptions.c,{alwaysShowPagination})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Pagination.t,{alwaysShowPagination,paginationRange})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,className:"mt-2",children:(0,jsx_runtime.jsx)(BulkCheckboxControl,{})})]}),(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})]})}function CustomLabelsStoryComponent(_ref){var filterPlaceholder=_ref.filterPlaceholder,afterSelect=_ref.afterSelect,beforeSelect=_ref.beforeSelect,firstPage=_ref.firstPage,lastPage=_ref.lastPage,nextPage=_ref.nextPage,prevPage=_ref.prevPage;return(0,jsx_runtime.jsxs)(DatatableWrapper.s,{body:story_data,headers:[{prop:"name",title:"Name",isSortable:!0,isFilterable:!0},{prop:"username",title:"Username",isSortable:!0,isFilterable:!0},{prop:"location",title:"Location"},{prop:"date",title:"Last Update",isSortable:!0,isFilterable:!0},{prop:"score",title:"Score",isSortable:!0,isFilterable:!0},{prop:"checkbox",checkbox:{idProp:"name",className:"table-checkbox"},alignment:{horizontal:"center"}}],sortProps:{sortValueObj:{date:function date(_date){return(0,parse.Z)("".concat(_date),"MMMM dd, yyyy",new Date).getTime()}}},paginationOptionsProps:{initialState:{rowsPerPage:10,options:[5,10,15,20]}},children:[(0,jsx_runtime.jsxs)(Row.Z,{className:"mb-4",children:[(0,jsx_runtime.jsx)(Col.Z,{xs:12,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Filter.w,{placeholder:filterPlaceholder})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0",children:(0,jsx_runtime.jsx)(PaginationOptions.c,{alwaysShowPagination:!0,labels:{afterSelect,beforeSelect}})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Pagination.t,{alwaysShowPagination:!0,paginationRange:3,labels:{firstPage,lastPage,nextPage,prevPage}})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,className:"mt-2",children:(0,jsx_runtime.jsx)(BulkCheckboxControl,{})})]}),(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})]})}function CustomCellStyleStoryComponent(_ref){var scoreCellColumnColor=_ref.scoreCellColumnColor,headers=[{prop:"name",title:"Name"},{prop:"username",title:"Username"},{prop:"location",title:"Location"},{prop:"date",title:"Last Update"},{prop:"score",title:"Score",cellProps:{style:function style(row){return{background:row.score>=50?"unset":scoreCellColumnColor}}}}];return(0,jsx_runtime.jsx)(DatatableWrapper.s,{body:story_data,headers,children:(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})})}function CustomRowStyleStoryComponent(){return(0,jsx_runtime.jsx)(DatatableWrapper.s,{body:story_data,headers:[{prop:"name",title:"Name"},{prop:"username",title:"Username"},{prop:"location",title:"Location"},{prop:"date",title:"Last Update"},{prop:"score",title:"Score"}],children:(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{rowProps:function rowProps(row){return{style:{background:"rgba(128, 0, 0, ".concat(row.score/200,")")}}}})]})})}function CustomTableHeaderPropsStoryComponent(_ref){var headers=[{prop:"name",title:"Name"},{prop:"username",title:"Username"},{prop:"location",title:"Location"},{prop:"date",title:"Last Update"},{prop:"score",title:"Score",thProps:{className:_ref.thClassName}}];return(0,jsx_runtime.jsx)(DatatableWrapper.s,{body:story_data,headers,children:(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})})}function RowOnClickStoryComponent(_ref){var rowOnClickText=_ref.rowOnClickText,rowOnClickFn=_ref.rowOnClickFn,validRowClickTagNames=_ref.validRowClickTagNames,headers=_ref.customHeaders??[{prop:"name",title:"Name"},{prop:"username",title:"Username"},{prop:"location",title:"Location"},{prop:"date",title:"Last Update"},{prop:"score",title:"Score"}];return(0,jsx_runtime.jsx)(DatatableWrapper.s,{body:story_data,headers,children:(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{validRowClickTagNames,onRowClick:function onRowClick(row,event){rowOnClickFn?.(row,event),alert("Clicked row containing name ".concat(row.name,".\n\nYou inputted the text: ").concat(rowOnClickText,". Clicked on element: ").concat(event.target.tagName,"."))}})]})})}function MutatingTableStateStoryComponent(){return(0,jsx_runtime.jsxs)(DatatableWrapper.s,{body:story_data,headers:[{prop:"name",title:"Name",isSortable:!0},{prop:"username",title:"Username",isSortable:!0},{prop:"location",title:"Location"},{prop:"date",title:"Last Update"},{prop:"score",title:"Score"}],children:[(0,jsx_runtime.jsx)(Row.Z,{children:(0,jsx_runtime.jsx)(Col.Z,{xs:12,children:(0,jsx_runtime.jsx)(TableController,{})})}),(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})]})}function TableController(){var _useDatatableWrapper=(0,DatatableWrapper.O)(),onSortByPropChange=_useDatatableWrapper.onSortByPropChange,sortState=_useDatatableWrapper.sortState;return(0,jsx_runtime.jsxs)("div",{children:[(0,jsx_runtime.jsx)("label",{children:"Sort state"}),(0,jsx_runtime.jsx)("pre",{children:JSON.stringify(sortState)}),(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return onSortByPropChange("name")},children:"External sort by name"}),(0,jsx_runtime.jsx)("button",{onClick:function onClick(){return onSortByPropChange("username")},children:"External sort by username"})]})}function ComposedTableStoryComponent(_ref){var alwaysShowPagination=_ref.alwaysShowPagination,onCheckboxChange=_ref.onCheckboxChange,rowOnClickFn=_ref.rowOnClickFn,_ref$data=_ref.data,data=void 0===_ref$data?story_data:_ref$data,headers=[{prop:"name",title:"Name",isSortable:!0,isFilterable:!0},{prop:"username",title:"Username",isSortable:!0,isFilterable:!0},{prop:"location",title:"Location",isFilterable:!0},{prop:"date",title:"Last Update"},{prop:"score",title:"Score",isSortable:!0},{prop:"checkbox",checkbox:{idProp:"name",className:"table-checkbox"},alignment:{horizontal:"center"}}];return(0,jsx_runtime.jsxs)(DatatableWrapper.s,{body:data,headers,checkboxProps:{onCheckboxChange},sortProps:{sortValueObj:{date:function date(_date){return(0,parse.Z)("".concat(_date),"MMMM dd, yyyy",new Date).getTime()}}},paginationOptionsProps:{initialState:{rowsPerPage:8,options:[8,16,24,32]}},children:[(0,jsx_runtime.jsxs)(Row.Z,{className:"mb-4",children:[(0,jsx_runtime.jsx)(Col.Z,{xs:12,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Filter.w,{})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-lg-center align-items-center justify-content-sm-start mb-2 mb-sm-0",children:(0,jsx_runtime.jsx)(PaginationOptions.c,{alwaysShowPagination})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,sm:6,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Pagination.t,{alwaysShowPagination,paginationRange:3})}),(0,jsx_runtime.jsx)(Col.Z,{xs:12,className:"mt-2",children:(0,jsx_runtime.jsx)(BulkCheckboxControl,{})})]}),(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{children:function children(rows){return 0===rows.length?(0,jsx_runtime.jsx)(TableBody.Pc,{}):rows.map((function(rowData,rowIdx){return"unknown"===rowData.status?(0,jsx_runtime.jsx)("tr",{children:(0,jsx_runtime.jsx)("td",{colSpan:headers.length,children:"Row status unknown"})},rowData.username):(0,jsx_runtime.jsx)(TableBody.SC,{rowData,rowIdx,onRowClick:function onRowClick(row,event){alert("Clicked row containing name ".concat(row.name,".")),rowOnClickFn?.(row,event)}},rowData.username)}))}})]}),(0,jsx_runtime.jsx)(Row.Z,{children:(0,jsx_runtime.jsx)(Col.Z,{xs:12,children:(0,jsx_runtime.jsx)(StrayResetSelectionButton,{})})})]})}function StrayResetSelectionButton(){var createBulkCheckboxClickHandler=(0,hooks.v)().createBulkCheckboxClickHandler;return(0,jsx_runtime.jsxs)(jsx_runtime.Fragment,{children:[(0,jsx_runtime.jsx)("button",{onClick:createBulkCheckboxClickHandler("add",{checkboxProp:"checkbox",idProp:"name"}),children:"Add all to selection"}),(0,jsx_runtime.jsx)("button",{onClick:createBulkCheckboxClickHandler("remove",{checkboxProp:"checkbox",idProp:"name"}),children:"Reset selection"})]})}BulkCheckboxControl.displayName="BulkCheckboxControl",FilterSortPaginationStoryComponent.displayName="FilterSortPaginationStoryComponent",CustomLabelsStoryComponent.displayName="CustomLabelsStoryComponent",CustomCellStyleStoryComponent.displayName="CustomCellStyleStoryComponent",CustomRowStyleStoryComponent.displayName="CustomRowStyleStoryComponent",CustomTableHeaderPropsStoryComponent.displayName="CustomTableHeaderPropsStoryComponent",RowOnClickStoryComponent.displayName="RowOnClickStoryComponent",MutatingTableStateStoryComponent.displayName="MutatingTableStateStoryComponent",TableController.displayName="TableController",ComposedTableStoryComponent.displayName="ComposedTableStoryComponent";const nested_story_data_namespaceObject=JSON.parse('[{"name":"Aaren","username":"aaren-50","date":"January 28, 2022","score":69,"location":"Saturn","status":"Active","rocket":{"name":"Saturn V","company":"NASA","engine":{"name":"F-1","company":"NASA"}}},{"name":"Adriana","username":"adriana-3","date":"February 04, 2022","score":97,"location":"Earth","status":"Inactive","rocket":{"name":"Ariane 5","company":"ESA","engine":{"name":"Vulcain","company":"Safran Aircraft Engines"}}},{"name":"Wileen","username":"wileen-55","date":"December 12, 2022","score":68,"location":"Mars","status":"Inactive"}]');function NestedObjectComponent(){return(0,jsx_runtime.jsxs)(DatatableWrapper.s,{body:nested_story_data_namespaceObject,headers:[{prop:"name",title:"Name",isSortable:!0},{title:"Rocket name",prop:"rocket.name",isSortable:!0,isFilterable:!0},{title:"Rocket company",prop:"rocket.company",isSortable:!0,isFilterable:!0},{title:"Rocket engine",prop:"rocket.engine.name",isSortable:!0,isFilterable:!0},{title:"Rocket engine company",prop:"rocket.engine.company",isSortable:!0,isFilterable:!0}],children:[(0,jsx_runtime.jsx)(Row.Z,{className:"mb-4",children:(0,jsx_runtime.jsx)(Col.Z,{xs:12,lg:4,className:"d-flex flex-col justify-content-end align-items-end",children:(0,jsx_runtime.jsx)(Filter.w,{})})}),(0,jsx_runtime.jsxs)(Table.Z,{children:[(0,jsx_runtime.jsx)(TableHeader.x,{}),(0,jsx_runtime.jsx)(TableBody.RM,{})]})]})}NestedObjectComponent.displayName="NestedObjectComponent";const _00_Uncontrolled_stories={title:"Uncontrolled"};var FilterSortPagination=FilterSortPaginationStoryComponent.bind({});FilterSortPagination.storyName="Filter, sort, pagination, checkbox",FilterSortPagination.parameters={docs:{source:"helloworld"}};var CustomLabels=CustomLabelsStoryComponent.bind({});CustomLabels.storyName="Custom labels",CustomLabels.argTypes={filterPlaceholder:{name:"Filter placeholder",type:"string"},afterSelect:{name:"Text after pagination options",type:"string"},beforeSelect:{name:"Text before pagination options",type:"string"},firstPage:{name:"First page label",type:"string"},lastPage:{name:"Last page label",type:"string"},nextPage:{name:"Next page label",type:"string"},prevPage:{name:"Previous page label",type:"string"}},CustomLabels.args={filterPlaceholder:"Filter text...",beforeSelect:"Number of rows shown",firstPage:"<<",lastPage:">>",nextPage:">",prevPage:"<"};var CustomCellStyle=CustomCellStyleStoryComponent.bind({});CustomCellStyle.storyName="Custom cell style",CustomCellStyle.argTypes={scoreCellColumnColor:{name:"Score cell column color if score is lower than 50",type:"string",controls:{type:"color"}}},CustomCellStyle.args={scoreCellColumnColor:"#cf8a8a"};var CustomRowStyleProps=CustomRowStyleStoryComponent.bind({});CustomRowStyleProps.storyName="Custom row props depending depending on score",CustomRowStyleProps.args={rowProps:function rowProps(row){return{style:{background:"rgba(128, 0, 0, ".concat(row.score/200,")")}}}};var CustomTableHeaderProps=CustomTableHeaderPropsStoryComponent.bind({});CustomTableHeaderProps.storyName='Custom "score" table header classname',CustomTableHeaderProps.argTypes={thClassName:{name:'"Score" table header classname',type:"string"}},CustomTableHeaderProps.args={thClassName:"#hello-world"};var RowOnClick=RowOnClickStoryComponent.bind({});RowOnClick.storyName="Adding row on click event",RowOnClick.argTypes={rowOnClickText:{name:"Text shown when row is clicked",type:"string"}},RowOnClick.args={rowOnClickText:"Hello, world"};var MutatingTableState=MutatingTableStateStoryComponent.bind({});MutatingTableState.storyName="Mutating uncontrolled table's state";var ComposedTable=ComposedTableStoryComponent.bind({});ComposedTable.storyName="Composed table";var NestedObjectTable=NestedObjectComponent.bind({});NestedObjectTable.storyName="Nested object table",FilterSortPagination.parameters={...FilterSortPagination.parameters,docs:{...FilterSortPagination.parameters?.docs,source:{originalSource:"FilterSortPaginationStoryComponent",...FilterSortPagination.parameters?.docs?.source}}},CustomLabels.parameters={...CustomLabels.parameters,docs:{...CustomLabels.parameters?.docs,source:{originalSource:"CustomLabelsStoryComponent",...CustomLabels.parameters?.docs?.source}}},CustomCellStyle.parameters={...CustomCellStyle.parameters,docs:{...CustomCellStyle.parameters?.docs,source:{originalSource:"CustomCellStyleStoryComponent",...CustomCellStyle.parameters?.docs?.source}}},CustomRowStyleProps.parameters={...CustomRowStyleProps.parameters,docs:{...CustomRowStyleProps.parameters?.docs,source:{originalSource:"CustomRowStyleStoryComponent",...CustomRowStyleProps.parameters?.docs?.source}}},CustomTableHeaderProps.parameters={...CustomTableHeaderProps.parameters,docs:{...CustomTableHeaderProps.parameters?.docs,source:{originalSource:"CustomTableHeaderPropsStoryComponent",...CustomTableHeaderProps.parameters?.docs?.source}}},RowOnClick.parameters={...RowOnClick.parameters,docs:{...RowOnClick.parameters?.docs,source:{originalSource:"RowOnClickStoryComponent",...RowOnClick.parameters?.docs?.source}}},MutatingTableState.parameters={...MutatingTableState.parameters,docs:{...MutatingTableState.parameters?.docs,source:{originalSource:"MutatingTableStateStoryComponent",...MutatingTableState.parameters?.docs?.source}}},ComposedTable.parameters={...ComposedTable.parameters,docs:{...ComposedTable.parameters?.docs,source:{originalSource:"ComposedTableStoryComponent",...ComposedTable.parameters?.docs?.source}}},NestedObjectTable.parameters={...NestedObjectTable.parameters,docs:{...NestedObjectTable.parameters?.docs,source:{originalSource:"NestedObjectComponent",...NestedObjectTable.parameters?.docs?.source}}};const __namedExportsOrder=["FilterSortPagination","CustomLabels","CustomCellStyle","CustomRowStyleProps","CustomTableHeaderProps","RowOnClick","MutatingTableState","ComposedTable","NestedObjectTable"]}}]);