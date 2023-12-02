import { describe, expect, test } from "bun:test"
import {
  Bag,
  Game,
  fewestNumberOfCubesOf,
  sumOfPossibleGamesIDs,
  sumOfPowersOfSets,
} from "./puzzle"

const games: Game[] = [
  {
    id: 1,
    sets: [
      { blue: 1, red: 4, green: 0 },
      { red: 1, green: 2, blue: 6 },
      { green: 2, red: 0, blue: 0 },
    ],
  },
  {
    id: 2,
    sets: [
      { blue: 1, green: 2, red: 0 },
      { green: 3, blue: 4, red: 1 },
      { blue: 1, green: 1, red: 0 },
    ],
  },
  {
    id: 3,
    sets: [
      { green: 8, blue: 6, red: 20 },
      { blue: 5, red: 4, green: 13 },
      { green: 5, red: 1, blue: 0 },
    ],
  },
  {
    id: 4,
    sets: [
      { green: 1, red: 3, blue: 6 },
      { green: 3, red: 6, blue: 0 },
      { green: 3, blue: 15, red: 14 },
    ],
  },
  {
    id: 5,
    sets: [
      { red: 6, blue: 1, green: 3 },
      { blue: 2, red: 1, green: 2 },
    ],
  },
]

describe("The sum of possible games' IDs ", () => {
  test("is the sum of the IDs of games for which all sets respect the number of balls for each color in the bag", () => {
    const bag: Bag = {
      red: 12,
      green: 13,
      blue: 14,
    }

    expect(sumOfPossibleGamesIDs(games, bag)).toBe(8)
  })
})

describe("The fewest number of cubes of each color", () => {
  test("is the minimum number of cubes you need to play a game", () => {
    expect(fewestNumberOfCubesOf(games[0])).toEqual({
      red: 4,
      green: 2,
      blue: 6,
    })
    expect(fewestNumberOfCubesOf(games[1])).toEqual({
      red: 1,
      green: 3,
      blue: 4,
    })
    expect(fewestNumberOfCubesOf(games[2])).toEqual({
      red: 20,
      green: 13,
      blue: 6,
    })
    expect(fewestNumberOfCubesOf(games[3])).toEqual({
      red: 14,
      green: 3,
      blue: 15,
    })
    expect(fewestNumberOfCubesOf(games[4])).toEqual({
      red: 6,
      green: 3,
      blue: 2,
    })
  })
})

describe("The sum of the powers of sets of cubes", () => {
  test("is equal to the sum the numbers of red, green, and blue cubes multiplied together", () => {
    expect(sumOfPowersOfSets(games)).toBe(2286)
  })
})
