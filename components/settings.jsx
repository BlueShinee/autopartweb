"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { liveServerSwitch, errLogs } from './execute';
import AudioPlay from './AudioPlay';
import { saveAsNewProject, restoreSavedProject, loadSavedProjectList } from './localStorage'
import { FindReplaceWindow } from './FindAndReplace'
import DownloadZip from './DownloadFiles';

const versionCode = '1.0.7'

function setOpenMenu(open){
  if(open){
    document.getElementsByClassName('mainPopup')[0].classList.add('mainPopup-active')
  }else{
    document.getElementsByClassName('mainPopup')[0].classList.remove('mainPopup-active')
  }
  AudioPlay('/media/zippo_close.mp3')
}

let number = 0
function textUpdateScroll_1(text, mainClass, textClass, textTag){
    if(!text){ text = number; number++ }
    document.getElementsByClassName(textClass)[1].innerHTML = text
    document.getElementsByClassName(textClass)[0].classList.add("scroll-text--hide")
    document.getElementsByClassName(textClass)[1].classList.add("scroll-text--active")
    setTimeout(() => {
        document.getElementsByClassName(mainClass)[0].innerHTML = `
        <${textTag} class="${textClass}">${text}</${textTag}>
         <${textTag} class="${textClass}"></${textTag}>`
    }, 400)
}

function openMenuWindow(tab){
    const tabs = document.getElementsByClassName("menuContainBoxItem")
    const navs = document.querySelectorAll(".menuContainNavigation h3")
    for(var i=0; i<tabs.length; i++){
        tabs[i].style.display = "none"
        navs[i].classList.remove("activeh3")
    }
    tabs[tab].style.display = "block"
    navs[tab].classList.add("activeh3")
    AudioPlay('/media/click_sound.mp3')
    return
}
function Settings() {
  const [blackBoxState, setBlackBoxState] = useState(false);
  const [iframeScale, setIframeScale] = useState(1.2);
  const [iconNumber, setIconNumber] = useState("/media/project_icons/1.png");

  errLogs('Settings rendered')

  const selectOptionStyleCustom = {
    backgroundColor: 'black'
  }

  function findAndReplace() {}

  function tryNodeModule() {}

  const openBlackBoxChat = useCallback(() => {
    AudioPlay('/media/danganronpa_select.mp3');
    setBlackBoxState((prevState) => {
      const newState = !prevState

      if (newState) {
        document.getElementsByClassName("webview")[0].style.display = "none";
        document.getElementsByClassName("webview")[1].style.display = "flex";
        textUpdateScroll_1("BlackBox Ai", 'scroll-text-box', 'scroll-text', 'a')
      } else {
        document.getElementsByClassName("webview")[1].style.display = "none";
        document.getElementsByClassName("webview")[0].style.display = "flex";
        textUpdateScroll_1("Web Viewer", 'scroll-text-box', 'scroll-text', 'a')
      }

      return newState;
    });
  }, [])

  const iframeScaleChange = (event) => {
    const value = event.target.value
    const size = 100 + value * 10
    const scale = 100 / size
    setIframeScale(scale)
    const frame = document.getElementsByClassName("webview")[0]
    frame.style.transform = `scale(${scale})`
    frame.style.width = size+"%"
    frame.style.height = size+"%"
    return
  }
  function changeVisibleIcon(event){
    setIconNumber("/media/project_icons/"+event.target.value+".png")
  }

  const menuWindows = useMemo(() => (
    <>
      {/* Extensions Menu */}
      <div key="0" className="menuContainBoxItem" style={{ display: 'block' }}>
        <div id="blackboxaibbutton1" onClick={openBlackBoxChat} className="webview-tools-bar-item-ext" style={{ marginRight: '5px', backgroundColor: blackBoxState ? '#0025ca' : '' }}>
          <img id="blackboxaiimage1" src="https://www.blackbox.ai/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FBlackbox-Logo-4x.85cc4976.png&w=256&q=75" style={{ height: '40px', padding: '5px', filter: blackBoxState ? 'invert(0)' : 'invert(0)' }} alt="Blackbox AI Logo" />
        </div>
        <div className="webview-tools-bar-item-ext">
          <a>Live Server
            <p>Live reload feature for static & dynamic pages</p>
          </a>
          <label className="switch">
            <input type="checkbox" id="liveserveronoffinput" onInput={liveServerSwitch} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="webview-tools-bar-item-ext">
          <a>Auto Save
            <p>Automatically saves your code changes in real-time</p>
          </a>
          <label className="switch">
            <input type="checkbox" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="webview-tools-bar-item-ext">
          <a>Sound Effects
            <p>Mute or activate clicking sound effects</p>
          </a>
          <label className="switch">
            <input type="checkbox" onInput={() => AudioPlay('change')} />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="webview-tools-bar-item-ext">
          <a>Web Viewer Scale
            <p>Change scale of output iframe</p>
          </a>
          <b style={{ margin: '10px' }}>{Math.round(iframeScale * 100)}%</b>
          <label className="switch2">
            <input type="range" min="0" max="5" className="slider2" onChange={iframeScaleChange} />
          </label>
        </div>
      </div>
  
      {/* Save Menu */}
      <div key="1" className="menuContainBoxItem">
          Save Changes
          <div className="webview-tools-bar-item-ext">
              <i className="fa fa-code"></i>
              <a id="saveChangesSection">No Project Selected</a>
              <button onClick={() => {saveAsNewProject(document.getElementById("saveChangesSection").innerText)}}>Save Changes</button>
          </div>
          <br />
          Save As (localStorage)
          <div className="webview-tools-bar-item-ext">
            <img src={iconNumber} id="saveAsNewIconPreview" alt="Save As Icon" />
            <a style={{ display: 'flex', flexDirection: 'row' }}>
              <input
                className="saveAsNameInput"
                id="saveAsNameSelect-newname"
                type="text"
                placeholder="Project Name"
              />
              <select
              onInput={changeVisibleIcon}
                className="saveAsNameSelect"
                id="saveAsNameSelect-newicon"
              >
                <option value="1" style={selectOptionStyleCustom}>icon&hellip;</option>
                <option value="1" style={selectOptionStyleCustom}>1 html</option>
                <option value="2" style={selectOptionStyleCustom}>2 html</option>
                <option value="3" style={selectOptionStyleCustom}>3 html</option>
                <option value="4" style={selectOptionStyleCustom}>1 css</option>
                <option value="5" style={selectOptionStyleCustom}>2 css</option>
                <option value="6" style={selectOptionStyleCustom}>3 css</option>
                <option value="7" style={selectOptionStyleCustom}>1 js</option>
                <option value="8" style={selectOptionStyleCustom}>2 js</option>
                <option value="9" style={selectOptionStyleCustom}>3 js</option>
              </select>
            </a>
            <button onClick={() => saveAsNewProject(document.getElementById('saveAsNameSelect-newname').value, document.getElementById('saveAsNameSelect-newicon').value)}>Save</button>
          </div>
          <br />
          Download As Zip
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.747)' }}>
            Download files as zip into your device
          </p>
          <div className="webview-tools-bar-item-ext" onClick={() => DownloadZip()}>
            <i className="fa fa-download"></i>
            <a id="saveAsNameSelect-newname-forzip">Evelocore-Editor.zip</a>
          </div>
          <br />
          Draft
          <p style={{ fontSize: '12px', color: 'rgba(255, 255, 255, 0.747)' }}>
            This option doesn't save by name. Only save and recover
          </p>
          <div className="webview-tools-bar-item-ext" onClick={() => DownloadZip()}>
            <i className="fa fa-save"></i>
            <a>Save</a>
          </div>
          <div className="webview-tools-bar-item-ext" onClick={() => restoreSavedProject()}>
            <i className="fa fa-history"></i>
            <a>Recover</a>
          </div>
          <br />
      </div>
  
      {/* Open Project Menu */}
      <div key="2" className="menuContainBoxItem">
          <div className="webview-tools-bar-item-ext">
            <img
              src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png"
              alt="Project Icon"
            />
            <a>Project_2
              <p>Saved in your local storage</p>
            </a>
          </div>
      </div>
  
      {/* Find & Replace Menu */}
      <div key="3" className="menuContainBoxItem">
          <FindReplaceWindow/>
      </div>
  
      {/* Node Modules Menu */}
      <div key="4" className="menuContainBoxItem">
          <div className="webview-tools-bar-item-ext">
            <img src="/media/project_icons/npm.png" alt="NPM Icon" />
            <a>
              <input
                className="saveAsNameInput"
                id="packageNameInput"
                name="npmName"
                type="text"
                placeholder="Package Name"
              />
            </a>
            <button onClick={() => tryNodeModule()}>npm install</button>
          </div>
          <br />
          Added modules
          <div id="addedNodeModules"></div>
      </div>
  
      {/* Developer Menu */}
      <div key="5" className="menuContainBoxItem">
          <div className="xiframe-container">
            <iframe src="credit.html"  title="Credit"></iframe>
          </div>
      </div>
  
      {/* Changelog Menu */}
      <div key="6" className="menuContainBoxItem">
          <div className="webview-tools-bar-item-ext">
            <a>{versionCode}
              <p>Download As Zip</p>
              <ul>
                <li>Project-Name.zip</li>
                <ul>
                  <li>index.html</li>
                  <li>style.css</li>
                  <li>script.js</li>
                </ul>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.5
              <p>Find and replace</p>
              <ul>
                <li>You can find a value and replace it with a new value</li>
                <li>Aa - code = code - CODE = CODE</li>
                <li>aa - code = code, Code, CODE...</li>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.4
              <p>Node modules</p>
              <ul>
                <li>Add node-modules using jsdelivr</li>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.3
              <p>Saving your projects</p>
              <ul>
                <li>Save as project option (With icon)</li>
                <li>Open saved project</li>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.2
              <p>iframe scale changer is the best</p>
              <ul>
                <li>New Settings UI</li>
                <li>New Loading animation</li>
                <li>Download files</li>
                <li>iframe pixel scale changer</li>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.1
              <p>Second Update</p>
              <ul>
                <li>BlackBox Ai</li>
                <li>Auto Save</li>
                <li>Live server</li>
                <li>iframe resize</li>
                <li>Console Output</li>
              </ul>
            </a>
          </div>
          <div className="webview-tools-bar-item-ext">
            <a>1.0.0
              <p>Started Version</p>
              <ul>
                <li>Start with Monaco Editor</li>
                <li>Auto complete tags</li>
                <li>Save and Restore</li>
              </ul>
            </a>
          </div>
          <br />
      </div>
    </>
  ))
  

  const menuNavigations = (
    <div className="menuContainNavigation">
      <h3 onClick={() => openMenuWindow(0)} className='activeh3'><i className="fa fa-puzzle-piece"></i>Extensions</h3>
      <h3 onClick={() => openMenuWindow(1)} className=''><i className="fa fa-save"></i>Save</h3>
      <h3 onClick={() => {openMenuWindow(2); loadSavedProjectList()}} className=''><i className="fa fa-folder"></i>Open Project</h3>
      <h3 onClick={() => openMenuWindow(3)} className=''><i className="fa fa-search"></i>Find & Replace</h3>
      <h3 onClick={() => openMenuWindow(4)} className=''><i className="fab fa-node-js"></i>Node Modules</h3>
      <h3 onClick={() => openMenuWindow(5)} className=''><i className="fa fa-heart"></i>Developer</h3>
      <h3 onClick={() => openMenuWindow(6)} className=''><i className="fa fa-history"></i>Changelog</h3>
    </div>
  )

  return (
    <div className="popupWindow">
      <h2 className="view-in-desktop" style={{ whiteSpace: 'nowrap' }}>
        System Settings&nbsp;|&nbsp;<i>evelocore editor {versionCode}</i>
        <b onClick={() => setOpenMenu(false)} >&times;</b>
      </h2>
      <h2 className="view-in-mobile" style={{ whiteSpace: 'nowrap' }}>
        Settings&nbsp;|&nbsp;<i>ec editor {versionCode}</i>
        <b onClick={() => setOpenMenu(false)} >&times;</b>
      </h2>
      <hr /><br />
      <div className="menuContainer">
        {menuNavigations}
        <div className="menuContainBox">
          {menuWindows}
        </div>
      </div>
    </div>
  );
}

export {Settings, setOpenMenu}