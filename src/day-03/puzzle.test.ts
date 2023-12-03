import { describe, expect, test } from "bun:test"
import { Schematic, sumGearsRatios, sumPartNumbersOfSchematic } from "./puzzle"

const rawSchematic = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`

const schematic = rawSchematic
  .split("\n")
  .map((line) => line.split("")) as Schematic

describe("A number is a part number", () => {
  test("when it is adjacent symbol (*, +, #, $)", () => {
    expect(sumPartNumbersOfSchematic(schematic)).toBe(4361)
  })
})

describe("A * is a gear ", () => {
  test("when it has 2 adjacent numbers", () => {
    expect(sumGearsRatios(schematic)).toBe(467835)
  })
})
