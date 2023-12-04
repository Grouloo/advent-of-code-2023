import { calculateWorthOfScratchCardPile, playByTheRules } from "./puzzle"

function textToScratchCardPile(text: string) {
  return text.split("\n").map((line, id) => {
    const [_, information] = line.split(":")

    const [rawWinningNumbers, rawNumbersYouHave] = information.split("|")

    const winningNumbers = rawWinningNumbers
      .trim()
      .split(" ")
      .map((nb) => +nb)
      .filter((nb) => nb !== 0)

    const numbersYouHave = rawNumbersYouHave
      .trim()
      .split(" ")
      .map((nb) => +nb)
      .filter((nb) => nb !== 0)

    return { id, winningNumbers, numbersYouHave }
  })
}

const path = "./src/day-04/table.txt"
const table = Bun.file(path)

const text = await table.text()

const scratchCardPile = textToScratchCardPile(text)

console.log("Pile's worth: ", calculateWorthOfScratchCardPile(scratchCardPile))
console.log(
  "Number of cards: ",
  playByTheRules(scratchCardPile, scratchCardPile)
)
