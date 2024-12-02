import { Logger } from './logger'

interface Raindeer {
  name: string
  currentLocation: string
  numberOfDaysForComingBack: number
  numberOfDaysToRest: number
}

export class SantaCommunicator {
  constructor(private raindeer: Raindeer) {}

  public composeMessage(numberOfDaysBeforeChristmas: number): string {
    const daysBeforeReturn = this.daysBeforeReturn(numberOfDaysBeforeChristmas)
    return `Dear ${this.raindeer.name}, please return from ${this.raindeer.currentLocation} in ${daysBeforeReturn} day(s) to be ready and rest before Christmas.`
  }

  public isOverdue(
    raindeer,
    numberOfDaysBeforeChristmas: number,
    logger: Logger
  ): boolean {
    if (this.daysBeforeReturn(numberOfDaysBeforeChristmas) <= 0) {
      logger.log(
        `Overdue for ${raindeer.name} located ${raindeer.currentLocation}.`
      )
      return true
    }
    return false
  }

  private daysBeforeReturn(numberOfDaysBeforeChristmas: number): number {
    return (
      numberOfDaysBeforeChristmas -
      this.raindeer.numberOfDaysForComingBack -
      this.raindeer.numberOfDaysToRest
    )
  }
}
