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

function flipCards() {
  // Check if any player has zero cards
  if (playerDeck.NumberOfCards === 0 || computerDeck.NumberOfCards === 0 || ThirdDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }

  inRound = true;
  updateDeckCount();

  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  const thirdCard = ThirdDeck.pop();

  if (playerCard !== undefined) {
    playerCardSlot.appendChild(playerCard.getHTML());
  }
  
  if (computerCard !== undefined) {
    computerCardSlot.appendChild(computerCard.getHTML());
  }

  if (thirdCard !== undefined) {
    thirdCardSlot.appendChild(thirdCard.getHTML());
  }

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
  if (playerDeck.NumberOfCards === 0 || computerDeck.NumberOfCards === 0 || ThirdDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
    return; // exit the function
  }
  
if (CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value] && CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[third.value]) {
  text.innerText = "Player 1 Wins";
  //It pushes the cards into the player 1s hand
  playerDeck.myPush(player);
  playerDeck.myPush(third);
  playerDeck.myPush(computer);
} else if (CARD_VALUE_MAP[computer.value] > CARD_VALUE_MAP[player.value] && CARD_VALUE_MAP[computer.value] > CARD_VALUE_MAP[third.value]) {
  text.innerText = "Computer Wins";
  //It pushes the cards into the computers hand
  computerDeck.myPush(player);
  computerDeck.myPush(third);
  computerDeck.myPush(computer);
} else if (CARD_VALUE_MAP[third.value] > CARD_VALUE_MAP[player.value] && CARD_VALUE_MAP[third.value] > CARD_VALUE_MAP[computer.value]) {
  text.innerText = "Third Player Wins";
  //It pushes the cards into the third player's hand
  ThirdDeck.myPush(player);
  ThirdDeck.myPush(third);
  ThirdDeck.myPush(computer);
} else if (CARD_VALUE_MAP[player.value] == CARD_VALUE_MAP[computer.value] && CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[third.value]) {
  text.innerText = "WAR!";
  if (playerDeck.NumberOfCards === 3) {
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());
  } else if (computerDeck.NumberOfCards === 3){
    computerDiscard.myPush(computerDeck.pop());
    computerDiscard.myPush(computerDeck.pop());
  } // if the player1, computer, or player 3 has less than three cards then it will only take one card from their handelse 
  if (playerDeck.NumberOfCards === 2){
    playerDiscard.myPush(playerDeck.pop());
  }else if (computerDeck.NumberOfCards === 2){
    computerDiscard.myPush(computerDeck.pop());
  }//if the player1, computer, or player 3 only has one card then it will go to comparewar
  else if (playerDeck.NumberOfCards === 1){
    setTimeout(function() {
      handleNormalWar();
    }, 500);
  }else if (computerDeck.NumberOfCards === 1){
      setTimeout(function() {
        handleNormalWar();
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
      handleNormalWar();
    }, 500);
  } 

  handleNormalWar([player, computer]);
} else if (CARD_VALUE_MAP[player.value] == CARD_VALUE_MAP[third.value] && CARD_VALUE_MAP[player.value] > CARD_VALUE_MAP[computer.value]) {
  text.innerText = "WAR!";
  if (playerDeck.NumberOfCards === 3) {
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());
  } else if (ThirdDeck.NumberOfCards === 3){
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());}
  // if the player1, computer, or player 3 has less than three cards then it will only take one card from their hand
  else if (playerDeck.NumberOfCards === 2){
    playerDiscard.myPush(playerDeck.pop());
  } else if (ThirdDeck.NumberOfCards === 2){
    ThirdJunk.myPush(playerDeck.pop());
  //if the player1, computer, or player 3 only has one card then it will go to comparewar
  }else if (playerDeck.NumberOfCards === 1){
    setTimeout(function() {
      War1vs3();
    }, 500);
  }else if (ThirdDeck.NumberOfCards === 1){
      setTimeout(function() {
        War1vs3();
      }, 500);
  }else {
    //Adds three cards to the players discard pile
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());

    //adds three cards to the third players discard pile
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());
    
    updateDeckCount(); 
    
    // Delay the execution of compareWar() by 1 second
    setTimeout(function() {
      War1vs3();
    }, 500);
  } 

  War1vs3([player, third]);
} 
else if (CARD_VALUE_MAP[computer.value] == CARD_VALUE_MAP[third.value] && CARD_VALUE_MAP[computer.value] > CARD_VALUE_MAP[player.value]) {
  text.innerText = "WAR!";
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
      Compvs3War();
    }, 500);
  } 

  Compvs3War([computer, third]);
} else if (CARD_VALUE_MAP[player.value] == CARD_VALUE_MAP[computer.value] == CARD_VALUE_MAP[third.value]) {
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
      HandleThreeWayWar()
    }, 500);
  }else if (computerDeck.NumberOfCards === 1){
      setTimeout(function() {
        HandleThreeWayWar();
      }, 500);
  } else {
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
      HandleThreeWayWar();
    }, 500);
  } 
}
updateDeckCount();
isGameOver(playerDeck, computerDeck, ThirdDeck); 
  }



function HandleThreeWayWar() {
  //makes sure there is not a delay in displaying the cards
  inRound = true;
  updateDeckCount();

  // Get the next card for each player
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  const thirdCard = ThirdDeck.pop();

   // Check if any player has zero cards
   if (playerDeck.NumberOfCards === 0 || computerDeck.NumberOfCards === 0 || ThirdDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }
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
    isGameOver(playerDeck, computerDeck, ThirdDeck);
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
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  } else if (CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[playerCard.value] && CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[computerCard.value]) {
    text.innerText = "The third player wins war!";

    // Add cards to computer's deck
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(thirdCard);
    ThirdDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the computer
    while (playerDiscard.NumberOfCards > 0) {
      ThirdDeck.myPush(playerDiscard.pop());
    }
    while (computerDiscard.NumberOfCards > 0) {
      ThirdDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0){
      ThirdDeck.myPush(ThirdJunk.pop());
    }
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }else if (CARD_VALUE_MAP[player.value] == CARD_VALUE_MAP[computer.value] == CARD_VALUE_MAP[third.value])  {
    //if war happens again then it will go through the process again until it is over
    text.innerText = "War again!";
    if (playerDeck.NumberOfCards === 3) {
      playerDiscard.myPush(playerDeck.pop());
      playerDiscard.myPush(playerDeck.pop());
    } else if (computerDeck.NumberOfCards === 3){
      computerDiscard.myPush(computerDeck.pop());
      computerDiscard.myPush(computerDeck.pop());
    } else if (ThirdDeck.NumberOfCards === 3){
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());
    } else if (playerDeck.NumberOfCards === 2){
      playerDiscard.myPush(playerDeck.pop());
    } else if (computerDeck.NumberOfCards === 2){
      computerDiscard.myPush(playerDeck.pop());
    } else if (ThirdDeck.NumberOfCards === 2){
      ThirdJunk.myPush(ThirdDeck.pop());
    } else if (playerDeck.NumberOfCards === 1){
        setTimeout(function() {
          HandleThreeWayWar();
        }, 500);
    } else if (computerDeck.NumberOfCards === 1){
        setTimeout(function() {
          HandleThreeWayWar();
        }, 500);
    }else if (ThirdDeck.NumberOfCards === 1){
        setTimeout(function() {
          HandleThreeWayWar();
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
      
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());
      ThirdJunk.myPush(ThirdDeck.pop());
      updateDeckCount(); 
      
      // Delay the execution of compareWar() by 1 second
      setTimeout(function() {
        HandleThreeWayWar();
      }, 500);
      isGameOver(playerDeck, computerDeck, ThirdDeck);
    }

  // Update the deck count and check if the game is over
  updateDeckCount();
  isGameOver(playerDeck, computerDeck, ThirdDeck);
 }
}

function handleNormalWar(){
  inRound = true;
  updateDeckCount();

  // Get the next card for each player
  const playerCard = playerDeck.pop();
  const computerCard = computerDeck.pop();
  const thirdCard = ThirdDeck.pop();

   // Check if any player has zero cards
   if (playerDeck.NumberOfCards === 0 || computerDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }
  
  computerCardSlot.appendChild(computerCard.getHTML());
  playerCardSlot.appendChild(playerCard.getHTML());
  

  if (CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[computerCard.value]) {
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
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  } else if (CARD_VALUE_MAP[computerCard.value] > CARD_VALUE_MAP[playerCard.value]) {
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

  } else {
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
      handleNormalWar();
    }, 500);
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  } 
  updateDeckCount();
  isGameOver(playerDeck, computerDeck, ThirdDeck);
}

function War1vs3(){
  inRound = true;
  updateDeckCount();

   // Get the next card for each player
  const playerCard = playerDeck.pop();
  const thirdCard = ThirdDeck.pop();
  const computerCard = computerDeck.pop();

   // Check if any player has zero cards
   if (playerDeck.NumberOfCards === 0 || ThirdDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }

  playerCardSlot.appendChild(playerCard.getHTML());
  thirdCardSlot.appendChild(thirdCard.getHTML());
  

  if (CARD_VALUE_MAP[playerCard.value] > CARD_VALUE_MAP[thirdCard.value]) {
    text.innerText = "Player 1 wins WAR";

     // Add cards to computer's deck
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
    while (ThirdJunk.NumberOfCards > 0) {
      playerDeck.myPush(ThirdJunk.pop());
    }

  } else if (CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[playerCard.value]) {
    text.innerText = "The third player wins war!";

    // Add cards to computer's deck
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(thirdCard);
    ThirdDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the computer
    while (playerDiscard.NumberOfCards > 0) {
      ThirdDeck.myPush(playerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0) {
      ThirdDeck.myPush(ThirdJunk.pop());
    }

  } else {
    //Adds three cards to the players discard pile
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());
    playerDiscard.myPush(playerDeck.pop());
    
    //Adds three cards to the computers discard pile
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());

    updateDeckCount(); 
    
    // Delay the execution of compareWar() by 1 second
    setTimeout(function() {
      War1vs3();
    }, 500);
  } 
  updateDeckCount();
  isGameOver(playerDeck, computerDeck, ThirdDeck);
}

function Compvs3War(){
  inRound = true;
  updateDeckCount();

  // Get the next card for each player
  const computerCard = computerDeck.pop();
  const thirdCard = ThirdDeck.pop();
  const playerCard = playerDeck.pop();

   // Check if any player has zero cards
   if (computerDeck.NumberOfCards === 0 || ThirdDeck.NumberOfCards === 0) {
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  }
  computerCardSlot.appendChild(computerCard.getHTML());
  thirdCardSlot.appendChild(thirdCard.getHTML());
  

  if (CARD_VALUE_MAP[computerCard.value] > CARD_VALUE_MAP[thirdCard.value]) {
    text.innerText = "computer wins war";

    // Add cards to player's deck
    computerDeck.myPush(playerCard);
    computerDeck.myPush(playerCard);
    computerDeck.myPush(computerCard);
    computerDeck.myPush(computerCard);
    computerDeck.myPush(thirdCard);
    computerDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the player
    while (computerDiscard.NumberOfCards > 0) {
      computerDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0) {
      computerDeck.myPush(ThirdJunk.pop());
    }

  } else if (CARD_VALUE_MAP[thirdCard.value] > CARD_VALUE_MAP[computerCard.value]) {
    text.innerText = "The third player wins war!";

    // Add cards to computer's deck
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(playerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(computerCard);
    ThirdDeck.myPush(thirdCard);
    ThirdDeck.myPush(thirdCard);

    //takes all cards that was played and is given to the computer
    while (computerDiscard.NumberOfCards > 0) {
      ThirdDeck.myPush(computerDiscard.pop());
    }
    while (ThirdJunk.NumberOfCards > 0) {
      ThirdDeck.myPush(ThirdJunk.pop());
    }

  } else {
    //Adds three cards to the players discard pile
    computerDiscard.myPush(computerDeck.pop());
    computerDiscard.myPush(computerDeck.pop());
    computerDiscard.myPush(computerDeck.pop());
    
    //Adds three cards to the computers discard pile
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());
    ThirdJunk.myPush(ThirdDeck.pop());

    updateDeckCount(); 
    
    // Delay the execution of compareWar() by 1 second
    setTimeout(function() {
      Compvs3War();
    }, 500);
    isGameOver(playerDeck, computerDeck, ThirdDeck);
  } 
  updateDeckCount();
  isGameOver(playerDeck, computerDeck, ThirdDeck);
}



let computerScore = 0;
let playerScore = 0;
let thirdScore = 0;

// Function to update scores
function updateScores() {
  scores.innerText = `Comp: ${computerScore} \n Player1: ${playerScore} \n Player3: ${thirdScore}`;
}

function isGameOver(player, computer, third) {
  console.log("player cards:", player.NumberOfCards);
  console.log("computer cards:", computer.NumberOfCards);
  console.log("third player cards:", third.NumberOfCards);

  // Check if both computer and third players have no more cards
  if (computer.NumberOfCards === 0 && third.NumberOfCards === 0) {
    console.log("player wins");
    updateScores();
    text.innerText = "The player wins";
    playerScore++; // Update player score
    stop = true;
  } 
  // Check if player runs out of cards
  else if (player.NumberOfCards === 0 && third.NumberOfCards === 0) {
    console.log("computer wins");
    updateScores();
    text.innerText = "The computer wins";
    computerScore++; // Update computer score
    stop = true;
  } 
  // Check if computer runs out of cards
  else if (computer.NumberOfCards === 0) {
    updateScores();
    console.log("computer out of cards");
    text.innerText = "The Computer is out of cards";
    computerCardSlot.innerHTML = "";
    inRound = true;
  }
  // Check if third player runs out of cards
  else if (third.NumberOfCards === 0) {
    updateScores();
    console.log("third player out of cards");
    text.innerText = "The third player is out of cards";
    thirdCardSlot.innerHTML = "";
    inRound = true;
  } 
  // Check if player runs out of cards
  else if (player.NumberOfCards === 0) {
    updateScores();
    console.log("player out of cards");
    text.innerText = "Player 1 is out of cards";
    playerCardSlot.innerHTML = "";
    inRound = true;
  } 
  // Check if the cards in a round is empty
  else if (computerCardSlot.innerHTML === "" && playerCardSlot.innerHTML === ""){
    console.log("third player wins");
    updateScores();
    text.innerText = "The third player wins";
    thirdScore++; // Update player score
    stop = true;
  } else if (thirdCardSlot.innerHTML === "" && computerCardSlot.innerHTML === ""){
    console.log("third player wins");
    updateScores();
    text.innerText = "The player wins";
    playerScore++; // Update player score
    stop = true;
  } else if (playerCardSlot.innerHTML === "" && thirdCardSlot.innerHTML === ""){
    console.log("first player wins");
    updateScores();
    text.innerText = "The player wins";
    playerScore++; // Update player score
    stop = true;
  }
  updateScores();
}







