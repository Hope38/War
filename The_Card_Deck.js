const SYMBOLS = ["♠","♥","♦","♣"]
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"]


export default class Deck {
    constructor(cards = freshDeck()) {
        this.cards = cards
    
}
    get NumberOfCards() {
        return this.cards.length
    }

    shuffle() {
       for (let i = this.NumberOfCards - 1; i > 0; i--){
           const newIndex = Math.floor(Math.random()*(i+1))
           const oldValue = this.cards[newIndex]
           this.cards[newIndex] = this.cards[i]
           this.cards[i] = oldValue
       }
    }
}

class Card {
    constructor(symbols, value) {
        this.symbols = symbols
        this.value = value
    }
}

function freshDeck() {
    return SYMBOLS.flatMap(symbols => {
        return VALUES.map(value => {
            return new Card(symbols, value)
        })
    })
}
