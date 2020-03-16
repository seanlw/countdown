export enum ViewType {
  Countdown,
  Timeup
}

export interface IAppState {
  readonly selectedView: ViewType | null
  readonly seconds: number
  readonly countingdown: boolean
  readonly timeString: string
  readonly timesup: boolean
}

export enum UpdateStatus {
  Checking,
  UpdateAvailable,
  UpdateNotAvailable,
  UpdateReady
}

export interface IUpdateState {
  status: UpdateStatus
  lastCheck: Date | null
}