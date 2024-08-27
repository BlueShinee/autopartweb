"use client";

import React, { useState, useEffect } from 'react';

function  Notifications(){
    return (
      <>
        <div class="primary-notification">
            <div class="primary-notification-contain">
                <div class="primary-notification-img-box">
                    {/* <img src="/media/primary-notification.png"/> */}
                </div>
                <div class="primary-notification-message-box">
                    <h2  id="primary-notification-head"><i class='fa fa-bell'></i> notification</h2>
                    <b id="primary-notification-text">Error!<br/>No error found.</b>
                    <h3>
                        <a id="primary-notification-cancel">close</a>
                        <a id="primary-notification-got">accept</a>
                    </h3>
                </div>
            </div>
        </div>
        <div class="notification">
            <div class="notification-contain">
                <div class="notification-img-box">
                    {/* <img src="/media/notification.png"/> */}
                </div>
                <div class="notification-message-box">
                    <h2  id="notification-head"><i class='fa fa-bell'></i> system alert</h2>
                    <b id="notification-text">Error!<br/>No error found.</b>
                    <h3 id="notification-got" onclick="eveloCoreAlert()">&times;</h3>
                </div>
            </div>
        </div>
      </>
      )
}

function eveloCoreAlert(msg,colour,bgcolor,duration) {
    duration = duration || 3000
    try {
        var notificationContain = document.getElementsByClassName("notification")[0]
        if(!msg){
            notificationContain.classList.remove("notification-popup")
            return
        }
        if(document.getElementsByClassName("primary-notification")[0].classList.contains('primary-notification-popup')){
            document.getElementsByClassName("primary-notification")[0].classList.remove("primary-notification-popup")
        }
        var notification = document.getElementById("notification-text")
        notification.innerHTML = msg
        var notification = document.getElementById("notification-head")
        notification.style.color = colour
        var notification = document.getElementById("notification-got")
        notification.style.color = colour
        notification = document.getElementsByClassName("notification-contain")[0]
        notification.style.backgroundColor = bgcolor
        notification.style.boxShadow = "00 1px 5px "+"#555"
        //notification.style.border = "4px solid "+colour
        notification.style.borderLeft = "8px solid "+colour
        //notification.style.boxShadow = "00 1px 5px 1px "+colour
        notificationContain.classList.add("notification-popup")
        setTimeout(eveloCoreAlert,duration)
    } catch (err) {
        console.log(err)
    }
    
}

export { Notifications, eveloCoreAlert }