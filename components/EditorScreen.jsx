"use client"

import React, { useState, useEffect } from 'react';
import { ScreenLeftControls, ScreenRightControls } from './screen'
import { Notifications, eveloCoreAlert } from './notifications';
import {Settings} from './settings';


function EditorScreen(){
    const [screenStyle, setScreenStyle] = useState({
      display: 'grid',
      gridTemplateColumns: '3fr 4fr',
      overflow: 'hidden'
    })
  
      return (
      <>
        <div  className={'mainPopup'} style={{display: 'flex'}}>
          <Settings/>
        </div>
        <div className="screen" style={screenStyle}>
            <ScreenLeftControls setScreenStyle={setScreenStyle}/>
            <ScreenRightControls/>
        </div>
      </>
      )
  }

export default EditorScreen