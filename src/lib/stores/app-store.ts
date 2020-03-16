import { 
  IAppState,
  ViewType
} from '../app-state'
import { TypedBaseStore } from './base-store'
import { duration } from 'moment'

const defaultStartTime = 600

export class AppStore extends TypedBaseStore<IAppState> {

  private emitQueued = false

  private selectedView: ViewType | null = null
  private seconds: number = defaultStartTime
  private timesup: boolean = false
  private timeString: string = ''
  private timeInterval: any = null
  private countingdown: boolean = false

  protected emitUpdate() {
    if (this.emitQueued) {
      return
    }
    this.emitQueued = true
    this.emitUpdateNow()
  }

  private emitUpdateNow() {
    this.emitQueued = false
    const state = this.getState()
    super.emitUpdate(state)
  }

  public getState(): IAppState {
    return {
      selectedView: this.selectedView,
      seconds: this.seconds,
      timesup: this.timesup,
      timeString: this.timeString,
      countingdown: this.countingdown
    }
  }

  public async loadInitialState() {
    this._setTime(this.seconds)
    this.emitUpdateNow()
  }

  public async _setTime(seconds: number) {
    this.seconds = seconds
    this.timeString = this.secondsToString(seconds)
    this.emitUpdate()
  }

  public async _startTimer() {
    this.timesup = false
    this.countingdown = true
    this.timeInterval = window.setInterval(() => {
      const newSeconds = this.seconds - 1
      this._setTime(newSeconds)
      if (newSeconds <= 0) {
        this.timesup = true
        this._stopTimer()
        this._setTime(defaultStartTime)
      }
    }, 1000)
    this.emitUpdate()
  }

  public async _clearTimer() {
    this._stopTimer()
    this.timesup = false
    this._setTime(defaultStartTime)
  }

  public async _addMinute() {
    this._setTime(this.seconds + 60)
  }

  public async _subtractMinute() {
    if (this.seconds < 60) {
      return
    }
    this._setTime(this.seconds - 60)
  }

  public async _stopTimer() {
    this.countingdown = false
    window.clearInterval(this.timeInterval)
    this.emitUpdate()
  }

  private secondsToString(seconds: number): string {
    const time = duration(seconds, 'seconds')
    const sec = time.seconds() < 10 ? ('0' + time.seconds()) : time.seconds()
    const min = time.minutes()

    return `${min}:${sec}`
  }

}