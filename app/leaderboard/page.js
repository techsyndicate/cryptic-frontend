import React from 'react'
import { ReactTerminal, TerminalContextProvider } from 'react-terminal'

export default function LeaderBoard() {

  return (
      <div className={styles.terminal}>
          {/* <TerminalContextProvider>
              <ReactTerminal
                  prompt={prompt}
                  theme={theme}
                  showControlBar={controlBar}
                  showControlButtons={controlButtons}
                  welcomeMessage={welcomeMessage}
                  enableInput={false}
                  defaultHandler={DefaultHandler}
              />
          </TerminalContextProvider> */}
      </div>

  )
}
