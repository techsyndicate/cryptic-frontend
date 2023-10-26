"use client"
import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { getLevel, getUser, setUserLevel } from '../utils/getData'
import Image from 'next/image'
import Navbar from '@/components/navbar'
import { Notyf } from 'notyf'
import { getFrontendUrl } from '../utils/misc'

export default function Dashboard() {
    const [level1, SetLevel1] = useState("#16e16e")
    const [level2, SetLevel2] = useState("#16e16e")
    const [level3, SetLevel3] = useState("#16e16e")
    const [level4, SetLevel4] = useState("#16e16e")
    const [level5, SetLevel5] = useState("#16e16e")
    const [level6, SetLevel6] = useState("#16e16e")
    const [level7, SetLevel7] = useState("#16e16e")
    const [level8, SetLevel8] = useState("#16e16e")
    const [level9, SetLevel9] = useState("#f9f9f9")
    const [level10, SetLevel10] = useState("#f9f9f9")
    const [level11, SetLevel11] = useState("#ff474c")
    const [level12, SetLevel12] = useState("#ff474c")
    const [level13, SetLevel13] = useState("#f9f9f9")
    const [level14, SetLevel14] = useState("#ff474c")
    const [level15, SetLevel15] = useState("#f9f9f9")
    const [user, setUser] = useState(null);
    const [level, setLevel] = useState(null);
    const [clicked, setClicked] = useState([]);

    const date = "Wed Oct 27 2023 11:59:00 GMT+0530 (India Standard Time)";

    useEffect(() => {
        const notyf = new Notyf();
        document.addEventListener('keypress', (e) => {
            //if key == 13 submit
            if (e.key == "Enter" && user.solving) {
                submit();
            }
        })

        document.addEventListener('click', async (e) => {
            if (e.target.id && e.target.id.startsWith("level") && e.target.id != "level-main" && e.target.id != "level-container" && clicked.includes(e.target.id) == false) {
                setClicked([...clicked, e.target.id]);
                console.log(e.target.id, clicked)
                const notyf = new Notyf();
                var id = e.target.id.replace("level", "");
                if (user?.completedLevels?.includes(id)) {
                    return notyf.error("This firewall has already been deactivated.")
                }
                await setUserLevel(id).then(async res => {
                    if (!res.success) {
                        return notyf.error(res.msg)
                    }
                    else {
                        window.location.href = "/dashboard"
                        return notyf.success(res.msg)
                    }
                });
            }
        })
        {
            new Date(date) >= new Date() ?

                getUser().then(res => {

                    if (!res.success) {
                        return window.location.href = "/"
                    }
                    setUser(res);
                    if (!res.solving) {
                        setTimeout(function () {
                            res.availableLevels.forEach(level => {
                                document.getElementById(`level${level}`).style.fill = "#16e16e";
                            })
                            res.completedLevels.forEach(level => {
                                document.getElementById(`level${level}`).style.fill = "#0f0f0f";
                            })

                            document.getElementById(`lvl-main`).style.display = "none";
                            document.getElementById('dashboard-container').style.display = "flex";
                        }, 200);
                        return notyf.error("Please select a level to solve.")
                    }
                    getLevel().then(res => {
                        console.log(res)
                        if (!res.success) {
                            return window.location.href = "/"
                        }
                        setLevel(res.level);
                        setTimeout(function () {
                            document.getElementById(`lvl-main`).style.display = "fiex";
                            document.getElementById('dashboard-container').style.display = "none";
                        }, 500);
                    });
                }) : null
        }
    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    function textchange() {
        var text = document.getElementById("maintext").value;
        //remove all spaces, special characters and lowercaps it all
        text = text.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        document.getElementById("maintext").value = text;
        console.log(text);
    }

    function submit() {
        var notyf = new Notyf();
        var maintext = document.getElementById("maintext").value;
        var submit = document.getElementById("try-here");
        submit.disabled = true;
        submit.innerHTML = "Submitting...";
        var data = {
            answer: maintext
        };
        fetch(getFrontendUrl() + 'level/submit', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + document.cookie.split('VeinAuth=')[1].split(';')[0],
            },
            body: JSON.stringify(data)
        }).then(function (response) {
            submit.disabled = false;
            submit.innerHTML = "Submit";
            return response.json();
        }).then(function (data) {
            console.log(data);
            if (data.success) {
                notyf.success(data.msg);
                setTimeout(function () {
                    window.location.href = "/dashboard";
                }, 1000);
            } else {
                notyf.error(data.msg);
            }
        });
    }


    return (
        <>
            {new Date(date) >= new Date() ?
                <>
                    {user ?
                        <>
                            <div id='dashboard-container'>
                                <h1 id='status-text'>{user?.name}, Welcome to Firewall Status Page</h1>
                                <h1 id='status-available'>Current Status: {user?.completedLevels?.length} firewalls offline</h1>
                                <div>
                                    <svg width="1404" height="1027" viewBox="0 0 1404 1027" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="2.23923" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id='level1' x="41" y="41" width="41" height="41" rx="11.1962" fill={level1} />
                                        <rect id="level9" x="134" y="333" width="41" height="41" rx="11.1962" fill={level9} />
                                        <rect id="level11" x="867" y="333" width="41" height="41" rx="11.1962" fill={level11} />
                                        <rect id='level12' x="1236" y="315" width="41" height="41" rx="11.1962" fill={level12} />
                                        <rect id='level14' x="1053" y="632" width="41" height="41" rx="11.1962" fill={level14} />
                                        <rect id='level15' x="681" y="937" width="41" height="41" rx="11.1962" fill={level15} />
                                        <rect id='level10' x="500" y="313" width="41" height="41" rx="11.1962" fill={level10} />
                                        <rect id='level13' x="318" y="615" width="41" height="41" rx="11.1962" fill={level13} />
                                        <rect x="185.239" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id='level2' x="224" y="41" width="41" height="41" rx="11.1962" fill={level2} />
                                        <rect x="368.239" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id="level3" x="407" y="41" width="41" height="41" rx="11.1962" fill={level3} />
                                        <rect x="551.239" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id="level4" x="590" y="41" width="41" height="41" rx="11.1962" fill={level4} />
                                        <rect x="734.239" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id='level5' x="773" y="41" width="41" height="41" rx="11.1962" fill={level5} />
                                        <rect x="917.239" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id="level6" x="956" y="41" width="41" height="41" rx="11.1962" fill={level6} />
                                        <rect x="1100.24" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id="level7" x="1139" y="41" width="41" height="41" rx="11.1962" fill={level7} />
                                        <rect x="1283.24" y="2.23923" width="118.522" height="118.522" rx="17.9139" stroke="#16E16E" stroke-width="4.47847" />
                                        <rect id='level8' x="1322" y="41" width="41" height="41" rx="11.1962" fill={level8} />
                                        <mask id="path-24-inside-1_131_9" fill="white">
                                            <path d="M61 119H245V168.85C245 179.979 235.979 189 224.85 189H81.15C70.0215 189 61 179.979 61 168.85V119Z" />
                                        </mask>
                                        <path d="M61 119H245H61ZM249.48 168.85C249.48 182.453 238.453 193.48 224.85 193.48H81.15C67.5472 193.48 56.52 182.453 56.52 168.85L65.48 168.85C65.48 177.504 72.4957 184.52 81.15 184.52H224.85C233.504 184.52 240.52 177.504 240.52 168.85L249.48 168.85ZM81.15 193.48C67.5472 193.48 56.52 182.453 56.52 168.85V119H65.48V168.85C65.48 177.504 72.4957 184.52 81.15 184.52V193.48ZM249.48 119V168.85C249.48 182.453 238.453 193.48 224.85 193.48V184.52C233.504 184.52 240.52 177.504 240.52 168.85V119H249.48Z" fill="#16E16E" mask="url(#path-24-inside-1_131_9)" />
                                        <mask id="path-26-inside-2_131_9" fill="white">
                                            <path d="M151 419H522V468.85C522 479.979 512.979 489 501.85 489H171.15C160.021 489 151 479.979 151 468.85V419Z" />
                                        </mask>
                                        <path d="M151 419H522H151ZM526.48 468.85C526.48 482.453 515.453 493.48 501.85 493.48H171.15C157.547 493.48 146.52 482.453 146.52 468.85L155.48 468.85C155.48 477.504 162.496 484.52 171.15 484.52H501.85C510.504 484.52 517.52 477.504 517.52 468.85L526.48 468.85ZM171.15 493.48C157.547 493.48 146.52 482.453 146.52 468.85V419H155.48V468.85C155.48 477.504 162.496 484.52 171.15 484.52V493.48ZM526.48 419V468.85C526.48 482.453 515.453 493.48 501.85 493.48V484.52C510.504 484.52 517.52 477.504 517.52 468.85V419H526.48Z" fill="#16E16E" mask="url(#path-26-inside-2_131_9)" />
                                        <mask id="path-28-inside-3_131_9" fill="white">
                                            <path d="M334 719H1076V768.85C1076 779.979 1066.98 789 1055.85 789H354.15C343.021 789 334 779.979 334 768.85V719Z" />
                                        </mask>
                                        <path d="M334 719H1076H334ZM1080.48 768.85C1080.48 782.453 1069.45 793.48 1055.85 793.48H354.15C340.547 793.48 329.52 782.453 329.52 768.85L338.48 768.85C338.48 777.504 345.496 784.52 354.15 784.52H1055.85C1064.5 784.52 1071.52 777.504 1071.52 768.85L1080.48 768.85ZM354.15 793.48C340.547 793.48 329.52 782.453 329.52 768.85V719H338.48V768.85C338.48 777.504 345.496 784.52 354.15 784.52V793.48ZM1080.48 719V768.85C1080.48 782.453 1069.45 793.48 1055.85 793.48V784.52C1064.5 784.52 1071.52 777.504 1071.52 768.85V719H1080.48Z" fill="#16E16E" mask="url(#path-28-inside-3_131_9)" />
                                        <mask id="path-30-inside-4_131_9" fill="white">
                                            <path d="M886 419H1257V468.85C1257 479.979 1247.98 489 1236.85 489H906.15C895.021 489 886 479.979 886 468.85V419Z" />
                                        </mask>
                                        <path d="M886 419H1257H886ZM1261.48 468.85C1261.48 482.453 1250.45 493.48 1236.85 493.48H906.15C892.547 493.48 881.52 482.453 881.52 468.85L890.48 468.85C890.48 477.504 897.496 484.52 906.15 484.52H1236.85C1245.5 484.52 1252.52 477.504 1252.52 468.85L1261.48 468.85ZM906.15 493.48C892.547 493.48 881.52 482.453 881.52 468.85V419H890.48V468.85C890.48 477.504 897.496 484.52 906.15 484.52V493.48ZM1261.48 419V468.85C1261.48 482.453 1250.45 493.48 1236.85 493.48V484.52C1245.5 484.52 1252.52 477.504 1252.52 468.85V419H1261.48Z" fill="#16E16E" mask="url(#path-30-inside-4_131_9)" />
                                        <mask id="path-32-inside-5_131_9" fill="white">
                                            <path d="M428 119H612V168.85C612 179.979 602.979 189 591.85 189H448.15C437.021 189 428 179.979 428 168.85V119Z" />
                                        </mask>
                                        <path d="M428 119H612H428ZM616.48 168.85C616.48 182.453 605.453 193.48 591.85 193.48H448.15C434.547 193.48 423.52 182.453 423.52 168.85L432.48 168.85C432.48 177.504 439.496 184.52 448.15 184.52H591.85C600.504 184.52 607.52 177.504 607.52 168.85L616.48 168.85ZM448.15 193.48C434.547 193.48 423.52 182.453 423.52 168.85V119H432.48V168.85C432.48 177.504 439.496 184.52 448.15 184.52V193.48ZM616.48 119V168.85C616.48 182.453 605.453 193.48 591.85 193.48V184.52C600.504 184.52 607.52 177.504 607.52 168.85V119H616.48Z" fill="#16E16E" mask="url(#path-32-inside-5_131_9)" />
                                        <mask id="path-34-inside-6_131_9" fill="white">
                                            <path d="M794 119H978V168.85C978 179.979 968.979 189 957.85 189H814.15C803.021 189 794 179.979 794 168.85V119Z" />
                                        </mask>
                                        <path d="M794 119H978H794ZM982.48 168.85C982.48 182.453 971.453 193.48 957.85 193.48H814.15C800.547 193.48 789.52 182.453 789.52 168.85L798.48 168.85C798.48 177.504 805.496 184.52 814.15 184.52H957.85C966.504 184.52 973.52 177.504 973.52 168.85L982.48 168.85ZM814.15 193.48C800.547 193.48 789.52 182.453 789.52 168.85V119H798.48V168.85C798.48 177.504 805.496 184.52 814.15 184.52V193.48ZM982.48 119V168.85C982.48 182.453 971.453 193.48 957.85 193.48V184.52C966.504 184.52 973.52 177.504 973.52 168.85V119H982.48Z" fill="#16E16E" mask="url(#path-34-inside-6_131_9)" />
                                        <mask id="path-36-inside-7_131_9" fill="white">
                                            <path d="M1160 119H1344V168.85C1344 179.979 1334.98 189 1323.85 189H1180.15C1169.02 189 1160 179.979 1160 168.85V119Z" />
                                        </mask>
                                        <path d="M1160 119H1344H1160ZM1348.48 168.85C1348.48 182.453 1337.45 193.48 1323.85 193.48H1180.15C1166.55 193.48 1155.52 182.453 1155.52 168.85L1164.48 168.85C1164.48 177.504 1171.5 184.52 1180.15 184.52H1323.85C1332.5 184.52 1339.52 177.504 1339.52 168.85L1348.48 168.85ZM1180.15 193.48C1166.55 193.48 1155.52 182.453 1155.52 168.85V119H1164.48V168.85C1164.48 177.504 1171.5 184.52 1180.15 184.52V193.48ZM1348.48 119V168.85C1348.48 182.453 1337.45 193.48 1323.85 193.48V184.52C1332.5 184.52 1339.52 177.504 1339.52 168.85V119H1348.48Z" fill="#16E16E" mask="url(#path-36-inside-7_131_9)" />
                                        <rect x="151" y="189" width="4" height="98" fill="#16E16E" />
                                        <rect x="518" y="189" width="4" height="94" fill="#16E16E" />
                                        <rect x="335" y="489" width="4" height="96" fill="#16E16E" />
                                        <rect x="700" y="789" width="4" height="98" fill="#16E16E" />
                                        <rect x="1072" y="489" width="4" height="97" fill="#16E16E" />
                                        <path d="M535.511 412.655C528.617 424.595 511.383 424.595 504.489 412.655L444.994 309.605C438.1 297.665 446.717 282.74 460.504 282.74H579.496C593.283 282.74 601.9 297.665 595.006 309.605L535.511 412.655Z" stroke="#16E16E" stroke-width="4.48" />
                                        <path d="M352.511 712.655C345.617 724.595 328.383 724.595 321.489 712.655L261.994 609.605C255.1 597.665 263.717 582.74 277.504 582.74H396.496C410.283 582.74 418.9 597.665 412.006 609.605L352.511 712.655Z" stroke="#16E16E" stroke-width="4.48" />
                                        <rect x="1250" y="189" width="4" height="94" fill="#16E16E" />
                                        <mask id="path-46-inside-8_131_9" fill="white">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M112.15 283C101.021 283 92 292.021 92 303.15V372H92.057C92.3622 378.218 93.9126 384.347 96.6443 390.108C99.7098 396.573 104.203 402.447 109.867 407.394C115.532 412.342 122.256 416.267 129.657 418.945C137.058 421.623 144.99 423.001 153.001 423.001C161.011 423.001 168.943 421.623 176.344 418.945C183.745 416.267 190.47 412.342 196.134 407.394C201.798 402.447 206.291 396.573 209.357 390.108C212.089 384.347 213.639 378.218 213.944 372H214V369.861C214 369.813 214 369.765 214 369.717H214V303.15C214 292.021 204.979 283 193.85 283H112.15Z" />
                                        </mask>
                                        <path d="M92 372H87.52V376.48H92V372ZM92.057 372L96.5316 371.78L96.3225 367.52H92.057V372ZM96.6443 390.108L92.5964 392.027H92.5964L96.6443 390.108ZM129.657 418.945L131.181 414.732L129.657 418.945ZM153.001 423.001L153.001 418.521H153.001V423.001ZM176.344 418.945L174.82 414.732H174.82L176.344 418.945ZM196.134 407.394L193.187 404.02L196.134 407.394ZM209.357 390.108L213.405 392.027L209.357 390.108ZM213.944 372V367.52H209.679L209.47 371.78L213.944 372ZM214 372V376.48H218.48V372H214ZM214 369.861L209.52 369.847V369.861H214ZM214 369.717H218.48V365.237H214V369.717ZM214 369.717H209.52V374.197H214V369.717ZM96.48 303.15C96.48 294.496 103.496 287.48 112.15 287.48V278.52C98.5472 278.52 87.52 289.547 87.52 303.15H96.48ZM96.48 372V303.15H87.52V372H96.48ZM92.057 367.52H92V376.48H92.057V367.52ZM100.692 388.188C98.2078 382.949 96.8073 377.396 96.5316 371.78L87.5824 372.22C87.9172 379.039 89.6174 385.745 92.5964 392.027L100.692 388.188ZM112.815 404.02C107.589 399.456 103.481 394.07 100.692 388.188L92.5964 392.027C95.9385 399.076 100.817 405.437 106.92 410.768L112.815 404.02ZM131.181 414.732C124.278 412.234 118.041 408.586 112.815 404.02L106.92 410.768C113.022 416.098 120.234 420.3 128.133 423.158L131.181 414.732ZM153.001 418.521C145.5 418.521 138.085 417.23 131.181 414.732L128.133 423.158C136.031 426.015 144.48 427.481 153.001 427.481V418.521ZM174.82 414.732C167.917 417.23 160.501 418.521 153.001 418.521L153.001 427.481C161.521 427.481 169.97 426.015 177.868 423.158L174.82 414.732ZM193.187 404.02C187.96 408.586 181.723 412.234 174.82 414.732L177.868 423.158C185.767 420.3 192.979 416.098 199.081 410.768L193.187 404.02ZM205.309 388.188C202.52 394.07 198.412 399.456 193.187 404.02L199.081 410.768C205.184 405.437 210.063 399.076 213.405 392.027L205.309 388.188ZM209.47 371.78C209.194 377.396 207.793 382.949 205.309 388.188L213.405 392.027C216.384 385.745 218.084 379.039 218.419 372.22L209.47 371.78ZM214 367.52H213.944V376.48H214V367.52ZM209.52 369.861V372H218.48V369.861H209.52ZM209.52 369.717C209.52 369.76 209.52 369.804 209.52 369.847L218.48 369.874C218.48 369.822 218.48 369.77 218.48 369.717H209.52ZM214 374.197H214V365.237H214V374.197ZM209.52 303.15V369.717H218.48V303.15H209.52ZM193.85 287.48C202.504 287.48 209.52 294.496 209.52 303.15H218.48C218.48 289.547 207.453 278.52 193.85 278.52V287.48ZM112.15 287.48H193.85V278.52H112.15V287.48Z" fill="#16E16E" mask="url(#path-46-inside-8_131_9)" />
                                        <mask id="path-48-inside-9_131_9" fill="white">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1033.15 583C1022.02 583 1013 592.021 1013 603.15V672H1013.06C1013.36 678.218 1014.91 684.347 1017.64 690.108C1020.71 696.573 1025.2 702.447 1030.87 707.394C1036.53 712.342 1043.26 716.267 1050.66 718.945C1058.06 721.623 1065.99 723.001 1074 723.001C1082.01 723.001 1089.94 721.623 1097.34 718.945C1104.74 716.267 1111.47 712.342 1117.13 707.394C1122.8 702.447 1127.29 696.573 1130.36 690.108C1133.09 684.347 1134.64 678.218 1134.94 672H1135V669.861C1135 669.813 1135 669.765 1135 669.717H1135V603.15C1135 592.021 1125.98 583 1114.85 583H1033.15Z" />
                                        </mask>
                                        <path d="M1013 672H1008.52V676.48H1013V672ZM1013.06 672L1017.53 671.78L1017.32 667.52H1013.06V672ZM1017.64 690.108L1013.6 692.027H1013.6L1017.64 690.108ZM1050.66 718.945L1052.18 714.732L1050.66 718.945ZM1074 723.001L1074 718.521H1074V723.001ZM1097.34 718.945L1095.82 714.732H1095.82L1097.34 718.945ZM1117.13 707.394L1114.19 704.02L1117.13 707.394ZM1130.36 690.108L1134.4 692.027L1130.36 690.108ZM1134.94 672V667.52H1130.68L1130.47 671.78L1134.94 672ZM1135 672V676.48H1139.48V672H1135ZM1135 669.861L1130.52 669.847V669.861H1135ZM1135 669.717H1139.48V665.237H1135V669.717ZM1135 669.717H1130.52V674.197H1135V669.717ZM1017.48 603.15C1017.48 594.496 1024.5 587.48 1033.15 587.48V578.52C1019.55 578.52 1008.52 589.547 1008.52 603.15H1017.48ZM1017.48 672V603.15H1008.52V672H1017.48ZM1013.06 667.52H1013V676.48H1013.06V667.52ZM1021.69 688.188C1019.21 682.949 1017.81 677.396 1017.53 671.78L1008.58 672.22C1008.92 679.039 1010.62 685.745 1013.6 692.027L1021.69 688.188ZM1033.81 704.02C1028.59 699.456 1024.48 694.07 1021.69 688.188L1013.6 692.027C1016.94 699.076 1021.82 705.437 1027.92 710.768L1033.81 704.02ZM1052.18 714.732C1045.28 712.234 1039.04 708.586 1033.81 704.02L1027.92 710.768C1034.02 716.098 1041.23 720.3 1049.13 723.158L1052.18 714.732ZM1074 718.521C1066.5 718.521 1059.08 717.23 1052.18 714.732L1049.13 723.158C1057.03 726.015 1065.48 727.481 1074 727.481V718.521ZM1095.82 714.732C1088.92 717.23 1081.5 718.521 1074 718.521L1074 727.481C1082.52 727.481 1090.97 726.015 1098.87 723.158L1095.82 714.732ZM1114.19 704.02C1108.96 708.586 1102.72 712.234 1095.82 714.732L1098.87 723.158C1106.77 720.3 1113.98 716.098 1120.08 710.768L1114.19 704.02ZM1126.31 688.188C1123.52 694.07 1119.41 699.456 1114.19 704.02L1120.08 710.768C1126.18 705.437 1131.06 699.076 1134.4 692.027L1126.31 688.188ZM1130.47 671.78C1130.19 677.396 1128.79 682.949 1126.31 688.188L1134.4 692.027C1137.38 685.745 1139.08 679.039 1139.42 672.22L1130.47 671.78ZM1135 667.52H1134.94V676.48H1135V667.52ZM1130.52 669.861V672H1139.48V669.861H1130.52ZM1130.52 669.717C1130.52 669.76 1130.52 669.804 1130.52 669.847L1139.48 669.874C1139.48 669.822 1139.48 669.77 1139.48 669.717H1130.52ZM1135 674.197H1135V665.237H1135V674.197ZM1130.52 603.15V669.717H1139.48V603.15H1130.52ZM1114.85 587.48C1123.5 587.48 1130.52 594.496 1130.52 603.15H1139.48C1139.48 589.547 1128.45 578.52 1114.85 578.52V587.48ZM1033.15 587.48H1114.85V578.52H1033.15V587.48Z" fill="#16E16E" mask="url(#path-48-inside-9_131_9)" />
                                        <mask id="path-50-inside-10_131_9" fill="white">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M661.15 887C650.021 887 641 896.021 641 907.15V976H641.057C641.362 982.218 642.913 988.347 645.644 994.108C648.71 1000.57 653.203 1006.45 658.867 1011.39C664.532 1016.34 671.256 1020.27 678.657 1022.94C686.058 1025.62 693.99 1027 702.001 1027C710.011 1027 717.943 1025.62 725.344 1022.94C732.745 1020.27 739.47 1016.34 745.134 1011.39C750.798 1006.45 755.291 1000.57 758.357 994.108C761.089 988.347 762.639 982.218 762.944 976H763V973.861C763 973.813 763 973.765 763 973.717H763V907.15C763 896.021 753.979 887 742.85 887H661.15Z" />
                                        </mask>
                                        <path d="M641 976H636.52V980.48H641V976ZM641.057 976L645.532 975.78L645.322 971.52H641.057V976ZM645.644 994.108L641.596 996.027H641.596L645.644 994.108ZM678.657 1022.94L680.181 1018.73L678.657 1022.94ZM702.001 1027L702.001 1022.52H702.001V1027ZM725.344 1022.94L723.82 1018.73H723.82L725.344 1022.94ZM745.134 1011.39L742.187 1008.02L745.134 1011.39ZM758.357 994.108L762.405 996.027L758.357 994.108ZM762.944 976V971.52H758.679L758.47 975.78L762.944 976ZM763 976V980.48H767.48V976H763ZM763 973.861L758.52 973.847V973.861H763ZM763 973.717H767.48V969.237H763V973.717ZM763 973.717H758.52V978.197H763V973.717ZM645.48 907.15C645.48 898.496 652.496 891.48 661.15 891.48V882.52C647.547 882.52 636.52 893.547 636.52 907.15H645.48ZM645.48 976V907.15H636.52V976H645.48ZM641.057 971.52H641V980.48H641.057V971.52ZM649.692 992.188C647.208 986.949 645.807 981.396 645.532 975.78L636.582 976.22C636.917 983.039 638.617 989.745 641.596 996.027L649.692 992.188ZM661.815 1008.02C656.589 1003.46 652.481 998.07 649.692 992.188L641.596 996.027C644.939 1003.08 649.817 1009.44 655.92 1014.77L661.815 1008.02ZM680.181 1018.73C673.278 1016.23 667.041 1012.59 661.815 1008.02L655.92 1014.77C662.022 1020.1 669.234 1024.3 677.133 1027.16L680.181 1018.73ZM702.001 1022.52C694.5 1022.52 687.085 1021.23 680.181 1018.73L677.133 1027.16C685.031 1030.02 693.48 1031.48 702.001 1031.48V1022.52ZM723.82 1018.73C716.917 1021.23 709.501 1022.52 702.001 1022.52L702.001 1031.48C710.521 1031.48 718.97 1030.02 726.868 1027.16L723.82 1018.73ZM742.187 1008.02C736.96 1012.59 730.723 1016.23 723.82 1018.73L726.868 1027.16C734.767 1024.3 741.979 1020.1 748.081 1014.77L742.187 1008.02ZM754.309 992.188C751.52 998.07 747.412 1003.46 742.187 1008.02L748.081 1014.77C754.184 1009.44 759.063 1003.08 762.405 996.027L754.309 992.188ZM758.47 975.78C758.194 981.396 756.793 986.949 754.309 992.188L762.405 996.027C765.384 989.745 767.084 983.039 767.419 976.22L758.47 975.78ZM763 971.52H762.944V980.48H763V971.52ZM758.52 973.861V976H767.48V973.861H758.52ZM758.52 973.717C758.52 973.76 758.52 973.804 758.52 973.847L767.48 973.874C767.48 973.822 767.48 973.77 767.48 973.717H758.52ZM763 978.197H763V969.237H763V978.197ZM758.52 907.15V973.717H767.48V907.15H758.52ZM742.85 891.48C751.504 891.48 758.52 898.496 758.52 907.15H767.48C767.48 893.547 756.453 882.52 742.85 882.52V891.48ZM661.15 891.48H742.85V882.52H661.15V891.48Z" fill="#16E16E" mask="url(#path-50-inside-10_131_9)" />
                                        <rect x="884" y="189" width="4" height="98" fill="#16E16E" />
                                        <path d="M1267.51 412.655C1260.62 424.595 1243.38 424.595 1236.49 412.655L1176.99 309.605C1170.1 297.665 1178.72 282.74 1192.5 282.74H1311.5C1325.28 282.74 1333.9 297.665 1327.01 309.605L1267.51 412.655Z" stroke="#16E16E" stroke-width="4.48" />
                                        <mask id="path-54-inside-11_131_9" fill="white">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M845.15 283C834.021 283 825 292.021 825 303.15V372H825.057C825.362 378.218 826.913 384.347 829.644 390.108C832.71 396.573 837.203 402.447 842.867 407.394C848.532 412.342 855.256 416.267 862.657 418.945C870.058 421.623 877.99 423.001 886.001 423.001C894.011 423.001 901.943 421.623 909.344 418.945C916.745 416.267 923.47 412.342 929.134 407.394C934.798 402.447 939.291 396.573 942.357 390.108C945.089 384.347 946.639 378.218 946.944 372H947V369.861C947 369.813 947 369.765 947 369.717H947V303.15C947 292.021 937.979 283 926.85 283H845.15Z" />
                                        </mask>
                                        <path d="M825 372H820.52V376.48H825V372ZM825.057 372L829.532 371.78L829.322 367.52H825.057V372ZM829.644 390.108L825.596 392.027H825.596L829.644 390.108ZM862.657 418.945L864.181 414.732L862.657 418.945ZM886.001 423.001L886.001 418.521H886.001V423.001ZM909.344 418.945L907.82 414.732H907.82L909.344 418.945ZM929.134 407.394L926.187 404.02L929.134 407.394ZM942.357 390.108L946.405 392.027L942.357 390.108ZM946.944 372V367.52H942.679L942.47 371.78L946.944 372ZM947 372V376.48H951.48V372H947ZM947 369.861L942.52 369.847V369.861H947ZM947 369.717H951.48V365.237H947V369.717ZM947 369.717H942.52V374.197H947V369.717ZM829.48 303.15C829.48 294.496 836.496 287.48 845.15 287.48V278.52C831.547 278.52 820.52 289.547 820.52 303.15H829.48ZM829.48 372V303.15H820.52V372H829.48ZM825.057 367.52H825V376.48H825.057V367.52ZM833.692 388.188C831.208 382.949 829.807 377.396 829.532 371.78L820.582 372.22C820.917 379.039 822.617 385.745 825.596 392.027L833.692 388.188ZM845.815 404.02C840.589 399.456 836.481 394.07 833.692 388.188L825.596 392.027C828.939 399.076 833.817 405.437 839.92 410.768L845.815 404.02ZM864.181 414.732C857.278 412.234 851.041 408.586 845.815 404.02L839.92 410.768C846.022 416.098 853.234 420.3 861.133 423.158L864.181 414.732ZM886.001 418.521C878.5 418.521 871.085 417.23 864.181 414.732L861.133 423.158C869.031 426.015 877.48 427.481 886.001 427.481V418.521ZM907.82 414.732C900.917 417.23 893.501 418.521 886.001 418.521L886.001 427.481C894.521 427.481 902.97 426.015 910.868 423.158L907.82 414.732ZM926.187 404.02C920.96 408.586 914.723 412.234 907.82 414.732L910.868 423.158C918.767 420.3 925.979 416.098 932.081 410.768L926.187 404.02ZM938.309 388.188C935.52 394.07 931.412 399.456 926.187 404.02L932.081 410.768C938.184 405.437 943.063 399.076 946.405 392.027L938.309 388.188ZM942.47 371.78C942.194 377.396 940.793 382.949 938.309 388.188L946.405 392.027C949.384 385.745 951.084 379.039 951.419 372.22L942.47 371.78ZM947 367.52H946.944V376.48H947V367.52ZM942.52 369.861V372H951.48V369.861H942.52ZM942.52 369.717C942.52 369.76 942.52 369.804 942.52 369.847L951.48 369.874C951.48 369.822 951.48 369.77 951.48 369.717H942.52ZM947 374.197H947V365.237H947V374.197ZM942.52 303.15V369.717H951.48V303.15H942.52ZM926.85 287.48C935.504 287.48 942.52 294.496 942.52 303.15H951.48C951.48 289.547 940.453 278.52 926.85 278.52V287.48ZM845.15 287.48H926.85V278.52H845.15V287.48Z" fill="#16E16E" mask="url(#path-54-inside-11_131_9)" />
                                    </svg>
                                </div>
                            </div>
                            <div id='lvl-main'>
                                <div id='lvl-container' style={{ whiteSpace: "pre" }}>
                                    <div id='top-desc'>
                                        <Image id="auth-image" width={0} height={0} sizes={1000} src={level?.authfromphoto} alt="user" />
                                        <div>
                                            <p id='lvl-name'>{"Level " + level?.levelNumber}</p>
                                            <p id='lvl-type'>Type: {level?.leveltype}</p>
                                        </div>
                                    </div>
                                    {level?.image ?
                                        <Image id="lvl-image" width={0} height={0} sizes={1000} src={level?.image} alt="user" /> : null}

                                    <p id='hint'>Get Authorisation from: {level?.authFrom}</p><br></br>

                                    <p id='deactivate-text' style={{ whiteSpace: "pre" }}>Password Hint: {level?.maintext}</p><br></br>
                                    <div id="field">
                                        <input onChange={textchange} oninput="textchange()" type="text" id="maintext" name="maintext" placeholder="Password" />
                                        <button className="try-here" id="try-here" onClick={submit}>Submit</button>
                                    </div>
                                    {level?.sourceCodeHint ? <div style={{ display: 'none' }}>
                                        {level?.sourceCodeHint}</div> : null}<br></br>
                                </div>
                            </div>

                            <Navbar user={user} />
                        </>
                        : ""}
                </>
                : <h1> The hunt is complete </h1>
            }
        </>

    )
}
