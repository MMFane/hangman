class Hangman {
  constructor(word, maxMisses) {
    this.guessesElem = document.querySelector("#guesses");
    this.logElem = document.querySelector("#puzzle-log");
    this.missesElem = document.querySelector("#misses");
    this.puzzleElem = document.querySelector("#puzzle");
    this.resetButtonElem = document.querySelector("#reset");

    const lowercase = word.toLowerCase();
    this.word = lowercase.split("");
    this.guessedLetters = [];
    this.guessedLettersPresentation = [];
    this.misses = maxMisses;
    this.gameStatus = "playing";

    this.reset();
    this.printMessage(`Game started! Type a letter to guess.`);
    this.getPuzzleAscii();
    this.printMisses(this.misses);
    this.printGuesses();
  }

  clearLog() {
    this.logElem.innerText = "";
  }

  reset() {
    this.clearLog();
    this.resetButtonElem.style.display = "none";
    this.missesElem.classList.remove("warning");
  }

  showReset() {
    this.resetButtonElem.style.display = "inline-block";
  }

  printMessage(message) {
    let newMessage = document.createElement("p");
    newMessage.innerHTML = message;
    this.logElem.append(newMessage);
  }

  printPuzzle(puzzle) {
    this.puzzleElem.innerHTML = puzzle;
  }

  printGuesses() {
    this.guessesElem.innerHTML = `${this.guessedLettersPresentation}`;
  }

  printMisses(misses) {
    this.missesElem.innerText = `Misses left: ${misses}`;
    if (misses < 2) {
      this.missesElem.classList.add("warning");
    }
  }

  setStatus() {
    const match = this.word.every(
      (letter) => this.guessedLetters.includes(letter) || letter === " "
    );
    if (match) {
      this.gameStatus = "won";
    } else if (this.misses === 0) {
      this.gameStatus = "failed";
    }
  }

  setStatusMessage() {
    const word = this.word.join("");
    this.printMisses(this.misses);
    if (this.gameStatus === "won") {
      this.printMessage("You won! Nice job");
      this.showReset();
    } else if (this.gameStatus === "failed") {
      this.printMessage(
        `Game over, man! The word was <span class="text">'${word}'</span>`
      );
      this.showReset();
    }
  }

  isLowercaseLetter(letter) {
    return letter.charCodeAt(0) > 96 && letter.charCodeAt(0) < 123;
  }

  getPuzzleAscii() {
    let puzzle = "";
    this.word.forEach((letter) => {
      const guessed = this.guessedLetters.includes(letter);
      if (this.isLowercaseLetter(letter) && !guessed) {
        puzzle += "*";
      } else {
        puzzle += `<span class="text">${letter}</span>`;
      }
    });
    this.printPuzzle(puzzle);
    this._puzzle = puzzle;
  }

  guess(letter) {
    if (this.gameStatus === "playing") {
      try {
        letter = letter.toLowerCase();

        if (!this.isLowercaseLetter(letter)) {
          throw Error();
        }

        const isUnique = !this.guessedLetters.includes(letter);
        const isMiss = !this.word.includes(letter);

        if (isUnique) {
          this.guessedLetters.push(letter);
          if (isMiss) {
            this.printMessage(`Ooh, ${letter} is not in the word!`);
            this.misses -= 1;
            this.guessedLettersPresentation.push(
              `<span class="deemphasize">${letter}</span>`
            );
          } else {
            this.getPuzzleAscii();
            this.guessedLettersPresentation.push(letter);
          }
          this.printGuesses();
          this.setStatus();
          this.setStatusMessage();
        } else {
          this.printMessage(`You already guessed '${letter}', guess again`);
        }
      } catch (e) {
        this.printMessage("Please enter a letter, guess again");
      }
    }
  }
}
