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
//let warArray = [], playerDeck = [], computerDeck = []
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
       // War()
        
        
        
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

    computerDiscard = new Deck(deck.cards.slice(0, 0))

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

    updateDeckCount()

    //gives you the first card
    const playerCard = playerDeck.pop()
    const computerCard = computerDeck.pop()
    
    //renders the cards
    playerCardSlot.appendChild(playerCard.getHTML())
    computerCardSlot.appendChild(computerCard.getHTML())

    isRoundWinner(playerCard, computerCard)
}





//updates the deck count
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.NumberOfCards
    playerDeckElement.innerText = playerDeck.NumberOfCards
    computerDiscardDeckElement.innerText = computerDiscard.NumberOfCards
    playerDiscardDeckElement.innerText = playerDiscard.NumberOfCards
}

//Will determine who wins, will detemine which card is worth more
function isRoundWinner(player, computer){
    if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]){
        text.innerText = "win"
        playerDeck.push(player)
        playerDeck.push(computer)
 
    } else if (CARD_VALUE_MAP[player.value] < CARD_VALUE_MAP[computer.value]){
        text.innerText = "lose"
        computerDeck.push(player)
        computerDeck.push(computer)

        
    } else if(CARD_VALUE_MAP[player.value] = CARD_VALUE_MAP[computer.value]){
        text.innerText = "Draw"
        war()
    }
        updateDeckCount()
}

function war(){
    warToArray()
}

function warToArray(){
    var length = 0;
    var warArray = [], playerDeck = [], computerDeck = [];

	//if not able to draw 4 cards, draw as many as possible
	if (playerDeck.length < 5 || computerDeck.length < 5) {

		//if computer has less than 4 cards
		if(playerDeck.length > computerDeck.length) {
			length = computerDeck.length - 1;
		}

		//if the player hand has less than 4 cards
		else if (playerDeck.length < computerDeck.length) {
			length = playerDeck.length - 1;
		}
	}

	//if both decks have greater than four cards
	else {
		length = 3;		
	}

	//take the cards from each deck and push them to the war array
	for (var i = 0; i < length; i++) {
		warArray.push(playerDeck[0]);
		playerDeck.shift();
		warArray.push(computerDeck[0]);
		computerDeck.shift();
	}

    compareWar(playerDeck[0], computerDeck[0]);
}

function compareWar(player, computer){
    if((player % 13) > (computer % 13)) {
	
		//updates result section of the game board
		text.innerText = "player wins war"
		
		//pushes entire war array to the back of the player's hand
		playerDeck.push.apply(playerDeck, warArray);

		//pushes both current cards (War cards) to back of the player's hand
		playerDeck.push(compute);
		playerDeck.push(player);
		
		//removes current card from both hands
		playerDeck.shift();
		computerDeck.shift();
		
		//resets the war array to empty
		warArray.length = 0;

		

		//update card count and check for a winner
		updateDeckCount()
		isGameOver()
	}

	//if computer's War card value is greater than the player's War card value, computer wins the tie
	else if ((player % 13) < (computer % 13)) {
		
		//update result section of the game board
		text.innerText = "computer wins war"
		
		//pushes the entire war array to the back of the computer's hand
		computerDeck.push.apply(computerDeck, warArray);
		
		//pushes both current cards (War cards) to the back of the computer's hand
		computerDeck.push(player);
		computerDeck.push(computer);

		//removes the current cards from each hand
		playerDeck.shift();
		computerDeck.shift();

		//resets the war array to empty
		warArray.length = 0;

		//update card count and check for a winner
		updateDeckCount();
		isGameOver();
	}

	//if player's War card value is the same as the computer's War card value, call for another war
	else if ((player % 13) === (computer % 13))
		war();
}

//the game will be over when someones cards hit zero
function isGameOver(){
     //if player runs out of cards then this will display
    if (playerDeck.NumberOfCards === 0){
        text.innerText = "the computer wins"
        stop = true
    } else if (computerDeck === 0){
        text.innerText = "the player wins"
        stop = true
    }
}



