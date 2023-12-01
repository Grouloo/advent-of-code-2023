import { describe, expect, test } from "bun:test"
import { retrieveCalibrationValue, sumOfCalibrationValues } from "./puzzle"

describe("A calibration value is retrieved by", () => {
  test("concatenating the first and the last digits or spelled out digits of the line", () => {
    expect(
      retrieveCalibrationValue("vxzzvdhfqfsix83c1ttvbbstxgdrkfcnmm3")
    ).toBe("63")
    expect(retrieveCalibrationValue("8sixssmlzlhrnineggmrvg6")).toBe("86")
    expect(
      retrieveCalibrationValue("kflkpscthreehjjgckfrfdhc3krgntwofour")
    ).toBe("34")
    expect(retrieveCalibrationValue("twone")).toBe("21")
    expect(retrieveCalibrationValue("eightwo")).toBe("82")
    expect(retrieveCalibrationValue("nineight")).toBe("98")
    expect(retrieveCalibrationValue("eighthree")).toBe("83")
    expect(retrieveCalibrationValue("nineeight")).toBe("98")
    expect(retrieveCalibrationValue("eeeight")).toBe("88")
    expect(retrieveCalibrationValue("oooneeone")).toBe("11")
    expect(retrieveCalibrationValue("sevenine")).toBe("79")
    expect(retrieveCalibrationValue("5onesixsevenphxtmlqhzfcjxrknpv")).toBe(
      "57"
    )
  })
})
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
})
