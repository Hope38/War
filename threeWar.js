import Deck from "./TheCardDeck.js";

//will convert the Q,K,J,A into numbers
const CARD_VALUE_MAP = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "10": 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14
};


const computerCardSlot = document.querySelector('.computer-card-slot');
const playerCardSlot = document.querySelector('.player-card-slot');
const thirdCardSlot = document.querySelector('.third-card-slot');
const computerDeckElement = document.querySelector('.computer-deck');
const playerDeckElement = document.querySelector('.player-deck');
const thirdplayerElement = document.querySelector('.third-deck');

const text = document.querySelector('.text');
const playerDiscardDeckElement = document.querySelector('.player-Junk');
const computerDiscardDeckElement = document.querySelector('.computer-Junk');
const thirdDiscardDeckElement = document.querySelector('.third-Junk');
const scores = document.querySelector('.scoreboard');

let playerDeck, ThirdDeck,computerDeck, inRound, stop, playerDiscard, computerDiscard, ThirdJunk;

//if you click anywhere on the screen the function will run
document.addEventListener('click', () => {
    if(stop) {
        startGame();
        updateScores()
        return;
    }

    if(inRound){
        //if the round is starting then clean it up
        cleanBeforeRound();
    } else {
        //otherwise flip a card when you click the screen
        flipCards();
    }
})

//The actual game
startGame();

function startGame(){
    const deck = new Deck();
    deck.shuffle();
    
    //splits it into equal pile of cards
    const deckMidpoint = Math.ceil(deck.NumberOfCards / 3);
    
    //the players deck - This splits the cards
    playerDeck = new Deck(deck.cards.slice(0, deckMidpoint));
    
    ThirdDeck = new Deck(deck.cards.slice(deckMidpoint, deckMidpoint * 2));
    //the computers deck
    computerDeck = new Deck(deck.cards.slice(deckMidpoint * 2 + 1, 52));

    
    ThirdJunk = new Deck([]);
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
    thirdCardSlot.innerHTML = "";
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
    const thirdCard = ThirdDeck.pop();
    
    //renders the cards
    playerCardSlot.appendChild(playerCard.getHTML());
    computerCardSlot.appendChild(computerCard.getHTML());
    thirdCardSlot.appendChild(thirdCard.getHTML());
    
    isRoundWinner(playerCard, computerCard, thirdCard);
}

//updates the deck count
function updateDeckCount(){
  //changes the inner text to how many cards are in the deck. NumberOfCards is the length.
    computerDeckElement.innerText = computerDeck.NumberOfCards;
    playerDeckElement.innerText = playerDeck.NumberOfCards;
    computerDiscardDeckElement.innerText = computerDiscard.NumberOfCards;
    playerDiscardDeckElement.innerText = playerDiscard.NumberOfCards;
    thirdDiscardDeckElement.innerText = ThirdJunk.NumberOfCards;
    thirdplayerElement.innerText = ThirdDeck.NumberOfCards;
}

//console.log(player); // check the value of player
//console.log(computer); // check the value of computer

//Will determine who wins, will detemine which card is worth more

function isRoundWinner(player, computer, third) {
  if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value] && CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[third.value]) {
    text.innerText = "Player 1 Wins";
    //It pushes the cards into the player 1s hand
    playerDeck.myPush(player);
    playerDeck.myPush(third);
    playerDeck.myPush(computer);
  } else if (CARD_VALUE_MAP[computer.value] > CARD_VALUE_MAP[player.value] && CARD_VALUE_MAP[computer.value] > CARD_VALUE_MAP[third.value]) {
    text.innerText = "Computer Wins";
    //It pushes the cards into the computers hand
    computerDeck.myPush(computer);
    computerDeck.myPush(third);
    computerDeck.myPush(player);
  } else if (CARD_VALUE_MAP[third.value] > CARD_VALUE_MAP[player.value] && CARD_VALUE_MAP[third.value] > CARD_VALUE_MAP[computer.value]) {
    text.innerText = "Third Player Wins";
    //It pushes the cards into the third players hand
    ThirdDeck.myPush(computer);
    ThirdDeck.myPush(third);
    ThirdDeck.myPush(player);
  }else {
    text.innerText = "WAR!";
    //if the player1, computer, or player3 has less than four cards then it will only take two cards from their hand
    if (playerDeck.NumberOfCards === 3) {
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
    } else if (computerDeck.NumberOfCards === 3){
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
    } else if (ThirdDeck.NumberOfCards === 3){
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());}
    // if the player1, computer, or player 3 has less than three cards then it will only take one card from their hand
    else if (playerDeck.NumberOfCards === 2){
      playerDiscard.myPush(playerDeck.pop());
    }else if (computerDeck.NumberOfCards === 2){
      computerDiscard.myPush(computerDeck.pop());
    }else if (ThirdDeck.NumberOfCards === 2){
      ThirdJunk.myPush(playerDeck.pop());
    //if the player1, computer, or player 3 only has one card then it will go to comparewar
    }else if (playerDeck.NumberOfCards === 1){
      setTimeout(function() {
        compareWar();
      }, 500);
    }else if (computerDeck.NumberOfCards === 1){
        setTimeout(function() {
          compareWar();
        }, 500);
    }else {
      //Adds three cards to the players discard pile
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
      
      //Adds three cards to the computers discard pile
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());

      //adds three cards to the third players discard pile
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());
      
      updateDeckCount(); 
      
      // Delay the execution of compareWar() by 1 second
      setTimeout(function() {
        compareWar();
      }, 500);
    } 
  }
  updateDeckCount();
  isGameOver(playerDeck, computerDeck); 
}

function compareWar() {
  //makes sure there is not a delay in displaying the cards
  inRound = true;
  updateDeckCount();

  // Get the next card for each player
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  const thirdCard = ThirdDeck.pop();

  // Render the cards on the screen
  playerCardSlot.appendChild(playerCard.getHTML());
  computerCardSlot.appendChild(computerCard.getHTML());
  thirdCardSlot.appendChild(thirdCard.getHTML());

  // Compare the cards and resolve the war
  if (CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[computerCard.value]&& CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[thirdCard.value]) {
    text.innerText = "Player 1 wins WAR";

    // Add cards to player's deck
    playerDeck.myPush(playerCard);
    playerDeck.myPush(playerCard);
    playerDeck.myPush(computerCard);
    playerDeck.myPush(computerCard);
    playerDeck.myPush(thirdCard);
    playerDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the player
    while (playerDiscard.NumberOfCards > 0) {
      playerDeck.myPush(playerDiscard.pop());
    }
    while (computerDiscard.NumberOfCards > 0) {
      playerDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0){
      playerDeck.myPush(ThirdJunk.pop());
    }

  } else if (CARD_VALUE_MAP[computerCard.value] > CARD_VALUE_MAP[playerCard.value] && CARD_VALUE_MAP[computerCard.value] > CARD_VALUE_MAP[thirdCard.value]) {
    text.innerText = "The comp wins war!";

    // Add cards to computer's deck
    computerDeck.myPush(playerCard);
    computerDeck.myPush(playerCard);
    computerDeck.myPush(computerCard);
    computerDeck.myPush(computerCard);
    computerDeck.myPush(thirdCard);
    computerDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the computer
    while (playerDiscard.NumberOfCards > 0) {
      computerDeck.myPush(playerDiscard.pop());
    }
    while (computerDiscard.NumberOfCards > 0) {
      computerDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0){
      computerDeck.myPush(ThirdJunk.pop());
    }

  } else if (CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[playerCard.value] && CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[thirdCard.value]) {
    text.innerText = "The comp wins war!";

    // Add cards to computer's deck
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(thirdCard);
    ThirdDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the computer
    while (playerDiscard.NumberOfCards > 0) {
      computerDeck.myPush(playerDiscard.pop());
    }
    while (computerDiscard.NumberOfCards > 0) {
      computerDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0){
      computerDeck.myPush(ThirdJunk.pop());
    }

  }else {
    //if war happens again then it will go through the process again until it is over
    text.innerText = "War again!";
    if (playerDeck.NumberOfCards === 3) {
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
    } else if (computerDeck.NumberOfCards === 3){
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
    } else if (playerDiscard.myPush.NumberOfCards === 2){
      playerDiscard.myPush(playerDeck.pop());
    }else if (computerDiscard.myPush.NumberOfCards === 2){
      computerDiscard.myPush(playerDeck.pop());
    }else if (playerDiscard.myPush.NumberOfCards === 1){
      setTimeout(function() {
        compareWar();
      }, 500);
    }else if (computerDiscard.myPush.NumberOfCards === 1){
        setTimeout(function() {
          compareWar();
        }, 500);
    }else {
      //Adds three cards to the players discard pile
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
      
      //Adds three cards to the computers discard pile
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
      
      updateDeckCount(); 
      
      // Delay the execution of compareWar() by 1 second
      setTimeout(function() {
        compareWar();
      }, 500);
    } 

  // Update the deck count and check if the game is over
  updateDeckCount();
  isGameOver(playerDeck, computerDeck);
 }
}



let computerScore = 0;
let playerScore = 0;

// Function to update scores
function updateScores() {
  scores.innerText = `Comp: ${computerScore} \n Player: ${playerScore}`;
}

// The game will be over when someone's cards hit zero
function isGameOver(player, computer) {
  // If player runs out of cards then this will display
  if (player.NumberOfCards === 0) {
    text.innerText = "The computer wins";
    computerScore++; // Update computer score
    stop = true;
  } else if (computer.NumberOfCards === 0) {
    text.innerText = "The player wins";
    playerScore++; // Update player score
    stop = true;
  }
  // Update scores on the screen
  updateScores();
}




