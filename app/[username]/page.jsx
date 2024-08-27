"use client"
import Header from "./Header"

import React, { useState, useEffect } from 'react';
import { Notifications, eveloCoreAlert } from '@/components/notifications';
import EditorScreen from '@/components/EditorScreen';
import Portfolio from "@/components/Portfolio";
import Projects from "@/components/Projects";

let locationUrl = location.href
locationUrl = new URL(locationUrl)
let header = locationUrl.searchParams.get("header") || 'true'

export default function Home({ params }) {
  const { username, project } = params
  const styles = header == 'false' ? {display: 'none'} : {}
  const [openScreen, openOtherScreen] = useState('portfolio')
  return (
    <>
      <Header title={"Projects"} user={username} styles={styles} openOtherScreen={openOtherScreen}/>
      {openScreen === 'portfolio' ? (
        <Portfolio/>
      ) : null}
      {openScreen === 'projects' ? (
        <Projects/>
      ) : null}
      {openScreen === 'dashboard' ? (
        null
      ) : null}
    </>
  )
}