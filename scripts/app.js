let game1;
const puzzleLength = "2";
const guesses = 5;

const resetBtn = document.querySelector("#reset");
const lightBtn = document.querySelector("#light");
const darkBtn = document.querySelector("#dark");
const contrastBtn = document.querySelector("#contrast");
const halloweenBtn = document.querySelector("#halloween");
halloweenBtn.disabled = true;

const themeButtons = [lightBtn, darkBtn, contrastBtn, halloweenBtn];
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

const resetThemeButtons = (flag) => {
  themeButtons.forEach((button) => {
    button.disabled = flag;
  });
};

const changeTheme = (theme) => {
  resetThemeButtons(false);
  if (theme === "light") {
    changeLink("./styles/theme-light.css");
    lightBtn.disabled = true;
  } else if (theme === "dark") {
    changeLink("./styles/theme-dark.css");
    darkBtn.disabled = true;
  } else if (theme === "contrast") {
    changeLink("./styles/theme-contrast.css");
    contrastBtn.disabled = true;
  } else if (theme === "halloween") {
    changeLink("./styles/theme-halloween.css");
    halloweenBtn.disabled = true;
  } else {
    console.log("Error: unknown theme in changeTheme()");
  }
};

// set up buttons
resetBtn.addEventListener("click", startGame);
lightBtn.addEventListener("click", () => changeTheme("light"));
darkBtn.addEventListener("click", () => changeTheme("dark"));
contrastBtn.addEventListener("click", () => changeTheme("contrast"));
halloweenBtn.addEventListener("click", () => changeTheme("halloween"));

startGame();
