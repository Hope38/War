//The full deck of cards
const SYMBOLS = ["♠","♥","♦","♣"] //The symbols on the cards
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] //the numbers on the cards


export default class Deck {
    constructor(cards = freshDeck()) {
        // the cards in the deck
        // the cards in the deck
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

//the individual cards
class Card {
    constructor(symbols, value) {
        //the individual cards
        this.symbols = symbols
        this.value = value
    }
}


//A brand new deck of cards
function freshDeck() {
    //Loop through all the symbols
    return SYMBOLS.flatMap(symbols => {
        //Loop through all the values
        //Loop through all the values
        return VALUES.map(value => {
            //Return the array
            return new Card(symbols, value)
        })
    })
}
