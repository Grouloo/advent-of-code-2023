// The newly-improved calibration document consists of lines of text;
// each line originally contained a specific calibration value that the Elves now need to recover.
// On each line, the calibration value can be found by combining the first digit and the last digit (in that order)
// to form a single two-digit number.
// It looks like some of the digits are actually spelled out with letters:
// one, two, three, four, five, six, seven, eight, and nine also count as valid "digits".

import { Maybe, None, Some, match } from "shulk"

type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type SpelledOutDigit =
  | "one"
  | "two"
  | "three"
  | "four"
  | "five"
  | "six"
  | "seven"
  | "eight"
  | "nine"

const SPELLED_OUT_DIGITS: SpelledOutDigit[] = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
]
function isDigit(char: string): char is Digit {
  return !!char.match(/[0-9]/g)
}

function spelledOutToDigit(spelledOut: SpelledOutDigit): Digit {
  return match(spelledOut).with({
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  })
}

function firstSpelledOutDigit(sequence: string): Maybe<[Digit, number]> {
  const spelledOutIndex = sequence.search(
    /one|two|three|four|five|six|seven|eight|nine/g
  )

  return Some(spelledOutIndex)
    .filter((spelledOutIndex) => spelledOutIndex !== -1)
    .map((spelledOutIndex) => sequence.slice(spelledOutIndex))
    .flatMap((substring) =>
      SPELLED_OUT_DIGITS.map((digit) =>
        substring.startsWith(digit) ? Some(digit) : None()
      ).reduce(
        (previous, current) =>
          match(previous).case({
            None: () => current,
            Some: () => previous,
          }),
        None()
      )
    )
    .map(spelledOutToDigit)
    .map((digit) => [digit, spelledOutIndex])
}

function lastSpelledOutDigit(sequence: string): Maybe<[Digit, number]> {
  const spelledOutIndex = SPELLED_OUT_DIGITS.map((spelledOut) =>
    sequence.lastIndexOf(spelledOut)
  ).reduce((previous, current) => Math.max(previous, current), -1)

  return Some(spelledOutIndex)
    .filter((spelledOutIndex) => spelledOutIndex !== -1)
    .map((spelledOutIndex) => sequence.slice(spelledOutIndex))
    .flatMap((substring) =>
      SPELLED_OUT_DIGITS.map((digit) =>
        substring.startsWith(digit) ? Some(digit) : None()
      ).reduceRight(
        (previous, current) =>
          match(current).case({
            None: () => previous,
            Some: () => current,
          }),
        None()
      )
    )
    .map(spelledOutToDigit)
    .map((digit) => [digit, spelledOutIndex])
}

function findFirstDigit(line: string): Digit {
  const maybeDigit = firstSpelledOutDigit(line)

  const maxIndex = maybeDigit.map(([_, index]) => index).unwrapOr(line.length)

  for (let i = 0; i < maxIndex; i++) {
    const char = line[i]

    if (isDigit(char)) {
      return char
    }
  }

  return maybeDigit.expect("No first digit found.")[0]
}

function findLastDigit(line: string): Digit {
  const maybeDigit = lastSpelledOutDigit(line)

  const minIndex = maybeDigit.map(([_, index]) => index).unwrapOr(-1)

  for (let i = line.length - 1; minIndex < i; i--) {
    const char = line[i]

    if (isDigit(char)) {
      return char
    }
  }

  return maybeDigit.expect("No last digit found.")[0]
}

export function retrieveCalibrationValue(line: string): `${Digit}${Digit}` {
  const firstDigit = findFirstDigit(line)
  const lastDigit = findLastDigit(line)

  return `${firstDigit}${lastDigit}`
}

export function sumOfCalibrationValues(values: string[]) {
  return values
    .map(retrieveCalibrationValue)
    .map((nb) => +nb) // why is parseInt producing NaN??
    .reduce((previous, current) => previous + current, 0)
}
