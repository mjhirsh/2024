import { SantaCommunicator } from '../src/santaCommunicator'
import { TestLogger } from './doubles/testLogger'

const dasher = {
  name: 'Dasher',
  currentLocation: 'North Pole',
  numberOfDaysForComingBack: 5,
  numberOfDaysToRest: 2,
}

const numberOfDaysBeforeChristmas = 24

describe('SantaCommunicator', () => {
  let communicator: SantaCommunicator
  let logger: TestLogger

  beforeEach(() => {
    communicator = new SantaCommunicator(dasher)
    logger = new TestLogger()
  })

  test('composeMessage', () => {
    const message = communicator.composeMessage(numberOfDaysBeforeChristmas)
    expect(message).toEqual(
      'Dear Dasher, please return from North Pole in 17 day(s) to be ready and rest before Christmas.'
    )
  })

  test('shouldDetectOverdueReindeer', () => {
    const numberOfDaysBeforeChristmas = 5
    const overdue = communicator.isOverdue(
      dasher,
      numberOfDaysBeforeChristmas,
      logger
    )

    expect(overdue).toBeTruthy()
    expect(logger.getLog()).toEqual('Overdue for Dasher located North Pole.')
  })

  test('shouldReturnFalseWhenNoOverdue', () => {
    const numberOfDayBeforeChristmas = 25
    const overdue = communicator.isOverdue(
      dasher,
      numberOfDayBeforeChristmas,
      logger
    )
    expect(overdue).toBeFalsy()
  })
})
