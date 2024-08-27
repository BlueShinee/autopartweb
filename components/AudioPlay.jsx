"use client";

import { eveloCoreAlert } from './notifications'
import {errLogs} from './execute'

let soundsState = false
function AudioPlay(name, volume){
    errLogs('AudioPlay rendered')
    if(name === 'active'){
        soundsState = true
        eveloCoreAlert("Sounds Enabled",'#cc1','#ffa',3000)
    }else if(name === 'mute'){
        soundsState = false
        eveloCoreAlert("Sounds Disabled",'#cc1','#ffa',3000)
    }else if(name === 'change'){
        soundsState = !soundsState
        if(soundsState){
            eveloCoreAlert("Sounds Enabled",'#cc1','#ffa',3000)
        }else{
            eveloCoreAlert("Sounds Disabled",'#cc1','#ffa',3000)
        }
    }else{
        if(!soundsState) return
        const clickSound = new Audio(name)
        clickSound.volume = volume || .2
        clickSound.play()
    }
}

export default AudioPlay