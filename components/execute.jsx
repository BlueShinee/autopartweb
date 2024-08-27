"use client";

import React, { useState, useEffect } from 'react';
import { getEditorValue, editors } from './MonacoEditor';
import { eveloCoreAlert } from './notifications';
import AudioPlay from './AudioPlay';

let npmPackages = []
let liveServerState = false

function Execute({fromLiveServer}){
    if(!liveServerState && fromLiveServer) return
    if(!fromLiveServer){
        AudioPlay('/media/zippo_close.mp3')
    }
    
    var npmPackagesScripts = ""
    npmPackages.forEach((npm)=>{
        const script = "<scri"+"pt src=\""+npm[0]+"\"></scri"+"pt>"
        npmPackagesScripts += script
    })

    let htmlCode = ""
    let cssCode = ""
    let jsCode = ""
    
    //html
    editors.map((editor, index) => {
        if(editor.language === 'html'){
            htmlCode += getEditorValue(editor.id).replace(/href\s*=\s*"#"/gi,'').replace(/href\s*=\s*""/gi,'')
        }
    })

    //css
    editors.map((editor, index) => {
        if(editor.language === 'css'){
            //cssCode += `<style>${getEditorValue(editor.id)}</style>\n`
            cssCode += `${getEditorValue(editor.id)}\n`
        }
    })

    //js
    editors.map((editor, index) => {
        if(editor.language === 'javascript'){
            //jsCode +=`<scri`+`pt>${getEditorValue(editor.id)}</script>\n`
            jsCode +=`${getEditorValue(editor.id)}\n`
        }
    })
    let combinedCode = ''
    let headAvalable = /<\s*\/\s*head\s*>/i.test(htmlCode)
    let bodyAvalable = /<\s*\/\s*body\s*>/i.test(htmlCode)
    if(headAvalable && bodyAvalable){
        combinedCode = htmlCode.replace(
            /<\s*\/\s*head\s*>/i,
            `<style>${cssCode}</style></head>`
        ).replace(
            /<\s*\/\s*body\s*>/i,
            `<script>${jsCode}</script></body>`
        )
    }else{
        combinedCode = htmlCode +  `<style>${cssCode}</style>` + `<script>${jsCode}</script>`
    }

    /* let webview = document.getElementsByClassName("webview")[0].contentWindow.document
    webview.location.reload()
    webview.open()
    webview.write(htmlCode + cssCode + jsCode)
    webview.close() */

    let webview = document.getElementsByClassName("webview")[0]
    webview.src = 'about:blank'; // Set to a blank page to clear the old content

    // Use `onload` to ensure the iframe is fully reloaded before writing new content
    webview.onload = function () {
        let iframeDoc = webview.contentDocument || webview.contentWindow.document
        iframeDoc.open();
        //iframeDoc.write(htmlCode + cssCode + jsCode);
        iframeDoc.write(combinedCode);
        iframeDoc.close();
    };
    
    //js for console
    jsCode = ""
    editors.map((editor, index) => {
        if(editor.language === 'javascript'){
            jsCode += `${getEditorValue(editor.id)}\n\n`
        }
    })
    runConsole(jsCode)
}

function runConsole(code){
    try {
        var consoleOutput = document.getElementById('browserConsole')
        // Clear previous console output
        consoleOutput.innerHTML = '';
        console.log = function(){}
        // Redirect console.log to our custom function
        var log = function(...args) {
            args.forEach(arg => {
                var type = typeof arg;
                var logClass = 'log-' + type;
                consoleOutput.innerHTML += `<hr>`
                consoleOutput.innerHTML += `<pre class="log-item ${logClass}">${formatLog(arg)}</pre>`
                //scroll
                consoleOutput.scrollTop = consoleOutput.scrollHeight
            });
        }
        console.log = log
        
        // Execute the code
        eval(code);
    } catch (error) {
        // Display error message in the console
        consoleOutput.innerHTML = '<div class="log-error">' + error + '</div>';
    }
}
function formatLog(arg) {
    if (typeof arg === 'object' && arg !== null) {
        return formatObject(arg);
    } else if (typeof arg === 'string') {
        return `<span class="log-string">'${arg}'</span>`;
    } else if (typeof arg === 'number') {
        return `<span class="log-number">${arg}</span>`;
    } else if (typeof arg === 'boolean') {
        return `<span class="log-boolean">${arg}</span>`;
    } else {
        return arg;
    }
}

function formatObject(obj) {
    let keys = Object.keys(obj)
    let formatted = Array.isArray(obj) ? ['[', ']'] : ['{', '}']
    let output = `<div class="log-object">${formatted[0]}`;
    keys.forEach((key, index) => {
        let comma = index < keys.length - 1 ? "," : "";
        output += `<div class="log-object-key">${key}: ${formatLog(obj[key])}${comma}</div>`;
    });
    output += `${formatted[1]}</div>`;
    return output;
}

function liveServerSwitch() {
    liveServerState = !liveServerState
    const onoff = liveServerState ? 'On' : 'Off'
    eveloCoreAlert("Live Server "+onoff,'#1a1','#afa',3000)
}

let errSame = {}
function errLogs(msg){
    if(errSame[msg]){
        console.warn(`(${errSame[msg]}) ${msg}`)
        errSame[msg]++
    }else{
        console.warn(`(1) ${msg}`)
        errSame[msg] = 1
    }
    return
}
export {Execute, liveServerSwitch, errLogs}