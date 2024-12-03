import { SantaWorkshopService } from '../src/santaWorkshopService'
import { Gift } from '../src/gift'
import fc from 'fast-check'

fc.configureGlobal({ numRuns: 1_000_000 })

describe('SantaWorkshopService', () => {
  let service: SantaWorkshopService

  beforeEach(() => {
    service = new SantaWorkshopService()
  })

  it('should prepare a gift with valid parameters', () => {
    const giftName = 'Bitzee'
    const weight = 3
    const color = 'Purple'
    const material = 'Plastic'

    const gift = service.prepareGift({ giftName, weight, color, material })

    expect(gift).toBeInstanceOf(Gift)
  })

  it('should throw an error if gift is too heavy', () => {
    const giftName = 'Dog-E'
    const weight = 6
    const color = 'White'
    const material = 'Metal'

    expect(() =>
      service.prepareGift({ giftName, weight, color, material })
    ).toThrow("Gift is too heavy for Santa's sleigh")
  })

  it('should add an attribute to a gift', () => {
    const giftName = 'Furby'
    const weight = 1
    const color = 'Multi'
    const material = 'Cotton'

    const gift = service.prepareGift({ giftName, weight, color, material })
    gift.addAttribute('recommendedAge', '3')

    expect(gift.getRecommendedAge()).toBe(3)
  })

  it('can add attributes to a gift', () => {
    const giftName = 'Lego'
    const weight = 2
    const color = 'Yellow'
    const material = 'Plastic'

    const gift = service.prepareGift({ giftName, weight, color, material })

    fc.assert(
      fc.property(fc.dictionary(fc.string(), fc.string()), (object) =>
        canSetAndRetrieveAttributes(gift, object.key, object.value)
      )
    )
  })

  it('runs many tests', () => {
    fc.assert(
      fc.property(
        fc.record({
          giftName: fc.string(),
          weight: fc.integer(),
          color: fc.string(),
          material: fc.string(),
        }),
        (n) => createsGiftOrThrows(n)
      )
    )
  })

  const canSetAndRetrieveAttributes = (gift, key, value): boolean => {
    gift.addAttribute(key, value)
    return gift.getAttribute(key) === value
  }

  const createsGiftOrThrows = (giftParameters): boolean => {
    try {
      const gift = new SantaWorkshopService().prepareGift(giftParameters)
      return giftIsValid(gift, giftParameters)
    } catch (e) {
      return giftIsInvalid(e, giftParameters)
    }
  }
})

function giftIsInvalid(error: Error, giftParameters): boolean {
  return (
    giftParameters.weight > 5 &&
    error.message === "Gift is too heavy for Santa's sleigh"
  )
}

function giftIsValid(gift: Gift, giftParameters): boolean {
  return (
    giftParameters.weight <= 5 &&
    gift instanceof Gift &&
    gift.toString() ===
      `A ${giftParameters.color}-colored ${giftParameters.giftName} weighing ${giftParameters.weight} kg made in ${giftParameters.material}`
  )
}
