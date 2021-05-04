const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedCard = document.getElementsByClassName("flip");
let modal = document.getElementById("popup1");

(function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    //first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }
  //second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  //do card match?
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;

  isMatch ? disableCardsFlip() : unflipCards();
}

function disableCardsFlip() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function congratulation() {
  if (matchedCard.length == 12) {
    modal.classList.add("show");
  }
}

function playAgain() {
  var finish = document.querySelectorAll(".memory-card.flip");
  modal.classList.remove("show");

  [].forEach.call(finish, function (el) {
    el.classList.remove("flip");
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));
cards.forEach((card) => card.addEventListener("click", congratulation));
