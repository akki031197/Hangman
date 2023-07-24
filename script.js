const wrong_letters = document.getElementById("wrong-letters");
const wordEL = document.getElementById("word");
const final_message = document.getElementById("final-message");
const play_again = document.getElementById("play-again");
const popup_container = document.getElementById("popup-container");
const notification_container = document.getElementById(
  "notification-container"
);

const figureParts = document.querySelectorAll(".figure-apart");

const words = ["application", "programming", "interface", "wizard"];

let selectedWord = words[Math.floor(Math.random() * words.length)];

let correctLetters = [];
let wrongLetters = [];

//show hidden words

function displayWord() {
  wordEL.innerHTML = `${selectedWord
    .split("")
    .map(
      (letter) =>
        `<span class="letter">${
          correctLetters.includes(letter) ? letter : ""
        }</span>`
    )
    .join("")}`;

  const innerWord = wordEL.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    final_message.innerText = "Congratulations! you won!";
    popup_container.style.display = "flex";
  }
}

displayWord();

//updateWrongLetters function

function updateWrongLetters() {
  // Display Wrong Letters
  wrong_letters.innerHTML = wrongLetters;
  notification_container.innerText = `you enter the wrong letter `;
  notification_container.classList.add("show");

  setTimeout(() => {
    notification_container.classList.remove("show");
  }, 2000);

  // Display parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors && part.display) {
      // Check if part.display is defined
      part.display.style.display = "block"; // Use style.display
    } else if (part.display) {
      // Check if part.display is defined
      part.display.style.display = "none"; // Use style.display
    }
  });

  // Check if lost
  if (wrongLetters.length === figureParts.length) {
    final_message.innerText = "Unfortunately you lost.";
    popup_container.style.display = "flex";
  }
}

//show Notification function
function showNotification() {
  notification_container.classList.add("show");

  setTimeout(() => {
    notification_container.classList.remove("show");
  }, 2000);
}
//event listener for word selection

window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;
    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLetters(letter);
      } else {
        showNotification();
      }
    }
  }
});

//Restart game and play again
play_again.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLetters();
  popup_container.style.display = "none";
});
