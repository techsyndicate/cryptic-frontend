"use client"
import { useState } from 'react';
//import Image from 'next/image'
import styles from './page.module.css'
import { ReactTerminal } from "react-terminal";
import { TerminalContextProvider } from "react-terminal";
import React from "react";
import { getFrontendUrl } from './utils/misc';

export default function Home() {
  //     "light",
  //     "dark",
  //     "material-light",
  //     "material-dark",
  //     "material-ocean",
  //     "matrix",
  //     "dracula",
  const [theme, setTheme] = React.useState("material-ocean");
  const [controlBar, setControlBar] = React.useState(true);
  const [controlButtons, setControlButtons] = React.useState(true);
  const [prompt, setPrompt] = React.useState(">>>");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);

  // Define commands here
  const commands = {
    help: (
      <span>
        <strong>clear</strong> - clears the CIA Firewall terminal. <br />
        <strong>login</strong> - login to the CIA Firewall utility. <br />
        <strong>register</strong> - you need a special refferer and refferer password to register. <br />
      </span>
    ),

    login: () => {
      window.open(getFrontendUrl() + "discord-back/auth/login", "_blank" );
      return "Redirecting to discord auth!"
    },

    register: async (x) => {
      return "You don't have the neccessary permissions to register a new user. Try root."
    },
    "sudo": async (x) => {
      if (x === "register") {
        setIsRegistering(true);
        setPrompt("Please enter the refferer: ");
        return "Hint: Mr. robot"
      } else {
        return `Command not found: ${x}`;
      }
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
        setPrompt(">>>");
        setIsRegistering(false);
        return ("Redirecting to discord auth!");
      } else {
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
      &nbsp;&nbsp;&nbsp;_____&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;______&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;&nbsp;/&nbsp;____|_&nbsp;&nbsp;&nbsp;_|&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;____(_)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;(_)&nbsp;(_)&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;\&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|__&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;__&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;____&nbsp;_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;|_&nbsp;_|&nbsp;|_|&nbsp;|_&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;
      &nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;/&nbsp;/\&nbsp;\&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;__|&nbsp;|&nbsp;|&nbsp;&apos;__/&nbsp;_&nbsp;\&nbsp;\&nbsp;/\&nbsp;/&nbsp;/&nbsp;_`&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;|&nbsp;|&nbsp;__|&nbsp;|&nbsp;|&nbsp;|&nbsp;__|&nbsp;|&nbsp;|&nbsp;|
      &nbsp;|&nbsp;|____&nbsp;_|&nbsp;|_&nbsp;/&nbsp;____&nbsp;\&nbsp;&nbsp;|&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;__/\&nbsp;V&nbsp;&nbsp;V&nbsp;/&nbsp;(_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;|__|&nbsp;|&nbsp;|_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|_|&nbsp;|_|&nbsp;|
      &nbsp;&nbsp;\_____|_____/_/&nbsp;&nbsp;&nbsp;&nbsp;\_\&nbsp;|_|&nbsp;&nbsp;&nbsp;&nbsp;|_|_|&nbsp;&nbsp;\___|&nbsp;\_/\_/&nbsp;\__,_|_|_|&nbsp;&nbsp;\____/&nbsp;\__|_|_|_|\__|\__,&nbsp;|
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;__/&nbsp;|
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;


      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;___&nbsp;&nbsp;&nbsp;__&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      &nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_____&nbsp;_&nbsp;__&nbsp;___&nbsp;&nbsp;__|&nbsp;|&nbsp;|&nbsp;|__&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;&nbsp;/\&nbsp;&nbsp;/\/&nbsp;__\&nbsp;/__\/__&nbsp;&nbsp;&nbsp;\&nbsp;&nbsp;___&nbsp;_&nbsp;&nbsp;&nbsp;_&nbsp;_&nbsp;__&nbsp;&nbsp;&nbsp;__|&nbsp;(_)&nbsp;___&nbsp;__&nbsp;_|&nbsp;|_&nbsp;___&nbsp;&nbsp;
      |&nbsp;&apos;_&nbsp;\&nbsp;/&nbsp;_&nbsp;\&nbsp;\&nbsp;/\&nbsp;/&nbsp;/&nbsp;_&nbsp;\&nbsp;&apos;__/&nbsp;_&nbsp;\/&nbsp;_`&nbsp;|&nbsp;|&nbsp;&apos;_&nbsp;\|&nbsp;|&nbsp;|&nbsp;|&nbsp;&nbsp;/&nbsp;/_/&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;/_\&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;/\/&nbsp;/&nbsp;__|&nbsp;|&nbsp;|&nbsp;|&nbsp;&apos;_&nbsp;\&nbsp;/&nbsp;_`&nbsp;|&nbsp;|/&nbsp;__/&nbsp;_`&nbsp;|&nbsp;__/&nbsp;_&nbsp;\&nbsp;
      |&nbsp;|_)&nbsp;|&nbsp;(_)&nbsp;\&nbsp;V&nbsp;&nbsp;V&nbsp;/&nbsp;&nbsp;__/&nbsp;|&nbsp;|&nbsp;&nbsp;__/&nbsp;(_|&nbsp;|&nbsp;|&nbsp;|_)&nbsp;|&nbsp;|_|&nbsp;|&nbsp;/&nbsp;__&nbsp;&nbsp;/&nbsp;/___//__&nbsp;&nbsp;&nbsp;/&nbsp;/&nbsp;&nbsp;&nbsp;&nbsp;\__&nbsp;\&nbsp;|_|&nbsp;|&nbsp;|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;|&nbsp;|&nbsp;(_|&nbsp;(_|&nbsp;|&nbsp;||&nbsp;&nbsp;__/&nbsp;
      |&nbsp;.__/&nbsp;\___/&nbsp;\_/\_/&nbsp;\___|_|&nbsp;&nbsp;\___|\__,_|&nbsp;|_.__/&nbsp;\__,&nbsp;|&nbsp;\/&nbsp;/_/\____/\__/&nbsp;&nbsp;&nbsp;\/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/\__,&nbsp;|_|&nbsp;|_|\__,_|_|\___\__,_|\__\___|&nbsp;
      |_|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|___/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <br></br></span>)

  return (
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
  )
}
