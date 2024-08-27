import React from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getEditorValue, editors } from './MonacoEditor';

function DownloadZip() {
    const zipName = String(document.getElementById("saveAsNameSelect-newname-forzip").innerText || 'Evelocore-Editor').slice(0, 100).replace(/ |.zip/gi, '')
    
    const zip = new JSZip();

    // Add files to the zip
    /* zip.file("index.html", htmlCode);
    zip.file("styles.css", cssCode);
    zip.file("script.js", jsCode); */

    editors.map((editor, index) => {
        zip.file(editor.filename, getEditorValue(editor.id));
    })

    // Generate the zip file
    zip.generateAsync({ type: "blob" })
        .then((content) => {
            // Save the zip file
            saveAs(content, zipName+".zip");
        });
}

export default DownloadZip;
