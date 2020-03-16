import * as React from 'react'
import { encodePathAsUrl, staticPath } from '../../lib/path'

const TimesupSound = encodePathAsUrl(
  staticPath(),
  'timesup.mp3'
)

export class TimesupView extends React.Component<{}, {}> {

  public componentWillMount() {
    const audio = new Audio(TimesupSound)
    audio.play()
  }

  public render() { 
    return (
      <div className="timesup-container">
        <div className="text">Time's Up!</div>
        <div className="directions">Press SPACE BAR to reset, ESC to exit</div>
      </div>
    )
  }
}