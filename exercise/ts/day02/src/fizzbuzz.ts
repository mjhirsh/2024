import { none, Option, some } from 'fp-ts/Option'

export const min = 1
export const max = 100

export const fizzbuzz = (
  input: number,
  mapping: Map<number, string>
): Option<string> =>
  isOutOfRange(input) ? none : some(convertSafely(input, mapping))

function convertSafely(input: number, mapping): string {
  let result = ''
  for (const [divisor, value] of mapping) {
    if (isDivisible(divisor, input)) {
      result += value
    }
  }
  if (result === '') {
    result = input.toString()
  }
  return result
}

const isDivisible = (divisor: number, input: number): boolean =>
  input % divisor === 0
const isOutOfRange = (input: number): boolean => input < min || input > max
