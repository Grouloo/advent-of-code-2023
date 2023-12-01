import { describe, expect, test } from "bun:test"
import { sumOfCalibrationValues } from "./puzzle"

describe("The calibration value is generated from the sum of numbers composed of the first and last", () => {
  test("digit of every line", () => {
    const values = ["1abc2", "pqr3stu8vwx", "a1b2c3d4e5f", "treb7uchet"]

    expect(sumOfCalibrationValues(values)).toBe(142)
  })

  test("spelled out digit of every line", () => {
    const values = [
      "two1nine",
      "eightwothree",
      "abcone2threexyz",
      "xtwone3four",
      "4nineeightseven2",
      "zoneight234",
      "7pqrstsixteen",
    ]

    expect(sumOfCalibrationValues(values)).toBe(281)
  })

  test("bonus", () => {
    expect(
      sumOfCalibrationValues(["vxzzvdhfqfsix83c1ttvbbstxgdrkfcnmm3"])
    ).toBe(63)

    expect(sumOfCalibrationValues(["8sixssmlzlhrnineggmrvg6"])).toBe(86)

    expect(
      sumOfCalibrationValues(["kflkpscthreehjjgckfrfdhc3krgntwofour"])
    ).toBe(34)

    expect(sumOfCalibrationValues(["twone"])).toBe(21)
    expect(sumOfCalibrationValues(["eightwo"])).toBe(82)
    expect(sumOfCalibrationValues(["nineight"])).toBe(98)
    expect(sumOfCalibrationValues(["eighthree"])).toBe(83)
    expect(sumOfCalibrationValues(["nineeight"])).toBe(98)
    expect(sumOfCalibrationValues(["eeeight"])).toBe(88)
    expect(sumOfCalibrationValues(["oooneeone"])).toBe(11)
    expect(sumOfCalibrationValues(["sevenine"])).toBe(79)

    expect(sumOfCalibrationValues(["5onesixsevenphxtmlqhzfcjxrknpv"])).toBe(57)
  })
})
