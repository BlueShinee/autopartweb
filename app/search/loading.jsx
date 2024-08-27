import { Suspense } from 'react'

export default function Loading() {
    return (
        <div className="loading-screen" style={{ display:'flex'}}>
            <div className="loading-container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <pre className="loading"></pre>
            </div>
            <h3>
                <b>Thushara</b> Auto <c>Parts</c>
                <div className="progress-bar">
                    <div className="progress-bar-line"></div>
                </div>
            </h3>
        </div>
    )
}