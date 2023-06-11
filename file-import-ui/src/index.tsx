import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
// import  FileImportComponent  from './fetch';
import FileImportComponent from "../src/App"


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
   {/* <FileImportComponent onFileImport={function (data: any[]): void {
      throw new Error('Function not implemented.');
    } }/> 
    */}
    <FileImportComponent 
    />
    {/* <FileUploader/> */}
  </React.StrictMode>
);

