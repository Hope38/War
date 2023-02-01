import Deck from "./The_Card_Deck.js"

const computerCardSlot = document.querySelector(".computer-card-slot")

const deck = new Deck()
deck.shuffle()

computerCardSlot.appendChild(deck.cards[0].getHTML())