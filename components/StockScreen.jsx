"use client"

import React, { useState, useEffect } from 'react';
import { ScreenLeftControls, ScreenRightControls } from './screen'
import { Notifications, eveloCoreAlert } from './notifications';
import {Settings} from './settings';
import LoginPage from './login';
import Link from 'next/link';


function StockScreen(){
    const [screenStyle, setScreenStyle] = useState({
      display: 'grid',
      gridTemplateColumns: '3fr 4fr',
      overflow: 'hidden'
    })
  
      return (
      <>
        <div className="screen" style={screenStyle}>
            <LoginPage />
        </div>
      </>
      )
  }
export default StockScreen