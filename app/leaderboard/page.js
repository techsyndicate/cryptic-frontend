"use client"
import React, { useEffect, useState } from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'
import styles from '../page.module.css'
import Navbar from '@/components/navbar';
import { getUser } from '../utils/getData';
import { getFrontendUrl } from '../utils/misc';

export default function LeaderBoard() {
    const [theme, setTheme] = useState("material-ocean");
    const [controlBar, setControlBar] = useState(true);
    const [controlButtons, setControlButtons] = useState(true);

    const [user, setUser] = useState(null);
    const [leaderboard, setLeaderboard] = useState(null);

    useEffect(() => {
        async function fetchData() {
            await getUser().then(res => {
                console.log(res)
                if (res.success) {
                    setUser(res);
                }
            })
            await fetch(getFrontendUrl() + 'admin/leaderboard').then(res => res.json()).then(res => {
                console.log(res)
                if (res.success) {
                    setLeaderboard(res.users)
                }
            })
        }
        fetchData();
    }, [])

    function repeatStringNumTimes(string, times) {
        var repeatedString;
        while (times > 0) {
            repeatedString += string;
            times--;
        }
        return repeatedString;
    }


    const welcomeMessage = (
        <span style={{whiteSpace:'pre'}}>

            &nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;<br></br>
            &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|<br></br>
            &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;__&nbsp;_&nbsp;&nbsp;__|&nbsp;|&nbsp;___&nbsp;_&nbsp;__|&nbsp;|__&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;__&nbsp;_&nbsp;_&nbsp;__&nbsp;__|&nbsp;|<br></br>
            &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;_&nbsp;\/&nbsp;_`&nbsp;|/&nbsp;_`&nbsp;|/&nbsp;_&nbsp;\&nbsp;&apos;__|&nbsp;&apos;_&nbsp;\&nbsp;/&nbsp;_&nbsp;\&nbsp;/&nbsp;_`&nbsp;|&nbsp;&apos;__/&nbsp;_`&nbsp;|<br></br>
            &nbsp;|&nbsp;|___|&nbsp;&nbsp;__/&nbsp;{"("}_|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;|&nbsp;|_)&nbsp;|&nbsp;(_)&nbsp;|&nbsp;{"("}_|&nbsp;|&nbsp;|&nbsp;|&nbsp;{"("}_|&nbsp;|<br></br>
            &nbsp;|______\___|\__,_|\__,_|\___|_|&nbsp;&nbsp;|_.__/&nbsp;\___/&nbsp;\__,_|_|&nbsp;&nbsp;\__,_|<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>
            <br></br>
            {
                leaderboard ? leaderboard.map((user, index) => {
                    return (
                        <span key={index}>
                            {console.log(" ".repeat(20 - (user.name.toString()).length))}
                            {index + "."} {" ".repeat(5 - (index + 1 + ".").toString().length) + "|"} {user.name} {" ".repeat(20 - (user.name.toString()).length) + "|"} {user?.discord} {" ".repeat(20 - ((user?.discord?.toString())?.length) || 0) + "|"}  {user.points.toString() + " ".repeat(20 - (user.name.toString()).length)}
                            <br></br>
                        </span>
                    )
                }) : null
            }
            <br></br>
            Only God and top 5 are shown 🛐
            <br></br></span>
    );
    return (
        <>
        {leaderboard?
            <div className={styles.terminal}>
                <TerminalContextProvider>
                    <ReactTerminal
                        theme={theme}
                        showControlBar={controlBar}
                        showControlButtons={controlButtons}
                        welcomeMessage={welcomeMessage}
                        enableInput={false}
                    />
                </TerminalContextProvider>
            </div>:null}
            <Navbar user={user} />
        </>

    )
}
