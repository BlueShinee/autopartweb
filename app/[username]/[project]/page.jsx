"use client"
import Header from "@/components/Header"

import React, { useState, useEffect } from 'react';
import { Notifications, eveloCoreAlert } from '@/components/notifications';
import EditorScreen from '@/components/EditorScreen';


export default function Home({ params }) {
  const { username, project } = params
  return (
    <>
      <Header title={ project.replace(/%20/gi,' ') || "Evelocore Editor"} user={username}/>
      <Notifications/>
      <EditorScreen/>
    </>
  )
}