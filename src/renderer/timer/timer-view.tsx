import * as React from 'react'

interface ITimerViewProps {
  readonly time: string
}

export class TimerView extends React.Component<ITimerViewProps, {}> {

  public render() { 
    return (
      <div className="timer-container">
        <div className="time">{this.props.time}</div>
      </div>
    )
  }
}