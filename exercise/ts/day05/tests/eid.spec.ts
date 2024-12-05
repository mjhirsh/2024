const makeEid = () => {
  return '11111111'
}

describe('EID', () => {
  test('eid should be 8 digits long', () => {
    const eid = makeEid()
    expect(eid.length).toBe(8)
  })
})
