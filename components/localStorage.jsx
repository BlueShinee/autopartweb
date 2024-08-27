import React, { useState, useEffect } from 'react';
import { getEditorValue, setEditorValue, editors } from './MonacoEditor';
import { eveloCoreAlert } from './notifications';
import {Execute, errLogs} from './execute';

function saveAsNewProject(name_p, icon_p) {
    var name = name_p || '';
    var icon = icon_p || document.getElementById("saveAsNameSelect-newicon")?.value || 1;
    
    let editorValueObj = {
        htmlEditor: "",
        cssEditor: "",
        jsEditor: ""
    };
    editors.forEach((editor) => {
        editorValueObj[editor.id] = getEditorValue(editor.id);
    });

    // Get or initialize the database
    let database = JSON.parse(getLocalStorage("ecLocalEditor")) || {
        name: "ecLocalEditor",
        quickSave: editorValueObj,
        projects: []
    };

    if (!name) {
        // Handle quick save
        database.quickSave = editorValueObj;
        eveloCoreAlert("Saved Draft", '#1a1', '#afa', 3000);
    } else {
        // Ensure projects is an array
        if (!Array.isArray(database.projects)) {
            database.projects = [];
        }

        // Update or add new project
        let projectFound = false;
        database.projects = database.projects.map((project) => {
            if (project.name === name) {
                projectFound = true;
                return {
                    ...project,
                    icon: icon,
                    ...editorValueObj
                }
            }
            return project;
        });

        if (!projectFound) {
            database.projects.push({
                name: name,
                icon: icon,
                ...editorValueObj
            })
        }

        eveloCoreAlert("Saved as " + name, '#1a1', '#afa', 3000);
    }

    setLocalStorage(database.name, JSON.stringify(database, null, 3))
    //appendSavedProjectList();
}

// restore
function restoreSavedProject(name){
    let database = JSON.parse(getLocalStorage("ecLocalEditor")) || 
    {
        name: "ecLocalEditor",
        quickSave: {
            htmlEditor: "",
            cssEditor: "",
            jsEditor: ""
        },
        projects: []
    }
    if(!name){
        editors.map((editor, index) => {
            setEditorValue(editor.id, database.quickSave[editor.id])
        })
        eveloCoreAlert("Restored Draft",'#1a1','#afa',3000)
        Execute({fromLiveServer: false})
        return
    }else{
        database.projects.map((project) => {
            errLogs(name+" "+ project.name)
            if (project.name == name) {
                editors.map((editor, index) => {
                    errLogs(project[editor.id])
                    setEditorValue(editor.id, project[editor.id])
                })
                document.getElementById("saveAsNameSelect-newicon").value = project.icon
                document.getElementById("headerProjectName").innerHTML = name.slice(0, 30)
                document.getElementById('saveAsNameSelect-newname').value = name.slice(0, 30)
                document.getElementById("saveAsNameSelect-newname-forzip").innerHTML = String(name).replace(/ /gi, '-') + '.zip'
                document.getElementById("saveChangesSection").innerHTML = name
                eveloCoreAlert("Restored "+name,'#1a1','#afa',3000)
                Execute({fromLiveServer: false})
                return
            }
        })
    }
}
 
// open project list
function loadSavedProjectList() {
    var window = document.getElementsByClassName("menuContainBoxItem")[2];
    window.innerHTML = "";
    
    let database = JSON.parse(getLocalStorage("ecLocalEditor")) || {
        name: "ecLocalEditor",
        quickSave: {
            htmlEditor: "",
            cssEditor: "",
            jsEditor: ""
        },
        projects: []
    };
    
    database.projects.forEach((project) => {
        var element = document.createElement('div');
        element.className = 'webview-tools-bar-item-ext';

        // Create project item content
        var projectContent = `
            <img src="/media/project_icons/${project.icon}.png" alt="${project.name} icon"/>
            <a>${project.name}
                <p>Saved in your browser's local storage</p>
            </a>
        `;
        
        // Create Restore button
        var restoreButton = document.createElement('button');
        restoreButton.textContent = 'Restore';
        restoreButton.onclick = () => restoreSavedProject(project.name, project.icon);
        
        // Create Delete button
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteSavedProject(project.name, project.icon);
        
        // Append content and buttons to the element
        element.innerHTML = projectContent;
        element.appendChild(restoreButton);
        element.appendChild(deleteButton);

        // Append element to window
        window.appendChild(element);
    });
}

//delete project
function deleteSavedProject(name){
    let database = JSON.parse(getLocalStorage("ecLocalEditor")) || {
        name: "ecLocalEditor",
        quickSave: {
            htmlEditor: "",
            cssEditor: "",
            jsEditor: ""
        },
        projects: []
    }
    var index = database.projects.findIndex(item => item.name === name)
    if (index !== -1) {
        database.projects.splice(index, 1) // This correctly removes the item at the found index
        setLocalStorage(database.name, JSON.stringify(database, null, 3))
        eveloCoreAlert(name+" deleted!",'#a11','#faa',3000)
        loadSavedProjectList()
        return
    }
}
/*
//auto save
function autoSave(lang){
    if(!projectName){
        if(lang === 'html'){
            setLocalStorage("htmlContent", htmlEditor.getValue())
        }
        if(lang === 'css'){
            setLocalStorage("cssContent", cssEditor.getValue())
        }
        if(lang === 'js'){
            setLocalStorage("jsContent", jsEditor.getValue())
        }
    }else{
        if(lang === 'html'){
            setLocalStorage("htmlContent;;;"+projectName, htmlEditor.getValue())
        }
        if(lang === 'css'){
            setLocalStorage("cssContent;;;"+projectName, cssEditor.getValue())
        }
        if(lang === 'js'){
            setLocalStorage("jsContent;;;"+projectName, jsEditor.getValue())
        }
    }
} */

//db functions
function setLocalStorage(name, value){
    localStorage.setItem(name, value)
}
function getLocalStorage(name){
    return localStorage.getItem(name)
}
function deleteLocalStorage(name){
    localStorage.removeItem(name)
}

//cookie functions
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function cookieExists(name) {
    return document.cookie.split(';').some(function(cookie) {
        return cookie.trim().startsWith(name + '=');
    });
}

export { saveAsNewProject, restoreSavedProject, loadSavedProjectList }