import {
  Bag,
  Game,
  Set,
  sumOfPossibleGamesIDs,
  sumOfPowersOfSets,
} from "./puzzle"

function textToGamesList(text: string) {
  return text.split("\n").map((line): Game => {
    const [information, rawSets] = line.split(":")

    const id = information.slice(5)

    const sets = rawSets.split(";").map(
      (rawSet) =>
        ({
          red: 0,
          green: 0,
          blue: 0,
          ...Object.fromEntries(
            rawSet.split(",").map((ball) => {
              const [_, count, color] = ball.split(" ")

              return [color, +count]
            })
          ),
        } as never as Set)
    ) as Set[]

    return {
      id: +id,
      sets,
    }
  })
}

const path = "./src/day-02/games.txt"
const calibrationDocument = Bun.file(path)

const text = await calibrationDocument.text()

const games = textToGamesList(text)

const bag: Bag = {
  red: 12,
  green: 13,
  blue: 14,
}

console.log("Sum of possible games IDs: ", sumOfPossibleGamesIDs(games, bag))
console.log("Sum of the powers of sets: ", sumOfPowersOfSets(games))
