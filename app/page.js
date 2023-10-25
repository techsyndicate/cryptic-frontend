"use client"
import { useEffect, useState } from 'react';
//import Image from 'next/image'
import styles from './page.module.css'
import { ReactTerminal } from "react-terminal";
import { TerminalContextProvider } from "react-terminal";
import React from "react";
import { getFrontendUrl } from './utils/misc';
import Navbar from 'components/navbar';
import { getUser } from './utils/getData';

export default function Home() {
  const [theme, setTheme] = React.useState("material-ocean");
  const [controlBar, setControlBar] = React.useState(true);
  const [controlButtons, setControlButtons] = React.useState(true);
  const [prompt, setPrompt] = React.useState(">>>");
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [school, setSchool] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await getUser().then(res => {
        console.log(res)
        if (res.success) {
          setUser(res);
        }
      })
    }
    fetchData();
  }, [])
  // Define commands here
  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the terminal. <br />
        <strong>login</strong> - login to the utility. <br />
        <strong>register</strong> - protected. <br />
        <strong>logout</strong> - logs you out. <br />
      </span>
    ),

    login: () => {
      window.open(getFrontendUrl() + "discord-back/auth/login", "_blank");
      return "Redirecting to discord auth!"
    },

    register: async (x) => {
      return "You don't have the neccessary permissions to register a new user. Try root."
    },
    
    sudo: async (x) => {
      if (x === "register") {
        setIsRegistering(true);
        setPrompt("Please enter the refferer: ");
        return "Hint: Mr. robot"
      } else {
        return `Sudo command not found: ${x}`;
      }
    },
    logout: async ()=> {
      await fetch(getFrontendUrl() + "auth/logout", {
        method: "GET",
        credentials: "include"
      }).then(res => res.json()).then(res => {
        if (res.success) {
          window.location.href = "/";
        }
      })
    }
  };

  const DefaultHandler = (command, commandArguments) => {
    console.log(prompt == "Enter TSadmin's password: ", command == "TSadmin@1234")

    if (isRegistering) {
      if (command == "TSadmin") {
        setPrompt(`Enter TSadmin's password: `);
        return;
      }
      else if (prompt == "Enter TSadmin's password: " && command == "TSadmin@1234") {
        console.log("here")
        setPrompt("Enter School Name: (no special characters)");
      } else if (prompt == "Enter School Name: (no special characters)") {
        setSchool(command.replace(/[^a-zA-Z0-9]/g, ''));
        setPrompt("Enter Your Full Name: ");
      } else if (prompt == "Enter Your Full Name: ") {
        setName(command.replace(/[^a-zA-Z0-9]/g, ''));
        setPrompt("Enter Your Discord Account Public Email: ");
      } else if (prompt == "Enter Your Discord Account Public Email: ") {
        setPrompt(">>>");
        window.open(getFrontendUrl() + "discord-back/auth/register?school=" + school + "&name=" + name + "&email=" + command, "_blank");
        setIsRegistering(false);
        return "Redirecting.";
      }
       else {
        setIsRegistering(false);
        setPrompt(">>>");
        return ("Exiting.");
      }
    } else {
      setPrompt(">>>");
      return `Command not found: ${command}`;
    }
  }

  const welcomeMessage = (
    <span>Type &quot;help&quot; for all available commands.<br></br>

      &nbsp;__&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>
      &nbsp;\&nbsp;\&nbsp;/&nbsp;/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;____|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>
      &nbsp;&nbsp;\&nbsp;V&nbsp;/|&nbsp;|&nbsp;_____&nbsp;_&nbsp;&nbsp;&nbsp;_|&nbsp;(___&nbsp;&nbsp;&nbsp;___&nbsp;___&nbsp;&nbsp;_&nbsp;__&nbsp;___&nbsp;<br></br>
      &nbsp;&nbsp;&nbsp;{'>'}&nbsp;{'<'}&nbsp;|&nbsp;|/&nbsp;/&nbsp;_&nbsp;\&nbsp;|&nbsp;|&nbsp;|\___&nbsp;\&nbsp;/&nbsp;__/&nbsp;_&nbsp;\|&nbsp;&apos;__/&nbsp;_&nbsp;\<br></br>
      &nbsp;&nbsp;/&nbsp;.&nbsp;\|&nbsp;&nbsp;&nbsp;{'<'}&nbsp;&nbsp;__/&nbsp;|_|&nbsp;|____)&nbsp;|&nbsp;(_|&nbsp;(_)&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;__/<br></br>
      &nbsp;/_/&nbsp;\_\_|\_\___|\__,&nbsp;|_____/&nbsp;\___\___/|_|&nbsp;&nbsp;\___|<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br></br>

      <br></br>

      &nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;_____&nbsp;______&nbsp;_______&nbsp;&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
      &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|/&nbsp;____|&nbsp;&nbsp;____|__&nbsp;&nbsp;&nbsp;__|&nbsp;&nbsp;/&nbsp;____|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;(_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
      &nbsp;|&nbsp;|__&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;|&nbsp;|__|&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|__&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;(___&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__|&nbsp;|_&nbsp;&nbsp;___&nbsp;__&nbsp;_|&nbsp;|_&nbsp;___&nbsp;<br />
      &nbsp;|&nbsp;&apos;_&nbsp;\|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;__&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;__|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\___&nbsp;\|&nbsp;|&nbsp;|&nbsp;|&nbsp;&apos;_&nbsp;\&nbsp;/&nbsp;_`&nbsp;|&nbsp;|/&nbsp;__/&nbsp;_`&nbsp;|&nbsp;__/&nbsp;_&nbsp;\<br />
      &nbsp;|&nbsp;|_)&nbsp;|&nbsp;|_|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;|____|&nbsp;|____&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____)&nbsp;|&nbsp;|_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;{"("}_|&nbsp;|&nbsp;|&nbsp;{"("}_|&nbsp;{"("}_|&nbsp;|&nbsp;||&nbsp;&nbsp;__/<br />
      &nbsp;|_.__/&nbsp;\__,&nbsp;|&nbsp;|_|&nbsp;&nbsp;|_|\_____|______|&nbsp;&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;|_____/&nbsp;\__,&nbsp;|_|&nbsp;|_|\__,_|_|\___\__,_|\__\___|<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br />
      <br></br></span>
  )

  return (
    <div>
      <div className={styles.terminal}>
        <TerminalContextProvider>
          <ReactTerminal
            prompt={prompt}
            theme={theme}
            showControlBar={controlBar}
            showControlButtons={controlButtons}
            welcomeMessage={welcomeMessage}
            commands={commands}
            enableInput={true}
            defaultHandler={DefaultHandler}
          />
        </TerminalContextProvider>
      </div>
      <Navbar user={user} />

    </div>
  )
}
