import { Routine } from '../src/routine/routine'
import { Schedule } from '../src/routine/schedule'
import {
  EmailServiceDouble,
  ReindeerFeederDouble,
  ScheduleServiceDouble,
} from './doubles'

const reindeerFeeder = {
  feedReindeers: jest.fn(),
}

const emailService = {
  readNewEmails: jest.fn(),
}

const schedule = new Schedule()
const scheduleService = {
  todaySchedule: jest.fn(() => schedule),
  organizeMyDay: jest.fn(),
  continueDay: jest.fn(),
}

describe('Routine', () => {
  test('start routine with Jest', () => {
    const routine = new Routine(emailService, scheduleService, reindeerFeeder)
    const feedReindeerSpy = jest.spyOn(reindeerFeeder, 'feedReindeers')
    const readNewEmailsSpy = jest.spyOn(emailService, 'readNewEmails')
    const organizeMyDaySpy = jest.spyOn(scheduleService, 'organizeMyDay')
    const continueDaySpy = jest.spyOn(scheduleService, 'continueDay')

    routine.start()
    expect(feedReindeerSpy).toHaveBeenCalled()
    expect(readNewEmailsSpy).toHaveBeenCalled()
    expect(organizeMyDaySpy).toHaveBeenCalledWith(schedule)
    expect(continueDaySpy).toHaveBeenCalled()
  })

  test('start routine with manual test doubles', () => {
    const emailService = new EmailServiceDouble()
    const scheduleService = new ScheduleServiceDouble()
    const reindeerFeeder = new ReindeerFeederDouble()
    const routine = new Routine(emailService, scheduleService, reindeerFeeder)

    routine.start()
    expect(reindeerFeeder.feedReindeersWasCalled()).toBe(true)
    expect(emailService.readNewEmailsWasCalled()).toBe(true)
    expect(scheduleService.organizeMyDayWasCalledWithSchedule()).toBe(true)
    expect(scheduleService.continueDayWasCalled()).toBe(true)
  })
})
