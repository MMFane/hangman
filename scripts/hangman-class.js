class Hangman {
  constructor(word, maxMisses, puzzleChar) {
    this.guessesElem = document.querySelector("#guesses");
    this.logElem = document.querySelector("#puzzle-log");
    this.missesElem = document.querySelector("#misses");
    this.puzzleElem = document.querySelector("#puzzle");
    this.resetButtonElem = document.querySelector("#reset");
    this.hangmanHead = document.querySelector("#hangman #head");
    this.hangmanBody = document.querySelector("#hangman #body");
    this.hangmanArmLeft = document.querySelector("#hangman #arm-left");
    this.hangmanArmRight = document.querySelector("#hangman #arm-right");
    this.hangmanLegLeft = document.querySelector("#hangman #leg-left");
    this.hangmanLegRight = document.querySelector("#hangman #leg-right");

    const lowercase = word.toLowerCase();
    this.word = lowercase.split("");
    this.guessedLetters = [];
    this.guessedLettersPresentation = [];
    this.misses = maxMisses;
    this.gameStatus = "playing";

    this.reset();
    this.printMessage(`Game started! Type a letter to guess.`);
    this.puzzleChar = puzzleChar;
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
    this.missesElem.classList.remove("deemphasize");
    this.resetHangman();
  }

  showReset() {
    this.resetButtonElem.style.display = "inline-block";
  }

  printMessage(message) {
    let newMessage = document.createElement("p");
    newMessage.innerHTML = message;
    this.logElem.prepend(newMessage);
  }

  printPuzzle(puzzle) {
    this.puzzleElem.innerHTML = puzzle;
  }

  printGuesses() {
    this.guessesElem.innerHTML = `${this.guessedLettersPresentation}`;
  }

  printMisses() {
    this.missesElem.innerText = `Misses left: ${this.misses}`;
    if (this.misses < 2) {
      this.missesElem.classList.add("warning");
    }
    this.printHangman();
  }

  printHangman() {
    // To do: simplify with a nodelist (can't apply styles)
    switch (this.misses) {
      case 5:
        this.hangmanHead.style.display = "block";
        break;
      case 4:
        this.hangmanBody.style.display = "block";
        break;
      case 3:
        this.hangmanArmLeft.style.display = "block";
        break;
      case 2:
        this.hangmanArmRight.style.display = "block";
        break;
      case 1:
        this.hangmanLegLeft.style.display = "block";
        break;
      case 0:
        this.hangmanLegRight.style.display = "block";
        break;
    }
  }

  resetHangman() {
    this.hangmanHead.style.display = "none";
    this.hangmanBody.style.display = "none";
    this.hangmanArmLeft.style.display = "none";
    this.hangmanArmRight.style.display = "none";
    this.hangmanLegLeft.style.display = "none";
    this.hangmanLegRight.style.display = "none";
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
    this.printMisses();
    if (this.gameStatus === "won") {
      this.printMessage(`<span class="text">You won! Nice job</span>`);
      this.missesElem.classList.remove("warning");
      this.missesElem.classList.add("deemphasize");
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
        puzzle += `<span class="puzzle-char">${this.puzzleChar}</span>`;
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
