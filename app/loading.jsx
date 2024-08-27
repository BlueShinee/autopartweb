"use client";

import { useEffect, useState } from 'react';
import { eveloCoreAlert } from '../components/notifications';

const Loading = () => {
    return (
        <div className="loading-screen" style={{ display:'flex'}}>
            <div className="loading-container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <pre className="loading"></pre>
            </div>
            <h3>
                <b>Evelo</b>core <c>Editor</c>
                <div className="progress-bar">
                    <div className="progress-bar-line"></div>
                </div>
            </h3>
        </div>
    )
}

export default Loading;
