"use client"

import React, { useState, useEffect } from 'react';
import AudioPlay from './AudioPlay';
import Link from 'next/link';
import Swal from 'sweetalert2';

let AudioPlayedToSlipBurron = false
function onMouseOverSlide(event) {
  const button = document.querySelector('.login-btn')
  const threshold = 100
  const mouseX = event.clientX
  const mouseY = event.clientY

  const buttonRect = button.getBoundingClientRect()
  const buttonCenterX = buttonRect.left + buttonRect.width / 2
  const buttonCenterY = buttonRect.top + buttonRect.height / 2
  const avalablle = document.getElementById("username_login").value && document.getElementById("password_login").value

  const diffX = mouseX - buttonCenterX
  const diffY = mouseY - buttonCenterY

  button.style.transition = 'transform 0.3s ease';

  if (Math.abs(diffX) < threshold && Math.abs(diffY) < threshold) {
    if(avalablle){
      button.classList.remove('slippery-button')
      return
    }else{
      button.classList.add('slippery-button')
    }
    button.style.cursor = 'none';
    const moveX = (diffX > 0 ? -1 : 1) * (threshold / 2)
    const moveY = (diffY > 0 ? -1 : 1) * (threshold / 2)
    
    button.style.transform = `translate(${moveX}px, ${moveY}px) rotateX(${moveX/2}deg) rotateY(${moveY}deg)`
    button.addEventListener('click', (event) => {
      event.preventDefault()
      event.stopPropagation()
    })
    if(!AudioPlayedToSlipBurron){
      AudioPlay('/media/snake.mp3');
      AudioPlayedToSlipBurron = true
    }
  }else{
    button.style.cursor = 'pointer';
    button.style.transform = `translate(${0}px, ${0}px) rotateX(${0}deg) rotateY(${0}deg)`
  }
}

const Header = ({openOtherScreen, title, user, styles}) => {
    let [slide, setSlide] = useState('sidenav')
    let [slideHTML, setSlideHTML] = useState(<></>)
    // Function to update the active selector's position and size
    const updateSelector = (activeItem) => {
      const activeWidthNewAnimHeight = activeItem.clientHeight;
      const activeWidthNewAnimWidth = activeItem.clientWidth;
      const itemPosNewAnimTop = activeItem.offsetTop;
      const itemPosNewAnimLeft = activeItem.offsetLeft;
  
      const horiSelector = document.querySelector('.hori-selector');
      if (horiSelector) {
        horiSelector.style.top = itemPosNewAnimTop + "px";
        horiSelector.style.left = itemPosNewAnimLeft + "px";
        horiSelector.style.height = activeWidthNewAnimHeight + "px";
        horiSelector.style.width = activeWidthNewAnimWidth + "px";
      }
      return
    }
  
    // Function to set up the initial selector position
    const setInitialSelector = () => {
      const activeItem = document.querySelector('#navbarSupportedContent .active');
      if (activeItem) {
        updateSelector(activeItem);
      }
    }
  
    // Function to handle login option click
    const openLoginOption = () => {
        setSlideHTML(
        <div className="login-card" onMouseOver={onMouseOverSlide}>
            <form>
                <img src="/media/login-image-1.png"/>
                <h2>Login Now</h2>
                <input type="text" placeholder="Username" id="username_login"/>
                <input type="password" placeholder="Password" id="password_login"/>
                <div className="button-container">
                    <button className="login-btn slippery-button">Login</button>
                    <button className="register-btn">Sign Up</button>
                </div>
            </form>
        </div>)
        setSlide('sidenav sidenav-active')
        AudioPlay('/media/krypton.mp3')
    }
    const moreOption = () => {
            setSlideHTML(
                <div className="moreOptionMobile">
                <li>
                    <a className="nav-link"><i className="fas fa-tachometer-alt"></i>Dashboard</a>
                </li>
                <li className="moreOptionMobile-active">
                    <a className="nav-link"><i className="fas fa-code"></i>Editor</a>
                </li>
                <li>
                    <a className="nav-link"><i className="fa fa-plus"></i>Create</a>
                </li>
                <li>
                    <a className="nav-link"><i className="fas fa-fire-alt"></i>Stock</a>
                </li>
                <li>
                    <a className="nav-link"><i className="fa fa-chess-queen"></i>More</a>
                </li>
                <li className="nav-buttons-2">
                    <a className="nav-link" onClick={(e)=>{openLoginOption()}}><i className="fas fa-user-alt"></i>Log In</a>
                </li>
            </div>)
        setSlide('sidenav sidenav-active')
    }
    const handleTabClick = (e) => {
      const currentTab = e.currentTarget; // Save reference to the clicked tab
    
      Swal.fire({
        title: "Shift to "+currentTab.innerText+"?",
        text: "Hold on! Any unsaved changes will be lost. Are you sure you want to leave?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3b56d1",
        cancelButtonColor: "#d33",
        confirmButtonText: "Leave",
        background: '#00051b',  // Dark background color
        color: '#fff',       // White text color
        iconColor: '#f8bb86', // Custom color for the icon
      }).then((result) => {
        if (result.isConfirmed) {
          try {
            const allTabs = document.querySelectorAll('#navbarSupportedContent ul li')
            allTabs.forEach(tab => tab.classList.remove('active'))
            currentTab.classList.add('active')
            updateSelector(currentTab)
            openOtherScreen(String(currentTab.innerText).toLowerCase())
            document.getElementById("headerProjectName").innerHTML = "Evelocore Tunnel"
          } catch (err) {
            console.error("Error updating tabs:", err);
          }
        }
      });
    };
    function closeSlideBar(){
        setSlide('sidenav')
        AudioPlayedToSlipBurron = false
    }
  
    useEffect(() => {
      setInitialSelector(); // Run once after the component mounts
  
      // Update selector on window resize
      const handleResize = () => {
        setTimeout(setInitialSelector, 500);
      };
      window.addEventListener('resize', handleResize);
  
      // Add active class based on the current path
      const path = window.location.pathname.split("/").pop() || 'index.html';
      const target = document.querySelector(`#navbarSupportedContent ul li a[href="${path}"]`);
      if (target) {
        try {
          target.parentElement.classList.add('active');
        } catch (err) {
          console.log(err)
        }
      }
  
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);
  
    return (
    <>
      <nav style={styles} className="navbar navbar-expand-custom navbar-mainbg">
        <a className="navbar-brand" href="/">
          <div className="navbar-logo">
            <img src="/media/evelocore-logo-dark-icon.png" alt="evelocode logo" />
            <div>
              <h2 style={{whiteSpace: 'nowrap', margin: '0px 5px'}}>C<b style={{color: 'grey'}}>ode</b></h2>
            </div>
          </div>
          <div className="navbar-content">
            <h3 id="headerProjectName">{title || 'Evelocore Tunnel'}</h3>
            <h5><i className="fas fa-user-alt"></i>{user || 'Local User'}</h5>
          </div>
        </a>
  
        <div className="more-option-header view-in-mobile">
          <i className="fa fa-bars" onClick={moreOption}></i>
        </div>
        <div className="collapse navbar-collapse view-in-desktop" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <div className="hori-selector">
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <li className="nav-item" onClick={(e) => {handleTabClick(e)}}>
              <a className="nav-link">
                <i className="fas fa-tachometer-alt"></i>Dashboard
              </a>
            </li>
            <li className="nav-item active" onClick={(e) => {handleTabClick(e)}}>
              <a className="nav-link">
                <i className="fas fa-code"></i>Editor
              </a>
            </li>
            <li className="nav-item" onClick={(e) => {handleTabClick(e)}}>
              <a className="nav-link">
                <i className="fa fa-plus"></i>Create
              </a>
            </li>
            <li className="nav-item" onClick={(e) => {handleTabClick(e)}}>
              <a className="nav-link">
                <i className="fas fa-fire-alt"></i>Stock
              </a>
            </li>
            <li className="nav-item" onClick={(e) => {handleTabClick(e)}}>
              <a className="nav-link">
                <i className="fa fa-chess-queen"></i>More
              </a>
            </li>
            <li className="nav-item nav-buttons-2">
              <a className="nav-link" onClick={(e)=>{openLoginOption()}}>
                <i className="fas fa-user-alt"></i>Log In
              </a>
            </li>
          </ul>
        </div>
      </nav>
      {/* <SlideNav inner={popupContent} active={slide}/> */}
      <div id="mySidenav" className={slide}>
        <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
        <a className="closebtn" onClick={closeSlideBar}>&times;</a>
        <div id="slideVanContent">
          {slideHTML}
        </div>
      </div>
      </>
    );
}

export default Header