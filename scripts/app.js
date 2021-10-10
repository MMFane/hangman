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
const startingTheme = 3;
const resetBtn = document.querySelector("#reset");
const themeBtns = [];
const themeLink = document.querySelector("#theme");

for (let i = 0; i < themesEnum.length; i++) {
  themeBtns.push(document.querySelector(`#${themesEnum[i]}`));
  themeBtns[i].addEventListener("click", () => changeTheme(themesEnum[i]));
}
themeBtns[startingTheme].disabled = true;

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
  themeBtns.forEach((button) => {
    button.disabled = flag;
  });
};

const changeTheme = (theme) => {
  resetThemeButtons(false);
  themeFound = false;
  for (let i = 0; i < themeBtns.length; i++) {
    if (theme === themesEnum[i]) {
      themeFound = true;
      changeLink(`./styles/theme-${themesEnum[i]}.css`);
      themeBtns[i].disabled = true;
    }
  }

  if (!themeFound) {
    //default to light theme
    console.error("Error: unknown theme in changeTheme()");
    changeLink(`./styles/theme-${themesEnum[0]}.css`);
    themeBtns[0].disabled = true;
  }
};

// set up buttons
resetBtn.addEventListener("click", startGame);

startGame();
