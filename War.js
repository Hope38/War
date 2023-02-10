import Deck from "./TheCardDeck.js"

//will convert the Q,K,J,A into numbers
const CARD_VALUE_MAP = {
    "2":2,
    "3":3,
    "4":4,
    "5":5,
    "6":6,
    "7":7,
    "8":8,
    "9":9,
    "10":10,
    "J":11,
    "Q":12,
    "K":13,
    "A":14,
}

const computerCardSlot = document.querySelector('.computer-card-slot')
const playerCardSlot = document.querySelector('.player-card-slot')
const computerDeckElement = document.querySelector('.computer-deck')
const playerDeckElement = document.querySelector('.player-deck')
const text = document.querySelector('.text')

const playerDiscardDeckElement = document.querySelector('.player-Junk')
const computerDiscardDeckElement = document.querySelector('.computer-Junk')

let playerDeck, computerDeck, inRound, stop, playerDiscard, computerDiscard

//if you click anywhere on the screen the function will run
document.addEventListener('click', () => {
    if(stop) {
        startGame()
        return
    }
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

    playerDiscard = new Deck(deck.cards.slice(0,0))

    computerDiscard = new Deck(deck.cards.slice(0,0))

    inRound = false
    stop = false

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

    updateDeckCount()
    

    if (isRoundWinner(playerCard, computerCard)){
        text.innerText = "Win"
        //if the player wins then the card will return to them
        playerDeck.push(playerCard)
        playerDeck.push(computerCard)
        
    } else if (isRoundWinner(computerCard, playerCard)){
        text.innerText = "lose"
        
        //if the player loses then the card is given to the computer
        computerDeck.push(playerCard)
        computerDeck.push(computerCard)
    } else{
        text.innerText = "Draw"
        computerDiscard.push(computerCard)
        computerDiscard.push(computerCard)
        computerDiscard.push(computerCard)
        playerDiscard.push(playerCard)
        playerDiscard.push(playerCard)
        playerDiscard.push(playerCard)
        playerDeck.push(playerDiscard)
    }
    
  

    //if player runs out of cards then this will display
    if (isGameOver(playerDeck)){
        text.innerText = "You Lose!"
        //will stop the game
        stop = true
    //if the computer runs out of cards then this will display
    } else if (isGameOver(computerDeck)){
        text.innerText = "You win!"
        //will stop the game
        stop = true
    }
}

//updates the deck count
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.NumberOfCards
    playerDeckElement.innerText = playerDeck.NumberOfCards
    computerDiscardDeckElement.innerText = computerDiscard.NumberOfCards
    playerDiscardDeckElement.innerText = playerDiscard.NumberOfCards
}

//Will determine who wins, will detemine which card is worth more
function isRoundWinner(cardOne, cardTwo){
    return CARD_VALUE_MAP[cardOne.value] > CARD_VALUE_MAP[cardTwo.value]
}

function War(cardOne, cardTwo){
    return CARD_VALUE_MAP[cardOne.value] = CARD_VALUE_MAP[cardTwo.value]
}

//the game will be over when someones cards hit zero
function isGameOver(deck){
    return deck.NumberOfCards === 0
}



