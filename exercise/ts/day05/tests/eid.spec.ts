const makeEid = (sex) => {
  const sexMap = new Map([
    ['Sloubi', '1'],
    ['Gagna', '2'],
    ['Catact', '3'],
  ])

  const sexCode = sexMap.get(sex)

  return sexCode + '1111111'
}

describe('EID', () => {
  test('eid should be 8 digits long', () => {
    const eid = makeEid('Sloubi')
    expect(eid.length).toBe(8)
  })

  test('the first character of eid should be a valid sex', () => {
    const sex = new Map([
      ['Sloubi', '1'],
      ['Gagna', '2'],
      ['Catact', '3'],
    ])

    sex.forEach((value, key) => {
      const eid = makeEid(key)
      expect(eid[0]).toBe(value)
    })
  })
})
