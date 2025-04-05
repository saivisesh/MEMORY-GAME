const emojis = ["🐶", "🐶", "🐱", "🐱", "🐸", "🐸", "🦁", "🦁", "🐵", "🐵", "🐼", "🐼", "🐧", "🐧", "🐻", "🐻"];
let shuffled = [];
let flippedCards = [];
let matchedCount = 0;

const game = document.getElementById("game");
const statusText = document.getElementById("status");

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startGame() {
  game.innerHTML = "";
  flippedCards = [];
  matchedCount = 0;
  shuffled = shuffle([...emojis]);

  statusText.textContent = "Match the emojis!";

  shuffled.forEach((emoji, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.emoji = emoji;
    card.dataset.index = index;

    card.addEventListener("click", () => flipCard(card));
    game.appendChild(card);
  });
}

function flipCard(card) {
  if (flippedCards.length === 2 || card.classList.contains("flipped") || card.classList.contains("matched")) return;

  card.classList.add("flipped");
  card.textContent = card.dataset.emoji;
  flippedCards.push(card);

  if (flippedCards.length === 2) {
    const [first, second] = flippedCards;
    if (first.dataset.emoji === second.dataset.emoji) {
      first.classList.add("matched");
      second.classList.add("matched");
      matchedCount += 2;
      statusText.textContent = "✅ Match Found!";
      flippedCards = [];
      if (matchedCount === emojis.length) {
        statusText.textContent = "🎉 You matched all emojis!";
      }
    } else {
      statusText.textContent = "❌ Not a match!";
      setTimeout(() => {
        first.classList.remove("flipped");
        second.classList.remove("flipped");
        first.textContent = "";
        second.textContent = "";
        flippedCards = [];
      }, 1000);
    }
  }
}

startGame();
