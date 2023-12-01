import { sumOfCalibrationValues } from "./puzzle"

const path = "./src/day-01/calibration-document.txt"
const calibrationDocument = Bun.file(path)

const rawValues = await calibrationDocument.text()

const parsedValues = rawValues.split("\n")

console.log(sumOfCalibrationValues(parsedValues))
