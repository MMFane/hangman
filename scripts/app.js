let game1;
const puzzleLength = "2";
const guesses = 5;
const themesEnum = ["light", "dark", "contrast", "halloween"];
const urlsEnum = [
  "./styles/theme-light.css",
  "./styles/theme-dark.css",
  "./styles/theme-contrast.css",
  "./styles/theme-halloween.css",
];

const resetBtn = document.querySelector("#reset");
const lightBtn = document.querySelector(`#${themesEnum[0]}`);
const darkBtn = document.querySelector(`#${themesEnum[1]}`);
const contrastBtn = document.querySelector(`#${themesEnum[2]}`);
const halloweenBtn = document.querySelector(`#${themesEnum[3]}`);
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
  if (theme === themesEnum[0]) {
    changeLink(`./styles/theme-${themesEnum[0]}.css`);
    lightBtn.disabled = true;
  } else if (theme === themesEnum[1]) {
    changeLink(`./styles/theme-${themesEnum[1]}.css`);
    darkBtn.disabled = true;
  } else if (theme === themesEnum[2]) {
    changeLink(`./styles/theme-${themesEnum[2]}.css`);
    contrastBtn.disabled = true;
  } else if (theme === themesEnum[3]) {
    changeLink(`./styles/theme-${themesEnum[3]}.css`);
    halloweenBtn.disabled = true;
  } else {
    console.log("Error: unknown theme in changeTheme()");
  }
};

// set up buttons
resetBtn.addEventListener("click", startGame);
lightBtn.addEventListener("click", () => changeTheme(themesEnum[0]));
darkBtn.addEventListener("click", () => changeTheme(themesEnum[1]));
contrastBtn.addEventListener("click", () => changeTheme(themesEnum[2]));
halloweenBtn.addEventListener("click", () => changeTheme(themesEnum[3]));

startGame();
