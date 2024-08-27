"use client"
import Header from "../Header"

import React, { useState, useEffect } from 'react';
import { Notifications, eveloCoreAlert } from '@/components/notifications';
import EditorScreen from '@/components/EditorScreen';


export default function Home({ params }) {
  const { username, project } = params
  return (
    <>
      <Header title={"Projects"} user={username}/>
      <Notifications/>
      <EditorScreen/>
    </>
  )
}