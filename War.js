import Deck from "./TheCardDeck.js"

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

let playerDeck, computerDeck, inRound

//if you click anywhere on the screen the function will run
document.addEventListener('click', () => {
    if(inRound){
        //if the round is starting then clean it up
        cleanBeforeRound()
    } else {
        //otherwise flip a card when you click the screen
        flipCards()
    }
})

//The actual game
startGame()
function startGame(){
    const deck = new Deck()
    deck.shuffle()
    
    //splits it into equal pile of cards
    const deckMidpoint = Math.ceil(deck.NumberOfCards / 2)
    //the players deck - This splits the cards
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint))
    //the computers deck
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.NumberOfCards))
    inRound = false

    //calls the function
    cleanBeforeRound()

}

//Creates a default state
function cleanBeforeRound(){
    inRound = false
    computerCardSlot.innerHTML = ""
    playerCardSlot.innerHTML = ""
    text.innerText = ""
    
    //calls the function
    updateDeckCount()
}

//changes the cards within the round
function flipCards() {
    inRound = true

    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()

    //renders the cards
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())
}

//updates the deck count
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.NumberOfCards
    playerDeckElement.innerText = playerDeck.NumberOfCards
}


