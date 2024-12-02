import { fizzbuzz, max, min } from '../src/fizzbuzz'
import * as O from 'fp-ts/Option'
import { isNone, isSome } from 'fp-ts/Option'
import * as fc from 'fast-check'
import { pipe } from 'fp-ts/function'

const mapping: Map<number, string> = new Map([
  [3, 'Fizz'],
  [5, 'Buzz'],
  [7, 'Whizz'],
  [11, 'Bang'],
])

describe('FizzBuzz should return', () => {
  test.each([
    [1, '1'],
    [67, '67'],
    [82, '82'],
    [3, 'Fizz'],
    [66, 'FizzBang'],
    [99, 'FizzBang'],
    [5, 'Buzz'],
    [50, 'Buzz'],
    [85, 'Buzz'],
    [15, 'FizzBuzz'],
    [30, 'FizzBuzz'],
    [45, 'FizzBuzz'],
    [7, 'Whizz'],
    [14, 'Whizz'],
    [21, 'FizzWhizz'],
    [35, 'BuzzWhizz'],
    [11, 'Bang'],
    [22, 'Bang'],
    [33, 'FizzBang'],
    [55, 'BuzzBang'],
    [77, 'WhizzBang'],
  ])('its representation %s -> %s', (input, expectedResult) => {
    const conversionResult = fizzbuzz(input, mapping)
    expect(isSome(conversionResult)).toBeTruthy()

    if (isSome(conversionResult)) {
      expect(conversionResult.value).toBe(expectedResult)
    }
  })

  test('valid strings for numbers between 1 and 100', () => {
    fc.assert(
      fc.property(
        fc.integer().filter((n) => n >= min && n <= max),
        (n) => isConvertValid(n)
      ),
      { verbose: true }
    )
  })

  const isConvertValid = (input: number): boolean =>
    pipe(
      fizzbuzz(input, mapping),
      O.exists((result) => validStringsFor(input).includes(result))
    )

  const validStringsFor = (x: number): string[] => [
    'Fizz',
    'Buzz',
    'FizzBuzz',
    'Whizz',
    'FizzWhizz',
    'Bang',
    x.toString(),
  ]

  test('none for numbers out of range', () => {
    fc.assert(
      fc.property(
        fc.integer().filter((n) => n < min || n > max),
        (n) => isNone(fizzbuzz(n, mapping))
      )
    )
  })
})
