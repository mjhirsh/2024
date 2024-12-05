type sex = 'Sloubi' | 'Gagna' | 'Catact'
interface ElfParams {
  sex: sex
  birthYear: string
}

const eidFactory = () => {
  let birthOrder = 1
  const sexMap = new Map([
    ['Sloubi', '1'],
    ['Gagna', '2'],
    ['Catact', '3'],
  ])

  return ({ sex, birthYear }: ElfParams) => {
    let eid = ''

    eid += sexMap.get(sex)
    eid += birthYear.slice(-2)
    eid += birthOrder.toString().padStart(3, '0')
    eid += 97 - (parseInt(eid) % 97)
    birthOrder++
    return eid
  }
}

describe('EID', () => {
  const elfParams: ElfParams = { sex: 'Sloubi', birthYear: '1990' }
  const makeEid = eidFactory()
  test('eid should be 8 digits long', () => {
    const eid = makeEid(elfParams)
    expect(eid.length).toBe(8)
  })

  test('the first character of eid should be a valid sex', () => {
    const sex = new Map<sex, string>([
      ['Sloubi', '1'],
      ['Gagna', '2'],
      ['Catact', '3'],
    ])

    sex.forEach((value, key) => {
      const eid = makeEid({ ...elfParams, sex: key })
      expect(eid[0]).toBe(value)
    })
  })

  test('the second two characters should be birth year', () => {
    const birthYear = '1687'
    const eid = makeEid({ ...elfParams, birthYear })
    expect(eid.slice(1, 3)).toBe('87')
  })

  test('4,5,6 characters should represent birth order', () => {
    const makeEid = eidFactory()
    for (let i = 1; i < 1000; i++) {
      const birthOrder = i.toString().padStart(3, '0')
      const eid = makeEid(elfParams)
      expect(eid.slice(3, 6)).toBe(birthOrder)
    }
  })

  test('the last two characters as a number added to modulo 97 of the first six numbers should be 97', () => {
    const eid = makeEid(elfParams)
    const first6AsNumber = eid.slice(0, 6)
    const key = 97 - (parseInt(first6AsNumber) % 97)
    expect(eid.slice(-2)).toBe(String(key))
  })
})
