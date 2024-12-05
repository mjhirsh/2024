const makeEid = (sex, birthYear) => {
  const sexMap = new Map([
    ['Sloubi', '1'],
    ['Gagna', '2'],
    ['Catact', '3'],
  ])

  const sexCode = sexMap.get(sex)
  const birhYearCode = birthYear.slice(-2)

  return sexCode + birhYearCode + '11111'
}

describe('EID', () => {
  test('eid should be 8 digits long', () => {
    const eid = makeEid('Sloubi', '1990')
    expect(eid.length).toBe(8)
  })

  test('the first character of eid should be a valid sex', () => {
    const sex = new Map([
      ['Sloubi', '1'],
      ['Gagna', '2'],
      ['Catact', '3'],
    ])

    sex.forEach((value, key) => {
      const eid = makeEid(key, '1990')
      expect(eid[0]).toBe(value)
    })
  })

  test('the second two characters should be birth year', () => {
    const birthYear = '1990'
    const eid = makeEid('Sloubi', birthYear)
    expect(eid.slice(1, 3)).toBe('90')
  })
})
