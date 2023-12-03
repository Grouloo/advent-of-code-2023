import { Schematic, sumGearsRatios, sumPartNumbersOfSchematic } from "./puzzle"

const path = "./src/day-03/schematic.txt"
const schematic = Bun.file(path)

const rawSchematic = await schematic.text()

const parsedSchematic = rawSchematic
  .split("\n")
  .map((line) => line.split("")) as Schematic

console.log("Sum of part numbers: ", sumPartNumbersOfSchematic(parsedSchematic))
console.log("Sum of gears ratios: ", sumGearsRatios(parsedSchematic))
