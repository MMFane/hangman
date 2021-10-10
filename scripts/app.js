let game1;
const puzzleLength = "2";
const guesses = 5;

const head = document.getElementsByTagName("HEAD")[0];
const resetBtn = document.querySelector("#reset");
const lightBtn = document.querySelector("#theme-light");
lightBtn.disabled = true;
const darkBtn = document.querySelector("#theme-dark");
const contrastBtn = document.querySelector("#theme-contrast");
const themeLink = document.querySelector("#theme");

window.addEventListener("keypress", function (e) {
  const guess = String.fromCharCode(e.charCode);
  game1.guess(guess);
});

const startGame = async () => {
  const puzzle = await getPuzzle(puzzleLength);
  game1 = new Hangman(puzzle, guesses);
};

const changeLink = (url) => {
  themeLink.href = url;
};

const changeTheme = (theme) => {
  if (theme === "light") {
    changeLink("./styles/theme-light.css");
    lightBtn.disabled = true;
    darkBtn.disabled = false;
    contrastBtn.disabled = false;
  } else if (theme === "dark") {
    changeLink("./styles/theme-dark.css");
    lightBtn.disabled = false;
    darkBtn.disabled = true;
    contrastBtn.disabled = false;
  } else if (theme === "contrast") {
    changeLink("./styles/theme-contrast.css");
    lightBtn.disabled = false;
    darkBtn.disabled = false;
    contrastBtn.disabled = true;
  } else {
    console.log("Error: unknown theme in changeTheme()");
    lightBtn.disabled = false;
    darkBtn.disabled = false;
    contrastBtn.disabled = false;
  }
};

// set up buttons
resetBtn.addEventListener("click", startGame);
lightBtn.addEventListener("click", () => changeTheme("light"));
darkBtn.addEventListener("click", () => changeTheme("dark"));
contrastBtn.addEventListener("click", () => changeTheme("contrast"));

startGame();
