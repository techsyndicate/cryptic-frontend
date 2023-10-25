"use client"
import React, { useEffect } from 'react'
import './navbar.css'
import { getFrontendUrl } from '@/app/utils/misc';

export default function Navbar(user) {

    user = user.user;
    console.log(user? user?.admin : "no user")
    useEffect(() => {

        var startButton = window.document.getElementById("start");
        var startMenu = window.document.getElementById("startMenu");

        startTime();
        startMenu.style.display = "none";
    });

    function startTime() {
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        // add a zero in front of numbers<10
        m = checkTime(m);
        s = checkTime(s);
        var hd = h;
        var timeString = (hd === 0 ? "12" : hd > 12 ? hd - 12 : hd) + ":" + m + " " + (h < 12 ? "AM" : "PM");
        clock.innerHTML = timeString;
        setTimeout(startTime, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    }

    function startclick() {
        var startButton = window.document.getElementById("start");
        var startMenu = window.document.getElementById("startMenu");

        startMenu.style.display = (startMenu.style.display === "none" || startMenu.style.display === "") ? "block" : "none";
        startButton.classList.toggle('startClick');
    };

    async function logout() {
        await fetch(getFrontendUrl()+"auth/logout", {
            method: "GET",
            credentials: "include"
        }).then(res => res.json()).then(res => {
            if (res.success) {
                window.location.href = "/";
            }
        })
    }

    async function login() {
        window.open(getFrontendUrl() + "discord-back/auth/login", "_blank");
    }
    return (
        <div id="taskbar">
            <div id="start" onClick={startclick} class="startRest">Start</div>
            <div id="startMenu">
                <div id="left">
                    <div class="b">
                        Revolutionize
                        <span class="num95">OS</span>
                    </div>
                </div>
                {user?.admin ? <div class="menuItem expander">Admin</div> : <div class="menuItem"> </div>}
                <div class="menuItem"></div>
                {/* {user ? <div class="menuItem" onClick={() => window.location.href = "/profile"}>Profile</div> : <div class="menuItem" id="shutdown"></div>}
                {user ? <div class="menuItem" onClick={()=>window.location.href = "/leaderboard"}>Leaderboard</div> : <div class="menuItem" id="shutdown"></div>} */}
                {user ? <div class="menuItem" onClick={()=>{window.location.href="/dashboard"}}>Firewall Utility</div> : <div class="menuItem" id="shutdown"></div>}
                {user ? <div class="menuItem" onClick={() => { window.location.href = "/" }}>Terminal</div> : <div class="menuItem" id="shutdown"></div>}
                <div class="divider"></div>
                {!user ? <div class="menuItem" onClick={login} id="shutdown">Login</div> : <div class="menuItem" onClick={logout} id="shutdown">Logout</div>}
            </div>
            <div id="notifications">
                <div id="clock"></div>
            </div>
        </div>
    )
}
