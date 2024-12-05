const eidFactory = () => {
  let birthOrder = 1

  return (sex, birthYear) => {
    const sexMap = new Map([
      ['Sloubi', '1'],
      ['Gagna', '2'],
      ['Catact', '3'],
    ])

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
  const name = 'Sloubi'
  const birthYear = '1990'
  const makeEid = eidFactory()
  test('eid should be 8 digits long', () => {
    const eid = makeEid(name, birthYear)
    expect(eid.length).toBe(8)
  })

  test('the first character of eid should be a valid sex', () => {
    const sex = new Map([
      ['Sloubi', '1'],
      ['Gagna', '2'],
      ['Catact', '3'],
    ])

    sex.forEach((value, key) => {
      const eid = makeEid(key, birthYear)
      expect(eid[0]).toBe(value)
    })
  })

  test('the second two characters should be birth year', () => {
    const birthYear = '1687'
    const eid = makeEid(name, birthYear)
    expect(eid.slice(1, 3)).toBe('87')
  })

  test('4,5,6 characters should represent birth order', () => {
    const makeEid = eidFactory()
    for (let i = 1; i < 1000; i++) {
      const birthOrder = i.toString().padStart(3, '0')
      const eid = makeEid('Sloubi', '1990')
      expect(eid.slice(3, 6)).toBe(birthOrder)
    }
  })

  test('the last two characters as a number added to modulo 97 of the first six numbers should be 97', () => {
    const eid = makeEid(name, birthYear)
    const first6AsNumber = eid.slice(0, 6)
    const key = 97 - (parseInt(first6AsNumber) % 97)
    expect(eid.slice(-2)).toBe(String(key))
  })
})
