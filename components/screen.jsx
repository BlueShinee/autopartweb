"use client";

import React, { useState, useEffect, useCallback  } from 'react';
import Image from 'next/image';
import { MonacoEditor, getEditorValue, editors} from './MonacoEditor';
import { Notifications, eveloCoreAlert } from './notifications';
import {Execute, errLogs} from './execute';
import {setOpenMenu} from './settings'
import AudioPlay from './AudioPlay';
import { saveAsNewProject, restoreSavedProject } from './localStorage'
import DownloadZip from './DownloadFiles';

function makeEdtorsElement({ handleEditorChange }) {
    const editorHeight = window.innerHeight * 0.8
    const makeElement = (id, lang, display, value) => {
        return (
            <div className="editor" style={{ display: display }}>
                <MonacoEditor onChange={handleEditorChange} id={id} lang={lang} value={value} styles={{ height: editorHeight+'px', width: '100%' }} />
            </div>
        );
    };

    const makeElements = editors.map((editor, index) => {
        const display = index === 0 ? 'flex' : 'none';
        return makeElement(editor.id, editor.language, display, editor.value);
    })

    return <>{makeElements}</>;
}

function makeFileNamesElement({ displayEditor }) {
    const makeElement = (id, filename, classname, icon, color) => {
        return (
            <div key={id} onClick={() => displayEditor(id)} className={classname} style={{ color: color }}>
                <a style={{display: 'flex', alignItems: 'center'}}>
                    <img src={`/media/project_icons/${icon}.png`} style={{height: '1rem', marginRight: '5px'}}/>
                    {/* <Image
                        src={`/media/project_icons/${icon}.png`}
                        alt=""
                        width={15}
                        height={15}  // Set the height of the imag
                        quality={100}
                        style={{height: '1rem', marginRight: '5px'}}
                    /> */}
                    {filename}
                </a>
            </div>
        );
    };

    const makeElements = editors.map((editor, index) => {
        const classname = index === 0 ? 'file-name file-name-selected' : 'file-name';
        return makeElement(editor.id, editor.filename, classname, editor.icon, editor.color);
    })

    return <>{makeElements}</>;
}

function displayEditor(id) {
    //filenames
    if(id === 'console'){
        for(let i=0; i<editors.length; i++){
            document.getElementsByClassName('editor')[i].style.display = "none"
            document.getElementsByClassName('file-name')[i].classList.remove('file-name-selected')
        }
        document.getElementsByClassName('editor')[editors.length].style.display = "flex"
        document.getElementsByClassName('file-name')[editors.length].classList.add('file-name-selected')
    }else{
        document.getElementsByClassName('editor')[editors.length].style.display = "none"
        document.getElementsByClassName('file-name')[editors.length].classList.remove('file-name-selected')
        for(let i=0; i<editors.length; i++){
            if(editors[i].id == id){
                document.getElementsByClassName('editor')[i].style.display = "flex"
                document.getElementsByClassName('file-name')[i].classList.add('file-name-selected')
            }else{
                document.getElementsByClassName('editor')[i].style.display = "none"
                document.getElementsByClassName('file-name')[i].classList.remove('file-name-selected')
            }
        }
    }
    AudioPlay('/media/zippo_close.mp3')
}

function handleEditorChange(){
    Execute({fromLiveServer: true})
}

function ScreenLeftControls({ setScreenStyle}){
    const [expandedBtn, changeExpandedBtn] = useState("fas fa-expand-arrows-alt")
    const [isVisible, setIsVisible] = useState(false);
    errLogs('ScreenLeftControls rendered')

    function tabsChange(){
      if(expandedBtn === "fas fa-expand-arrows-alt"){
          changeExpandedBtn('fas fa-compress-arrows-alt')
          setScreenStyle({
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            overflow: 'scroll'
          })
          eveloCoreAlert("Advanced Mode",'#cc1','#ffa',3000)
      }else{
          setScreenStyle({
            display: 'grid',
            gridTemplateColumns: '3fr 4fr',
            overflow: 'hidden'
          })
          changeExpandedBtn('fas fa-expand-arrows-alt')
          eveloCoreAlert("Easy Mode",'#cc1','#ffa',3000)
      }
  }

    useEffect(() => {
        const handleScroll = () => {
          const screenElement = document.getElementsByClassName('screen')[0];
          if (window.innerWidth > 1100 && expandedBtn === 'fas fa-compress-arrows-alt') {
            scrollToTop();
          }
          if (document.body.scrollTop > 20 || screenElement.scrollTop > 20) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        };
    
        const screenElement = document.getElementsByClassName('screen')[0];
        screenElement.onscroll = handleScroll;
    
        return () => {
          screenElement.onscroll = null; // Cleanup the event listener on unmount
        };
      }, []);

    function scrollToTop() {
        document.body.scrollTop = 0 // For Safari
        document.getElementsByClassName("screen")[0].scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }

    return (
        <div className="screen-left">
            <button
                onClick={scrollToTop}
                id="scrollTopBtn"
                title="Go to top"
                style={{ display: isVisible ? 'block' : 'none' }}
                >
                <i className='fas fa-arrow-up'></i>
            </button>
            <div className="webview-tools">
                <h3 id="iframeBoxTitle" className="scroll-text-box">
                    <a className="scroll-text">Web Viewer</a>
                    <a className="scroll-text"></a>
                </h3>
                <div className="webview-tools-bar">
                    <div className="webview-tools-bar-item" style={{ backgroundColor: 'transparent' }}>
                        <i onClick={() => tabsChange()} className={expandedBtn}></i>
                    </div>
                    <div className="webview-tools-bar-item" style={{ backgroundColor: 'transparent' }}>
                        <i onClick={() => {saveAsNewProject()}} className="fa fa-save"></i>
                    </div>
                    <div className="webview-tools-bar-item" style={{ backgroundColor: 'transparent' }}>
                        <i onClick={() => {restoreSavedProject()}} className="fas fa-history"></i>
                    </div>
                    <div className="webview-tools-bar-item" style={{ backgroundColor: 'transparent' }}>
                        <i className="fa fa-share-alt"></i>
                    </div>
                    <div className="webview-tools-bar-item" style={{ backgroundColor: 'transparent' }}>
                        <i onClick={() => DownloadZip()} className="fa fa-download"></i>
                    </div>
                    <div class="webview-tools-bar-item" style={{backgroundColor: 'transparent'}}>
                        <img onClick={() => setOpenMenu(true)} src="/media/settings-icon.png" style={{height: 20 + 'px'}} />
                    </div>
                </div>
            </div>
            <div className="web-frame">
                <iframe frameborder="0" width="3000px" className="webview" src="/logo.html"></iframe>
                <iframe frameborder="0" width="3000px" className="webview" style={{ display: 'none' }} src="https://www.blackbox.ai/agent/Evelocoret0Xy1SZ"></iframe>
            </div>
        </div>
    )
}

function ScreenRightControls() {
    errLogs('ScreenRightControls rendered')

    return (
        <div className="screen-right">
            <div className="files-bar">
                <div className="files-manager">
                    {makeFileNamesElement({displayEditor})}
                </div>
                <div onClick={() => displayEditor('console')} className={'file-name file-name-add'}>
                    <a>Console</a>
                </div>
                <div onClick={() => {Execute({fromLiveServer: false})}} className="file-run">
                    <a><i className="fa fa-play"></i>Run</a>
                </div>
            </div>
            {makeEdtorsElement({ handleEditorChange })}
            <div className="editor" style={{ display: 'none' }}>
                <div id="browserConsole" className="console">Console</div>
            </div>
        </div>
    )
}

export { ScreenLeftControls, ScreenRightControls }