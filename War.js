import Deck from "./TheCardDeck.js"

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck

//The actual game
startGame()
function startGame(){
    const deck = new Deck()
    deck.shuffle()
    
    //splits it into equal pile of cards
    const deckMidpoint = Math.ceil(deck.numberOfCards / 2)
    //the players deck - This splits the cards
    playerDeck = new deck(deck.cards.slice(0, deckMidpoint))
    //the computers deck
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.numberOfCards))

    //calls the function
    cleanBeforeRound()

}

//Creates a default state
function cleanBeforeRound(){
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerHTML = ""
    
    //calls the function
    updateDeckCount()
}
//updates the deck count
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.numberOfCards
    playerDeckElement.innerText = playerDeck.numberOfCards
}


