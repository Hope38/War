import Deck from "./TheCardDeck.js";

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
    "A":14
};

const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const text = document.querySelector('.text');
const playerDiscardDeckElement = document.querySelector('.player-Junk');
const computerDiscardDeckElement = document.querySelector('.computer-Junk');

let playerDeck, computerDeck, inRound, stop, playerDiscard, computerDiscard;

//if you click anywhere on the screen the function will run
document.addEventListener('click', () => {
    if(stop) {
        startGame();
        return;
    }

    if(inRound){
        //if the round is starting then clean it up
        cleanBeforeRound();
    } else {
        //otherwise flip a card when you click the screen
        flipCards();
        war();
    }
})

//The actual game
startGame();

function startGame(){
    const deck = new Deck();
    deck.shuffle();
    
    //splits it into equal pile of cards
    const deckMidpoint = Math.ceil(deck.NumberOfCards / 2);
    
    //the players deck - This splits the cards
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    //the computers deck
    computerDeck = new Deck(deck.cards.slice(deckMidpoint, deck.NumberOfCards));

    playerDiscard = new Deck([]);
    computerDiscard = new Deck([]);
    inRound = false;
    stop = false;

    //calls the function
    cleanBeforeRound();
}

//Creates a default state
function cleanBeforeRound(){
    inRound = false;
    computerCardSlot.innerHTML = "";
    playerCardSlot.innerHTML = "";
    text.innerText = "";

    //calls the function
    updateDeckCount();
}

//changes the cards within the round
function flipCards() {
    inRound = true;

    updateDeckCount();

    //gives you the first card
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
    
    //renders the cards
    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());

    isRoundWinner(playerCard, computerCard);
}

//updates the deck count
function updateDeckCount(){
    computerDeckElement.innerText = computerDeck.NumberOfCards;
    playerDeckElement.innerText = playerDeck.NumberOfCards;
    computerDiscardDeckElement.innerText = computerDiscard.NumberOfCards;
    playerDiscardDeckElement.innerText = playerDiscard.NumberOfCards;
}

//Will determine who wins, will detemine which card is worth more
function isRoundWinner(player, computer){
    if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]){
        text.innerText = "win";
        playerDeck.mypush(player);
        playerDeck.mypush(computer);
    } else if (CARD_VALUE_MAP[player.value] < CARD_VALUE_MAP[computer.value]){
        text.innerText = "lose";
        computerDeck.mypush(player);
        computerDeck.mypush(computer);
    } else if(CARD_VALUE_MAP[player.value] = CARD_VALUE_MAP[computer.value]){
        text.innerText = "Draw";
        war();
    }
        isGameOver(playerDeck, computerDeck);
        updateDeckCount();
}

function war(){ 
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();
    if (playerDeck.NumberOfCards < 4) {
        isGameOver(playerDeck, computerDeck);
      } else if (computerDeck.NumberOfCards < 4){
        isGameOver(playerDeck, computerDeck);
      }

      playerDiscard.mypush(playerDeck.pop());
      playerDiscard.mypush(playerDeck.pop());
      playerDiscard.mypush(playerDeck.pop());
      computerDiscard.mypush(computerDeck.pop());
      computerDiscard.mypush(computerDeck.pop());
      computerDiscard.mypush(computerDeck.pop());
    
    updateDeckCount();   
    compareWar(playerCard, computerCard);
   // console.log(computerDiscard)
    //console.log(playerDiscard)
  // console.log(playerDeck)
     //console.log(computerDeck)
}

function compareWar(player, computer){
    if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]){
        text.innerText = "You win War";
        playerDeck.mypush(playerDiscard)
        playerDeck.mypush(playerDiscard)
        playerDeck.mypush(playerDiscard)
        playerDeck.mypush(computerDiscard);
        playerDeck.mypush(computerDiscard);
        playerDeck.mypush(computerDiscard);    
    } else if (CARD_VALUE_MAP[player.value] < CARD_VALUE_MAP[computer.value]){
        text.innerText = "You lose War";
        computerDeck.mypush(playerDiscard);
        computerDeck.mypush(playerDiscard);
        computerDeck.mypush(playerDiscard);
        computerDeck.mypush(computerDiscard);   
        computerDeck.mypush(computerDiscard);  
        computerDeck.mypush(computerDiscard);  
    } else{
        text.innerText = "Another War";
        war();
    }
    isGameOver(playerDeck, computerDeck);
     //console.log(computerDiscard)
    //console.log(playerDiscard)
    updateDeckCount();
}

//the game will be over when someones cards hit zero
function isGameOver(player, computer){
     //if player runs out of cards then this will display
    if (player.NumberOfCards === 0){
        text.innerText = "the computer wins";
        stop = true;
    } else if (computer.NumberOfCards === 0){
        text.innerText = "the player wins";
        stop = true;
    }
}



