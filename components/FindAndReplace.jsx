import React, { useState, useEffect } from 'react';
import { getEditorValue, setEditorValue, editors } from './MonacoEditor';
import { eveloCoreAlert } from './notifications';

function FindReplaceWindow() {
    // State for input values
    const [keyword, setKeyword] = useState('');
    const [replaceWord, setReplaceWord] = useState('');
    const [regexp, setRegexp] = useState('g'); // Default to 'g' for global search

    const selectOptionStyleCustom = {
        backgroundColor: 'black'
    }
    // State for search results
    const [results, setResults] = useState([]);

    // Effect to update results when inputs change
    useEffect(() => {
        const updatedResults = editors.map(editor => ({
            id: editor.id,
            filename: editor.filename,
            count: findCount(getEditorValue(editor.id))
        }));
        setResults(updatedResults);
    }, [keyword, replaceWord, regexp]);

    function findAndReplace(id) {
        const newValue = findAndReplaceText(keyword, replaceWord, getEditorValue(id), regexp);
        setEditorValue(id, newValue);
        eveloCoreAlert(`Replaced ${keyword} with ${replaceWord}`, '#1a1', '#afa', 3000);
    }

    function findCount(text) {
        const regex = new RegExp(keyword, regexp);
        const matches = (text.match(regex) || []).length;
        return matches;
    }

    function findAndReplaceText(findValue, replaceValue, text, regexP) {
        const regex = new RegExp(findValue, regexP);
        return text.replace(regex, replaceValue);
    }

    function matchElement() {
        return results.map(result => (
            <div className="webview-tools-bar-item-ext" key={result.id}>
                <img src={`/media/project_icons/${editors.find(e => e.id === result.id).icon}.png`} alt={result.filename} />
                <a>{result.filename}
                    <p>{result.count} matches</p>
                </a>
                <button onClick={() => findAndReplace(result.id)}>Replace</button>
            </div>
        ));
    }

    return (
        <>
            <div className="webview-tools-bar-item-ext">
                <i className="fa fa-search"></i>
                <a style={{ display: 'flex', flexDirection: 'row' }}>
                    <input
                        className="saveAsNameInput"
                        type="text"
                        placeholder="Search"
                        value={keyword}
                        onChange={e => setKeyword(e.target.value)}
                    />
                    <select
                        className="saveAsNameSelect"
                        value={regexp}
                        onChange={e => setRegexp(e.target.value)}
                        style={{ width: '60px' }}
                    >
                        <option value="g" style={selectOptionStyleCustom}>Aa</option>
                        <option value="gi" style={selectOptionStyleCustom}>aa</option>
                    </select>
                </a>
                <button>Find</button>
            </div>
            <div className="webview-tools-bar-item-ext">
                <i className="fa fa-clone"></i>
                <a>
                    <input
                        className="saveAsNameInput"
                        type="text"
                        placeholder="Replace"
                        value={replaceWord}
                        onChange={e => setReplaceWord(e.target.value)}
                    />
                </a>
                <button onClick={() => editors.forEach(editor => findAndReplace(editor.id))}>Replace All</button>
            </div>
            <br />
            Search results
            <div id="findAndReplaceField">
                {matchElement()}
            </div>
            <br />
        </>
    );
}

export { FindReplaceWindow };
