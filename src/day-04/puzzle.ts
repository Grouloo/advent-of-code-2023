type ScratchCard = {
  id: number
  winningNumbers: number[]
  numbersYouHave: number[]
}

export type ScratchCardPile = ScratchCard[]

function calculateWorthOfScratchCard(scratchCard: ScratchCard) {
  return scratchCard.numbersYouHave
    .map((nb) => scratchCard.winningNumbers.includes(nb))
    .reduce((previous, current, i) => {
      if (1 <= previous && current == true) {
        return previous * 2
      } else if (current == true) {
        return 1
      } else {
        return previous
      }
    }, 0)
}

export function calculateWorthOfScratchCardPile(
  scratchCardPile: ScratchCardPile
) {
  return scratchCardPile
    .map(calculateWorthOfScratchCard)
    .reduce((previous, current) => previous + current)
}

// Part 2

function calculateScoreOfScratchCard(scratchCard: ScratchCard) {
  return scratchCard.numbersYouHave
    .map((nb) => scratchCard.winningNumbers.includes(nb))
    .reduce(
      (previous, current) => (current == true ? previous + 1 : previous),
      0
    )
}

function getCopiesOfCards(
  card: ScratchCard,
  scratchCardCollection: ScratchCardPile
) {
  const cardScore = calculateScoreOfScratchCard(card)
  const copies: ScratchCard[] = []

  for (let i = 1; i <= cardScore; i++) {
    const cardToCopy = scratchCardCollection.find((c) => c.id == card.id + i)

    if (cardToCopy) {
      copies.push(cardToCopy)
    }
  }

  return copies
}

export function playByTheRules(
  scratchCardPile: ScratchCardPile,
  scratchCardCollection: ScratchCardPile,
  cardCount: number = 0
) {
  if (scratchCardPile.length == 0) {
    return cardCount
  }

  return playByTheRules(
    scratchCardPile.flatMap((card) =>
      getCopiesOfCards(card, scratchCardCollection)
    ),
    scratchCardCollection,
    cardCount + scratchCardPile.length
  )
}
