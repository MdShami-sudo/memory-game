// Constants
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

let flippedCards = [];
let matchedCards = [];

// Generate a shuffled array of card pairs
let cardPairs = [];
for (let i = 0; i < letters.length; i++) {
  cardPairs.push(letters[i]);
  cardPairs.push(letters[i]);
}
shuffleArray(cardPairs);

// Create cards dynamically
const gameBoard = document.querySelector('.game-board');
cardPairs.forEach(letter => {
  const card = document.createElement('div');
  card.classList.add('card', 'hidden');
  card.dataset.letter = letter;
  card.textContent = letter;
  gameBoard.appendChild(card);

  card.addEventListener('click', () => {
    if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
      flipCard(card);
      flippedCards.push(card);

      if (flippedCards.length === 2) {
        setTimeout(checkForMatch, 1000);
      }
    }
  });
});

// Flip a card
function flipCard(card) {
  card.classList.remove('hidden');
}

// Check if flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.letter === card2.dataset.letter) {
    matchedCards.push(card1, card2);
    flippedCards = [];

    // Check if all cards are matched
    if (matchedCards.length === cardPairs.length) {
      setTimeout(() => {
        alert('Congratulations! You matched all pairs!');
      }, 500);
    }
  } else {
    setTimeout(() => {
      flipCard(card1);
      flipCard(card2);
      flippedCards = [];
    }, 500);
  }
}

// Shuffle function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
