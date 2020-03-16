import * as React from 'react'
import { Dispatcher } from '../lib/dispatcher'
import { AppStore } from '../lib/stores'
import { 
  IAppState
} from '../lib/app-state'
import { UiView } from './ui-view'
import { TimerView } from './timer'
import { TimesupView } from './timer/timesup-view'
import { ipcRenderer } from 'electron'

interface IAppProps {
  readonly appStore: AppStore
  readonly dispatcher: Dispatcher
}

export class App extends React.Component<IAppProps, IAppState> {

  public constructor(props: IAppProps) {
    super(props)

    props.dispatcher.loadInitialState()

    this.state = props.appStore.getState()
    props.appStore.onDidUpdate(state => {
      this.setState(state)
    })

    document.addEventListener('keydown', this.handleKeyDown)
  }

  public render() {
    return (
      <div id="app-container">
        {this.renderApp()}
      </div>
    )
  }

  private renderApp() {
    const state = this.state

    if (state.timesup) {
      return (
        <UiView id="timesup">
          <TimesupView />
        </UiView>
      )
    }

    return (
      <UiView id="countdown">
        <TimerView
          time={state.timeString}
        />
      </UiView>
    )
  }

  private handleKeyDown = (e: KeyboardEvent) => {
    const state = this.state

    if (e.key === 'ArrowUp') {
      this.props.dispatcher.addMinute()
    }
    else if (e.key === 'ArrowDown') {
      this.props.dispatcher.subtractMinute()
    }
    else if (e.key === 'Escape') {
      this.props.dispatcher.clearTimer()
      ipcRenderer.send('kiosk', false)
    }
    else if (e.key === ' ') {
      if (state.countingdown) {
        this.props.dispatcher.stopTimer()
      }
      else {
        this.props.dispatcher.startTimer()
        ipcRenderer.send('kiosk', true)
      }
    }
  }

}