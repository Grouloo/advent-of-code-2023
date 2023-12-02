// Each time you play this game, he will hide a secret number of cubes of each color in the bag,
// and your goal is to figure out information about the number of cubes.
// To get information, once a bag has been loaded with cubes, the Elf will reach into the bag,
// grab a handful of random cubes, show them to you, and then put them back in the bag.
// He'll do this a few times per game.
// You play several games and record the information from each game (your puzzle input).
// Each game is listed with its ID number (like the 11 in Game 11: ...)
// followed by a semicolon-separated list of subsets of cubes that were revealed from the bag
// (like 3 red, 5 green, 4 blue).

export type Set = {
  red: number
  green: number
  blue: number
}

export type Game = {
  id: number
  sets: Set[]
}

export type Bag = { red: number; green: number; blue: number }

function isSetPossible(set: Set, bag: Bag) {
  return set.blue <= bag.blue && set.green <= bag.green && set.red <= bag.red
}

export function isGamePossible(game: Game, bag: Bag) {
  return game.sets
    .map((set) => isSetPossible(set, bag))
    .reduce((previous, current) => previous == true && current == true, true)
}

export function sumOfPossibleGamesIDs(games: Game[], bag: Bag) {
  return games
    .map((game) => isGamePossible(game, bag))
    .map((gameIsPossible, i) => (gameIsPossible ? games[i].id : 0))
    .reduce((previous, current) => previous + current, 0)
}

// Part 2

export function fewestNumberOfCubesOf(game: Game): Bag {
  return game.sets.reduce((previous, current) => ({
    red: Math.max(previous.red, current.red),
    green: Math.max(previous.green, current.green),
    blue: Math.max(previous.blue, current.blue),
  }))
}

function powerOfSetOfCubes(game: Game) {
  const { red, green, blue } = fewestNumberOfCubesOf(game)

  return red * green * blue
}

export function sumOfPowersOfSets(games: Game[]) {
  return games
    .map(powerOfSetOfCubes)
    .reduce((previous, current) => previous + current)
}
