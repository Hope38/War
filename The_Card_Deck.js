//The full deck of cards
const SYMBOLS = ["♠","♥","♦","♣"] //The symbols on the cards
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] //the numbers on the cards


export default class Deck {
    constructor(cards = freshDeck()) {
        // the cards in the deck
        this.cards = cards
}
    get NumberOfCards() {
        return this.cards.length
    }
    
    //shuffles the cards
    shuffle() {
        //Goes from the back of the cards to the front
       for (let i = this.NumberOfCards - 1; i > 0; i--){
       
           //Get the new index for where you're going to put the card
           const newIndex = Math.floor(Math.random()*(i+1))
           
           //flip the values from the new index with the current index
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
        return VALUES.map(value => {
            //Return the array
            return new Card(symbols, value)
        })
    })
}
