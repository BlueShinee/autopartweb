import { Suspense } from 'react'

export default function Loading() {
    return (
        <div class="w-full h-full fixed top-0 left-0 backdrop-blur-sm opacity-75 z-50">
          <div class="flex justify-center items-center mt-[50vh]">
            <div class="fas fa-circle-notch fa-spin fa-5x text-blue-500"></div>
          </div>
            <h3 className='w-full h-[50vh] flex justify-center items-center'>
                <b className='m-1 text-blue-500'>Please Wait</b> <c className="m-1">...</c>
            </h3>
        </div>
    )
}
        {/* <div className="loading-screen" style={{ display:'flex'}}>
            <div className="loading-container">
                <div className="ring"></div>
                <div className="ring"></div>
                <div className="ring"></div>
                <pre className="loading"></pre>
            </div>
            <div class="flex justify-center items-center mt-[50vh]">
                <div class="fas fa-circle-notch fa-spin fa-5x text-violet-600"></div>
            </div>
            <h3>
                <b>Thushara</b> Auto <c>Parts</c>
                <div className="progress-bar">
                    <div className="progress-bar-line"></div>
                </div>
            </h3>
        </div> */}