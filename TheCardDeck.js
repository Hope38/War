//The full deck of cards
const SYMBOLS = ["♠","♥","♦","♣"]//The symbols on the cards
const VALUES = ["A","2","3","4","5","6","7","8","9","10","J","Q","K"] //the numbers on the cards


 export default class Deck {
    constructor(cards = freshDeck()) {
        // the cards in the deck
        this.cards = cards
}
    get NumberOfCards() {
        return this.cards.length
    }

    //returns the top card from the deck
    pop(){
        return this.cards.shift()
    }

    //adds a card to the bottom of the deck
    mypush(card) {
        this.cards.push(card)
    }
    
    //shuffles the cards
    shuffle() {
        //Goes from the back of the cards to the front
       for (let i = this.NumberOfCards - 1; i > 0; i--){
       
           //Get the new index for where you're going to put the card
           const newIndex = Math.floor(Math.random() * (i + 1))
           
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

    //if a card has a ♠ or ♣ then it will be black, if not then it is red
    get color() {
        return this.symbols === '♣' || this.symbols === '♠' ? 'black' : 'red'
    }

    //Dynamically render a card
     getHTML() {
        const cardDiv = document.createElement('div')
        //for the text inside the card
        cardDiv.innerText = this.symbols

        //for the class atribute in the div
        cardDiv.classList.add("card", this.color)

        //for the data attribute in the div
        cardDiv.dataset.value = `${this.value} ${this.symbols}`
        //Get access to that html
        return cardDiv
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
