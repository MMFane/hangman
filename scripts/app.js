let game1;
const puzzleLength = "2";
const guesses = 6;
const themesEnum = ["light", "dark", "contrast", "halloween"];
const urlsEnum = [
  "./styles/theme-light.css",
  "./styles/theme-dark.css",
  "./styles/theme-contrast.css",
  "./styles/theme-halloween.css",
];
const puzzleCharsEnum = ["_", "_", "_", "X"];
const halloweenRotations = [];
const resetBtn = document.querySelector("#reset");
const startingTheme = 3;
let puzzleChar = puzzleCharsEnum[startingTheme];
let puzzle = null;
const themeBtns = [];
const themeLink = document.querySelector("#theme");
const keyboard = new mobileKeyboard();

for (let i = 0; i < themesEnum.length; i++) {
  themeBtns.push(document.querySelector(`#${themesEnum[i]}`));
  themeBtns[i].addEventListener("click", () => changeTheme(themesEnum[i]));
}
themeBtns[startingTheme].disabled = true;

window.addEventListener("keypress", (e) => {
  makeGuess(String.fromCharCode(e.charCode));
});

window.addEventListener("mobile-keyboard-press", (e) => {
  makeGuess(e.detail.letter);
});

const makeGuess = (letter) => {
  game1.guess(letter);
  reapplyRotations();
  keyboard.useLetter(letter);
};

const changeLink = (url) => {
  themeLink.href = url;
};

const changeTheme = (theme) => {
  resetThemeButtons(false);
  themeFound = false;
  for (let i = 0; i < themeBtns.length; i++) {
    if (theme === themesEnum[i]) {
      themeFound = true;
      changeLink(`./styles/theme-${themesEnum[i]}.css`);
      themeBtns[i].disabled = true;
      puzzleChar = puzzleCharsEnum[i];
    }
  }

  // Halloween-specific
  if (theme === themesEnum[3]) {
    reapplyRotations();
  }

  if (!themeFound) {
    //default to light theme
    console.error("Error: unknown theme in changeTheme()");
    changeLink(`./styles/theme-${themesEnum[0]}.css`);
    themeBtns[0].disabled = true;
  }

  restartGame();
};

const rotateRandomly = () => {
  let randomNum;
  let odd = true;
  const lowest = -20;
  const highest = 20;
  const puzzleChars = document.querySelectorAll("#puzzle span");
  game1.word.forEach((letter, index) => {
    randomNum = odd ? Math.random() * lowest : Math.random() * highest;
    halloweenRotations.push(randomNum);
    puzzleChars[index].style.transform = `rotate(${randomNum}deg)`;
    odd = !odd;
  });
};

const reapplyRotations = () => {
  const puzzleChars = document.querySelectorAll("#puzzle span");
  game1.word.forEach((letter, index) => {
    puzzleChars[
      index
    ].style.transform = `rotate(${halloweenRotations[index]}deg)`;
  });
};

const resetThemeButtons = (flag) => {
  themeBtns.forEach((button) => {
    button.disabled = flag;
  });
};

const startGame = async () => {
  puzzle = await getPuzzle(puzzleLength);
  game1 = new Hangman(puzzle, guesses, puzzleChar);
  rotateRandomly();
  keyboard.reset();
};

const restartGame = () => {
  game1 = new Hangman(puzzle, guesses, puzzleChar);
  reapplyRotations();
  keyboard.reset();
};

// set up buttons
resetBtn.addEventListener("click", startGame);
startGame();
