import { expect, test } from "bun:test"
import { ScratchCardPile, calculateWorthOfScratchCardPile } from "./puzzle"

const scratchCardPile: ScratchCardPile = [
  {
    id: 1,
    winningNumbers: [41, 48, 83, 86, 17],
    numbersYouHave: [83, 86, 6, 31, 17, 9, 48, 53],
  },
  {
    id: 2,
    winningNumbers: [13, 32, 20, 16, 61],
    numbersYouHave: [61, 30, 68, 82, 17, 32, 24, 19],
  },
  {
    id: 3,
    winningNumbers: [1, 21, 53, 59, 44],
    numbersYouHave: [69, 82, 63, 72, 16, 21, 14, 1],
  },
  {
    id: 4,
    winningNumbers: [41, 92, 73, 84, 69],
    numbersYouHave: [59, 84, 76, 51, 58, 5, 54, 83],
  },
  {
    id: 5,
    winningNumbers: [87, 83, 26, 28, 32],
    numbersYouHave: [88, 30, 70, 12, 93, 22, 82, 36],
  },
  {
    id: 6,
    winningNumbers: [31, 18, 13, 56, 72],
    numbersYouHave: [74, 77, 10, 23, 35, 67, 36, 11],
  },
]

test("Scratch card pile worth", () => {
  expect(calculateWorthOfScratchCardPile(scratchCardPile)).toBe(13)
})
