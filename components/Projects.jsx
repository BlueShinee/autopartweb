"use client"

import React, { useState, useEffect } from 'react';
import { ScreenLeftControls, ScreenRightControls } from './screen'
import { Notifications, eveloCoreAlert } from './notifications';
import {Settings} from './settings';
import Portfolio from './Portfolio';

function ProjectsList(){
    return (
        <div style={{color: 'white'}}>
            <h2>Last week</h2>
        </div>
    )
}
function Projects(){
    const [screenStyle, setScreenStyle] = useState({
      display: 'grid',
      gridTemplateColumns: '3fr 5fr',
      overflow: 'hidden'
    })
  
      return (
      <>
        <div className="screen" style={screenStyle}>
            <Portfolio/>
            <ProjectsList/>
        </div>
      </>
      )
  }

export default Projects