"use client"

import React, { useState, useEffect } from 'react';
import { ScreenLeftControls, ScreenRightControls } from './screen'
import { Notifications, eveloCoreAlert } from './notifications';
import {Settings} from './settings';
import LoginPage from './login';
import Link from 'next/link';


function Portfolio(){
      return (
      <>
        <div className="screen" style={{display: 'flex', width:'100%', height: '100vh'}}>
            <iframe style={{width: '100%'}} src='/portfolio.html'></iframe>
        </div>
      </>
      )
  }
export default Portfolio