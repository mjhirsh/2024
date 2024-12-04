import { Schedule } from '../src/routine/schedule'

export class ReindeerFeederDouble {
  private _feedReindeersWasCalled = false
  feedReindeers() {
    this._feedReindeersWasCalled = true
  }
  feedReindeersWasCalled() {
    return this._feedReindeersWasCalled
  }
}

export class EmailServiceDouble {
  private _readNewEmailsWasCalled = false
  readNewEmails() {
    this._readNewEmailsWasCalled = true
  }
  readNewEmailsWasCalled() {
    return this._readNewEmailsWasCalled
  }
}

export class ScheduleServiceDouble {
  private _continueDayWasCalled = false
  private _organizeMyDayWasCalledWithSchedule = false

  todaySchedule() {
    return new Schedule()
  }

  organizeMyDay(schedule: Schedule) {
    this._organizeMyDayWasCalledWithSchedule = schedule instanceof Schedule
  }

  organizeMyDayWasCalledWithSchedule() {
    return this._organizeMyDayWasCalledWithSchedule
  }

  continueDay() {
    this._continueDayWasCalled = true
  }

  continueDayWasCalled() {
    return this._continueDayWasCalled
  }
}
