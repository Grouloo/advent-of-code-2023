// This one i'm ashamed of...

type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9"
type Symbol = "*" | "$" | "#" | "+" | "/" | "%" | "=" | "&"

type Line = (Digit | Symbol | ".")[]
export type Schematic = Line[]

function isDigit(char: string): char is Digit {
  return !!char.match(/[0-9]/g)
}

function isSymbol(char: string | undefined): char is Symbol {
  if (char == undefined) {
    return false
  } else {
    return !!char.match(/[^\w.]|_/g)
  }
}

function isGearSymbol(char: string | undefined): char is Symbol {
  if (char == undefined) {
    return false
  } else {
    return char == "*"
  }
}

function detectPartNumber(
  schematic: Schematic,
  lineIndex: number,
  startAt: number
) {
  let charIndex = startAt
  let number = ""
  let isPart = false

  const line = schematic[lineIndex]

  for (; charIndex < line.length; charIndex++) {
    const char = line[charIndex]

    if (isDigit(char)) {
      const prevLine = schematic[lineIndex - 1]
      const nextLine = schematic[lineIndex + 1]

      if (
        prevLine !== undefined &&
        (isSymbol(prevLine[charIndex - 1]) ||
          isSymbol(prevLine[charIndex]) ||
          isSymbol(prevLine[charIndex + 1]))
      ) {
        isPart = true
      }

      if (isSymbol(line[charIndex - 1]) || isSymbol(line[charIndex + 1])) {
        isPart = true
      }

      if (
        nextLine !== undefined &&
        (isSymbol(nextLine[charIndex - 1]) ||
          isSymbol(nextLine[charIndex]) ||
          isSymbol(nextLine[charIndex + 1]))
      ) {
        isPart = true
      }
    } else {
      break
    }
  }

  charIndex = startAt

  for (; charIndex < line.length; charIndex++) {
    const char = line[charIndex]

    if (isDigit(char) && isPart) {
      number += char
    } else {
      break
    }
  }

  return { number: number == "0" ? 0 : +number, stoppedAt: charIndex }
}

function findPartNumbersInSchematic(schematic: Schematic) {
  return schematic.flatMap((line, lineIndex) => {
    let cursor = 0
    let res: number[] = []

    while (cursor < line.length) {
      const { number, stoppedAt } = detectPartNumber(
        schematic,
        lineIndex,
        cursor
      )

      res.push(number)
      cursor = stoppedAt + 1
    }

    return res
  })
}

export function sumPartNumbersOfSchematic(schematic: Schematic) {
  const partNumbers = findPartNumbersInSchematic(schematic)

  return partNumbers.reduce((previous, current) => previous + current)
}

// Part 2

function detectGear(schematic: Schematic, lineIndex: number, startAt: number) {
  let charIndex = startAt

  const line = schematic[lineIndex]
  const char = line[charIndex]

  const maybeGear = char == "*"

  if (maybeGear) {
    let cursor = Math.max(startAt - 3, 0)
    let res: number[] = []

    // Previous
    while (schematic[lineIndex - 1] && cursor <= charIndex + 1) {
      const { number, stoppedAt } = detectPartNumber(
        schematic,
        lineIndex - 1,
        cursor
      )

      if (charIndex - 1 < stoppedAt) {
        res.push(number)
      }
      cursor = stoppedAt + 1
    }

    cursor = Math.max(startAt - 3, 0)

    // Current
    while (cursor <= charIndex + 1) {
      const { number, stoppedAt } = detectPartNumber(
        schematic,
        lineIndex,
        cursor
      )

      if (charIndex - 1 < stoppedAt) {
        res.push(number)
      }
      cursor = stoppedAt + 1
    }

    cursor = Math.max(startAt - 3, 0)

    // Next
    while (schematic[lineIndex + 1] && cursor <= charIndex + 1) {
      const { number, stoppedAt } = detectPartNumber(
        schematic,
        lineIndex + 1,
        cursor
      )

      if (charIndex - 1 < stoppedAt) {
        res.push(number)
      }

      cursor = stoppedAt + 1
    }

    const filteredRes = res.filter((nb) => nb !== 0)

    if (filteredRes.length == 2) {
      return filteredRes[0] * filteredRes[1]
    }
  }

  return 0
}

function findGearsRatios(schematic: Schematic) {
  return schematic.flatMap((line, lineIndex) => {
    let cursor = 0
    let res: number[] = []

    while (cursor < line.length) {
      const gearRatio = detectGear(schematic, lineIndex, cursor)

      cursor = cursor + 1
      res.push(gearRatio)
    }

    return res
  })
}

export function sumGearsRatios(schematic: Schematic) {
  const gearsRatios = findGearsRatios(schematic)

  return gearsRatios.reduce((previous, current) => previous + current)
}
