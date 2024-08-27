"use client"

import React, { useState, useEffect } from 'react';
import { ScreenLeftControls, ScreenRightControls } from './screen'
import { Notifications, eveloCoreAlert } from './notifications';
import AudioPlay from './AudioPlay';
import Header from './Header';
import EditorScreen from './EditorScreen';
import StockScreen from './StockScreen';
import HomeScreen from './DashboardScreen';

/* import './code/theme.css';
import './code/header.css';
import './code/loading.css';
import './code/slide-nav.css';
import './code/screen.css';
import './code/editor.css';
import './code/select-input.css';
import './code/switch.css';
import './code/scroll.css';
import './code/notification.css';
import './code/addfiles.css';
import './code/console.css'; */


function MainScreen(){
  const [openScreen, openOtherScreen] = useState('editor')

    return (
    <>
      <Header openOtherScreen={openOtherScreen}/>
      <Notifications/>
      {openScreen === 'editor' ? (
        <EditorScreen/>
      ) : null}
      {openScreen === 'stock' ? (
        <StockScreen/>
      ) : null}
      {openScreen === 'dashboard' ? (
        <HomeScreen/>
      ) : null}
    </>
    )
}


export default MainScreen