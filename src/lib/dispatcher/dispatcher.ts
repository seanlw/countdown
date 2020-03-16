import { AppStore } from '../stores'

export class Dispatcher {
  private readonly appStore: AppStore

  public constructor(appStore: AppStore) {
    this.appStore = appStore
  }

  public loadInitialState(): Promise<void> {
    return this.appStore.loadInitialState()
  }

  public addMinute(): Promise<void> {
    return this.appStore._addMinute()
  }

  public subtractMinute(): Promise<void> {
    return this.appStore._subtractMinute()
  }

  public startTimer(): Promise<void> {
    return this.appStore._startTimer()
  }

  public stopTimer(): Promise<void> {
    return this.appStore._stopTimer()
  }

  public clearTimer(): Promise<void> {
    return this.appStore._clearTimer()
  }
}