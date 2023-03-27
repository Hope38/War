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

let playerDeck, computerDeck, inRound, stop, playerDiscard, computerDiscard,cards;

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
    //changes the inner text to how many cards are in the deck. NumberOfCards is the length.
    computerDeckElement.innerText = computerDeck.NumberOfCards;
    playerDeckElement.innerText = playerDeck.NumberOfCards;
    computerDiscardDeckElement.innerText = computerDiscard.NumberOfCards;
    playerDiscardDeckElement.innerText = playerDiscard.NumberOfCards;
}

//Will determine who wins, will detemine which card is worth more
function isRoundWinner(player, computer){
    if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]){
        text.innerText = "win";
        //Adds the card that was played to the players deck
        playerDeck.mypush(player);
        playerDeck.mypush(computer);
    } else if (CARD_VALUE_MAP[player.value] < CARD_VALUE_MAP[computer.value]){
        text.innerText = "lose";
        //Adds the card that was played to the computers deck
        computerDeck.mypush(player);
        computerDeck.mypush(computer);
    } else if(CARD_VALUE_MAP[player.value] == CARD_VALUE_MAP[computer.value]){
        //initiates war
        text.innerText = "Draw";
        return war();
    }
        isGameOver(playerDeck, computerDeck);
        updateDeckCount();
}

function war(){ 
    const playerCard = playerDeck.pop();
    const computerCard = computerDeck.pop();

    //if the computer or deck has less than 4 cards then it will be game over
    if (playerDeck.NumberOfCards === 3) {
        playerDiscard.mypush(playerDeck.pop());
        playerDiscard.mypush(playerDeck.pop());
      } else if (computerDeck.NumberOfCards === 3){
        computerDiscard.mypush(computerDeck.pop());
        computerDiscard.mypush(computerDeck.pop());
      } else {
        //Adds three cards to the players discard pile
        playerDiscard.mypush(playerDeck.pop());
        playerDiscard.mypush(playerDeck.pop());
        playerDiscard.mypush(playerDeck.pop());
        
        //Adds three cards to the computers discard pile
        computerDiscard.mypush(computerDeck.pop());
        computerDiscard.mypush(computerDeck.pop());
        computerDiscard.mypush(computerDeck.pop());
        
        updateDeckCount();   
      }

      //if the player or computer has only two cards then it will put one card into the discard pile
      if (playerDeck.NumberOfCards === 2){
        playerDiscard.mypush(playerDeck.pop());
      } else if (computerDeck.NumberOfCards === 2){
        computerDiscard.mypush(computerDeck.pop());   
      }

      //if the player or computer has only 1 cards then it will just draw that one to compare
      if(playerDeck.NumberOfCards === 1){
        compareWar(playerCard,computerCard)
      } else if (computerDeck.NumberOfCards === 1){
        compareWar(playerCard,computerCard)
      }

    //if you have zero cards to play for war then it will be game over
      if(playerDeck.NumberOfCards === 0){
        isGameOver(playerDeck, computerDeck);
      } else if (computerDeck.NumberOfCards === 0){
        isGameOver(playerDeck, computerDeck);
      }

    updateDeckCount();
    compareWar(playerCard, computerCard);
}

function compareWar(player, computer){
    if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]){
        text.innerText = "You win War";
        //Adds the card that was played to the players deck
        playerDeck.mypush(player);
        playerDeck.mypush(computer);
       
        //Adds the discard piles cards into the players Deck
        playerDeck.mypush(playerDiscard.pop());
        playerDeck.mypush(playerDiscard.pop());
        playerDeck.mypush(playerDiscard.pop());
        //playerDeck.mypush(playerDiscard.pop());
    
        playerDeck.mypush(computerDiscard.pop());
        playerDeck.mypush(computerDiscard.pop());
        playerDeck.mypush(computerDiscard.pop());
        
        // if the computer or player discard pile is equal to zero then nothing happens
        if (computerDiscard.NumberOfCards === 0){
            isGameOver(playerDeck, computerDeck)
          } else if (playerDiscard.NumberOfCards === 0){
            isGameOver(playerDeck, computerDeck)
          } else {
            //but if there is still cards in the player discard pile and they win the war then the cards will be pushed
           playerDeck.mypush(playerDiscard.pop());
            playerDeck.mypush(playerDiscard.pop());
            playerDeck.mypush(playerDiscard.pop());
            
            playerDeck.mypush(computerDiscard.pop());
            playerDeck.mypush(computerDiscard.pop());
            playerDeck.mypush(computerDiscard.pop());
          }
     } else if(CARD_VALUE_MAP[player.value] < CARD_VALUE_MAP[computer.value]){
        text.innerText = "You lose War";
        //Adds the card that was played to the computers deck
        computerDeck.mypush(player);
        computerDeck.mypush(computer);
        //Adds the discard piles cards into the computers Deck
        computerDeck.mypush(playerDiscard.pop());
        computerDeck.mypush(playerDiscard.pop());
        computerDeck.mypush(playerDiscard.pop());

        computerDeck.mypush(computerDiscard.pop());
        computerDeck.mypush(computerDiscard.pop());
        computerDeck.mypush(computerDiscard.pop()); 

        // if the computer or player discard pile is equal to zero then nothing happens
        if (computerDiscard.NumberOfCards === 0){
          isGameOver(playerDeck, computerDeck)
        } else if (playerDiscard.NumberOfCards === 0){
          isGameOver(playerDeck, computerDeck)
        } else {
           //but if there is still cards in the computer discard pile and they win the war then the cards will be pushed
        computerDeck.mypush(playerDiscard.pop());
        computerDeck.mypush(playerDiscard.pop());
        computerDeck.mypush(playerDiscard.pop());

        computerDeck.mypush(computerDiscard.pop());
        computerDeck.mypush(computerDiscard.pop());
        computerDeck.mypush(computerDiscard.pop()); 
        }
    } else {
        text.innerText = "War again!";
        return war();
    }

    isGameOver(playerDeck, computerDeck)
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



