import React, {useState, useRef} from "react";
import Editor from "@monaco-editor/react";
import {errLogs} from './execute'

const myCustomTheme = {
  base: 'vs-dark',
  inherit: true,
  rules: [
    { token: '', foreground: 'cfcfcf', background: '000518' },
    /* { token: 'identifier', foreground: 'a7edff' },
    { token: 'comment', foreground: '6a9955', fontStyle: 'italic' },
    { token: 'keyword', foreground: 'c586c0', fontStyle: 'bold' },
    { token: 'variable', foreground: '9cdcfe' },
    { token: 'variable.language', foreground: '569cd6' },
    { token: 'variable.other', foreground: 'ffb86c' },
    { token: 'string', foreground: 'ce9178' },
    { token: 'number', foreground: 'b5cea8' },
    { token: 'function', foreground: 'dcdcaa' },
    { token: 'type', foreground: '4ec9b0' },
    { token: 'class', foreground: '4ec9b0' },
    { token: 'interface', foreground: 'd4d4d4' },
    { token: 'enum', foreground: '9cdcfe' },
    { token: 'modifier', foreground: '569cd6' },
    { token: 'property', foreground: '9cdcfe' },
    { token: 'namespace', foreground: '9cdcfe' },
    { token: 'tag', foreground: 'ff5555' },
    { token: 'attribute.name', foreground: 'ffb86c' },
    { token: 'attribute.value', foreground: 'f1fa8c' } */
  ],
  colors: {
    'editor.background': '#00051b',//'#1e1e1e',
    //'editor.foreground': '#000729',//'#cfcfcf',
    'editorCursor.foreground': '#aeafad',
    'editor.lineHighlightBackground': '#000849',//'#2a2a2a',
    'editorLineNumber.foreground': '#5a5a5a',
    'editor.selectionBackground': '#264f78',
    'editor.selectionHighlightBackground': '#404040',
    'editor.inactiveSelectionBackground': '#333333',
    'editorIndentGuide.background': '#333333',
    'editorIndentGuide.activeBackground': '#666666',
    'editorWhitespace.foreground': '#3b3b3b',
    'editorBracketMatch.background': '#444444',
    'editorBracketMatch.border': '#707070',

    'scrollbarSlider.background': '#010d41',//'#606060',  // Background color of the scrollbar
    'scrollbarSlider.hoverBackground': '#050b45',//'#707070',  // Background color when hovering over the scrollbar
    'scrollbarSlider.activeBackground': '#070e45',//'#808080',  // Background color when clicking on the scrollbar

    'editorOverviewRuler.background': '#00051b',  // Background color of the overview ruler
  }
}
const editors = [
  {
      id: 'htmlEditor',
      language: 'html',
      filename: 'index.html',
      icon: '1',
      color: '#ff9035',
      value: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t<meta charset="UTF-8">\n\t<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t<link rel="stylesheet" href="./style.css">\n\t<title>Document</title>\n</head>\n<body>\n\t<!-- Your code here -->\n\t<script src="./script.js"></script>\n</body>\n</html>'
  },
  {
      id: 'cssEditor',
      language: 'css',
      filename: 'styles.css',
      icon: '4',
      color: '#4eb8ff',
      value: '* {\n\tmargin: 0;\n\tpadding: 0;\n\tbox-sizing: border-box;\n}'
  },
  {
      id: 'jsEditor',
      language: 'javascript',
      filename: 'script.js',
      icon: '7',
      color: '#ffe600e0',
      value: 'function myFunction() {\n\tconsole.log("Hello world!");\n}\n\nmyFunction()'
  }
]
const _Editors = {};

function getEditorValue(id) {
  const editor = _Editors[id];
  return editor ? editor.getValue() : "";
}

function setEditorValue(id, value) {
  const editor = _Editors[id];
  if (editor) {
    editor.setValue(value);
  }
}

const MonacoEditor = ({ lang, styles, id, value, onChange }) => {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);

  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("myCustomTheme", myCustomTheme);
  };

  const handleEditorDidMount = (editorInstance, monaco) => {
    // Store the editor instance with a unique id
    _Editors[id] = editorInstance;

    // Notify parent component of changes
    editorInstance.onDidChangeModelContent(() => {
      if (onChange) {
        onChange(editorInstance.getValue());
      }
    });

    const resizeObserver = new ResizeObserver(() => {
      editorInstance.layout();
    });

    if (editorContainerRef.current) {
      resizeObserver.observe(editorContainerRef.current);
    }

    // Cleanup on unmount
    return () => {
      if (editorInstance) {
        editorInstance.dispose();
        delete _Editors[id];
      }
      if (editorContainerRef.current) {
        resizeObserver.unobserve(editorContainerRef.current);
      }
    };
  };

  return (
    <div ref={editorContainerRef} style={ styles || { height: "600px", width: "100%" }}>
      <Editor
        height={styles.height}
        defaultLanguage={lang}
        defaultValue={value}
        beforeMount={handleEditorWillMount} // Use beforeMount to define the theme
        onMount={handleEditorDidMount} // onMount to capture the editor instance
        theme="myCustomTheme" // Apply the custom theme here
        id={id}
      />
    </div>
  );

  //return <div ref={containerRef} style={ styles || { height: '600px', width: '100%' }} id={id} onMount={uploadValue}/>;
}


export { MonacoEditor, getEditorValue, setEditorValue, editors }